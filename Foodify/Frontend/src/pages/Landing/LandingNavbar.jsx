import React from "react";
import { Link } from "react-router-dom";

const LandingNavbar = () => {
  return (
    <nav
      className="
        LandingNav
        absolute
        left-3
        right-3
        top-3
        z-50
        flex
        items-center
        justify-between
        rounded-2xl
        bg-amber-400
        px-5
        py-3
        text-black
        shadow-lg
        md:px-7
      "
    >
      {/* Logo */}
      <Link
        to="/"
        className="
          text-xl
          font-black
          tracking-tight
          transition-transform
          duration-300
          hover:scale-105
        "
      >
        CRAVE.
      </Link>

      {/* Navigation */}
      <div className="hidden items-center gap-8 font-semibold md:flex">
        <Link
          to="/"
          className="
            relative
            transition-opacity
            duration-300
            hover:opacity-60
          "
        >
          Home
        </Link>

        <Link
          to="/saved"
          className="
            relative
            transition-opacity
            duration-300
            hover:opacity-60
          "
        >
          Saved
        </Link>
      </div>

      {/* Auth */}
      <div className="flex items-center gap-2 font-semibold">
        <Link
          to="/user/login"
          className="
            rounded-full
            px-4
            py-2
            transition-all
            duration-300
            hover:bg-black
            hover:text-white
          "
        >
          Login
        </Link>

        <Link
          to="/user/register"
          className="
            rounded-full
            bg-black
            px-5
            py-2
            text-white
            transition-all
            duration-300
            hover:scale-105
            hover:bg-white
            hover:text-black
          "
        >
          Register
        </Link>
      </div>
    </nav>
  );
};

export default LandingNavbar;
