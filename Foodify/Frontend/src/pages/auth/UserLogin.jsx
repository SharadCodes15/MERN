import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
    <main className="min-h-screen bg-[#ddd7ce] p-3 md:p-5">
      <div
        className="
          flex
          min-h-[calc(100vh-24px)]
          overflow-hidden
          rounded-[36px]
          border
          border-black/10
          bg-[#fffaf3]
          shadow-[0_25px_80px_rgba(0,0,0,0.15)]
          md:min-h-[calc(100vh-40px)]
        "
      >
        {/* ================= LEFT ================= */}

        <section className="relative hidden w-[48%] overflow-hidden bg-[#f6ad3d] lg:block">

          {/* Decorative circles */}

          <div
            className="
              absolute
              -left-32
              top-20
              h-[420px]
              w-[420px]
              rounded-full
              border-[60px]
              border-black/[0.06]
            "
          />

          <div
            className="
              absolute
              -bottom-48
              -right-32
              h-[550px]
              w-[550px]
              rounded-full
              border-[70px]
              border-black/[0.06]
            "
          />

          {/* Logo */}

          <Link
            to="/"
            className="
              absolute
              left-10
              top-8
              z-30
              text-3xl
              font-black
              tracking-[-0.07em]
              text-black
              transition-transform
              duration-300
              hover:scale-105
            "
          >
            CRAVE.
          </Link>

          {/* ================= IMAGE ================= */}

          <div
            className="
              group
              absolute
              left-10
              right-10
              top-[12%]
              bottom-[20%]
              overflow-hidden
              rounded-[40px]
              border-[8px]
              border-white/90
              bg-black/10
              shadow-[0_30px_60px_rgba(0,0,0,0.25)]
            "
          >
            {/* Image */}

            <img
              src="/Images/rollhand.jpg"
              alt="Delicious food"
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
                transition-transform
                duration-700
                ease-[cubic-bezier(0.22,1,0.36,1)]
                group-hover:scale-110
              "
            />

            {/* Dark gradient */}

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black/50
                via-transparent
                to-black/10
              "
            />

            {/* Floating badge */}

            <div
              className="
                absolute
                bottom-6
                left-6
                z-10
                rounded-full
                border
                border-white/50
                bg-white/90
                px-5
                py-3
                shadow-xl
                backdrop-blur-md
              "
            >
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/50">
                Today's craving
              </p>

              <p className="text-sm font-black text-black">
                Freshly made
              </p>
            </div>

            {/* Rating */}

            <div
              className="
                absolute
                right-6
                top-6
                z-10
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-black
                text-lg
                text-white
                shadow-lg
              "
            >
              ★
            </div>
          </div>

          {/* Bottom text */}

          <div className="absolute bottom-8 left-10 z-20">
            <p className="mb-2 text-xs font-black uppercase tracking-[0.3em] text-black/60">
              Welcome to CRAVE.
            </p>

            <h2 className="text-4xl font-black leading-[0.9] tracking-[-0.05em] text-black xl:text-5xl">
              Good food.
              <br />
              Great cravings.
            </h2>
          </div>
        </section>

        {/* ================= RIGHT ================= */}

        <section className="relative flex flex-1 items-center justify-center overflow-hidden bg-[#fffaf3] px-6 py-8 md:px-10 lg:px-14">

          {/* Decorative circle */}

          <div
            className="
              absolute
              -right-40
              -top-40
              h-[500px]
              w-[500px]
              rounded-full
              border-[80px]
              border-[#f6ad3d]/10
            "
          />

          <div className="relative z-10 w-full max-w-[400px]">

            {/* Mobile logo */}

            <Link
              to="/"
              className="
                mb-10
                block
                text-3xl
                font-black
                tracking-[-0.07em]
                text-black
                lg:hidden
              "
            >
              CRAVE.
            </Link>

            {/* Heading */}

            <div className="mb-8">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-orange-600" />

                <p className="text-xs font-black uppercase tracking-[0.25em] text-black/50">
                  Personal Member
                </p>
              </div>

              <h1 className="text-4xl font-black tracking-[-0.05em] text-black md:text-5xl">
                Welcome back.
              </h1>

              <p className="mt-3 text-sm font-medium leading-6 text-black/55">
                Sign in and get back to the food you love.
              </p>
            </div>

            {/* Error */}

            {error && (
              <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {error}
              </div>
            )}

            {/* Form */}

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
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-black/10
                    bg-[#f1ece5]
                    px-5
                    py-4
                    text-sm
                    font-semibold
                    text-black
                    outline-none
                    placeholder:text-black/35
                    transition-all
                    duration-300
                    hover:border-black/20
                    focus:border-black
                    focus:bg-white
                    focus:shadow-[0_0_0_4px_rgba(0,0,0,0.05)]
                  "
                />
              </div>

              {/* Password */}

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-bold text-black"
                  >
                    Password
                  </label>

                  <Link
                    to="/user/forgot-password"
                    className="
                      text-xs
                      font-bold
                      text-black
                      underline
                      underline-offset-4
                      hover:text-orange-600
                    "
                  >
                    Forgot password?
                  </Link>
                </div>

                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-black/10
                    bg-[#f1ece5]
                    px-5
                    py-4
                    text-sm
                    font-semibold
                    text-black
                    outline-none
                    placeholder:text-black/35
                    transition-all
                    duration-300
                    hover:border-black/20
                    focus:border-black
                    focus:bg-white
                    focus:shadow-[0_0_0_4px_rgba(0,0,0,0.05)]
                  "
                />
              </div>

              {/* Login */}

              <button
                type="submit"
                disabled={loading}
                className="
                  mt-2
                  flex
                  w-full
                  items-center
                  justify-center
                  rounded-2xl
                  bg-black
                  px-5
                  py-4
                  text-sm
                  font-black
                  tracking-wide
                  text-white
                  shadow-lg
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-orange-600
                  hover:shadow-xl
                  active:translate-y-0
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {loading ? "SIGNING IN..." : "SIGN IN →"}
              </button>
            </form>

            {/* Divider */}

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-black/10" />

              <span className="text-[10px] font-black tracking-[0.25em] text-black/35">
                OR
              </span>

              <div className="h-px flex-1 bg-black/10" />
            </div>

            {/* Social */}

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="
                  flex
                  items-center
                  justify-center
                  gap-3
                  rounded-2xl
                  border
                  border-black/10
                  bg-white
                  py-3.5
                  text-sm
                  font-bold
                  text-black
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-black/30
                  hover:shadow-md
                "
              >
                <span className="text-lg font-black text-[#4285F4]">
                  G
                </span>

                Google
              </button>

              <button
                type="button"
                className="
                  flex
                  items-center
                  justify-center
                  gap-3
                  rounded-2xl
                  border
                  border-black/10
                  bg-white
                  py-3.5
                  text-sm
                  font-bold
                  text-black
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-black/30
                  hover:shadow-md
                "
              >
                <span className="text-lg font-black text-[#1877F2]">
                  f
                </span>

                Facebook
              </button>
            </div>

            {/* Register */}

            <p className="mt-7 text-center text-sm font-medium text-black/55">
              Don't have an account?{" "}
              <Link
                to="/user/register"
                className="
                  font-black
                  text-black
                  underline
                  underline-offset-4
                  hover:text-orange-600
                "
              >
                Create one
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}