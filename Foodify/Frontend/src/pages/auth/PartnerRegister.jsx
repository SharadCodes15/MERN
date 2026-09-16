import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import axios from "axios";

const initialRegisterState = {
  name: "",
  contactName: "",
  phone: "",
  address: "",
  email: "",
  password: "",
};

export default function PartnerRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialRegisterState);

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
      name: formData.name.trim(),
      contactName: formData.contactName.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      email: formData.email.trim(),
      password: formData.password,
    };

    try {
      await axios.post(
        "http://localhost:3000/api/auth/foodpartner/register",
        payload,
        { withCredentials: true }
      );
      navigate("/create-food");
    } catch (err) {
      console.error(err);
    } finally {
      setFormData(initialRegisterState);
    }
  };

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

        <form className="space-y-3" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-xs font-semibold tracking-wide uppercase text-[var(--text-muted)]">
              Kitchen / Business Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Sourdough Workshop & Deli"
              className="auth-input partner-input w-full px-3.5 py-2 rounded-lg text-sm"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold tracking-wide uppercase text-[var(--text-muted)]">
                Contact Person
              </label>
              <input
                type="text"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                placeholder="Elena Vance"
                className="auth-input partner-input w-full px-3.5 py-2 rounded-lg text-sm"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold tracking-wide uppercase text-[var(--text-muted)]">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 555 019 2834"
                className="auth-input partner-input w-full px-3.5 py-2 rounded-lg text-sm font-mono"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold tracking-wide uppercase text-[var(--text-muted)]">
              Kitchen Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="12 Bakery Lane, District 4"
              className="auth-input partner-input w-full px-3.5 py-2 rounded-lg text-sm"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold tracking-wide uppercase text-[var(--text-muted)]">
              Business Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="owner@sourdoughworkshop.com"
              className="auth-input partner-input w-full px-3.5 py-2 rounded-lg text-sm font-mono"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold tracking-wide uppercase text-[var(--text-muted)]">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••••••"
              className="auth-input partner-input w-full px-3.5 py-2 rounded-lg text-sm"
              required
            />
          </div>

          <div className="p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-[11px] text-[var(--text-muted)]">
            ✓ We verify health permits, food licenses, and inspect quality before publishing your menu.
          </div>

          <button
            type="submit"
            className="btn-partner w-full py-2.5 px-4 rounded-lg font-medium text-sm mt-1"
          >
            Submit Application
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] text-center">
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