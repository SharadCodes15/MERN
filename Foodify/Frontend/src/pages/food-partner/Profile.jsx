import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const fallbackPartner = {
    name: "Neighborhood Kitchen",
    email: "",
    bio: "",
    location: "",
    image: "",
};

/* =========================================================
   ICONS
========================================================= */

const Icon = ({ name, size = 20 }) => {
    const common = {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1.8",
        strokeLinecap: "round",
        strokeLinejoin: "round",
    };

    const icons = {
        home: (
            <>
                <path d="M3 10.5 12 3l9 7.5" />
                <path d="M5 9.5V21h14V9.5" />
                <path d="M9 21v-6h6v6" />
            </>
        ),

        heart: (
            <path d="M20.8 8.8c0 5.5-8.8 11-8.8 11S3.2 14.3 3.2 8.8A4.8 4.8 0 0 1 12 6.2a4.8 4.8 0 0 1 8.8 2.6Z" />
        ),

        article: (
            <>
                <rect x="5" y="3" width="14" height="18" rx="2" />
                <path d="M8 8h8M8 12h8M8 16h5" />
            </>
        ),

        settings: (
            <>
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V20h-2.6v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1A1.7 1.7 0 0 0 8 15a1.7 1.7 0 0 0-1.5-1H6v-2.6h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V5h2.6v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.1V13h-.1a1.7 1.7 0 0 0-1.5 1Z" />
            </>
        ),

        logout: (
            <>
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <path d="m16 17 5-5-5-5M21 12H9" />
            </>
        ),

        bell: (
            <>
                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
                <path d="M10 21h4" />
            </>
        ),

        trash: (
            <>
                <path d="M4 7h16M10 11v6M14 11v6" />
                <path d="M6 7l1 14h10l1-14M9 7V4h6v3" />
            </>
        ),

        plus: (
            <>
                <path d="M12 5v14M5 12h14" />
            </>
        ),

        minus: <path d="M5 12h14" />,

        arrow: (
            <>
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
            </>
        ),

        mail: (
            <>
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
            </>
        ),

        location: (
            <>
                <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="2.5" />
            </>
        ),

        star: (
            <path
                d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z"
                fill="currentColor"
                stroke="none"
            />
        ),
    };

    return <svg {...common}>{icons[name]}</svg>;
};

/* =========================================================
   FOOD CARD
========================================================= */

