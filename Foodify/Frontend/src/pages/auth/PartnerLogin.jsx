import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const initialLoginState = {
  email: "",
  password: "",
};

export default function PartnerLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialLoginState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

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

      setError(
        err.response?.data?.message ||
          "Unable to sign in. Please check your partner credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen overflow-auto bg-[#171717] p-3 md:p-5">
      <div className="relative flex min-h-[calc(100vh-24px)] overflow-hidden rounded-[30px] border border-white/10 bg-[#f4f0e8] shadow-[0_30px_90px_rgba(0,0,0,0.35)] md:min-h-[calc(100vh-40px)]">

        {/* ================= LEFT PANEL ================= */}
        <section className="relative hidden w-[44%] overflow-hidden bg-[#191919] text-white lg:block">

          {/* Brand */}
          <div className="absolute left-8 top-8 z-20">
            <Link
              to="/"
              className="text-3xl font-black tracking-[-0.06em] transition-opacity hover:opacity-70"
            >
              CRAVE<span className="text-orange-500">.</span>
            </Link>

            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">
              For Food Partners
            </p>
          </div>

          {/* Food image */}
          <div className="group absolute left-8 right-8 top-[17%] bottom-[23%] overflow-hidden rounded-[28px] border border-white/10 bg-[#242424] shadow-2xl">
            <img
              src="/Images/hotel.jpg"
              alt="CRAVE food partner"
              className="absolute inset-0 h-full w-full object-cover opacity-80 grayscale-[15%] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-orange-500" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                  Merchant Network
                </span>
              </div>

              <h2 className="max-w-sm text-3xl font-black leading-[0.95] tracking-tight">
                YOUR KITCHEN.
                <br />
                YOUR CRAFT.
              </h2>

              <p className="mt-3 max-w-sm text-xs leading-5 text-white/50">
                Manage your menu, orders and kitchen operations from one
                dedicated partner desk.
              </p>
            </div>
          </div>

          {/* Bottom status */}
          <div className="absolute bottom-7 left-8 right-8 flex items-center justify-between">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/30">
              CRAVE Partner Portal
            </span>

            <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-white/40">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              Secure Access
            </span>
          </div>
        </section>

        {/* ================= RIGHT PANEL ================= */}
        <section className="flex flex-1 items-center justify-center bg-[#f4f0e8] px-6 py-10 md:px-12 lg:px-16">
          <div className="w-full max-w-md">

            {/* Mobile brand */}
            <Link
              to="/"
              className="mb-10 block text-2xl font-black tracking-[-0.06em] text-black lg:hidden"
            >
              CRAVE<span className="text-orange-500">.</span>
            </Link>

            {/* Header */}
            <div className="mb-8">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.035] px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />

                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-black/50">
                  Merchant Desk
                </span>
              </div>

              <h1 className="text-4xl font-black tracking-[-0.04em] text-black md:text-5xl">
                Welcome back.
              </h1>

              <p className="mt-3 max-w-sm text-sm leading-6 text-black/50">
                Access your kitchen dashboard and manage your CRAVE operations.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-xs font-semibold leading-5 text-red-700">
                  {error}
                </p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-[10px] font-black uppercase tracking-[0.15em] text-black/50"
                >
                  Work Email
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@restaurant.com"
                  autoComplete="email"
                  required
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-3.5 text-sm font-medium text-black outline-none placeholder:text-black/25 transition focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                />
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-[10px] font-black uppercase tracking-[0.15em] text-black/50"
                  >
                    Password
                  </label>

                  <a
                    href="#reset-password"
                    className="text-xs font-medium text-black/40 underline-offset-4 transition hover:text-black hover:underline"
                  >
                    Reset password?
                  </a>
                </div>

                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-3.5 text-sm font-medium text-black outline-none placeholder:text-black/25 transition focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                />
              </div>

              {/* Security notice */}
              <div className="flex gap-3 rounded-xl border border-black/10 bg-black/[0.035] px-4 py-3">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black text-[10px] font-black text-white">
                  ✓
                </div>

                <div>
                  <p className="text-xs font-black text-black">
                    Partner access
                  </p>

                  <p className="mt-0.5 text-[10px] leading-4 text-black/45">
                    This portal is reserved for verified CRAVE food partners.
                  </p>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-black px-5 py-4 text-sm font-black uppercase tracking-[0.08em] text-white transition-all duration-300 hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-500/20 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Signing In...
                  </>
                ) : (
                  <>
                    Access Kitchen Dashboard
                    <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </>
                )}
              </button>
            </form>

            {/* Register */}
            <div className="mt-8 border-t border-black/10 pt-6 text-center">
              <p className="text-xs text-black/45">
                Want to list your restaurant or bakery?{" "}
                <Link
                  to="/food-partner/register"
                  className="font-black text-black underline underline-offset-4 transition hover:text-orange-600"
                >
                  Apply as food partner
                </Link>
              </p>
            </div>

            {/* Footer */}
            <p className="mt-8 text-center text-[10px] font-medium uppercase tracking-[0.15em] text-black/25">
              CRAVE. Partner Network
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}