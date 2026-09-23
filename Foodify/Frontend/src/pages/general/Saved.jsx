import axios from "axios";
import { useEffect, useState } from "react";
import { RiArrowLeftLine, RiBookmarkFill, RiPlayCircleLine } from "@remixicon/react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000/api";

export default function Saved() {
  const [savedItems, setSavedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/food/save`, { withCredentials: true })
      .then((response) => {
        setSavedItems(response.data.savedItems ?? response.data.foodItems ?? response.data.saved ?? []);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          navigate("/user/login", { replace: true });
          return;
        }
        console.error("Failed to fetch saved reels:", error);
      })
      .finally(() => setIsLoading(false));
  }, [navigate]);

  return (
    <div className="min-h-[100dvh] bg-[var(--bg-canvas)] px-4 py-5 text-[var(--text-main)] sm:px-8">
      <main className="mx-auto max-w-5xl">
        <header className="mb-8 flex items-center justify-between gap-4">
          <div>
            <Link to="/home" className="mb-4 inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--primary)]">
              <RiArrowLeftLine aria-hidden="true" /> Back to reels
            </Link>
            <h1 className="text-3xl font-semibold tracking-tight">Saved reels</h1>
            <p className="mt-1 text-sm text-[var(--text-muted)]">Your next meal, kept close.</p>
          </div>
          <RiBookmarkFill className="h-7 w-7 text-[var(--partner-primary)]" aria-hidden="true" />
        </header>

        {isLoading ? (
          <p className="py-16 text-center text-sm text-[var(--text-muted)]">Loading saved reels...</p>
        ) : savedItems.length === 0 ? (
          <section className="border border-dashed border-[var(--border-subtle)] px-6 py-20 text-center">
            <RiPlayCircleLine className="mx-auto h-10 w-10 text-[var(--text-subtle)]" aria-hidden="true" />
            <h2 className="mt-4 text-lg font-medium">Nothing saved yet</h2>
            <p className="mt-1 text-sm text-[var(--text-muted)]">Tap the bookmark on a reel to keep it here.</p>
          </section>
        ) : (
          <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {savedItems.map((item) => (
              <Link key={item._id} to={`/food-partner/${item.foodpartner}`} className="group relative aspect-[3/4] overflow-hidden bg-black">
                <video src={item.video} muted loop playsInline preload="metadata" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 pb-3 pt-12 text-white">
                  <p className="truncate text-sm font-medium">{item.name}</p>
                  <p className="mt-1 line-clamp-1 text-xs text-white/70">{item.description}</p>
                </div>
              </Link>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}