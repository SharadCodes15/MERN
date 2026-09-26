import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
        {
          withCredentials: true,
        }
      );

      navigate("/create-food");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "We couldn't submit your application. Please check your details."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen overflow-auto bg-[#171717] p-3 md:p-5">

      {/* ===================================================== */}
      {/* MAIN CONTAINER */}
      {/* ===================================================== */}

      <div
        className="
          relative
          flex
          min-h-[calc(100vh-24px)]
          overflow-hidden
          rounded-[30px]
          border
          border-white/10
          bg-[#f4f0e8]
          shadow-[0_30px_90px_rgba(0,0,0,0.35)]
          md:min-h-[calc(100vh-40px)]
        "
      >

        {/* ================================================= */}
        {/* LEFT — PARTNER BRAND */}
        {/* ================================================= */}

        <section
          className="
            relative
            hidden
            w-[42%]
            overflow-hidden
            bg-[#191919]
            text-white
            lg:block
          "
        >

          {/* Orange glow */}

          <div
            className="
              absolute
              -left-40
              -top-40
              h-[550px]
              w-[550px]
              rounded-full
              bg-orange-500/10
              blur-3xl
            "
          />

          {/* Large background typography */}

          <div
            className="
              absolute
              -bottom-8
              -left-5
              select-none
              text-[9vw]
              font-black
              leading-[0.75]
              tracking-[-0.08em]
              text-white/[0.035]
            "
          >
            COOK
            <br />
            CREATE
          </div>


          {/* LOGO */}

          <Link
            to="/"
            className="
              absolute
              left-9
              top-8
              z-20
              text-3xl
              font-black
              tracking-[-0.07em]
              text-white
            "
          >
            CRAVE.
          </Link>


          {/* Partner badge */}

          <div
            className="
              absolute
              right-8
              top-8
              z-20
              rounded-full
              border
              border-white/15
              bg-white/5
              px-4
              py-2
              text-[10px]
              font-black
              uppercase
              tracking-[0.2em]
              text-white/70
              backdrop-blur-md
            "
          >
            For Partners
          </div>


          {/* ================================================= */}
          {/* IMAGE */}
          {/* ================================================= */}

          <div
            className="
              group
              absolute
              left-9
              right-9
              top-[18%]
              bottom-[24%]
              overflow-hidden
              rounded-[28px]
              border
              border-white/15
              bg-[#242424]
            "
          >

            <img
              src="/Images/Culinary Chef.jpg"
              alt="CRAVE food partner"
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
                opacity-80
                grayscale-[15%]
                transition-transform
                duration-700
                ease-[cubic-bezier(0.22,1,0.36,1)]
                group-hover:scale-110
              "
            />

            {/* Image overlay */}

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black
                via-black/10
                to-transparent
              "
            />

            {/* Image content */}

            <div className="absolute bottom-6 left-6 right-6 z-10">

              <div className="mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-orange-500" />

                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">
                  Partner network
                </span>
              </div>

              <h2 className="text-3xl font-black leading-none tracking-[-0.04em] text-white">
                Your kitchen.
                <br />
                Your craft.
              </h2>

            </div>
          </div>


          {/* Bottom statement */}

          <div className="absolute bottom-8 left-9">

            <p className="max-w-sm text-xs leading-5 text-white/40">
              Built for independent kitchens, chefs and food businesses
              that want to reach more hungry customers.
            </p>

          </div>

        </section>


        {/* ================================================= */}
        {/* RIGHT — APPLICATION */}
        {/* ================================================= */}

        <section
          className="
            relative
            flex
            flex-1
            items-center
            justify-center
            overflow-hidden
            bg-[#f4f0e8]
            px-6
            py-8
            md:px-12
            lg:px-16
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
              border-[70px]
              border-orange-500/10
            "
          />


          <div className="relative z-10 w-full max-w-[520px]">

            {/* ================================================= */}
            {/* MOBILE LOGO */}
            {/* ================================================= */}

            <div className="mb-7 flex items-center justify-between lg:hidden">

              <Link
                to="/"
                className="
                  text-3xl
                  font-black
                  tracking-[-0.07em]
                  text-black
                "
              >
                CRAVE.
              </Link>

              <span className="rounded-full bg-black px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.15em] text-white">
                Partner
              </span>

            </div>


            {/* ================================================= */}
            {/* HEADER */}
            {/* ================================================= */}

            <div className="mb-6">

              <div className="mb-4 flex items-center justify-between">

                <div className="flex items-center gap-2">

                  <span className="h-2 w-2 rounded-full bg-orange-600" />

                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-black/50">
                    Partner onboarding
                  </span>

                </div>

                <span className="font-mono text-[10px] font-bold text-black/30">
                  STEP 01 / 02
                </span>

              </div>


              <h1
                className="
                  text-4xl
                  font-black
                  tracking-[-0.06em]
                  text-black
                  md:text-5xl
                "
              >
                Open your
                <br />
                kitchen.
              </h1>

              <p className="mt-3 max-w-md text-sm font-medium leading-5 text-black/55">
                Tell us about your food business. Once verified,
                you'll be ready to publish your menu on CRAVE.
              </p>

            </div>


            {/* ================================================= */}
            {/* ERROR */}
            {/* ================================================= */}

            {error && (
              <div
                className="
                  mb-4
                  rounded-xl
                  border
                  border-red-200
                  bg-red-50
                  px-4
                  py-3
                  text-xs
                  font-semibold
                  leading-5
                  text-red-700
                "
              >
                {error}
              </div>
            )}


            {/* ================================================= */}
            {/* FORM */}
            {/* ================================================= */}

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              {/* Business name */}

              <div>

                <label
                  htmlFor="name"
                  className="mb-2 block text-[11px] font-black uppercase tracking-wide text-black/60"
                >
                  Kitchen / Business name
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Sourdough Workshop"
                  required
                  className="
                    w-full
                    rounded-xl
                    border
                    border-black/10
                    bg-white
                    px-4
                    py-3.5
                    text-sm
                    font-semibold
                    text-black
                    outline-none
                    placeholder:text-black/30
                    transition
                    focus:border-orange-500
                    focus:ring-4
                    focus:ring-orange-500/10
                  "
                />

              </div>


              {/* Contact + Phone */}

              <div className="grid grid-cols-2 gap-3">

                <div>

                  <label
                    htmlFor="contactName"
                    className="mb-2 block text-[11px] font-black uppercase tracking-wide text-black/60"
                  >
                    Contact person
                  </label>

                  <input
                    id="contactName"
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="
                      w-full
                      rounded-xl
                      border
                      border-black/10
                      bg-white
                      px-4
                      py-3.5
                      text-sm
                      font-semibold
                      text-black
                      outline-none
                      placeholder:text-black/30
                      transition
                      focus:border-orange-500
                      focus:ring-4
                      focus:ring-orange-500/10
                    "
                  />

                </div>


                <div>

                  <label
                    htmlFor="phone"
                    className="mb-2 block text-[11px] font-black uppercase tracking-wide text-black/60"
                  >
                    Phone
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    required
                    className="
                      w-full
                      rounded-xl
                      border
                      border-black/10
                      bg-white
                      px-4
                      py-3.5
                      text-sm
                      font-semibold
                      text-black
                      outline-none
                      placeholder:text-black/30
                      transition
                      focus:border-orange-500
                      focus:ring-4
                      focus:ring-orange-500/10
                    "
                  />

                </div>

              </div>


              {/* Address */}

              <div>

                <label
                  htmlFor="address"
                  className="mb-2 block text-[11px] font-black uppercase tracking-wide text-black/60"
                >
                  Kitchen address
                </label>

                <input
                  id="address"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Street, area, city"
                  required
                  className="
                    w-full
                    rounded-xl
                    border
                    border-black/10
                    bg-white
                    px-4
                    py-3.5
                    text-sm
                    font-semibold
                    text-black
                    outline-none
                    placeholder:text-black/30
                    transition
                    focus:border-orange-500
                    focus:ring-4
                    focus:ring-orange-500/10
                  "
                />

              </div>


              {/* Email */}

              <div>

                <label
                  htmlFor="email"
                  className="mb-2 block text-[11px] font-black uppercase tracking-wide text-black/60"
                >
                  Business email
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="hello@yourkitchen.com"
                  required
                  className="
                    w-full
                    rounded-xl
                    border
                    border-black/10
                    bg-white
                    px-4
                    py-3.5
                    text-sm
                    font-semibold
                    text-black
                    outline-none
                    placeholder:text-black/30
                    transition
                    focus:border-orange-500
                    focus:ring-4
                    focus:ring-orange-500/10
                  "
                />

              </div>


              {/* Password */}

              <div>

                <label
                  htmlFor="password"
                  className="mb-2 block text-[11px] font-black uppercase tracking-wide text-black/60"
                >
                  Create password
                </label>

                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="At least 8 characters"
                  minLength={8}
                  required
                  className="
                    w-full
                    rounded-xl
                    border
                    border-black/10
                    bg-white
                    px-4
                    py-3.5
                    text-sm
                    font-semibold
                    text-black
                    outline-none
                    placeholder:text-black/30
                    transition
                    focus:border-orange-500
                    focus:ring-4
                    focus:ring-orange-500/10
                  "
                />

              </div>


              {/* ================================================= */}
              {/* VERIFICATION NOTICE */}
              {/* ================================================= */}

              <div
                className="
                  flex
                  gap-3
                  rounded-xl
                  border
                  border-black/10
                  bg-black/[0.035]
                  px-4
                  py-3
                "
              >

                <div
                  className="
                    mt-0.5
                    flex
                    h-6
                    w-6
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-black
                    text-[10px]
                    font-black
                    text-white
                  "
                >
                  ✓
                </div>

                <div>

                  <p className="text-xs font-black text-black">
                    Verification required
                  </p>

                  <p className="mt-0.5 text-[10px] leading-4 text-black/50">
                    We verify business details and food safety
                    information before your menu goes live.
                  </p>

                </div>

              </div>


              {/* ================================================= */}
              {/* SUBMIT */}
              {/* ================================================= */}

              <button
                type="submit"
                disabled={loading}
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  rounded-xl
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
                {loading
                  ? "SUBMITTING APPLICATION..."
                  : "SUBMIT APPLICATION →"}
              </button>

            </form>


            {/* ================================================= */}
            {/* FOOTER */}
            {/* ================================================= */}

            <div className="mt-5 border-t border-black/10 pt-4 text-center">

              <p className="text-xs font-medium text-black/45">

                Already a partner?{" "}

                <Link
                  to="/food-partner/login"
                  className="
                    font-black
                    text-black
                    underline
                    underline-offset-4
                    transition
                    hover:text-orange-600
                  "
                >
                  Open merchant desk
                </Link>

              </p>

            </div>

          </div>
        </section>

      </div>
    </main>
  );
}