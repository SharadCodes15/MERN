import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 158;

const App = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // -----------------------------------------
  // Normal GSAP element animations
  // -----------------------------------------
  // useLayoutEffect(() => {
  //   const ctx = gsap.context(() => {
  //     const boxes = gsap.utils.toArray(".animated-box");

  //     boxes.forEach((box) => {
  //       gsap.fromTo(
  //         box,
  //         {
  //           opacity: 0,
  //           y: 60,
  //           scale: 0.95,
  //         },
  //         {
  //           opacity: 1,
  //           y: 0,
  //           scale: 1,
  //           duration: 1,
  //           ease: "power3.out",

  //           scrollTrigger: {
  //             trigger: box,
  //             start: "top 80%",
  //             end: "top 50%",
  //             scrub: true,
  //           },
  //         }
  //       );
  //     });
  //   }, containerRef);

  //   return () => ctx.revert();
  // }, []);

  // -----------------------------------------
  // Canvas frame animation
  // -----------------------------------------
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      const frameState = {
        frame: 0,
      };

      const frameImages = [];

      // -----------------------------
      // Render frame
      // -----------------------------
      const renderFrame = (frameIndex) => {
        const img = frameImages[frameIndex];

        if (!img || !img.complete || img.naturalWidth === 0) {
          return;
        }

        context.clearRect(
          0,
          0,
          window.innerWidth,
          window.innerHeight
        );

        context.drawImage(
          img,
          0,
          0,
          window.innerWidth,
          window.innerHeight
        );
      };

      // -----------------------------
      // Load all frames
      // -----------------------------
      for (let index = 1; index <= TOTAL_FRAMES; index++) {
        const img = new Image();

        img.src = `/frames/frame_${index
          .toString()
          .padStart(4, "0")}.jpg`;

        img.onload = () => {
          renderFrame(Math.round(frameState.frame));
        };

        frameImages.push(img);
      }

      // -----------------------------
      // Canvas resize
      // -----------------------------
      const resizeCanvas = () => {
        const scale = window.devicePixelRatio || 1;

        canvas.width = window.innerWidth * scale;
        canvas.height = window.innerHeight * scale;

        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;

        context.setTransform(scale, 0, 0, scale, 0, 0);

        renderFrame(Math.round(frameState.frame));
      };

      resizeCanvas();

      window.addEventListener("resize", resizeCanvas);

      // -----------------------------------------
      // IMPORTANT PART
      // -----------------------------------------
      const frameTween = gsap.to(frameState, {
        frame: TOTAL_FRAMES - 1,

        snap: "frame",

        ease: "none",

        scrollTrigger: {
          trigger: containerRef.current,

          // Start when video section reaches top
          start: "top top",

          // Give this section 2500px of scrolling
          end: "+=2500",

          // Smoothly connect animation to scroll
          scrub: true,

          // Keep ONLY this section pinned
          pin: true,

          // Optional
          anticipatePin: 1,

          // markers: true,
        },

        onUpdate: () => {
          renderFrame(Math.round(frameState.frame));
        },
      });

      return () => {
        frameTween.kill();

        window.removeEventListener(
          "resize",
          resizeCanvas
        );
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main>

      {/* -------------------------------- */}
      {/* NORMAL SECTION BEFORE VIDEO */}
      {/* -------------------------------- */}
{/* 
      <section className="h-screen bg-blue-500 flex items-center justify-center">
        <h1 className="text-6xl text-white">
          Hero Section
        </h1>
      </section> */}


      {/* -------------------------------- */}
      {/* VIDEO / CANVAS SECTION */}
      {/* -------------------------------- */}

      <section
        ref={containerRef}
        className="relative h-screen bg-black overflow-hidden"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{
            width: "100%",
            height: "100%",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        {/* Optional content over canvas */}

        <div className="relative z-10 h-full flex items-center justify-center">
          <h1 className="text-white text-6xl font-bold">
            Scroll
          </h1>
        </div>
      </section>


      {/* -------------------------------- */}
      {/* NORMAL SECTION AFTER VIDEO */}
      {/* -------------------------------- */}

      {/* <section className="h-screen bg-green-500 flex items-center justify-center">
        <h1 className="text-6xl text-white">
          Section 3
        </h1>
      </section>


      <section className="h-screen bg-purple-500 flex items-center justify-center">
        <h1 className="text-6xl text-white">
          Section 4
        </h1>
      </section> */}

    </main>
  );
};

export default App;