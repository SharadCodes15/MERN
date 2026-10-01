import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthLayout from "./AuthLayout";

const initialFormState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export default function UserRegister() {
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

    const payload = {
      fullname: `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim(),
      email: formData.email.trim(),
      password: formData.password,
    };

    try {
      await axios.post(
        "http://localhost:3000/api/auth/user/register",
        payload,
        {
          withCredentials: true,
        }
      );

      navigate("/home");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to create your account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full rounded-2xl border border-black/10 bg-[#f1ece5] px-4 py-3.5 text-sm font-semibold text-black outline-none placeholder:text-black/35 transition-all duration-300 hover:border-black/20 focus:border-black focus:bg-white focus:shadow-[0_0_0_4px_rgba(0,0,0,0.05)]";
  const labelClass = "mb-2 block text-sm font-bold text-black";

  return (
    <AuthLayout
      image="/Images/rollhand.jpg"
      imageAlt="A fresh dish ready to be enjoyed"
      imageLabel="Good food awaits"
      heroTitle="Find your"
      heroAccent="next craving."
      audienceLabel="For food lovers"
    >
      <div className="mb-6">
        <h1 className="text-4xl font-black text-black md:text-[42px]">Join CRAVE.</h1>
        <p className="mt-2 text-sm font-medium leading-5 text-black/55">Create your account and start discovering food you&apos;ll love.</p>
      </div>

      {error && <div role="alert" className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-semibold leading-5 text-red-700">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="firstName" className={labelClass}>First name</label>
            <input id="firstName" type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="John" autoComplete="given-name" required className={inputClass} />
          </div>
          <div>
            <label htmlFor="lastName" className={labelClass}>Last name</label>
            <input id="lastName" type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" autoComplete="family-name" required className={inputClass} />
          </div>
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>Email address</label>
          <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" autoComplete="email" required className={inputClass} />
        </div>

        <div>
          <label htmlFor="password" className={labelClass}>Password</label>
          <input id="password" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="At least 8 characters" autoComplete="new-password" minLength={8} required className={inputClass} />
        </div>

        <p className="pt-0.5 text-[10px] font-medium leading-4 text-black/45">
          By creating an account, you agree to our <span className="font-bold text-black">Terms of Service</span> and sourcing policy.
        </p>

        <button type="submit" disabled={loading} className="flex w-full items-center justify-center rounded-2xl bg-black px-5 py-3.5 text-sm font-black tracking-wide text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-xl active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50">
          {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT →"}
        </button>
      </form>

      <p className="mt-5 text-center text-sm font-medium text-black/55">
        Already have an account?{" "}
        <Link to="/user/login" className="font-black text-black underline underline-offset-4 transition hover:text-orange-600">Sign in</Link>
      </p>
    </AuthLayout>
  );
}