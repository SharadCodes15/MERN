import { Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";

export default function UserLogin() {
  return (
    <AuthLayout
      badgeText="Personal Member"
      headline="Welcome back to simple, warm meals."
      description="Access your saved kitchens, recurring orders, and neighborhood pantry."
    >
      <div className="w-full max-w-md mx-auto animate-fade-up">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-main)]">
            Sign In
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1.5">
            Enter your credentials to manage orders & table bookings.
          </p>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold tracking-wide uppercase text-[var(--text-muted)]">
              Email Address
            </label>
            <input
              type="email"
              placeholder="julian@example.com"
              className="auth-input w-full px-3.5 py-2.5 rounded-lg text-sm"
              autoComplete="email"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold tracking-wide uppercase text-[var(--text-muted)]">
                Password
              </label>
              <a
                href="#forgot"
                className="text-xs text-[var(--text-subtle)] hover:text-[var(--text-main)] transition-colors underline-offset-4 hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              placeholder="••••••••••••"
              className="auth-input w-full px-3.5 py-2.5 rounded-lg text-sm"
              autoComplete="current-password"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              id="remember"
              type="checkbox"
              className="w-4 h-4 rounded border-[var(--border-subtle)] text-[var(--primary)] focus:ring-[var(--ring-focus)] accent-[var(--primary)]"
            />
            <label htmlFor="remember" className="text-xs text-[var(--text-muted)] select-none">
              Keep me signed in on this device
            </label>
          </div>

          <button
            type="submit"
            className="btn-user w-full py-2.5 px-4 rounded-lg font-medium text-sm mt-3"
          >
            Continue
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[var(--border-subtle)] text-center">
          <p className="text-xs text-[var(--text-muted)]">
            First time exploring?{" "}
            <Link
              to="/user/register"
              className="font-medium text-[var(--text-main)] underline underline-offset-4 hover:opacity-80"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}