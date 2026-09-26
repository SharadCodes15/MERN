import React, { useRef, useLayoutEffect } from "react";
import LandingNavbar from "./LandingNavbar";
import VideoSection from "./VideoSection";
import HeroLand from "./HeroLand";
import Lenis from "lenis";
import "./Landing.css";
import SmoothScroll from "./SmoothScroll";
import ItemDisplay from "./ItemDisplay";
import FinalCTA from "./FinalCTA";
import Footer from "./Footer";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);
const Landingpage = () => {
  return (
    <SmoothScroll>
      <div>
        <main>
          <HeroLand />
          {/* <VideoSection/> */}
          <VideoSection />
          <ItemDisplay/>
          <FinalCTA/>
          <Footer/>
        </main>
      </div>
    </SmoothScroll>
  );
};

export default Landingpage;
