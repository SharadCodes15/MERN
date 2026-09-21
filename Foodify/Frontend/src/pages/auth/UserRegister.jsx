import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import axios from "axios";
import {useNavigate} from "react-router-dom";
const initialFormState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export default function UserRegister() {
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

    // Combines firstName and lastName cleanly without extra spaces
    const payload = {
      fullname: `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim(),
      email: formData.email,
      password: formData.password,
    };

    try {
      await axios.post("http://localhost:3000/api/auth/user/register", 
                  payload,
                {
                  withCredentials: true,
                });
      navigate("/home");
     } catch (err) {
      console.error(err);
    } finally {
      // Resets input fields
      setFormData(initialFormState);
    }
  };




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

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold tracking-wide uppercase text-[var(--text-muted)]">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Elena"
                className="auth-input w-full px-3.5 py-2.5 rounded-lg text-sm"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold tracking-wide uppercase text-[var(--text-muted)]">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Rostova"
                className="auth-input w-full px-3.5 py-2.5 rounded-lg text-sm"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold tracking-wide uppercase text-[var(--text-muted)]">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="elena@rostova.design"
              className="auth-input w-full px-3.5 py-2.5 rounded-lg text-sm"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold tracking-wide uppercase text-[var(--text-muted)]">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 8 characters"
              className="auth-input w-full px-3.5 py-2.5 rounded-lg text-sm"
              required
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