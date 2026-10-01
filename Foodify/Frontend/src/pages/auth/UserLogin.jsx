import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthLayout from "./AuthLayout";

const initialFormState = {
  email: "",
  password: "",
};

export default function UserLogin() {
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await axios.post(
        "http://localhost:3000/api/auth/user/login",
        formData,
        {
          withCredentials: true,
        }
      );

      navigate("/home");
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

  return (
    <AuthLayout
      image="/Images/rollhand.jpg"
      imageAlt="Freshly prepared food served by hand"
      imageLabel="Freshly made"
      heroTitle="Good food."
      heroAccent="Great cravings."
      audienceLabel="For food lovers"
    >
      <div className="mb-8">
        <h1 className="text-4xl font-black text-black md:text-5xl">Welcome back.</h1>
        <p className="mt-3 text-sm font-medium leading-6 text-black/55">Sign in and get back to the food you love.</p>
      </div>

      {error && <div role="alert" className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-bold text-black">Email address</label>
          <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" autoComplete="email" required className="w-full rounded-2xl border border-black/10 bg-[#f1ece5] px-5 py-4 text-sm font-semibold text-black outline-none placeholder:text-black/35 transition-all duration-300 hover:border-black/20 focus:border-black focus:bg-white focus:shadow-[0_0_0_4px_rgba(0,0,0,0.05)]" />
        </div>
        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-bold text-black">Password</label>
          <input id="password" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Your password" autoComplete="current-password" required className="w-full rounded-2xl border border-black/10 bg-[#f1ece5] px-5 py-4 text-sm font-semibold text-black outline-none placeholder:text-black/35 transition-all duration-300 hover:border-black/20 focus:border-black focus:bg-white focus:shadow-[0_0_0_4px_rgba(0,0,0,0.05)]" />
        </div>
        <button type="submit" disabled={loading} className="mt-2 flex w-full items-center justify-center rounded-2xl bg-black px-5 py-4 text-sm font-black tracking-wide text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-xl active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50">
          {loading ? "SIGNING IN..." : "SIGN IN →"}
        </button>
      </form>

      <p className="mt-7 text-center text-sm font-medium text-black/55">
        Don&apos;t have an account?{" "}
        <Link to="/user/register" className="font-black text-black underline underline-offset-4 transition hover:text-orange-600">Create one</Link>
      </p>
    </AuthLayout>
  );
}