import { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  // Toggle between "user" and "partner" view
  const [role, setRole] = useState("user");

  const isPartner = role === "partner";

  return (
    <div className="relative min-h-screen flex flex-col font-sans selection:bg-neutral-900 selection:text-white dark:selection:bg-neutral-100 dark:selection:text-black">
      {/* Background Architectural Grid */}
      <div className="architectural-pattern absolute inset-0 pointer-events-none" />

      {/* Navigation Bar */}
      <header className="relative z-10 w-full border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]/85 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          
          {/* Brand Identity */}
          <Link to="/" className="flex items-center gap-2.5">
            <span
              className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                isPartner ? "bg-[var(--partner-primary)]" : "bg-[var(--primary)]"
              }`}
            />
            <span className="font-serif text-lg font-medium tracking-tight text-[var(--text-main)]">
              Kitchen Atelier
            </span>
          </Link>

          {/* Center Role Switcher (Tactile Segmented Control) */}
          <div className="flex items-center p-0.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-xs">
            <button
              type="button"
              onClick={() => setRole("user")}
              className={`px-3 py-1 rounded-md transition-all duration-200 font-medium ${
                !isPartner
                  ? "bg-[var(--bg-surface)] text-[var(--text-main)] shadow-sm"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
              }`}
            >
              Customer
            </button>
            <button
              type="button"
              onClick={() => setRole("partner")}
              className={`px-3 py-1 rounded-md transition-all duration-200 font-medium ${
                isPartner
                  ? "bg-[var(--bg-surface)] text-[var(--text-main)] shadow-sm"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
              }`}
            >
              Food Partner
            </button>
          </div>

          {/* Action Links: Dynamic Based on Role */}
          <div className="flex items-center gap-2 sm:gap-3">
            {!isPartner ? (
              <>
                <Link
                  to="/user/login"
                  className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--text-main)] px-3 py-2 rounded-lg transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/user/register"
                  className="btn-user text-xs font-medium uppercase tracking-wider px-3.5 py-2 rounded-lg"
                >
                  Join Us
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/food-partner/login"
                  className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--text-main)] px-3 py-2 rounded-lg transition-colors"
                >
                  Merchant Desk
                </Link>
                <Link
                  to="/food-partner/register"
                  className="btn-partner text-xs font-medium uppercase tracking-wider px-3.5 py-2 rounded-lg"
                >
                  Apply Kitchen
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-6 text-center">
        <div className="animate-fade-up max-w-3xl mx-auto space-y-4">
          <div className="inline-block px-2.5 py-1 text-[11px] font-mono tracking-wider uppercase rounded border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-muted)]">
            {isPartner ? "Culinary Operations" : "Seasonal & Local"}
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif tracking-tight text-[var(--text-main)] leading-tight">
            {isPartner
              ? "Tools built for real kitchens, not algorithms."
              : "Food from kitchens with stories to tell."}
          </h1>

          <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-lg mx-auto">
            {isPartner
              ? "Join independent dining rooms, artisanal bakeries, and popup makers managing their tables and direct pickup menus."
              : "Connect with neighborhood cooks, artisan sourdough bakers, and seasonal farm tables."}
          </p>
        </div>
      </main>
    </div>
  );
}