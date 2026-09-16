import { Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";
export default function PartnerRegister() {
  return (
    <AuthLayout
      partnerMode={true}
      badgeText="Partner Onboarding"
      headline="A fairer relationship with independent kitchens."
      description="Direct customer payouts, zero algorithmic lockouts, and tools built for cooks, not ad agencies."
      quoteAuthor="Culinary Guild Standards"
    >
      <div className="w-full max-w-md mx-auto animate-fade-up">
        <div className="mb-6">
          <div className="inline-block px-2 py-0.5 mb-2 text-[11px] font-mono tracking-wide rounded bg-[var(--bg-muted)] text-[var(--partner-primary)] border border-[var(--border-subtle)]">
            NEW APPLICANT
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-main)]">
            Register Food Outlet
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            Tell us about your culinary space.
          </p>
        </div>

        <form className="space-y-3.5" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold tracking-wide uppercase text-[var(--text-muted)]">
              Kitchen / Business Name
            </label>
            <input
              type="text"
              placeholder="e.g. Sourdough Workshop & Deli"
              className="auth-input partner-input w-full px-3.5 py-2.5 rounded-lg text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold tracking-wide uppercase text-[var(--text-muted)]">
                Establishment Type
              </label>
              <select className="auth-input partner-input w-full px-3 py-2.5 rounded-lg text-sm appearance-none bg-transparent">
                <option value="bakery">Bakery / Patisserie</option>
                <option value="cloud_kitchen">Cloud Kitchen</option>
                <option value="diner">Bistro / Diner</option>
                <option value="artisan">Artisan Producer</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold tracking-wide uppercase text-[var(--text-muted)]">
                City / Borough
              </label>
              <input
                type="text"
                placeholder="District 4"
                className="auth-input partner-input w-full px-3.5 py-2.5 rounded-lg text-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold tracking-wide uppercase text-[var(--text-muted)]">
              Primary Business Email
            </label>
            <input
              type="email"
              placeholder="owner@sourdoughworkshop.com"
              className="auth-input partner-input w-full px-3.5 py-2.5 rounded-lg text-sm font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold tracking-wide uppercase text-[var(--text-muted)]">
              Create Password
            </label>
            <input
              type="password"
              placeholder="••••••••••••"
              className="auth-input partner-input w-full px-3.5 py-2.5 rounded-lg text-sm"
            />
          </div>

          <div className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-[11px] text-[var(--text-muted)]">
            ✓ We verify health permits, food licenses, and inspect quality before publishing your menu.
          </div>

          <button
            type="submit"
            className="btn-partner w-full py-2.5 px-4 rounded-lg font-medium text-sm mt-2"
          >
            Submit Application
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-[var(--border-subtle)] text-center">
          <p className="text-xs text-[var(--text-muted)]">
            Already verified?{" "}
            <Link
              to="/food-partner/login"
              className="font-medium text-[var(--text-main)] underline underline-offset-4 hover:opacity-80"
            >
              Sign into merchant desk
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}