import React, { useLayoutEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 158;

const VideoSection = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      // =========================================
      // FRAME STATE
      // =========================================

      const frameState = {
        frame: 0,
      };

      const frameImages = [];

      // =========================================
      // RENDER FRAME
      // =========================================

      const renderFrame = (frameIndex) => {
        const img = frameImages[frameIndex];

        if (!img || !img.complete || img.naturalWidth === 0) {
          return;
        }

        context.clearRect(0, 0, window.innerWidth, window.innerHeight);

        context.drawImage(img, 0, 0, window.innerWidth, window.innerHeight);
      };

      // =========================================
      // LOAD ALL FRAMES
      // =========================================

      for (let index = 1; index <= TOTAL_FRAMES; index++) {
        const img = new Image();

        img.src = `/frames/frame_${index.toString().padStart(4, "0")}.jpg`;

        img.onload = () => {
          renderFrame(Math.round(frameState.frame));
        };

        frameImages.push(img);
      }

      // =========================================
      // CANVAS RESIZE
      // =========================================

      const resizeCanvas = () => {
        const dpr = window.devicePixelRatio || 1;

        const width = window.innerWidth;
        const height = window.innerHeight;

        canvas.width = width * dpr;
        canvas.height = height * dpr;

        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        context.setTransform(dpr, 0, 0, dpr, 0, 0);

        renderFrame(Math.round(frameState.frame));
      };

      resizeCanvas();

      window.addEventListener("resize", resizeCanvas);

      // =========================================
      // INITIAL TEXT STATE
      // =========================================

      gsap.set(".layer-text", {
        opacity: 0,
        y: 50,
      });

      gsap.set(".crave-text", {
        opacity: 0,
        y: 50,
      });

      // =========================================
      // MASTER SCROLL TIMELINE
      // =========================================

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,

          start: "top top",

          // Total scroll distance
          end: "+=3000",

          scrub: 1,

          // ONLY THIS SCROLLTRIGGER PINS
          pin: true,

          anticipatePin: 1,

          // markers: true,
        },
      });

      // =========================================
      // 1. BURGER → EXPLODED
      // FRAME 0 → 70
      // =========================================

      tl.to(frameState, {
        frame: 70,

        snap: "frame",

        ease: "none",

        duration: 2,

        onUpdate: () => {
          renderFrame(Math.round(frameState.frame));
        },
      });

      // =========================================
      // 2. EVERY LAYER MATTERS
      // =========================================

      tl.to(".layer-text", {
        opacity: 1,

        y: 0,

        duration: 0.5,
      });

      // =========================================
      // 3. HOLD TEXT
      // =========================================

      tl.to(
        {},
        {
          duration: 0.8,
        },
      );

      // =========================================
      // 4. FADE TEXT
      // =========================================

      tl.to(".layer-text", {
        opacity: 0,

        y: -50,

        duration: 0.5,
      });

      // =========================================
      // 5. EXPLODED → REASSEMBLING
      // FRAME 70 → 115
      // =========================================

      tl.to(frameState, {
        frame: 115,

        snap: "frame",

        ease: "none",

        duration: 2,

        onUpdate: () => {
          renderFrame(Math.round(frameState.frame));
        },
      });

      // =========================================
      // 6. BUILT TO CRAVE
      // =========================================

      tl.fromTo(
        ".crave-text",

        {
          opacity: 0,
          y: 50,
        },

        {
          opacity: 1,
          y: 0,
          duration: 0.5,
        },
      );

      // =========================================
      // 7. FINISH BURGER
      // FRAME 115 → 157
      // =========================================

      tl.to(frameState, {
        frame: TOTAL_FRAMES - 1,

        snap: "frame",

        ease: "none",

        duration: 2,

        onUpdate: () => {
          renderFrame(Math.round(frameState.frame));
        },
      });

      // =========================================
      // 8. CANVAS SCALE
      // =========================================

      gsap.fromTo(
        canvasRef.current,

        {
          scale: 0.8,
        },

        {
          scale: 1,

          ease: "none",

          scrollTrigger: {
            trigger: containerRef.current,

            start: "top 60%",

            end: "top top",

            scrub: true,

            // IMPORTANT:
            // No pin here
          },
        },
      );

      // =========================================
      // CLEANUP
      // =========================================

      return () => {
        window.removeEventListener("resize", resizeCanvas);
      };
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // =========================================
  // JSX
  // =========================================

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* ================================= */}
      {/* CANVAS */}
      {/* ================================= */}

      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{
          zIndex: 0,
          transformOrigin: "center center",
          pointerEvents: "none",
        }}
      />

      {/* ================================= */}
      {/* TEXT LAYER */}
      {/* ================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-10
          flex
          items-center
          justify-center
        "
      >
        {/* EVERY LAYER MATTERS */}

        <h2
          className="
            layer-text
            absolute
            text-center
            text-5xl
            font-black
            text-white
            md:text-7xl
            lg:text-8xl
          "
        >
          EVERY LAYER
          <br />
          MATTERS
        </h2>

        {/* BUILT TO CRAVE */}

        <h2
          className="
            crave-text
            absolute
            text-center
            text-5xl
            font-black
            text-white
            md:text-7xl
            lg:text-8xl
          "
        >
          BUILT TO
          <br />
          CRAVE
        </h2>
      </div>
    </section>
  );
};

export default VideoSection;