function FoodCard({ item, onAdd, index }) {
    const videoRef = useRef(null);
    const cardRef = useRef(null);

    const handleEnter = () => {
        videoRef.current?.play().catch(() => {});
    };

    const handleLeave = () => {
        const video = videoRef.current;

        if (video) {
            video.pause();
            video.currentTime = 0;
        }
    };

    return (
        <article
            ref={cardRef}
            data-food-card
            onPointerEnter={handleEnter}
            onPointerLeave={handleLeave}
            className="
                group
                overflow-hidden
                rounded-[24px]
                border
                border-[#e6ddd3]
                bg-white
                shadow-[0_8px_25px_rgba(67,47,30,0.06)]
                transition-all
                duration-500
                hover:-translate-y-2
                hover:shadow-[0_20px_45px_rgba(67,47,30,0.13)]
            "
        >
            {/* IMAGE */}
            <div className="relative aspect-[1.2/1] overflow-hidden bg-[#eee5dc]">
                <video
                    ref={videoRef}
                    src={item.video}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        group-hover:scale-110
                    "
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

                <div
                    className="
                        absolute
                        left-4
                        top-4
                        rounded-full
                        bg-white/95
                        px-3
                        py-1.5
                        text-[9px]
                        font-extrabold
                        uppercase
                        tracking-[0.13em]
                        text-[#5c4030]
                    "
                >
                    Fresh
                </div>

                <button
                    onClick={() => onAdd(item)}
                    type="button"
                    className="
                        absolute
                        bottom-4
                        right-4
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-[14px]
                        bg-[#f2a00d]
                        text-white
                        shadow-[0_8px_20px_rgba(242,160,13,0.3)]
                        transition-all
                        duration-300
                        hover:scale-110
                        hover:bg-[#df8c00]
                        active:scale-90
                    "
                    aria-label={`Add ${item.name}`}
                >
                    <Icon name="plus" size={19} />
                </button>
            </div>

            {/* DETAILS */}
            <div className="p-5">
                <h3 className="truncate text-[16px] font-extrabold tracking-[-0.02em] text-[#34271e]">
                    {item.name}
                </h3>

                <p className="mt-1.5 line-clamp-2 text-[11px] font-medium leading-4 text-[#998778]">
                    {item.description ||
                        "Freshly prepared with care from our kitchen."}
                </p>

                <div className="mt-4 flex items-center justify-between">
                    <span className="text-[17px] font-extrabold text-[#2c211a]">
                        $4,92
                    </span>

                    <span className="rounded-full bg-[#f9f0e4] px-3 py-1.5 text-[9px] font-bold text-[#a17f5d]">
                        {item.category || "Food"}
                    </span>
                </div>
            </div>
        </article>
    );
}

/* =========================================================
   SIDEBAR
========================================================= */

function Sidebar({ partner }) {
    return (
        <aside
            className="
                hidden
                w-[245px]
                shrink-0
                flex-col
                border-r
                border-[#e3d9ce]
                bg-[#f7f3ee]
                px-7
                py-8
                lg:flex
            "
        >
            {/* PROFILE */}
            <div className="flex flex-col items-center">
                <div
                    className="
                        relative
                        flex
                        h-[72px]
                        w-[72px]
                        items-center
                        justify-center
                        overflow-hidden
                        rounded-[22px]
                        bg-[#f3a21a]
                        text-2xl
                        font-extrabold
                        text-white
                        shadow-[0_12px_28px_rgba(243,162,26,0.25)]
                    "
                >
                    {partner.image ? (
                        <img
                            src={partner.image}
                            alt={partner.name}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        partner.name?.charAt(0)?.toUpperCase() || "N"
                    )}

                    <span className="absolute bottom-1 right-1 h-3 w-3 rounded-full border-2 border-white bg-[#65b84b]" />
                </div>

                <h3 className="mt-4 text-[14px] font-extrabold text-[#34261c]">
                    {partner.name}
                </h3>

                <p className="mt-1 text-[10px] font-medium text-[#9c8978]">
                    Food Partner
                </p>
            </div>

            {/* BALANCE */}
            <div className="mt-9 rounded-[20px] bg-[#eee7df] px-5 py-4">
                <p className="text-[9px] font-semibold text-[#998879]">
                    Your Balance
                </p>

                <p className="mt-1 text-[25px] font-extrabold tracking-[-0.04em] text-[#211914]">
                    $1,328
                </p>
            </div>

            {/* NAVIGATION */}
            <nav className="mt-8 space-y-2">
                <Link
                    to="/home"
                    className="
                        flex
                        min-h-[50px]
                        items-center
                        gap-3
                        rounded-[14px]
                        bg-[#302431]
                        px-5
                        text-[12px]
                        font-extrabold
                        text-white
                        shadow-[0_8px_20px_rgba(48,36,49,0.16)]
                    "
                >
                    <span className="text-[#f3a21a]">
                        <Icon name="home" size={18} />
                    </span>
                    Home
                </Link>

                <Link
                    to="/saved"
                    className="
                        flex
                        min-h-[50px]
                        items-center
                        gap-3
                        rounded-[14px]
                        px-5
                        text-[12px]
                        font-bold
                        text-[#8c7b6c]
                        transition
                        hover:bg-white
                        hover:text-[#33261d]
                    "
                >
                    <Icon name="heart" size={18} />
                    Favorite
                </Link>

                <Link
                    to="/articles"
                    className="
                        flex
                        min-h-[50px]
                        items-center
                        gap-3
                        rounded-[14px]
                        px-5
                        text-[12px]
                        font-bold
                        text-[#8c7b6c]
                        transition
                        hover:bg-white
                        hover:text-[#33261d]
                    "
                >
                    <Icon name="article" size={18} />
                    Articles
                </Link>

                <Link
                    to="/settings"
                    className="
                        flex
                        min-h-[50px]
                        items-center
                        gap-3
                        rounded-[14px]
                        px-5
                        text-[12px]
                        font-bold
                        text-[#8c7b6c]
                        transition
                        hover:bg-white
                        hover:text-[#33261d]
                    "
                >
                    <Icon name="settings" size={18} />
                    Setting
                </Link>
            </nav>

            <div className="mt-auto">
                <button
                    type="button"
                    className="
                        flex
                        min-h-[50px]
                        w-full
                        items-center
                        gap-3
                        rounded-[14px]
                        px-5
                        text-[12px]
                        font-bold
                        text-[#8c7b6c]
                        transition
                        hover:bg-white
                        hover:text-[#33261d]
                    "
                >
                    <Icon name="logout" size={18} />
                    Log Out
                </button>
            </div>
        </aside>
    );
}

/* =========================================================
   CART
========================================================= */

function CartPanel({ cartItems, updateQuantity }) {
    const cartTotal = cartItems.reduce(
        (total, cartItem) => total + 4.92 * cartItem.quantity,
        0
    );

    return (
        <aside
            className="
                hidden
                w-[320px]
                shrink-0
                flex-col
                border-l
                border-[#e3d9ce]
                bg-[#f7f3ee]
                px-7
                py-8
                xl:flex
            "
        >
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="font-display text-[30px] leading-none text-[#2e241d]">
                        My Cart
                    </h2>

                    <p className="mt-2 max-w-[205px] text-[10px] font-medium leading-4 text-[#948273]">
                        Manage your purchases and keep track of what you
                        spend.
                    </p>
                </div>

                <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#776658] shadow-sm">
                    <Icon name="bell" size={19} />

                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#ef704f]" />
                </div>
            </div>

            <div className="mt-7 space-y-3">
                {cartItems.length === 0 ? (
                    <div
                        className="
                            rounded-[20px]
                            border
                            border-[#e4d9ce]
                            bg-white
                            px-5
                            py-10
                            text-center
                        "
                    >
                        <div className="text-3xl">🛒</div>

                        <p className="mt-4 text-[13px] font-extrabold text-[#463428]">
                            Your cart is empty
                        </p>

                        <p className="mt-1 text-[10px] font-medium text-[#a39180]">
                            Add something delicious.
                        </p>
                    </div>
                ) : (
                    cartItems.map(({ item, quantity }) => (
                        <div
                            key={item._id}
                            className="
                                flex
                                items-center
                                gap-3
                                rounded-[19px]
                                border
                                border-[#e4d9ce]
                                bg-white
                                p-3
                            "
                        >
                            <div className="h-[56px] w-[56px] shrink-0 overflow-hidden rounded-[15px] bg-[#eee5dc]">
                                {item.video && (
                                    <video
                                        src={item.video}
                                        muted
                                        autoPlay
                                        loop
                                        playsInline
                                        className="h-full w-full object-cover"
                                    />
                                )}
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="truncate text-[11px] font-extrabold text-[#463428]">
                                    {item.name}
                                </p>

                                <p className="mt-1 text-[14px] font-extrabold text-[#292018]">
                                    $4,92
                                </p>
                            </div>

                            <div className="flex items-center gap-1">
                                <button
                                    type="button"
                                    onClick={() =>
                                        updateQuantity(item._id, -1)
                                    }
                                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f4eee8] text-[#685749]"
                                >
                                    <Icon name="minus" size={12} />
                                </button>

                                <span className="flex h-7 min-w-7 items-center justify-center rounded-lg bg-[#302432] px-1.5 text-[10px] font-extrabold text-white">
                                    {quantity}
                                </span>

                                <button
                                    type="button"
                                    onClick={() =>
                                        updateQuantity(item._id, 1)
                                    }
                                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f4eee8] text-[#685749]"
                                >
                                    <Icon name="plus" size={12} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {cartItems.length > 0 && (
                <>
                    <div className="mt-7 flex items-center justify-between">
                        <button
                            type="button"
                            onClick={() =>
                                cartItems.forEach((cartItem) =>
                                    updateQuantity(
                                        cartItem.item._id,
                                        -cartItem.quantity
                                    )
                                )
                            }
                            className="
                                flex
                                h-[56px]
                                w-[56px]
                                items-center
                                justify-center
                                rounded-[16px]
                                bg-[#302432]
                                text-white
                                transition
                                hover:scale-105
                            "
                        >
                            <Icon name="trash" size={19} />
                        </button>

                        <div className="text-right">
                            <p className="text-[10px] font-semibold text-[#918174]">
                                Total
                            </p>

                            <p className="text-[25px] font-extrabold tracking-tight text-[#241b15]">
                                ${cartTotal.toFixed(2).replace(".", ",")}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="
                            relative
                            mt-4
                            flex
                            h-[62px]
                            w-full
                            items-center
                            justify-center
                            overflow-hidden
                            rounded-[18px]
                            bg-[#d98226]
                            text-white
                            shadow-[0_12px_25px_rgba(217,130,38,0.22)]
                            transition
                            hover:-translate-y-1
                        "
                    >
                        <img
                            src="/Images/TraditionalTable.jpg"
                            alt=""
                            className="absolute inset-0 h-full w-full object-cover opacity-40"
                        />

                        <span className="relative z-10 text-[13px] font-extrabold">
                            Check Out
                        </span>

                        <span className="relative z-10 ml-2">
                            <Icon name="arrow" size={17} />
                        </span>
                    </button>
                </>
            )}
        </aside>
    );
}

/* =========================================================
   PROFILE
========================================================= */

export default function Profile() {
    const { partnerId } = useParams();

    const pageRef = useRef(null);

    const [foods, setFoods] = useState([]);
    const [partner, setPartner] = useState(fallbackPartner);
    const [loading, setLoading] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const [activeCategory, setActiveCategory] = useState("All");

    /* =====================================================
       API
    ===================================================== */

    useEffect(() => {
        const foodRequest = axios.get(
            "http://localhost:3000/api/food",
            {
                withCredentials: true,
            }
        );

        const partnerRequest = axios.get(
            `http://localhost:3000/api/foodpartner/${partnerId}`,
            {
                withCredentials: true,
            }
        );

        Promise.all([foodRequest, partnerRequest])
            .then(([foodResponse, partnerResponse]) => {
                const allFoods =
                    foodResponse.data.foodItems ?? [];

                const partnerFoods = allFoods.filter(
                    (item) => item.foodpartner === partnerId
                );

                setFoods(partnerFoods);

                const data =
                    partnerResponse.data.foodPartner || {};

                setPartner({
                    name:
                        data.name ||
                        fallbackPartner.name,

                    email:
                        data.email ||
                        fallbackPartner.email,

                    bio:
                        data.bio ||
                        data.description ||
                        "",

                    location:
                        data.location ||
                        "",

                    image:
                        data.image ||
                        data.profileImage ||
                        data.avatar ||
                        "",
                });
            })
            .catch((error) => {
                console.error(
                    "Failed to fetch partner profile:",
                    error
                );
            })
            .finally(() => {
                setLoading(false);
            });
    }, [partnerId]);

    /* =====================================================
       CATEGORIES
    ===================================================== */

    const categories = [
        "All",
        ...new Set(
            foods.map((item) => item.category).filter(Boolean)
        ),
    ];

    const visibleFoods =
        activeCategory === "All"
            ? foods
            : foods.filter(
                  (item) =>
                      item.category === activeCategory
              );

    /* =====================================================
       CART
    ===================================================== */

    const addToCart = (item) => {
        setCartItems((currentItems) => {
            const existingItem = currentItems.find(
                (cartItem) =>
                    cartItem.item._id === item._id
            );

            if (existingItem) {
                return currentItems.map((cartItem) =>
                    cartItem.item._id === item._id
                        ? {
                              ...cartItem,
                              quantity:
                                  cartItem.quantity + 1,
                          }
                        : cartItem
                );
            }

            return [
                ...currentItems,
                {
                    item,
                    quantity: 1,
                },
            ];
        });
    };

    const updateQuantity = (itemId, change) => {
        setCartItems((currentItems) =>
            currentItems
                .map((cartItem) =>
                    cartItem.item._id === itemId
                        ? {
                              ...cartItem,
                              quantity:
                                  cartItem.quantity +
                                  change,
                          }
                        : cartItem
                )
                .filter(
                    (cartItem) =>
                        cartItem.quantity > 0
                )
        );
    };

    /* =====================================================
       GSAP + LENIS
    ===================================================== */

    useEffect(() => {
        if (!pageRef.current) return;

        const ctx = gsap.context(() => {
            const lenis = new Lenis({
                duration: 1.15,
                smoothWheel: true,
                touchMultiplier: 1.2,
            });

            const raf = (time) => {
                lenis.raf(time * 1000);
            };

            gsap.ticker.add(raf);
            gsap.ticker.lagSmoothing(0);

            /* ---------------------------------------------
               PAGE INTRO
            --------------------------------------------- */

            const intro = gsap.timeline({
                defaults: {
                    ease: "power3.out",
                },
            });

            intro
                .from("[data-sidebar]", {
                    x: -35,
                    opacity: 0,
                    duration: 0.8,
                })
                .from(
                    "[data-hero]",
                    {
                        y: 35,
                        opacity: 0,
                        scale: 0.97,
                        duration: 0.9,
                    },
                    "-=0.45"
                )
                .from(
                    "[data-category]",
                    {
                        y: 20,
                        opacity: 0,
                        duration: 0.6,
                    },
                    "-=0.45"
                )
                .from(
                    "[data-cart]",
                    {
                        x: 35,
                        opacity: 0,
                        duration: 0.8,
                    },
                    "-=0.7"
                );

            /* ---------------------------------------------
               HERO TEXT
            --------------------------------------------- */

            gsap.from("[data-hero-title]", {
                y: 45,
                opacity: 0,
                duration: 1,
                delay: 0.35,
                ease: "power4.out",
            });

            gsap.from("[data-hero-copy]", {
                y: 25,
                opacity: 0,
                duration: 0.8,
                delay: 0.55,
                ease: "power3.out",
            });

            /* ---------------------------------------------
               FOOD CARDS
            --------------------------------------------- */

            gsap.utils.toArray("[data-food-card]").forEach(
                (card, index) => {
                    gsap.from(card, {
                        y: 45,
                        opacity: 0,
                        scale: 0.97,
                        duration: 0.7,
                        delay: index * 0.04,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 92%",
                            once: true,
                        },
                    });
                }
            );

            /* ---------------------------------------------
               SECTION REVEALS
            --------------------------------------------- */

            gsap.utils
                .toArray("[data-section]")
                .forEach((section) => {
                    gsap.from(section, {
                        y: 30,
                        opacity: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 88%",
                            once: true,
                        },
                    });
                });

            /* ---------------------------------------------
               PARALLAX HERO
            --------------------------------------------- */

            gsap.to("[data-hero-image]", {
                yPercent: 10,
                ease: "none",
                scrollTrigger: {
                    trigger: "[data-hero]",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });

            ScrollTrigger.refresh();

            return () => {
                gsap.ticker.remove(raf);
                lenis.destroy();
            };
        }, pageRef);

        return () => ctx.revert();
    }, [loading]);

    /* =====================================================
       PARTNER STATS
    ===================================================== */

    const categoryCount =
        categories.length > 0
            ? categories.length - 1
            : 0;

    const foodCount = foods.length;

    return (
        <div
            ref={pageRef}
            className="
                min-h-screen
                w-full
                overflow-x-hidden
                bg-[#eee8e1]
                font-ui
                text-[#35271e]
            "
        >
            <div className="flex min-h-screen w-full bg-[#f7f3ee]">

                {/* =================================================
                    SIDEBAR
                ================================================= */}

                <div data-sidebar>
                    <Sidebar partner={partner} />
                </div>

                {/* =================================================
                    MAIN
                ================================================= */}

                <main className="min-w-0 flex-1 bg-[#f7f3ee]">

                    {/* MOBILE HEADER */}

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            border-b
                            border-[#e3d9ce]
                            px-5
                            py-5
                            lg:hidden
                        "
                    >
                        <Link
                            to="/home"
                            className="text-[21px] font-extrabold tracking-[-0.04em]"
                        >
                            CRAVE
                        </Link>

                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f3a21a] text-sm font-extrabold text-white">
                            {partner.name
                                ?.charAt(0)
                                ?.toUpperCase() || "N"}
                        </div>
                    </div>

                    <div
                        className="
                            mx-auto
                            w-full
                            max-w-[960px]
                            px-5
                            py-6
                            sm:px-7
                            lg:px-9
                            xl:px-11
                        "
                    >

                        {/* =================================================
                            HERO
                        ================================================= */}

                        <section
                            data-hero
                            className="
                                relative
                                min-h-[300px]
                                overflow-hidden
                                rounded-[28px]
                                bg-[#28201c]
                                shadow-[0_18px_45px_rgba(61,43,29,0.14)]
                            "
                        >
                            <img
                                data-hero-image
                                src="/Images/TraditionalTable.jpg"
                                alt="Food from the kitchen"
                                className="
                                    absolute
                                    inset-[-8%]
                                    h-[116%]
                                    w-[116%]
                                    object-cover
                                "
                            />

                            <div
                                className="
                                    absolute
                                    inset-0
                                    bg-gradient-to-r
                                    from-black/85
                                    via-black/55
                                    to-black/10
                                "
                            />

                            <div
                                className="
                                    relative
                                    z-10
                                    flex
                                    min-h-[300px]
                                    flex-col
                                    justify-between
                                    p-7
                                    sm:p-9
                                    lg:p-11
                                "
                            >
                                <div>
                                    <span
                                        className="
                                            inline-flex
                                            rounded-full
                                            bg-[#f4a20d]
                                            px-4
                                            py-2
                                            text-[9px]
                                            font-extrabold
                                            uppercase
                                            tracking-[0.15em]
                                            text-white
                                        "
                                    >
                                        Food Partner
                                    </span>

                                    <h1
                                        data-hero-title
                                        className="
                                            mt-5
                                            max-w-[550px]
                                            font-display
                                            text-[45px]
                                            leading-[0.93]
                                            tracking-[-0.035em]
                                            text-white
                                            sm:text-[57px]
                                            lg:text-[66px]
                                        "
                                    >
                                        Best Food
                                        <br />
                                        from{" "}
                                        <span className="text-[#f7b52a]">
                                            {partner.name}
                                        </span>
                                    </h1>

                                    <p
                                        data-hero-copy
                                        className="
                                            mt-5
                                            max-w-[430px]
                                            text-[13px]
                                            font-medium
                                            leading-5
                                            text-white/75
                                            sm:text-[14px]
                                        "
                                    >
                                        {partner.bio ||
                                            "Discover fresh dishes, carefully prepared and served from this local food partner."}
                                    </p>
                                </div>

                                <div className="mt-8 flex flex-wrap items-center gap-3">

                                    <a
                                        href="#popular-food"
                                        className="
                                            inline-flex
                                            min-h-[52px]
                                            items-center
                                            gap-2
                                            rounded-[15px]
                                            bg-[#f4a20d]
                                            px-6
                                            text-[12px]
                                            font-extrabold
                                            text-white
                                            shadow-[0_10px_25px_rgba(244,162,13,0.25)]
                                            transition-all
                                            hover:-translate-y-1
                                            hover:bg-[#df8d00]
                                        "
                                    >
                                        Explore menu
                                        <Icon
                                            name="arrow"
                                            size={16}
                                        />
                                    </a>

                                    <div
                                        className="
                                            flex
                                            min-h-[52px]
                                            items-center
                                            gap-3
                                            rounded-[15px]
                                            border
                                            border-white/20
                                            bg-white/10
                                            px-5
                                            backdrop-blur-md
                                        "
                                    >
                                        <div className="flex text-[#ffc34d]">
                                            <Icon
                                                name="star"
                                                size={13}
                                            />
                                            <Icon
                                                name="star"
                                                size={13}
                                            />
                                            <Icon
                                                name="star"
                                                size={13}
                                            />
                                            <Icon
                                                name="star"
                                                size={13}
                                            />
                                            <Icon
                                                name="star"
                                                size={13}
                                            />
                                        </div>

                                        <span className="text-[10px] font-bold text-white">
                                            Food partner
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* =================================================
                            PARTNER PROFILE
                        ================================================= */}

                        <section
                            data-section
                            className="mt-7"
                        >
                            <div
                                className="
                                    rounded-[26px]
                                    border
                                    border-[#e3d9ce]
                                    bg-white
                                    p-6
                                    shadow-[0_8px_30px_rgba(67,47,30,0.05)]
                                    sm:p-7
                                "
                            >
                                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

                                    {/* PROFILE */}

                                    <div className="flex items-center gap-5">
                                        <div
                                            className="
                                                flex
                                                h-[82px]
                                                w-[82px]
                                                shrink-0
                                                items-center
                                                justify-center
                                                overflow-hidden
                                                rounded-[24px]
                                                bg-[#f4a20d]
                                                text-[28px]
                                                font-extrabold
                                                text-white
                                            "
                                        >
                                            {partner.image ? (
                                                <img
                                                    src={
                                                        partner.image
                                                    }
                                                    alt={
                                                        partner.name
                                                    }
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                partner.name
                                                    ?.charAt(0)
                                                    ?.toUpperCase() ||
                                                "N"
                                            )}
                                        </div>

                                        <div>
                                            <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#b09b88]">
                                                About the partner
                                            </p>

                                            <h2 className="mt-1 font-display text-[29px] leading-none text-[#30241c]">
                                                {partner.name}
                                            </h2>

                                            <p className="mt-2 text-[11px] font-semibold text-[#9a8777]">
                                                Local food partner
                                            </p>
                                        </div>
                                    </div>

                                    {/* CONTACT */}

                                    <div className="flex flex-wrap gap-2">
                                        {partner.email && (
                                            <div
                                                className="
                                                    flex
                                                    min-h-[44px]
                                                    items-center
                                                    gap-2
                                                    rounded-[13px]
                                                    bg-[#f7f1eb]
                                                    px-4
                                                    text-[10px]
                                                    font-bold
                                                    text-[#705d4c]
                                                "
                                            >
                                                <Icon
                                                    name="mail"
                                                    size={15}
                                                />

                                                <span>
                                                    {
                                                        partner.email
                                                    }
                                                </span>
                                            </div>
                                        )}

                                        {partner.location && (
                                            <div
                                                className="
                                                    flex
                                                    min-h-[44px]
                                                    items-center
                                                    gap-2
                                                    rounded-[13px]
                                                    bg-[#f7f1eb]
                                                    px-4
                                                    text-[10px]
                                                    font-bold
                                                    text-[#705d4c]
                                                "
                                            >
                                                <Icon
                                                    name="location"
                                                    size={15}
                                                />

                                                {
                                                    partner.location
                                                }
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* STATS */}

                                <div className="mt-6 grid grid-cols-3 gap-3">
                                    <div className="rounded-[17px] bg-[#f8f3ed] p-4">
                                        <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-[#a39180]">
                                            Dishes
                                        </p>

                                        <p className="mt-1 text-[25px] font-extrabold tracking-tight text-[#33261d]">
                                            {foodCount}
                                        </p>
                                    </div>

                                    <div className="rounded-[17px] bg-[#f8f3ed] p-4">
                                        <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-[#a39180]">
                                            Categories
                                        </p>

                                        <p className="mt-1 text-[25px] font-extrabold tracking-tight text-[#33261d]">
                                            {categoryCount}
                                        </p>
                                    </div>

                                    <div className="rounded-[17px] bg-[#f8f3ed] p-4">
                                        <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-[#a39180]">
                                            Status
                                        </p>

                                        <p className="mt-1 text-[18px] font-extrabold tracking-tight text-[#5d9a43]">
                                            Active
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* =================================================
                            CATEGORY
                        ================================================= */}

                        <section
                            data-category
                            data-section
                            className="mt-9"
                        >
                            <div className="flex items-end justify-between">
                                <div>
                                    <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#ad9986]">
                                        Discover
                                    </p>

                                    <h2 className="mt-1 font-display text-[32px] leading-none text-[#33261d]">
                                        Menu Category
                                    </h2>
                                </div>

                                <span className="hidden text-[10px] font-semibold text-[#a08d7d] sm:block">
                                    Choose what you crave
                                </span>
                            </div>

                            <div
                                className="
                                    mt-5
                                    flex
                                    gap-3
                                    overflow-x-auto
                                    pb-2
                                    scrollbar-none
                                "
                            >
                                {categories.map((category) => {
                                    const isActive =
                                        activeCategory ===
                                        category;

                                    const emoji =
                                        category ===
                                        "All"
                                            ? "🍽️"
                                            : category
                                                  .toLowerCase()
                                                  .includes(
                                                      "burger"
                                                  )
                                            ? "🍔"
                                            : category
                                                  .toLowerCase()
                                                  .includes(
                                                      "pizza"
                                                  )
                                            ? "🍕"
                                            : category
                                                  .toLowerCase()
                                                  .includes(
                                                      "cake"
                                                  )
                                            ? "🍰"
                                            : category
                                                  .toLowerCase()
                                                  .includes(
                                                      "donut"
                                                  )
                                            ? "🍩"
                                            : category
                                                  .toLowerCase()
                                                  .includes(
                                                      "hot"
                                                  )
                                            ? "🌭"
                                            : "🍴";

                                    return (
                                        <button
                                            key={category}
                                            type="button"
                                            onClick={() =>
                                                setActiveCategory(
                                                    category
                                                )
                                            }
                                            className={`
                                                flex
                                                min-h-[48px]
                                                shrink-0
                                                items-center
                                                gap-2
                                                rounded-[15px]
                                                border
                                                px-5
                                                text-[11px]
                                                font-extrabold
                                                transition-all
                                                duration-300
                                                ${
                                                    isActive
                                                        ? "border-[#f1a10d] bg-[#f1a10d] text-white shadow-[0_8px_20px_rgba(241,161,13,0.2)]"
                                                        : "border-[#e4d9ce] bg-white text-[#806e5e] hover:-translate-y-1 hover:border-[#f1c878]"
                                                }
                                            `}
                                        >
                                            <span className="text-[17px]">
                                                {emoji}
                                            </span>

                                            {category}
                                        </button>
                                    );
                                })}
                            </div>
                        </section>

                        {/* =================================================
                            FOOD
                        ================================================= */}

                        <section
                            data-section
                            id="popular-food"
                            className="mt-10 pb-10"
                        >
                            <div className="mb-5 flex items-end justify-between">
                                <div>
                                    <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#ad9986]">
                                        From the kitchen
                                    </p>

                                    <h2 className="mt-1 font-display text-[34px] leading-none text-[#33261d]">
                                        Popular Food
                                    </h2>
                                </div>

                                <div className="rounded-full bg-[#fff0d3] px-4 py-2 text-[10px] font-extrabold text-[#df8a0c]">
                                    {visibleFoods.length} dishes
                                </div>
                            </div>

                            {loading ? (
                                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                                    {[1, 2, 3, 4, 5, 6].map(
                                        (item) => (
                                            <div
                                                key={item}
                                                className="overflow-hidden rounded-[24px] bg-white"
                                            >
                                                <div className="aspect-[1.2/1] animate-pulse bg-[#e9e0d5]" />

                                                <div className="space-y-3 p-5">
                                                    <div className="h-4 w-3/4 animate-pulse rounded bg-[#e9e0d5]" />

                                                    <div className="h-3 w-1/2 animate-pulse rounded bg-[#e9e0d5]" />
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            ) : visibleFoods.length > 0 ? (
                                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                                    {visibleFoods.map(
                                        (item, index) => (
                                            <FoodCard
                                                key={
                                                    item._id
                                                }
                                                item={item}
                                                index={
                                                    index
                                                }
                                                onAdd={
                                                    addToCart
                                                }
                                            />
                                        )
                                    )}
                                </div>
                            ) : (
                                <div
                                    className="
                                        flex
                                        min-h-[300px]
                                        flex-col
                                        items-center
                                        justify-center
                                        rounded-[26px]
                                        border
                                        border-dashed
                                        border-[#dfd2c5]
                                        bg-white
                                        text-center
                                    "
                                >
                                    <div className="text-4xl">
                                        🍽️
                                    </div>

                                    <p className="mt-4 text-[15px] font-extrabold text-[#46352a]">
                                        No meals published yet
                                    </p>

                                    <p className="mt-1 text-[10px] font-medium text-[#a08e7d]">
                                        New dishes from this
                                        kitchen will appear
                                        here.
                                    </p>
                                </div>
                            )}
                        </section>
                    </div>
                </main>

                {/* =================================================
                    CART
                ================================================= */}

                <div data-cart>
                    <CartPanel
                        cartItems={cartItems}
                        updateQuantity={updateQuantity}
                    />
                </div>
            </div>
        </div>
    );
}