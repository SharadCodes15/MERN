import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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

  return (
    <main className="min-h-screen overflow-auto bg-[#ddd7ce] p-3 md:p-5">

      {/* ===================================================== */}
      {/* MAIN CARD */}
      {/* ===================================================== */}

      <div
        className="
          flex
          min-h-[calc(100vh-24px)]
          overflow-hidden
          rounded-[32px]
          border
          border-black/10
          bg-[#fffaf3]
          shadow-[0_20px_60px_rgba(0,0,0,0.14)]
          md:min-h-[calc(100vh-40px)]
        "
      >

        {/* ================================================= */}
        {/* LEFT — BRAND + IMAGE */}
        {/* ================================================= */}

        <section
          className="
            relative
            hidden
            w-[48%]
            overflow-hidden
            bg-[#f6ad3d]
            lg:block
          "
        >

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

          {/* Small decorative element */}

          <div
            className="
              absolute
              right-12
              top-12
              z-20
              h-10
              w-10
              rotate-12
              rounded-full
              border-2
              border-black
            "
          />

          {/* LOGO */}

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


          {/* ================================================= */}
          {/* IMAGE CARD */}
          {/* ================================================= */}

          <div
            className="
              group
              absolute
              left-8
              right-8
              top-[12%]
              bottom-[22%]
              overflow-hidden
              rounded-[32px]
              border-[6px]
              border-white/90
              bg-black/10
              shadow-[0_20px_45px_rgba(0,0,0,0.22)]
            "
          >

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

            {/* Gradient */}

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black/50
                via-transparent
                to-black/5
              "
            />

            {/* Food badge */}

            <div
              className="
                absolute
                bottom-5
                left-5
                z-10
                rounded-full
                border
                border-white/50
                bg-white/90
                px-4
                py-2.5
                shadow-lg
                backdrop-blur-md
              "
            >
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-black/50">
                Join the table
              </p>

              <p className="text-xs font-black text-black">
                Good food awaits
              </p>
            </div>

            {/* Rating */}

            <div
              className="
                absolute
                right-5
                top-5
                z-10
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                bg-black
                text-sm
                text-white
                shadow-lg
              "
            >
              ★
            </div>
          </div>


          {/* BRAND TEXT */}

          <div className="absolute bottom-8 left-10 z-20">

            <p className="mb-2 text-xs font-black uppercase tracking-[0.3em] text-black/60">
              Join CRAVE.
            </p>

            <h2 className="text-4xl font-black leading-[0.9] tracking-[-0.05em] text-black xl:text-5xl">
              Find your
              <br />
              next craving.
            </h2>

          </div>

        </section>


        {/* ================================================= */}
        {/* RIGHT — REGISTER */}
        {/* ================================================= */}

        <section
          className="
            relative
            flex
            flex-1
            items-center
            justify-center
            overflow-hidden
            bg-[#fffaf3]
            px-6
            py-8
            md:px-10
            lg:px-14
          "
        >

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

          <div className="relative z-10 w-full max-w-[410px]">

            {/* Mobile logo */}

            <Link
              to="/"
              className="
                mb-8
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


            {/* HEADER */}

            <div className="mb-6">

              <div className="mb-3 flex items-center gap-3">

                <span className="h-2 w-2 rounded-full bg-orange-600" />

                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-black/50">
                  New Member
                </p>

              </div>

              <h1 className="text-4xl font-black tracking-[-0.05em] text-black md:text-[42px]">
                Join CRAVE.
              </h1>

              <p className="mt-2 text-sm font-medium leading-5 text-black/55">
                Create your account and start discovering food you'll love.
              </p>

            </div>


            {/* ERROR */}

            {error && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-semibold leading-5 text-red-700">
                {error}
              </div>
            )}


            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              {/* FIRST + LAST NAME */}

              <div className="grid grid-cols-2 gap-3">

                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-2 block text-sm font-bold text-black"
                  >
                    First name
                  </label>

                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    autoComplete="given-name"
                    required
                    className="
                      w-full
                      rounded-2xl
                      border
                      border-black/10
                      bg-[#f1ece5]
                      px-4
                      py-3.5
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


                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-2 block text-sm font-bold text-black"
                  >
                    Last name
                  </label>

                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    autoComplete="family-name"
                    required
                    className="
                      w-full
                      rounded-2xl
                      border
                      border-black/10
                      bg-[#f1ece5]
                      px-4
                      py-3.5
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

              </div>


              {/* EMAIL */}

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
                    px-4
                    py-3.5
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


              {/* PASSWORD */}

              <div>

                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-bold text-black"
                >
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
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-black/10
                    bg-[#f1ece5]
                    px-4
                    py-3.5
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


              {/* TERMS */}

              <p className="pt-0.5 text-[10px] font-medium leading-4 text-black/45">
                By creating an account, you agree to our{" "}
                <span className="font-bold text-black">
                  Terms of Service
                </span>{" "}
                and sourcing policy.
              </p>


              {/* REGISTER BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  rounded-2xl
                  bg-black
                  px-5
                  py-3.5
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
                {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT →"}
              </button>

            </form>


            {/* DIVIDER */}

            <div className="my-5 flex items-center gap-4">

              <div className="h-px flex-1 bg-black/10" />

              <span className="text-[10px] font-black tracking-[0.25em] text-black/30">
                OR
              </span>

              <div className="h-px flex-1 bg-black/10" />

            </div>


            {/* SOCIAL */}

            <div className="grid grid-cols-2 gap-3">

              <button
                type="button"
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  border
                  border-black/10
                  bg-white
                  py-3
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
                  gap-2
                  rounded-2xl
                  border
                  border-black/10
                  bg-white
                  py-3
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


            {/* LOGIN */}

            <p className="mt-5 text-center text-sm font-medium text-black/55">

              Already have an account?{" "}

              <Link
                to="/user/login"
                className="
                  font-black
                  text-black
                  underline
                  underline-offset-4
                  transition
                  hover:text-orange-600
                "
              >
                Sign in
              </Link>

            </p>

          </div>
        </section>
      </div>
    </main>
  );
}