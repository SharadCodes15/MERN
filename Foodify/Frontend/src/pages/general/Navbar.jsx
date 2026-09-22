import { RiBookmarkLine, RiLogoutBoxLine } from "@remixicon/react";
import { Link } from "react-router-dom";

export default function Navbar({ showNavbar, onLogout }) {
  if (showNavbar) {
    return (
      <header className="navbar-fade-away pointer-events-none absolute inset-x-0 top-0 z-20 border-b border-white/15 bg-black/20 text-white backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <Link to="/home" className="pointer-events-auto flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--primary)] ring-2 ring-white/50" />
            <span className="font-serif text-base font-medium tracking-tight sm:text-lg">
              Kitchen Atelier
            </span>
          </Link>
          <button
            type="button"
            onClick={onLogout}
            className="pointer-events-auto rounded-lg border border-white/30 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white/80 transition-colors hover:bg-white/15 hover:text-white sm:text-xs"
          >
            <RiLogoutBoxLine aria-hidden="true" />
            <span>Logout</span>
          </button>
        </div>
      </header>
    );
  }

  return (
    <nav
      aria-label="Primary navigation"
      className="dynamic-island pointer-events-auto absolute left-1/2 top-4 z-20 flex h-10 -translate-x-1/2 items-center gap-3 rounded-full border border-white/25 bg-black/45 px-4 text-white shadow-lg backdrop-blur-xl"
    >
      <Link to="/home" aria-label="Go to home" className="text-xs font-medium tracking-[0.12em]">
        Home
      </Link>
      <Link to="/saved" aria-label="Open saved reels" className="border-l border-white/25 pl-3">
        <RiBookmarkLine aria-hidden="true" />
      </Link>
    </nav>
  );
}
