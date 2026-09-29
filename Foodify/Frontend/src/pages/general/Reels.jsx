import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import ReelActions from "./ReelActions";

const API_URL = "http://localhost:3000/api";

function ReelCard({ video, active, shouldRenderVideo, onLike, onSave }) {
  const [status, setStatus] = useState("loading");
  const videoElementRef = useRef(null);

  useEffect(() => {
    const element = videoElementRef.current;
    if (!element || status === "error") return;

    if (active) {
      element.play().catch(() => undefined);
    } else {
      element.pause();
    }
  }, [active, status]);

  return (
    <article className="relative h-full w-full snap-start overflow-hidden bg-[#181411]">
      {shouldRenderVideo ? (
        <video
          ref={videoElementRef}
          src={video.video}
          muted
          loop
          playsInline
          preload={active ? "auto" : "metadata"}
          onLoadedData={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${status === "loaded" ? "opacity-100" : "opacity-0"}`}
        />
      ) : (
        <div className="absolute inset-0 bg-[#211914]" aria-hidden="true" />
      )}

      {status === "loading" && (
        <div className="absolute inset-0 grid place-items-center text-xs font-bold uppercase tracking-[0.18em] text-white/70">
          Loading reel
        </div>
      )}

      {status === "error" && (
        <div className="absolute inset-0 grid place-items-center px-8 text-center text-white">
          <p className="text-xl font-black">This reel is resting.</p>
        </div>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/85 to-transparent" />

      <header className="absolute inset-x-0 top-0 z-10 flex items-center justify-between bg-gradient-to-b from-black/65 to-transparent px-5 pb-8 pt-5 text-white">
        <Link to={`/food-partner/${video.foodpartner}`} className="flex min-w-0 items-center gap-3 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
          <div className="grid h-9 w-9 place-items-center rounded-full border-2 border-white bg-[#f6ad3d] text-xs font-black">
            {video.name?.charAt(0)?.toUpperCase() || "F"}
          </div>
          <div className="min-w-0">
            <p className="max-w-40 truncate text-xs font-black">{video.name}</p>
            <p className="text-[10px] font-medium text-white/65">Food partner</p>
          </div>
        </Link>
        <button type="button" className="rounded-full border border-white/60 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-white transition hover:bg-white hover:text-black">
          Follow
        </button>
      </header>

      <ReelActions video={video} onLike={onLike} onSave={onSave} />

      <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-8 pr-24 text-white sm:px-10 sm:pb-12">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-white/65">{video.name}</p>
        <p className="mt-2 max-w-lg text-sm leading-6 text-white/85">{video.description || "Fresh from the kitchen."}</p>
        <Link to={`/food-partner/${video.foodpartner}`} className="mt-3 inline-flex min-h-10 items-center rounded-full bg-white px-4 text-xs font-black text-[#211914] transition hover:bg-[#f6ad3d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
          Visit store
        </Link>
      </div>
    </article>
  );
}

export default function Reels() {
  const [videos, setVideos] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const feedRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/food`, { withCredentials: true })
      .then((response) => setVideos(response.data.foodItems ?? []))
      .catch((error) => {
        if (error.response?.status === 401) navigate("/user/login", { replace: true });
        else console.error("Failed to fetch reels:", error);
      });
  }, [navigate]);

  useEffect(() => {
    const feed = feedRef.current;
    if (!feed) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];
        if (visible) setActiveIndex(Number(visible.target.dataset.reelIndex));
      },
      { root: feed, threshold: [0.65, 0.9] },
    );

    feed.querySelectorAll("[data-reel-index]").forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [videos.length]);

  const updateVideo = (videoId, changes) => {
    setVideos((current) => current.map((video) => (video._id === videoId ? { ...video, ...changes } : video)));
  };

  const handleLike = async (videoId) => {
    const video = videos.find((item) => item._id === videoId);
    if (!video || video.likePending) return;
    const liked = !video.liked;
    const likes = Math.max(0, (video.likes ?? video.likeCount ?? 0) + (liked ? 1 : -1));
    updateVideo(videoId, { liked, likes, likeCount: likes, likePending: true });
    try {
      await axios.post(`${API_URL}/food/like`, { foodId: videoId }, { withCredentials: true });
      updateVideo(videoId, { likePending: false });
    } catch (error) {
      updateVideo(videoId, { liked: !liked, likes: Math.max(0, likes - (liked ? 1 : -1)), likePending: false });
      console.error("Failed to update like:", error);
    }
  };

  const handleSave = async (videoId) => {
    const video = videos.find((item) => item._id === videoId);
    if (!video || video.savePending) return;
    const saved = !video.saved;
    const saves = Math.max(0, (video.saves ?? video.saveCount ?? 0) + (saved ? 1 : -1));
    updateVideo(videoId, { saved, saves, saveCount: saves, savePending: true });
    try {
      await axios.post(`${API_URL}/food/save`, { foodId: videoId }, { withCredentials: true });
      updateVideo(videoId, { savePending: false });
    } catch (error) {
      updateVideo(videoId, { saved: !saved, saves: Math.max(0, saves - (saved ? 1 : -1)), savePending: false });
      console.error("Failed to update save:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get(`${API_URL}/auth/user/logout`, { withCredentials: true });
    } finally {
      navigate("/user/login", { replace: true });
    }
  };

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-[#f5f1eb] lg:pl-[250px]">
      <Navbar onLogout={handleLogout} />
      <main ref={feedRef} className="reels-page-feed h-[100dvh] w-full overflow-y-auto snap-y snap-mandatory scroll-smooth bg-[#1b1714] lg:my-4 lg:h-[calc(100dvh-32px)] lg:max-h-[844px] lg:w-[min(390px,calc(100vw-282px))] lg:rounded-[24px] lg:shadow-[0_24px_70px_rgba(55,31,17,0.24)]">
        {videos.map((video, index) => (
          <div key={video._id} data-reel-index={index} className="h-full snap-always">
            <ReelCard
              video={video}
              active={index === activeIndex}
              shouldRenderVideo={Math.abs(index - activeIndex) <= 1}
              onLike={() => handleLike(video._id)}
              onSave={() => handleSave(video._id)}
            />
          </div>
        ))}
      </main>
    </div>
  );
}
