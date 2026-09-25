import React from "react";
import { Link } from "react-router-dom";
const LandingNavbar = () => {
  return (
    <>
      <nav class="LandingNav absolute inset-x-3 top-2 bg-amber-400 text-black px-6 py-4 rounded-2xl flex items-center justify-between gap-3">
        <div className="Navicon gap-3 flex flex-row align-middle justify-between font-extrabold">Chef-King</div>
        <div className="links gap-6 flex flex-row align-middle justify-between font-medium">
          <Link to="/">Home</Link>
          <Link to="/saved">Saved</Link>
        </div>
        <div className="authButtons gap-3 flex flex-row align-middle justify-between font-medium">
          <Link to="/user/register">Register</Link>
          <Link to="/user/login">login</Link>
        </div>
      </nav>
    </>
  );
};

export default LandingNavbar;
