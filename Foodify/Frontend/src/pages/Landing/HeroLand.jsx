import React, { useRef, useLayoutEffect } from "react";
import LandingNavbar from "./LandingNavbar";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroLand = () => {
  const secRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: secRef.current,
          start: "top top",
          end: "+=3000",
          scrub: 1,
          pin: true,
          markers: false,
        },
      });

      // --------------------------------
      // INITIAL STATE
      // --------------------------------

      gsap.set(".hero-slide-1", {
        opacity: 1,
      });

      gsap.set(".hero-slide-2", {
        opacity: 0,
      });

      gsap.set(".hero-slide-3", {
        opacity: 0,
      });

      // --------------------------------
      // HERO 1 → HERO 2
      // --------------------------------

      tl.to(".hero-slide-1", {
        opacity: 0,
        duration: 1,
      })

        .to(
          ".hero-image-1",
          {
            scale: 1.2,
            rotate:180,
            x: -150,
            duration: 1,
          },
          "<",
        )

        .to(
          ".hero-text-1",
          {
            y: -100,
            duration: 1,
          },
          "<",
        )

        .to(
          ".hero-background",
          {
            backgroundColor: "#391600",
            duration: 1,
          },
          "<",
        )

        // HERO 2 ENTERS
        .fromTo(
          ".hero-slide-2",
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 1,
          },
        )

        .fromTo(
          ".hero-image-2",
          {
            scale: 0.7,
            x: 150,
          },
          {
            scale: 1,
            x: 0,
            duration: 1,
          },
          "<",
        )

        .fromTo(
          ".hero-text-2",
          {
            y: 100,
          },
          {
            y: 0,
            duration: 1,
          },
          "<",
        );

      // --------------------------------
      // HERO 2 → HERO 3
      // --------------------------------

      tl.to(".hero-slide-2", {
        opacity: 0,
        duration: 1,
      })

        .to(
          ".hero-image-2",
          {
            scale: 1.2,
            x: -150,
            duration: 1,
          },
          "<",
        )

        .to(
          ".hero-text-2",
          {
            y: -100,
            duration: 1,
          },
          "<",
        )

        .to(
          ".hero-background",
          {
            backgroundColor: "#8B4513",
            duration: 1,
          },
          "<",
        )

        // HERO 3 ENTERS
        .fromTo(
          ".hero-slide-3",
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 1,
          },
        )

        .fromTo(
          ".hero-image-3",
          {
            scale: 0.7,
            y: -100,
          },
          {
            scale: 1,
            x: 0,
            y:0,
            duration: 1,
          },
          "<",
        )

        .fromTo(
          ".hero-text-3",
          {
            y: 100,
          },
          {
            y: 0,
            duration: 1,
          },
          "<",
        );
    }, secRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={secRef}
      className="hero-section relative h-screen  overflow-hidden"
    >
      {/* Background */}
      <div className="hero-background absolute inset-0" />

      {/* Navbar */}
      <div className="relative z-50">
        <LandingNavbar />
      </div>

      {/* ========================= */}
      {/* HERO 1 */}
      {/* ========================= */}

      <div className="hero-slide hero-slide-1">
        <h1 className="hero-text-1">
          WRAPPED
          <br />
          IN FLAVOR
        </h1>

        <img
          className="hero-image-1"
          src="/Images/biryani-removebg-preview.png"
          alt="Biryani"
        />
      </div>

      {/* ========================= */}
      {/* HERO 2 */}
      {/* ========================= */}

      <div className="hero-slide hero-slide-2">
        <h1 className="hero-text-2">
          GRILLED
          <br />
          TO PERFECTION
        </h1>

        <img
          className="hero-image-2"
          src="/Images/chicken-removebg-preview.png"
          alt="Chicken"
        />
      </div>

      {/* ========================= */}
      {/* HERO 3 */}
      {/* ========================= */}

      <div className="hero-slide hero-slide-3">
        <h1 className="hero-text-3">
          FRESH
          <br />
          EVERY DAY
        </h1>

        <img
          className="hero-image-3"
          src="/Images/roll-removebg-preview.png"
          alt="Roll"
        />
      </div>
    </section>
  );
};

export default HeroLand;
