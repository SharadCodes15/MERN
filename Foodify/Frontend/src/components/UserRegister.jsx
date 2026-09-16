import { Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";

export default function UserRegister() {
  return (
    <AuthLayout
      badgeText="Personal Member"
      headline="Eat local. Support the culinary craft."
      description="Create an account to order from independent chefs, home kitchens, and urban farm-to-table popups."
    >
      <div className="w-full max-w-md mx-auto animate-fade-up">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-main)]">
            Create Account
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            Join the neighborhood culinary network.
          </p>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold tracking-wide uppercase text-[var(--text-muted)]">
                First Name
              </label>
              <input
                type="text"
                placeholder="Elena"
                className="auth-input w-full px-3.5 py-2.5 rounded-lg text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold tracking-wide uppercase text-[var(--text-muted)]">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Rostova"
                className="auth-input w-full px-3.5 py-2.5 rounded-lg text-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold tracking-wide uppercase text-[var(--text-muted)]">
              Email Address
            </label>
            <input
              type="email"
              placeholder="elena@rostova.design"
              className="auth-input w-full px-3.5 py-2.5 rounded-lg text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold tracking-wide uppercase text-[var(--text-muted)]">
              Password
            </label>
            <input
              type="password"
              placeholder="At least 8 characters"
              className="auth-input w-full px-3.5 py-2.5 rounded-lg text-sm"
            />
          </div>

          <p className="text-[11px] text-[var(--text-subtle)] leading-relaxed pt-1">
            By signing up, you agree to our Terms of Service & transparent sourcing policy.
          </p>

          <button
            type="submit"
            className="btn-user w-full py-2.5 px-4 rounded-lg font-medium text-sm mt-2"
          >
            Create Member Account
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[var(--border-subtle)] text-center">
          <p className="text-xs text-[var(--text-muted)]">
            Already have an account?{" "}
            <Link
              to="/user/login"
              className="font-medium text-[var(--text-main)] underline underline-offset-4 hover:opacity-80"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}