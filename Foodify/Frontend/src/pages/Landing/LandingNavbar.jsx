import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LandingNavbar = () => {
  const [isJoinOpen, setIsJoinOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsJoinOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <>
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

        <button
          type="button"
          onClick={() => setIsJoinOpen(true)}
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
          Join
        </button>
      </nav>

      {isJoinOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 px-4 py-6 backdrop-blur-sm"
          onClick={() => setIsJoinOpen(false)}
          role="presentation"
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-[28px] bg-[#fffaf3] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="join-title"
          >
            <button
              type="button"
              onClick={() => setIsJoinOpen(false)}
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-xl leading-none text-black transition hover:scale-105 hover:bg-black hover:text-white"
              aria-label="Close join menu"
            >
              &times;
            </button>

            <div className="grid md:grid-cols-2">
              <section
                className="relative flex min-h-[330px] flex-col justify-end overflow-hidden bg-black px-7 py-8 text-white sm:px-10"
                style={{
                  backgroundImage:
                    "linear-gradient(to top, rgba(0,0,0,.86), rgba(0,0,0,.12)), url('/Images/foodall.jpg')",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              >
                <div className="relative z-10">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                    For food lovers
                  </p>
                  <h2 id="join-title" className="mt-2 text-3xl font-black">
                    Join as a User
                  </h2>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      to="/user/login"
                      className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black transition hover:bg-amber-400"
                    >
                      Login
                    </Link>
                    <Link
                      to="/user/register"
                      className="rounded-full border border-white/60 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white hover:text-black"
                    >
                      Register
                    </Link>
                  </div>
                </div>
              </section>

              <section
                className="relative flex min-h-[330px] flex-col justify-end overflow-hidden bg-black px-7 py-8 text-white sm:px-10 md:border-l md:border-white/30"
                style={{
                  backgroundImage:
                    "linear-gradient(to top, rgba(0,0,0,.86), rgba(0,0,0,.12)), url('/Images/hotel.jpg')",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              >
                <div className="relative z-10">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                    For kitchen partners
                  </p>
                  <h2 className="mt-2 text-3xl font-black">
                    Join as a Partner
                  </h2>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      to="/food-partner/login"
                      className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black transition hover:bg-amber-400"
                    >
                      Login
                    </Link>
                    <Link
                      to="/food-partner/register"
                      className="rounded-full border border-white/60 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white hover:text-black"
                    >
                      Register
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LandingNavbar;
