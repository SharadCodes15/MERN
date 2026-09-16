import { Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";

export default function PartnerLogin() {
  return (
    <AuthLayout
      partnerMode={true}
      badgeText="Partner Portal"
      headline="Run your kitchen with clarity."
      description="Live order tickets, menu batch management, and pickup scheduling without the marketplace friction."
      quoteAuthor="Merchant Operations"
    >
      <div className="w-full max-w-md mx-auto animate-fade-up">
        <div className="mb-8">
          <div className="inline-block px-2 py-0.5 mb-2.5 text-[11px] font-mono tracking-wide rounded bg-[var(--bg-muted)] text-[var(--partner-primary)] border border-[var(--border-subtle)]">
            MERCHANT DESK
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-main)]">
            Partner Sign In
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1.5">
            Access your kitchen dashboard and real-time orders.
          </p>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold tracking-wide uppercase text-[var(--text-muted)]">
              Work Email or Kitchen ID
            </label>
            <input
              type="text"
              placeholder="ops@bakeryatelier.com"
              className="auth-input partner-input w-full px-3.5 py-2.5 rounded-lg text-sm font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold tracking-wide uppercase text-[var(--text-muted)]">
                Security Key
              </label>
              <a
                href="#reset-key"
                className="text-xs text-[var(--text-subtle)] hover:text-[var(--text-main)] transition-colors underline-offset-4 hover:underline"
              >
                Reset key?
              </a>
            </div>
            <input
              type="password"
              placeholder="••••••••••••"
              className="auth-input partner-input w-full px-3.5 py-2.5 rounded-lg text-sm"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              id="partner-remember"
              type="checkbox"
              className="w-4 h-4 rounded border-[var(--border-subtle)] text-[var(--partner-primary)] focus:ring-[var(--ring-partner-focus)] accent-[var(--partner-primary)]"
            />
            <label htmlFor="partner-remember" className="text-xs text-[var(--text-muted)] select-none">
              Stay active on kitchen terminal
            </label>
          </div>

          <button
            type="submit"
            className="btn-partner w-full py-2.5 px-4 rounded-lg font-medium text-sm mt-3"
          >
            Access Kitchen Dashboard
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[var(--border-subtle)] text-center">
          <p className="text-xs text-[var(--text-muted)]">
            Want to list your restaurant or bakery?{" "}
            <Link
              to="/food-partner/register"
              className="font-medium text-[var(--text-main)] underline underline-offset-4 hover:opacity-80"
            >
              Apply as food partner
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}