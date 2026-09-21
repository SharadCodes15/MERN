import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const videos = [
  {
    id: 1,
    videoUrl:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    description:
      "Fresh handmade sourdough baked this morning with locally sourced ingredients.",
    storeName: "Atelier Bakery",
    storeId: "123",
  },
  {
    id: 2,
    videoUrl: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
    description:
      "Authentic Maharashtrian thali prepared fresh today in our neighborhood kitchen.",
    storeName: "Aai's Kitchen",
    storeId: "456",
  },
];

function VideoCard({ video, isActive, videoRef }) {
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
        src={video.videoUrl}
        muted
        loop
        playsInline
        autoPlay={isActive}
        preload={isActive ? "auto" : "metadata"}
        onLoadedData={() => setStatus("loaded")}
        onError={() => setStatus("error")}
        aria-label={`${video.storeName} food video`}
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
      <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:px-8 sm:pb-10 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <p className="mb-1 text-xs font-medium uppercase tracking-[0.18em] text-white/70">
            {video.storeName}
          </p>
          <p className="line-clamp-2 max-w-xl text-sm leading-6 text-white sm:text-base">
            {video.description}
          </p>
          <Link
            to={`/store/${video.storeId}`}
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
  const [activeVideo, setActiveVideo] = useState(0);
  const [viewMode, setViewMode] = useState("full");
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const feedRef = useRef(null);
  const videoRefs = useRef([]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const updateDeviceMode = () => setIsMobileDevice(mediaQuery.matches);

    updateDeviceMode();
    mediaQuery.addEventListener("change", updateDeviceMode);

    return () => mediaQuery.removeEventListener("change", updateDeviceMode);
  }, []);

  const isMobileView = isMobileDevice || viewMode === "mobile";

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
  }, []);

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

  return (
    <div className="relative h-[100dvh] overflow-hidden bg-[var(--bg-canvas)] p-2 font-sans selection:bg-white selection:text-[var(--primary)] sm:p-4">
      <div className="relative h-full overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-black shadow-[var(--shadow-subtle)]">
        <header className="pointer-events-none absolute inset-x-0 top-0 z-20 border-b border-white/15 bg-black/20 text-white backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <Link to="/" className="pointer-events-auto flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--primary)] ring-2 ring-white/50" />
            <span className="font-serif text-base font-medium tracking-tight sm:text-lg">
              Kitchen Atelier
            </span>
          </Link>

          <div className="pointer-events-auto flex items-center gap-1 sm:gap-3">
            <Link
              to="/user/login"
              className="rounded-lg px-2.5 py-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white/75 transition-colors hover:text-white sm:px-3 sm:text-xs"
            >
              Sign In
            </Link>
            <Link
              to="/user/register"
              className="rounded-lg border border-white/30 bg-white/90 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--primary)] shadow-sm transition-colors hover:bg-white sm:px-3.5 sm:text-xs"
            >
              Join Us
            </Link>
          </div>
        </div>
        </header>

        <main
          ref={feedRef}
          className={`reels-feed relative overflow-y-auto overscroll-y-contain ${
            isMobileView
              ? isMobileDevice
                ? "reels-feed--full"
                : "reels-feed--mobile"
              : "reels-feed--full"
          }`}
        >
          <div className="absolute right-4 top-20 z-20 hidden items-center rounded-lg border border-white/20 bg-black/25 p-0.5 text-[10px] backdrop-blur-md sm:flex">
            <button
              type="button"
              aria-pressed={viewMode === "full"}
              onClick={() => setViewMode("full")}
              className={`rounded-md px-2.5 py-1.5 font-medium uppercase tracking-[0.12em] transition-colors ${
                viewMode === "full"
                  ? "bg-white/90 text-[var(--primary)]"
                  : "text-white/65 hover:text-white"
              }`}
            >
              Full Screen
            </button>
            <button
              type="button"
              aria-pressed={viewMode === "mobile"}
              onClick={() => setViewMode("mobile")}
              className={`rounded-md px-2.5 py-1.5 font-medium uppercase tracking-[0.12em] transition-colors ${
                viewMode === "mobile"
                  ? "bg-white/90 text-[var(--primary)]"
                  : "text-white/65 hover:text-white"
              }`}
            >
              Mobile View
            </button>
          </div>

          {videos.map((video, index) => (
            <div key={video.id} className="h-full" data-index={index} data-video-card>
              <VideoCard
                video={video}
                isActive={activeVideo === index}
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