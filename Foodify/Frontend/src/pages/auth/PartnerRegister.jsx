import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthLayout from "./AuthLayout";

const initialFormState = {
  name: "",
  contactName: "",
  phone: "",
  address: "",
  email: "",
  password: "",
};

export default function PartnerRegister() {
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

    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const payload = {
      name: formData.name.trim(),
      contactName: formData.contactName.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      email: formData.email.trim(),
      password: formData.password,
    };

    try {
      await axios.post(
        "/api/auth/foodpartner/register",
        payload,
        { withCredentials: true }
      );

      navigate("/create-food");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to create your partner account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    console.log("Google partner signup clicked");
  };

  const handleWheel = (e) => {
    if (e.deltaY !== 0) {
      window.scrollBy(0, e.deltaY);
    }

    if (e.deltaX !== 0) {
      window.scrollBy(e.deltaX, 0);
    }
  };

  const inputClass =
    "w-full rounded-2xl border border-black/10 bg-[#f1ece5] px-4 py-3.5 text-sm font-semibold text-black outline-none placeholder:text-black/35 transition-all duration-300 hover:border-black/20 focus:border-black focus:bg-white focus:shadow-[0_0_0_4px_rgba(0,0,0,0.05)]";

  const labelClass =
    "mb-2 block text-sm font-bold text-black";

  return (
    <AuthLayout
      image="/Images/foodall.jpg"
      imageAlt="A spread of freshly prepared food"
      imageLabel="Made with passion"
      heroTitle="Bring your"
      heroAccent="kitchen to CRAVE."
      audienceLabel="For food partners"
    >
      {/* Entire card/content area controls PAGE scrolling */}
      <div
        className="w-full"
        onWheel={handleWheel}
      >
        <div className="mb-6">
          <h1 className="text-4xl font-black text-black md:text-[42px]">
            Join CRAVE.
          </h1>

          <p className="mt-2 text-sm font-medium leading-5 text-black/55">
            Create your partner account and start sharing your food with CRAVE.
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-semibold leading-5 text-red-700"
          >
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={handleGoogleSignup}
          className="flex w-full items-center justify-center gap-3 rounded-2xl border border-black/10 bg-white px-5 py-3.5 text-sm font-black text-black shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-black/20 hover:shadow-md active:translate-y-0"
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

        <div className="my-5 flex items-center gap-4">
          <div className="h-px flex-1 bg-black/10" />

          <span className="text-[10px] font-black uppercase tracking-[0.18em] text-black/35">
            Or
          </span>

          <div className="h-px flex-1 bg-black/10" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className={labelClass}>
              Kitchen or business name
            </label>

            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Sourdough Workshop"
              autoComplete="organization"
              required
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="contactName" className={labelClass}>
                Contact person
              </label>

              <input
                id="contactName"
                type="text"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                placeholder="Your name"
                autoComplete="name"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="phone" className={labelClass}>
                Phone
              </label>

              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                autoComplete="tel"
                required
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="address" className={labelClass}>
              Kitchen address
            </label>

            <input
              id="address"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Street, area, city"
              autoComplete="street-address"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              Business email
            </label>

            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="hello@yourkitchen.com"
              autoComplete="email"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="password" className={labelClass}>
              Password
            </label>

            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 8 characters"
              autoComplete="new-password"
              minLength={8}
              required
              className={inputClass}
            />
          </div>

          <p className="pt-0.5 text-[10px] font-medium leading-4 text-black/45">
            By creating an account, you agree to our{" "}
            <span className="font-bold text-black">
              Terms of Service
            </span>{" "}
            and partner policy.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center rounded-2xl bg-black px-5 py-3.5 text-sm font-black tracking-wide text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-xl active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT →"}
          </button>
        </form>

        <p className="mt-5 pb-6 text-center text-sm font-medium text-black/55">
          Already have a partner account?{" "}
          <Link
            to="/food-partner/login"
            className="font-black text-black underline underline-offset-4 transition hover:text-orange-600"
          >
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}