import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const initialFormState = {
  name: "",
  description: "",
};

const popularFoods = [
  {
    id: 1,
    name: "Signature Burger",
    category: "Burgers",
    price: "₹249",
    rating: "4.9",
    image: "/Images/burger.png",
  },
  {
    id: 2,
    name: "Chicken Biryani",
    category: "Indian",
    price: "₹299",
    rating: "4.8",
    image: "/Images/biryani.png",
  },
  {
    id: 3,
    name: "Crispy Roll",
    category: "Street Food",
    price: "₹149",
    rating: "4.7",
    image: "/Images/roll.png",
  },
  {
    id: 4,
    name: "Spicy Ramen",
    category: "Asian",
    price: "₹279",
    rating: "4.9",
    image: "/Images/ramen.png",
  },
];

const restaurants = [
  {
    id: 1,
    name: "Your Kitchen",
    category: "Independent Kitchen",
    image: "/Images/rollhand.jpg",
  },
  {
    id: 2,
    name: "CRAVE Partner",
    category: "Food & Dining",
    image: "/Images/burger.png",
  },
  {
    id: 3,
    name: "Kitchen Atelier",
    category: "Artisan Food",
    image: "/Images/biryani.png",
  },
];

export default function CreateFood() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState(initialFormState);
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [activeNav, setActiveNav] = useState("home");

  /* =========================
     INPUT
  ========================= */

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  /* =========================
     VIDEO
  ========================= */

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("video/")) {
      setError("Please select a valid video file.");
      return;
    }

    // 50 MB warning
    if (file.size > 50 * 1024 * 1024) {
      setError("Video is larger than 50MB. Please choose a smaller file.");
      return;
    }

    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }

    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
    setError("");
  };

  const handleRemoveVideo = () => {
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }

    setVideoFile(null);
    setVideoPreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /* =========================
     CLEANUP VIDEO URL
  ========================= */

  useEffect(() => {
    return () => {
      if (videoPreview) {
        URL.revokeObjectURL(videoPreview);
      }
    };
  }, [videoPreview]);

  /* =========================
     RESET FORM
  ========================= */

  const resetForm = () => {
    setFormData(initialFormState);
    handleRemoveVideo();
    setError("");
  };

  /* =========================
     SUBMIT FOOD
  ========================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError("Please enter a dish name.");
      return;
    }

    if (!formData.description.trim()) {
      setError("Please enter a dish description.");
      return;
    }

    if (!videoFile) {
      setError("Please upload a video of the dish preparation or plating.");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccess("");

    const data = new FormData();

    data.append("name", formData.name.trim());
    data.append("description", formData.description.trim());
    data.append("video", videoFile);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/food",
        data,
        {
          withCredentials: true,
        }
      );

      console.log("Food created:", response.data);

      setSuccess("Dish published successfully.");

      resetForm();

      setTimeout(() => {
        setShowCreateForm(false);
        setSuccess("");
      }, 1200);
    } catch (err) {
      console.error("Failed to add food item:", err);

      setError(
        err.response?.data?.message ||
          "Unable to publish the dish. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =========================
     NAVIGATION
  ========================= */

  const handleNavClick = (item) => {
    setActiveNav(item);

    if (item === "home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    if (item === "menu") {
      document
        .getElementById("popular-food")
        ?.scrollIntoView({ behavior: "smooth" });
    }

    if (item === "create") {
      setShowCreateForm(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#eef0ff] font-sans text-[#29234f]">
      <div className="mx-auto flex min-h-screen max-w-[1500px]">

        {/* =====================================================
            SIDEBAR
        ===================================================== */}

        <aside className="hidden w-[105px] shrink-0 flex-col items-center justify-between bg-[#2d2362] py-7 text-white lg:flex">
          <div className="flex flex-col items-center">

            {/* Logo */}
            <Link
              to="/"
              className="mb-14 text-xl font-black tracking-[-0.08em]"
            >
              C<span className="text-orange-400">.</span>
            </Link>

            {/* Navigation */}
            <nav className="flex flex-col items-center gap-7">

              <SidebarButton
                active={activeNav === "home"}
                onClick={() => handleNavClick("home")}
                icon={<HomeIcon />}
              />

              <SidebarButton
                active={activeNav === "menu"}
                onClick={() => handleNavClick("menu")}
                icon={<MenuIcon />}
              />

              <SidebarButton
                active={activeNav === "orders"}
                onClick={() => handleNavClick("orders")}
                icon={<BagIcon />}
              />

              <SidebarButton
                active={activeNav === "favorites"}
                onClick={() => handleNavClick("favorites")}
                icon={<HeartIcon />}
              />

              <SidebarButton
                active={activeNav === "messages"}
                onClick={() => handleNavClick("messages")}
                icon={<MessageIcon />}
              />

              <SidebarButton
                active={activeNav === "settings"}
                onClick={() => handleNavClick("settings")}
                icon={<SettingsIcon />}
              />
            </nav>
          </div>

          {/* Logout */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex h-11 w-11 items-center justify-center rounded-xl text-white/50 transition hover:bg-white/10 hover:text-white"
            title="Exit"
          >
            <LogoutIcon />
          </button>
        </aside>

        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <main className="min-w-0 flex-1 px-4 py-5 sm:px-6 lg:px-8 xl:px-10">

          {/* TOP BAR */}
          <header className="mb-7 flex items-center justify-between gap-4">

            {/* Search */}
            <div className="relative w-full max-w-[360px]">
              <SearchIcon />

              <input
                type="text"
                placeholder="Search food name / restaurant"
                className="h-11 w-full rounded-full border-0 bg-white/70 pl-11 pr-4 text-sm text-black outline-none placeholder:text-[#817e9c] shadow-sm transition focus:bg-white focus:ring-2 focus:ring-[#2d2362]/10"
              />
            </div>

            {/* User */}
            <div className="flex shrink-0 items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-xs font-bold text-[#29234f]">
                  Food Partner
                </p>
                <p className="text-[10px] text-[#817e9c]">
                  Kitchen account
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#2d2362] text-sm font-bold text-white">
                F
              </div>
            </div>
          </header>

          {/* =====================================================
              DASHBOARD CONTENT
          ===================================================== */}

          <section className="mx-auto max-w-[1120px]">

            {/* DATE / WELCOME */}
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-[#817e9c]">
                  PARTNER DASHBOARD
                </p>

                <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#29234f] sm:text-3xl">
                  Good food starts here.
                </h1>
              </div>

              <p className="hidden text-xs font-semibold text-[#514c70] sm:block">
                {new Date().toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            {/* =================================================
                PROMOTIONAL BANNER
            ================================================= */}

            <section className="relative mb-9 min-h-[150px] overflow-hidden rounded-[26px] bg-[#dbe5ff] px-6 py-7 shadow-sm sm:px-8">

              <div className="relative z-10 max-w-[520px]">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-[#716b92]">
                  CRAVE Partner
                </p>

                <h2 className="text-2xl font-bold leading-tight text-[#29234f] sm:text-3xl">
                  Turn your best dishes
                  <br />
                  into everyone's craving.
                </h2>

                <p className="mt-2 max-w-md text-xs leading-5 text-[#716b92]">
                  Publish dishes, share your kitchen story and reach customers
                  looking for something worth ordering.
                </p>
              </div>

              {/* Decorative food */}
              <div className="pointer-events-none absolute -right-5 -top-5 hidden h-44 w-44 rotate-6 rounded-full bg-white/50 sm:block">
                <img
                  src="/Images/burger.png"
                  alt=""
                  className="absolute inset-3 h-[90%] w-[90%] object-contain drop-shadow-xl"
                />
              </div>

              <div className="pointer-events-none absolute -bottom-10 right-24 hidden h-24 w-24 rounded-full bg-[#f9c2ae]/70 md:block" />
            </section>

            {/* =================================================
                POPULAR FOOD
            ================================================= */}

            <section id="popular-food" className="mb-10">

              <div className="mb-4 flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8c88a3]">
                    Your menu
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-[#29234f]">
                    Popular this week
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => handleNavClick("create")}
                  className="flex items-center gap-2 text-xs font-bold text-[#514b75] transition hover:text-[#2d2362]"
                >
                  Add dish
                  <span className="text-base">+</span>
                </button>
              </div>

              <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-none">

                {popularFoods.map((food) => (
                  <FoodCard
                    key={food.id}
                    food={food}
                  />
                ))}

                {/* Add card */}
                <button
                  type="button"
                  onClick={() => setShowCreateForm(true)}
                  className="flex h-[185px] w-[145px] shrink-0 flex-col items-center justify-center rounded-[22px] border-2 border-dashed border-[#b9b5ce] bg-white/30 text-[#817d9d] transition hover:border-[#2d2362] hover:bg-white/70 hover:text-[#2d2362]"
                >
                  <span className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl shadow-sm">
                    +
                  </span>

                  <span className="text-xs font-bold">
                    Add new dish
                  </span>
                </button>
              </div>
            </section>

            {/* =================================================
                RESTAURANTS / KITCHEN
            ================================================= */}

            <section className="mb-8">

              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8c88a3]">
                    Partner profile
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-[#29234f]">
                    Your kitchen
                  </h2>
                </div>

                <button
                  type="button"
                  className="text-xs font-bold text-[#514b75] hover:text-[#2d2362]"
                >
                  View profile
                </button>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {restaurants.map((restaurant) => (
                  <div
                    key={restaurant.id}
                    className="flex items-center gap-3 rounded-[18px] bg-white/75 p-3 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                  >
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="h-14 w-14 rounded-xl object-cover"
                    />

                    <div className="min-w-0">
                      <h3 className="truncate text-xs font-bold text-[#29234f]">
                        {restaurant.name}
                      </h3>

                      <p className="mt-1 truncate text-[10px] text-[#8a86a1]">
                        {restaurant.category}
                      </p>

                      <div className="mt-1 text-[10px] text-[#e0a529]">
                        ★★★★★
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </section>
        </main>

        {/* =====================================================
            RIGHT ORDER / PARTNER PANEL
        ===================================================== */}

        <aside className="hidden w-[300px] shrink-0 bg-white/80 px-7 py-8 xl:block">

          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2d2362] text-xs font-bold text-white">
              K
            </div>

            <div>
              <p className="text-xs font-bold text-[#29234f]">
                Kitchen Atelier
              </p>

              <p className="text-[10px] text-[#8a86a1]">
                Verified food partner
              </p>
            </div>
          </div>

          {/* Orders */}
          <div className="mb-9">
            <div className="mb-5 flex items-end justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#29234f]">
                  Today's
                  <br />
                  orders
                </h2>
              </div>

              <span className="rounded-full bg-[#f0ecff] px-3 py-1 text-[10px] font-bold text-[#514b75]">
                8 orders
              </span>
            </div>

            <div className="space-y-4">

              <OrderRow
                name="Chicken Biryani"
                qty="× 2"
                price="₹598"
                image="/Images/biryani.png"
              />

              <OrderRow
                name="Signature Burger"
                qty="× 1"
                price="₹249"
                image="/Images/burger.png"
              />

              <OrderRow
                name="Crispy Roll"
                qty="× 3"
                price="₹447"
                image="/Images/roll.png"
              />

              <OrderRow
                name="Spicy Ramen"
                qty="× 1"
                price="₹279"
                image="/Images/ramen.png"
              />

            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-dashed border-[#d9d6e4]" />

          {/* Stats */}
          <div className="py-7">
            <h3 className="text-xl font-bold text-[#29234f]">
              Kitchen
              <br />
              overview
            </h3>

            <div className="mt-5 space-y-4">

              <StatRow
                label="Published dishes"
                value="12"
              />

              <StatRow
                label="Orders today"
                value="08"
              />

              <StatRow
                label="Rating"
                value="4.9 ★"
              />

              <StatRow
                label="Status"
                value="Open"
                green
              />

            </div>
          </div>

          {/* CTA */}
          <button
            type="button"
            onClick={() => setShowCreateForm(true)}
            className="group flex w-full items-center justify-center gap-3 rounded-full bg-[#2d2362] py-4 text-sm font-bold text-white shadow-lg shadow-[#2d2362]/15 transition hover:bg-[#3c2e7d]"
          >
            Publish a dish
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>
        </aside>
      </div>

      {/* =========================================================
          CREATE FOOD MODAL
      ========================================================= */}

      {showCreateForm && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#17142c]/50 p-4 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget && !isSubmitting) {
              setShowCreateForm(false);
              resetForm();
            }
          }}
        >
          <div className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-[28px] bg-[#f9f8ff] p-5 shadow-2xl sm:p-7">

            {/* Modal Header */}
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8a86a1]">
                  Menu Desk
                </p>

                <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#29234f]">
                  Publish new dish
                </h2>

                <p className="mt-1 text-xs text-[#817d99]">
                  Add your dish and show customers how it is made.
                </p>
              </div>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => {
                  setShowCreateForm(false);
                  resetForm();
                }}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eceaf5] text-[#514d6d] transition hover:bg-[#dedbea]"
              >
                ×
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-xs font-semibold leading-5 text-red-700">
                  {error}
                </p>
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
                <p className="text-xs font-semibold text-green-700">
                  ✓ {success}
                </p>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-[10px] font-black uppercase tracking-[0.15em] text-[#68647e]"
                >
                  Dish Name
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Signature Chicken Biryani"
                  required
                  className="w-full rounded-xl border border-[#dedbe8] bg-white px-4 py-3.5 text-sm font-medium text-black outline-none placeholder:text-black/25 transition focus:border-[#2d2362] focus:ring-4 focus:ring-[#2d2362]/10"
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-[10px] font-black uppercase tracking-[0.15em] text-[#68647e]"
                >
                  Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe ingredients, flavor, preparation or what makes this dish special..."
                  required
                  className="w-full resize-none rounded-xl border border-[#dedbe8] bg-white px-4 py-3.5 text-sm font-medium text-black outline-none placeholder:text-black/25 transition focus:border-[#2d2362] focus:ring-4 focus:ring-[#2d2362]/10"
                />
              </div>

              {/* Video */}
              <div>
                <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.15em] text-[#68647e]">
                  Dish Video
                </label>

                {!videoPreview ? (
                  <label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#cbc8d8] bg-white px-5 py-8 text-center transition hover:border-[#2d2362] hover:bg-[#f7f5ff]">

                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#eeecf8] text-[#2d2362] transition group-hover:scale-105">
                      <VideoIcon />
                    </div>

                    <p className="text-sm font-bold text-[#29234f]">
                      Upload kitchen reel
                    </p>

                    <p className="mt-1 text-[10px] text-[#89859e]">
                      MP4, WebM or MOV · Max recommended size 50MB
                    </p>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="video/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="relative overflow-hidden rounded-2xl bg-black">
                    <video
                      src={videoPreview}
                      controls
                      className="max-h-[260px] w-full object-contain"
                    />

                    <button
                      type="button"
                      onClick={handleRemoveVideo}
                      disabled={isSubmitting}
                      className="absolute right-3 top-3 rounded-full bg-black/75 px-4 py-2 text-xs font-bold text-white backdrop-blur transition hover:bg-black"
                    >
                      Change Video
                    </button>
                  </div>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#2d2362] py-4 text-sm font-bold text-white shadow-lg shadow-[#2d2362]/15 transition hover:bg-[#3b2f7b] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Uploading & Publishing...
                  </>
                ) : (
                  <>
                    Publish Dish
                    <span>→</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* =============================================================
   FOOD CARD
============================================================= */

function FoodCard({ food }) {
  return (
    <article className="group relative h-[185px] w-[145px] shrink-0">

      {/* Image */}
      <div className="absolute left-1/2 top-0 z-10 h-[92px] w-[92px] -translate-x-1/2 overflow-hidden rounded-full border-[5px] border-white bg-[#e9e6dd] shadow-md transition duration-500 group-hover:-translate-y-1 group-hover:scale-105">
        <img
          src={food.image}
          alt={food.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Card */}
      <div className="absolute bottom-0 left-0 right-0 h-[118px] rounded-[20px] bg-white px-3 pb-3 pt-[57px] shadow-sm transition group-hover:-translate-y-1 group-hover:shadow-md">

        <div className="flex items-center justify-between gap-1">
          <span className="text-[8px] text-[#aaa6b9]">
            ★ {food.rating}
          </span>

          <span className="rounded-full bg-[#2d2362] px-2 py-1 text-[8px] font-bold text-white">
            {food.price}
          </span>
        </div>

        <h3 className="mt-1 line-clamp-1 text-[11px] font-bold text-[#29234f]">
          {food.name}
        </h3>

        <p className="mt-0.5 text-[9px] text-[#8b879d]">
          {food.category}
        </p>
      </div>
    </article>
  );
}

/* =============================================================
   ORDER ROW
============================================================= */

function OrderRow({ name, qty, price, image }) {
  return (
    <div className="flex items-center gap-3">
      <img
        src={image}
        alt={name}
        className="h-10 w-10 rounded-full object-cover shadow-sm"
      />

      <div className="min-w-0 flex-1">
        <p className="truncate text-[11px] font-bold text-[#393451]">
          {name}
        </p>

        <p className="mt-0.5 text-[10px] text-[#9490a7]">
          {qty}
        </p>
      </div>

      <span className="text-[10px] font-semibold text-[#6f6b84]">
        {price}
      </span>
    </div>
  );
}

/* =============================================================
   STAT ROW
============================================================= */

function StatRow({ label, value, green = false }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-[#89859d]">
        {label}
      </span>

      <span
        className={`text-xs font-bold ${
          green ? "text-green-600" : "text-[#393451]"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

/* =============================================================
   SIDEBAR BUTTON
============================================================= */

function SidebarButton({ icon, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex h-11 w-11 items-center justify-center rounded-xl transition ${
        active
          ? "bg-white text-[#2d2362]"
          : "text-white/45 hover:bg-white/10 hover:text-white"
      }`}
    >
      {icon}
    </button>
  );
}

/* =============================================================
   ICONS
============================================================= */

function SearchIcon() {
  return (
    <svg
      className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#77738f]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <circle cx="11" cy="11" r="7" strokeWidth="1.8" />
      <path d="m20 20-4-4" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10Z"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        d="M6 8h12l1 12H5L6 8Z"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M9 8a3 3 0 0 1 6 0" strokeWidth="1.6" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        d="M20.8 8.8c0 5.5-8.8 10-8.8 10s-8.8-4.5-8.8-10A4.8 4.8 0 0 1 12 6a4.8 4.8 0 0 1 8.8 2.8Z"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="15" rx="2" strokeWidth="1.6" />
      <path d="m7 20 3-3h8" strokeWidth="1.6" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="3" strokeWidth="1.6" />
      <path
        d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.7 1.7-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V20h-2.4v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L8 17l.1-.1A1.7 1.7 0 0 0 8.4 15a1.7 1.7 0 0 0-1.6-1H6v-2h.8a1.7 1.7 0 0 0 1.6-1A1.7 1.7 0 0 0 8 9.1L7.9 9 9.6 7.3l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6V6H15v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.7 9l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.1v2h-.1a1.7 1.7 0 0 0-1.5 1Z"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        d="M10 17l5-5-5-5M15 12H3M21 4v16"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <rect x="3" y="5" width="13" height="14" rx="2" strokeWidth="1.6" />
      <path
        d="m16 10 5-3v10l-5-3"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}