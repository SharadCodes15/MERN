import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import axios from "axios";

const initialFormState = {
  email: "",
  password: "",
};

export default function UserLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormState);

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
      email: formData.email,
      password: formData.password,
    };

    try {
      await axios.post("http://localhost:3000/api/auth/user/login", payload, {
        withCredentials: true,
      });
      navigate("/");
    } catch (err) {
      console.error(err);
    } finally {
      setFormData(initialFormState);
    }
  };

  return (
    <AuthLayout
      badgeText="Personal Member"
      headline="Welcome back to simple, warm meals."
      description="Access your saved kitchens, recurring orders, and neighborhood pantry."
    >
      <div className="w-full max-w-md mx-auto animate-fade-up">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-main)]">
            Sign In
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            Enter your credentials to access your account.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold tracking-wide uppercase text-[var(--text-muted)]">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="julian@example.com"
              className="auth-input w-full px-3.5 py-2.5 rounded-lg text-sm"
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
                href="#forgot"
                className="text-xs text-[var(--text-subtle)] hover:text-[var(--text-main)] transition-colors underline-offset-4 hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••••••"
              className="auth-input w-full px-3.5 py-2.5 rounded-lg text-sm"
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn-user w-full py-2.5 px-4 rounded-lg font-medium text-sm mt-2"
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