import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import ReelActions from "./ReelActions";

const API_URL = "http://localhost:3000/api";

function VideoCard({ video, isActive, videoRef, onLike, onSave }) {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const element = videoRef.current;

    if (!element || status === "error") {
      return;
    }

    if (isActive) {
      element.play().catch(() => undefined);
    } else {
      element.pause();
    }
  }, [isActive, status, videoRef]);

  return (
    <article
      className="relative h-full w-full snap-start snap-always overflow-hidden bg-[var(--bg-canvas)]"
    >
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          status === "loaded" ? "opacity-100" : "opacity-0"
        }`}
        src={video.video}
        muted
        loop
        playsInline
        preload={isActive ? "auto" : "metadata"}
        onLoadedData={() => setStatus("loaded")}
        onError={() => setStatus("error")}
        aria-label={`${video.name} food video`}
      />

      {status === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center text-[var(--text-muted)]">
          <span className="rounded-full border border-white/30 bg-black/25 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
            Loading story
          </span>
        </div>
      )}

      {status === "error" && (
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <div className="max-w-xs rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/90 px-6 py-5 shadow-xl backdrop-blur-md">
            <p className="font-serif text-xl text-[var(--text-main)]">
              This story is resting.
            </p>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              Please try this kitchen again shortly.
            </p>
          </div>
        </div>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
      <ReelActions
        video={video}
        onLike={() => onLike(video._id)}
        onSave={() => onSave(video._id)}
      />
      <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:px-8 sm:pb-10 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <p className="mb-1 text-xs font-medium uppercase tracking-[0.18em] text-white/70">
            {video.name}
          </p>
          <p className="line-clamp-2 max-w-xl text-sm leading-6 text-white sm:text-base">
            {video.description}
          </p>
          <Link
            to={`/food-partner/${video.foodpartner}`}
            className="pointer-events-auto mt-4 inline-flex min-h-11 items-center justify-center rounded-lg border border-white/35 bg-white/90 px-6 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--primary)] shadow-lg backdrop-blur-md transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Visit Store
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const feedRef = useRef(null);
  const videoRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/food`, { withCredentials: true })
      .then((response) => {
        setVideos(response.data.foodItems ?? []);
        setIsAuthenticated(true);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          navigate("/user/login", { replace: true });
          return;
        }

        console.error("Failed to fetch food items:", error);
      });
  }, [navigate]);

  useEffect(() => {
    if (!isAuthenticated) {
      return undefined;
    }

    const fadeTimer = window.setTimeout(() => setShowNavbar(false), 1800);
    return () => window.clearTimeout(fadeTimer);
  }, [isAuthenticated]);

  const handleLogout = async () => {
    try {
      await axios.get(`${API_URL}/auth/user/logout`, {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Failed to log out:", error);
    } finally {
      setIsAuthenticated(false);
      navigate("/user/login", { replace: true });
    }
  };

  useEffect(() => {
    const feed = feedRef.current;

    if (!feed) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (!visibleEntry) {
          return;
        }

        const nextIndex = Number(visibleEntry.target.dataset.index);
        setActiveVideo(nextIndex);
      },
      { root: feed, threshold: [0.6, 0.8, 1] },
    );

    const cards = feed.querySelectorAll("[data-video-card]");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [videos.length]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) {
        return;
      }

      if (index === activeVideo) {
        video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    });
  }, [activeVideo]);

  const updateVideo = (videoId, changes) => {
    setVideos((currentVideos) =>
      currentVideos.map((video) =>
        video._id === videoId ? { ...video, ...changes } : video,
      ),
    );
  };

  const handleLike = async (videoId) => {
    const video = videos.find((item) => item._id === videoId);
    if (!video || video.likePending) {
      return;
    }

    const liked = !video.liked;
    const likeCount = Math.max(0, (video.likes ?? video.likeCount ?? 0) + (liked ? 1 : -1));
    updateVideo(videoId, { liked, likes: likeCount, likeCount, likePending: true });

    try {
      await axios.post(`${API_URL}/like`, { foodId: videoId }, { withCredentials: true });
      updateVideo(videoId, { likePending: false });
    } catch (error) {
      updateVideo(videoId, { liked: !liked, likes: likeCount - (liked ? 1 : -1), likeCount: likeCount - (liked ? 1 : -1), likePending: false });
      console.error("Failed to update like:", error);
    }
  };

  const handleSave = async (videoId) => {
    const video = videos.find((item) => item._id === videoId);
    if (!video || video.savePending) {
      return;
    }

    const saved = !video.saved;
    updateVideo(videoId, { saved, savePending: true });

    try {
      await axios.post(`${API_URL}/save`, { foodId: videoId }, { withCredentials: true });
      updateVideo(videoId, { savePending: false });
    } catch (error) {
      updateVideo(videoId, { saved: !saved, savePending: false });
      console.error("Failed to update saved item:", error);
    }
  };

  return (
    <div className="relative h-[100dvh] overflow-hidden bg-[var(--bg-canvas)] p-2 font-sans selection:bg-white selection:text-[var(--primary)] sm:p-4">
      <div className="relative h-full overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-black shadow-[var(--shadow-subtle)]">
        {isAuthenticated && (
          <Navbar showNavbar={showNavbar} onLogout={handleLogout} />
        )}

        <main
          ref={feedRef}
          className="reels-feed reels-feed--mobile relative overflow-y-auto overscroll-y-contain"
        >
          {videos.map((video, index) => (
            <div key={video._id} className="h-full" data-index={index} data-video-card>
              <VideoCard
                video={video}
                isActive={activeVideo === index}
                onLike={handleLike}
                onSave={handleSave}
                videoRef={(element) => {
                  videoRefs.current[index] = element;
                }}
              />
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}