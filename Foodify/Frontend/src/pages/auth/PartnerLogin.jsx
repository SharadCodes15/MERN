import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import axios from "axios";

const initialLoginState = {
  email: "",
  password: "",
};

export default function PartnerLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialLoginState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email: formData.email.trim(),
      password: formData.password,
    };

    try {
      await axios.post(
        "http://localhost:3000/api/auth/foodpartner/login",
        payload,
        { withCredentials: true }
      );
      navigate("/create-food");
    } catch (err) {
      console.error(err);
    } finally {
      setFormData(initialLoginState);
    }
  };

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

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold tracking-wide uppercase text-[var(--text-muted)]">
              Work Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ops@bakeryatelier.com"
              className="auth-input partner-input w-full px-3.5 py-2.5 rounded-lg text-sm font-mono"
              autoComplete="email"
              required
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold tracking-wide uppercase text-[var(--text-muted)]">
                Password
              </label>
              <a
                href="#reset-key"
                className="text-xs text-[var(--text-subtle)] hover:text-[var(--text-main)] transition-colors underline-offset-4 hover:underline"
              >
                Reset password?
              </a>
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••••••"
              className="auth-input partner-input w-full px-3.5 py-2.5 rounded-lg text-sm"
              autoComplete="current-password"
              required
            />
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