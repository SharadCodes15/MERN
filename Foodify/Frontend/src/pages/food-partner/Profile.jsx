import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

const fallbackPartner = {
    name: "Neighborhood Kitchen",
    email: "",
};

/* =========================================================
   ICONS
========================================================= */

const Icon = ({ name, size = 18 }) => {
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
        search: (
            <>
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-4-4" />
            </>
        ),
    };

    return <svg {...common}>{icons[name]}</svg>;
};

/* =========================================================
   FOOD CARD
========================================================= */

function FoodCard({ item, onAdd }) {
    const videoRef = useRef(null);

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
            onPointerEnter={handleEnter}
            onPointerLeave={handleLeave}
            className="
                group
                min-w-0
                overflow-hidden
                rounded-[20px]
                border
                border-[#e8dfd4]
                bg-white
                shadow-[0_6px_20px_rgba(67,47,30,0.06)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-[0_14px_30px_rgba(67,47,30,0.12)]
            "
        >
            {/* IMAGE */}
            <div className="relative aspect-[1.25/1] overflow-hidden bg-[#f3eadf]">
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
                        group-hover:scale-105
                    "
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                <span
                    className="
                        absolute
                        left-3
                        top-3
                        rounded-full
                        bg-white/95
                        px-2.5
                        py-1
                        text-[8px]
                        font-black
                        uppercase
                        tracking-[0.12em]
                        text-[#65432c]
                        shadow-sm
                    "
                >
                    Fresh
                </span>

                <button
                    onClick={() => onAdd(item)}
                    type="button"
                    className="
                        absolute
                        bottom-3
                        right-3
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-xl
                        bg-[#f4a20a]
                        text-white
                        shadow-lg
                        transition
                        hover:bg-[#e88900]
                        active:scale-90
                    "
                >
                    <Icon name="plus" size={16} />
                </button>
            </div>

            {/* DETAILS */}
            <div className="p-3.5">
                <h3 className="truncate text-[13px] font-black text-[#39281c]">
                    {item.name}
                </h3>

                <p className="mt-1 truncate text-[9px] text-[#a08b78]">
                    {item.description || "Freshly prepared with care"}
                </p>

                <div className="mt-3 flex items-center justify-between">
                    <span className="text-[13px] font-black text-[#302218]">
                        $4,92
                    </span>

                    <span className="text-[9px] font-bold text-[#a08b78]">
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
                w-[220px]
                shrink-0
                flex-col
                border-r
                border-[#e6ddd2]
                bg-[#f7f3ee]
                px-5
                py-6
                lg:flex
            "
        >
            {/* PROFILE */}
            <div className="flex flex-col items-center">
                <div
                    className="
                        flex
                        h-[58px]
                        w-[58px]
                        items-center
                        justify-center
                        overflow-hidden
                        rounded-[18px]
                        bg-[#f5a623]
                        text-xl
                        font-black
                        text-white
                        shadow-[0_8px_20px_rgba(245,166,35,0.2)]
                    "
                >
                    {partner.name?.charAt(0)?.toUpperCase() || "N"}
                </div>

                <h3 className="mt-3 text-[12px] font-black text-[#34261c]">
                    {partner.name}
                </h3>
            </div>

            {/* BALANCE */}
            <div className="mt-7 px-2">
                <p className="text-[8px] font-medium text-[#998a7b]">
                    Your Balance
                </p>

                <p className="mt-0.5 text-[21px] font-black tracking-tight text-[#19130f]">
                    $1,328
                </p>
            </div>

            {/* NAVIGATION */}
            <nav className="mt-7 space-y-1.5">
                <Link
                    to="/home"
                    className="
                        flex
                        items-center
                        gap-3
                        rounded-[11px]
                        bg-[#2d2230]
                        px-4
                        py-3
                        text-[10px]
                        font-bold
                        text-white
                        shadow-[0_6px_15px_rgba(45,34,48,0.15)]
                    "
                >
                    <span className="text-[#f3a51b]">
                        <Icon name="home" size={16} />
                    </span>
                    Home
                </Link>

                <Link
                    to="/saved"
                    className="
                        flex
                        items-center
                        gap-3
                        rounded-[11px]
                        px-4
                        py-3
                        text-[10px]
                        font-semibold
                        text-[#8e8074]
                        transition
                        hover:bg-white
                        hover:text-[#35261c]
                    "
                >
                    <Icon name="heart" size={16} />
                    Favorite
                </Link>

                <Link
                    to="/articles"
                    className="
                        flex
                        items-center
                        gap-3
                        rounded-[11px]
                        px-4
                        py-3
                        text-[10px]
                        font-semibold
                        text-[#8e8074]
                        transition
                        hover:bg-white
                        hover:text-[#35261c]
                    "
                >
                    <Icon name="article" size={16} />
                    Articles
                </Link>

                <Link
                    to="/settings"
                    className="
                        flex
                        items-center
                        gap-3
                        rounded-[11px]
                        px-4
                        py-3
                        text-[10px]
                        font-semibold
                        text-[#8e8074]
                        transition
                        hover:bg-white
                        hover:text-[#35261c]
                    "
                >
                    <Icon name="settings" size={16} />
                    Setting
                </Link>
            </nav>

            {/* LOGOUT */}
            <div className="mt-auto">
                <button
                    type="button"
                    className="
                        flex
                        w-full
                        items-center
                        gap-3
                        rounded-[11px]
                        px-4
                        py-3
                        text-[10px]
                        font-semibold
                        text-[#8e8074]
                        transition
                        hover:bg-white
                        hover:text-[#35261c]
                    "
                >
                    <Icon name="logout" size={16} />
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
                w-[285px]
                shrink-0
                flex-col
                border-l
                border-[#e6ddd2]
                bg-[#f7f3ee]
                px-5
                py-7
                xl:flex
            "
        >
            {/* CART HEADER */}
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-[18px] font-black text-[#2e241c]">
                        My Cart
                    </h2>

                    <p className="mt-1 max-w-[170px] text-[8px] leading-3 text-[#918174]">
                        Manage your purchases in the cart earlier to determine
                        the money you spend
                    </p>
                </div>

                <div className="relative flex h-8 w-8 items-center justify-center">
                    <Icon name="bell" size={18} />

                    <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-[#ef6b4b]" />
                </div>
            </div>

            {/* ITEMS */}
            <div className="mt-5 space-y-3">
                {cartItems.length === 0 ? (
                    <div
                        className="
                            rounded-[15px]
                            border
                            border-[#e6ddd2]
                            bg-white
                            px-4
                            py-7
                            text-center
                        "
                    >
                        <div className="text-2xl">🛒</div>

                        <p className="mt-2 text-[11px] font-black text-[#493629]">
                            Your cart is empty
                        </p>

                        <p className="mt-1 text-[8px] text-[#a39180]">
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
                                rounded-[15px]
                                border
                                border-[#e6ddd2]
                                bg-white
                                p-2.5
                            "
                        >
                            <div className="h-[46px] w-[46px] shrink-0 overflow-hidden rounded-[12px] bg-[#f0e6da]">
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
                                <p className="truncate text-[9px] font-black text-[#463428]">
                                    {item.name}
                                </p>

                                <p className="mt-1 text-[10px] font-black text-[#292018]">
                                    $4,92
                                </p>
                            </div>

                            <div className="flex items-center gap-1">
                                <button
                                    type="button"
                                    onClick={() =>
                                        updateQuantity(item._id, -1)
                                    }
                                    className="
                                        flex
                                        h-5
                                        w-5
                                        items-center
                                        justify-center
                                        text-[#786858]
                                    "
                                >
                                    <Icon name="minus" size={11} />
                                </button>

                                <span className="flex h-5 min-w-5 items-center justify-center rounded-[5px] bg-[#302432] px-1 text-[9px] font-bold text-white">
                                    {quantity}
                                </span>

                                <button
                                    type="button"
                                    onClick={() =>
                                        updateQuantity(item._id, 1)
                                    }
                                    className="
                                        flex
                                        h-5
                                        w-5
                                        items-center
                                        justify-center
                                        text-[#786858]
                                    "
                                >
                                    <Icon name="plus" size={11} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* DELETE / TOTAL */}
            {cartItems.length > 0 && (
                <>
                    <div className="mt-4 flex items-center justify-between">
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
                                h-[50px]
                                w-[48px]
                                items-center
                                justify-center
                                rounded-[13px]
                                bg-[#302432]
                                text-white
                            "
                        >
                            <Icon name="trash" size={17} />
                        </button>

                        <div className="text-right">
                            <p className="text-[9px] text-[#918174]">
                                Total
                            </p>

                            <p className="text-[19px] font-black text-[#241b15]">
                                ${cartTotal.toFixed(2).replace(".", ",")}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="
                            relative
                            mt-3
                            h-[48px]
                            w-full
                            overflow-hidden
                            rounded-[14px]
                            bg-[#d88428]
                            text-left
                            text-white
                            shadow-[0_8px_20px_rgba(216,132,40,0.18)]
                        "
                    >
                        <img
                            src="/Images/TraditionalTable.jpg"
                            alt=""
                            className="absolute inset-0 h-full w-full object-cover opacity-50"
                        />

                        <span className="relative z-10 flex h-full items-center justify-center text-[10px] font-black">
                            Check Out
                        </span>
                    </button>
                </>
            )}
        </aside>
    );
}

/* =========================================================
   MAIN PROFILE
========================================================= */

export default function Profile() {
    const { partnerId } = useParams();

    const [foods, setFoods] = useState([]);
    const [partner, setPartner] = useState(fallbackPartner);
    const [loading, setLoading] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const [activeCategory, setActiveCategory] = useState("All");

    useEffect(() => {
        const foodRequest = axios.get("http://localhost:3000/api/food", {
            withCredentials: true,
        });

        const partnerRequest = axios.get(
            `http://localhost:3000/api/foodpartner/${partnerId}`,
            {
                withCredentials: true,
            }
        );

        Promise.all([foodRequest, partnerRequest])
            .then(([foodResponse, partnerResponse]) => {
                const allFoods = foodResponse.data.foodItems ?? [];

                const partnerFoods = allFoods.filter(
                    (item) => item.foodpartner === partnerId
                );

                setFoods(partnerFoods);

                setPartner({
                    name:
                        partnerResponse.data.foodPartner?.name ||
                        fallbackPartner.name,

                    email:
                        partnerResponse.data.foodPartner?.email ||
                        fallbackPartner.email,
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
                  (item) => item.category === activeCategory
              );

    const addToCart = (item) => {
        setCartItems((currentItems) => {
            const existingItem = currentItems.find(
                (cartItem) => cartItem.item._id === item._id
            );

            if (existingItem) {
                return currentItems.map((cartItem) =>
                    cartItem.item._id === item._id
                        ? {
                              ...cartItem,
                              quantity: cartItem.quantity + 1,
                          }
                        : cartItem
                );
            }

            return [...currentItems, { item, quantity: 1 }];
        });
    };

    const updateQuantity = (itemId, change) => {
        setCartItems((currentItems) =>
            currentItems
                .map((cartItem) =>
                    cartItem.item._id === itemId
                        ? {
                              ...cartItem,
                              quantity: cartItem.quantity + change,
                          }
                        : cartItem
                )
                .filter((cartItem) => cartItem.quantity > 0)
        );
    };

    return (
        <div
            className="
                min-h-screen
                w-full
                overflow-x-hidden
                bg-[#eee8e1]
                text-[#35271e]
            "
        >
            <div
                className="
                    flex
                    min-h-screen
                    w-full
                    bg-[#f7f3ee]
                "
            >
                {/* =====================================================
                    LEFT SIDEBAR
                ====================================================== */}

                <Sidebar partner={partner} />

                {/* =====================================================
                    MAIN
                ====================================================== */}

                <main
                    className="
                        min-w-0
                        flex-1
                        overflow-hidden
                        bg-[#f7f3ee]
                    "
                >
                    {/* MOBILE TOP BAR */}
                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            border-b
                            border-[#e6ddd2]
                            px-5
                            py-4
                            lg:hidden
                        "
                    >
                        <Link
                            to="/home"
                            className="text-lg font-black text-[#34261c]"
                        >
                            CRAVE
                        </Link>

                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f4a20a] font-black text-white">
                            {partner.name?.charAt(0)?.toUpperCase() ||
                                "N"}
                        </div>
                    </div>

                    <div
                        className="
                            mx-auto
                            w-full
                            max-w-[900px]
                            px-5
                            py-6
                            sm:px-7
                            lg:px-8
                            xl:px-10
                        "
                    >
                        {/* =================================================
                            HERO
                        ================================================== */}

                        <section
                            className="
                                relative
                                h-[185px]
                                overflow-hidden
                                rounded-[20px]
                                bg-[#26201d]
                                shadow-[0_12px_35px_rgba(60,43,30,0.12)]
                            "
                        >
                            <img
                                src="/Images/TraditionalTable.jpg"
                                alt="Food"
                                className="
                                    absolute
                                    inset-0
                                    h-full
                                    w-full
                                    object-cover
                                "
                            />

                            <div
                                className="
                                    absolute
                                    inset-0
                                    bg-gradient-to-r
                                    from-black/80
                                    via-black/40
                                    to-transparent
                                "
                            />

                            <div
                                className="
                                    relative
                                    z-10
                                    flex
                                    h-full
                                    max-w-[430px]
                                    flex-col
                                    justify-center
                                    px-7
                                    sm:px-9
                                "
                            >
                                <h1
                                    className="
                                        text-[29px]
                                        font-black
                                        leading-none
                                        tracking-[-0.04em]
                                        text-white
                                        sm:text-[35px]
                                    "
                                >
                                    Best Food
                                </h1>

                                <p
                                    className="
                                        mt-2
                                        max-w-[230px]
                                        text-[9px]
                                        leading-4
                                        text-white/80
                                    "
                                >
                                    Find food according to your wishes
                                    with the best dishes from{" "}
                                    {partner.name}.
                                </p>

                                <span
                                    className="
                                        mt-4
                                        w-fit
                                        rounded-full
                                        bg-[#f4a20a]
                                        px-3
                                        py-1.5
                                        text-[8px]
                                        font-black
                                        uppercase
                                        tracking-[0.12em]
                                        text-white
                                    "
                                >
                                    Explore menu
                                </span>
                            </div>
                        </section>

                        {/* =================================================
                            CATEGORY
                        ================================================== */}

                        <section className="mt-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-[16px] font-black text-[#33251b]">
                                    Menu Category
                                </h2>

                                <span className="text-[8px] font-semibold text-[#a08d7d]">
                                    {foods.length} dishes
                                </span>
                            </div>

                            <div
                                className="
                                    mt-3
                                    flex
                                    gap-5
                                    overflow-x-auto
                                    pb-1
                                    scrollbar-none
                                "
                            >
                                {categories.map((category) => {
                                    const isActive =
                                        activeCategory === category;

                                    const emoji =
                                        category === "All"
                                            ? "🍽️"
                                            : category
                                                  .toLowerCase()
                                                  .includes("burger")
                                            ? "🍔"
                                            : category
                                                  .toLowerCase()
                                                  .includes("pizza")
                                            ? "🍕"
                                            : category
                                                  .toLowerCase()
                                                  .includes("cake")
                                            ? "🍰"
                                            : category
                                                  .toLowerCase()
                                                  .includes("donut")
                                            ? "🍩"
                                            : category
                                                  .toLowerCase()
                                                  .includes("hot")
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
                                                relative
                                                flex
                                                shrink-0
                                                items-center
                                                gap-1.5
                                                pb-2
                                                text-[10px]
                                                font-bold
                                                transition
                                                ${
                                                    isActive
                                                        ? "text-[#3b2b21]"
                                                        : "text-[#9c8b7c]"
                                                }
                                            `}
                                        >
                                            <span className="text-[14px]">
                                                {emoji}
                                            </span>

                                            {category}

                                            {isActive && (
                                                <span
                                                    className="
                                                        absolute
                                                        bottom-0
                                                        left-0
                                                        h-[2px]
                                                        w-full
                                                        rounded-full
                                                        bg-[#f0a11a]
                                                    "
                                                />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </section>

                        {/* =================================================
                            FOOD
                        ================================================== */}

                        <section
                            id="popular-food"
                            className="mt-5"
                        >
                            <div className="mb-3 flex items-center justify-between">
                                <div>
                                    <p className="text-[8px] font-black uppercase tracking-[0.14em] text-[#ae9b89]">
                                        Fresh today
                                    </p>

                                    <h2 className="mt-0.5 text-[17px] font-black text-[#34261c]">
                                        Popular Food
                                    </h2>
                                </div>

                                <button
                                    type="button"
                                    className="
                                        rounded-full
                                        bg-[#fff0d2]
                                        px-3
                                        py-1.5
                                        text-[8px]
                                        font-black
                                        text-[#df8a0c]
                                    "
                                >
                                    View all
                                </button>
                            </div>

                            {loading ? (
                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                    {[1, 2, 3, 4, 5, 6].map(
                                        (item) => (
                                            <div
                                                key={item}
                                                className="
                                                    overflow-hidden
                                                    rounded-[20px]
                                                    bg-white
                                                "
                                            >
                                                <div className="aspect-[1.25/1] animate-pulse bg-[#e9e0d5]" />

                                                <div className="space-y-2 p-3.5">
                                                    <div className="h-3 w-3/4 animate-pulse rounded bg-[#e9e0d5]" />
                                                    <div className="h-2 w-1/2 animate-pulse rounded bg-[#e9e0d5]" />
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            ) : visibleFoods.length > 0 ? (
                                <div
                                    className="
                                        grid
                                        grid-cols-2
                                        gap-3
                                        sm:grid-cols-3
                                    "
                                >
                                    {visibleFoods.map((item) => (
                                        <FoodCard
                                            key={item._id}
                                            item={item}
                                            onAdd={addToCart}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div
                                    className="
                                        flex
                                        min-h-[250px]
                                        flex-col
                                        items-center
                                        justify-center
                                        rounded-[20px]
                                        border
                                        border-dashed
                                        border-[#dfd2c5]
                                        bg-white
                                        text-center
                                    "
                                >
                                    <div className="text-3xl">
                                        🍽️
                                    </div>

                                    <p className="mt-3 text-[12px] font-black text-[#46352a]">
                                        No meals published yet
                                    </p>

                                    <p className="mt-1 text-[9px] text-[#a08e7d]">
                                        New dishes will appear here.
                                    </p>
                                </div>
                            )}
                        </section>
                    </div>
                </main>

                {/* =====================================================
                    RIGHT CART
                ====================================================== */}

                <CartPanel
                    cartItems={cartItems}
                    updateQuantity={updateQuantity}
                />
            </div>
        </div>
    );
}