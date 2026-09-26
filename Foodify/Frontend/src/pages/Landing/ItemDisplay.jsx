import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FoodCard from "./foodCard";
gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    id: 1,
    title: "Classic Burger",
    price: "12.00",
    image: "/Images/rollhand-removebg-preview.png",
    description:
      "Juicy grilled beef, melted cheese, crisp lettuce and our signature sauce.",
    category: "Popular",
    rating: "4.9",
  },

  {
    id: 2,
    title: "Spicy Ramen",
    price: "15.00",
    image: "/Images/chicken-removebg-preview.png",
    description:
      "Rich spicy broth with noodles, tender meat, greens and a perfectly cooked egg.",
    category: "Chef's Choice",
    rating: "4.8",
  },

  {
    id: 3,
    title: "Chicken Biryani",
    price: "14.00",
    image: "/Images/biryani-removebg-preview.png",
    description:
      "Fragrant basmati rice layered with tender chicken, aromatic spices and herbs.",
    category: "Indian",
    rating: "4.9",
  },

  {
    id: 4,
    title: "Crispy Roll",
    price: "9.00",
    image: "/Images/roll-removebg-preview.png",
    description:
      "Crispy golden wrap filled with seasoned chicken, fresh vegetables and sauce.",
    category: "Street Food",
    rating: "4.7",
  },
];

const ItemDisplay = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const getDistance = () => {
        return -(track.scrollWidth - window.innerWidth);
      };
      gsap.to(
        trackRef.current,
        {
          x: getDistance,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${track.scrollWidth - window.innerWidth}`,
            scrub: true,
            pin: true,
                      invalidateOnRefresh: true,
                    //   markers:true,
          },
        },
        containerRef,
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div>
      <section ref={containerRef} className="relative bg-black">
        <div className="top-0 h-screen overflow-hidden">
          <div ref={trackRef} className="flex h-full items-center gap-5">
            {items.map((item) => (
              <FoodCard key={item.id} {...item}/>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ItemDisplay;
