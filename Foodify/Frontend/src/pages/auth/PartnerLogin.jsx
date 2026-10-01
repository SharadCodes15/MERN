import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthLayout from "./AuthLayout";

const initialFormState = {
  email: "",
  password: "",
};

export default function PartnerLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await axios.post(
        "/api/auth/foodpartner/login",
        {
          email: formData.email.trim(),
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      );

      navigate("/create-food");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to sign in. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Dummy Google login
    console.log("Google partner login clicked");
  };

  return (
    <AuthLayout
      image="/Images/Culinary Chef.jpg"
      imageAlt="Chef preparing a dish in a restaurant kitchen"
      imageLabel="Made with passion"
      heroTitle="Your kitchen."
      heroAccent="Great creations."
      audienceLabel="For food partners"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-black text-black md:text-5xl">
          Welcome back.
        </h1>

        <p className="mt-3 text-sm font-medium leading-6 text-black/55">
          Sign in and get back to creating food people crave.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div
          role="alert"
          className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
        >
          {error}
        </div>
      )}

      {/* Google Login */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="flex w-full items-center justify-center gap-3 rounded-2xl border border-black/10 bg-white px-5 py-4 text-sm font-black text-black shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-black/20 hover:shadow-md active:translate-y-0"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fill="#4285F4"
            d="M21.35 12.23c0-.78-.07-1.54-.22-2.27H12v4.3h5.23a4.47 4.47 0 0 1-1.94 2.93v2.43h3.14c1.84-1.7 2.92-4.2 2.92-7.39Z"
          />
          <path
            fill="#34A853"
            d="M12 21.75c2.63 0 4.84-.87 6.45-2.36l-3.14-2.43c-.87.58-1.98.93-3.31.93-2.54 0-4.69-1.72-5.46-4.03H3.3v2.51A9.74 9.74 0 0 0 12 21.75Z"
          />
          <path
            fill="#FBBC05"
            d="M6.54 13.86A5.85 5.85 0 0 1 6.23 12c0-.65.11-1.28.31-1.86V7.63H3.3A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.05 4.37l3.24-2.51Z"
          />
          <path
            fill="#EA4335"
            d="M12 6.11c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 3.17 14.63 2.25 12 2.25a9.74 9.74 0 0 0-8.7 5.38l3.24 2.51C7.31 7.83 9.46 6.11 12 6.11Z"
          />
        </svg>

        Continue with Google
      </button>

      {/* Divider */}
      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-black/10" />
        <span className="text-[10px] font-black uppercase tracking-[0.18em] text-black/35">
          Or
        </span>
        <div className="h-px flex-1 bg-black/10" />
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-bold text-black"
          >
            Email address
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
            className="w-full rounded-2xl border border-black/10 bg-[#f1ece5] px-5 py-4 text-sm font-semibold text-black outline-none placeholder:text-black/35 transition-all duration-300 hover:border-black/20 focus:border-black focus:bg-white focus:shadow-[0_0_0_4px_rgba(0,0,0,0.05)]"
          />
        </div>

        {/* Password */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-bold text-black"
            >
              Password
            </label>

            <button
              type="button"
              onClick={() => console.log("Forgot password clicked")}
              className="text-xs font-bold text-black/50 transition hover:text-orange-600"
            >
              Forgot password?
            </button>
          </div>

          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Your password"
            autoComplete="current-password"
            required
            className="w-full rounded-2xl border border-black/10 bg-[#f1ece5] px-5 py-4 text-sm font-semibold text-black outline-none placeholder:text-black/35 transition-all duration-300 hover:border-black/20 focus:border-black focus:bg-white focus:shadow-[0_0_0_4px_rgba(0,0,0,0.05)]"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="mt-2 flex w-full items-center justify-center rounded-2xl bg-black px-5 py-4 text-sm font-black tracking-wide text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-xl active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "SIGNING IN..." : "SIGN IN →"}
        </button>
      </form>

      {/* Register */}
      <p className="mt-7 text-center text-sm font-medium text-black/55">
        Don&apos;t have a partner account?{" "}
        <Link
          to="/food-partner/register"
          className="font-black text-black underline underline-offset-4 transition hover:text-orange-600"
        >
          Create one
        </Link>
      </p>
    </AuthLayout>
  );
}