import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiAddLine, RiArrowRightLine, RiBookmarkFill, RiBookmarkLine, RiCloseLine, RiDeleteBinLine, RiHeart3Fill, RiHeart3Line, RiMoreLine, RiNotification3Line, RiPlayCircleLine, RiShareForwardLine, RiShoppingBag3Line, RiSubtractLine } from "@remixicon/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Navbar from "./Navbar";

const API_URL = "http://localhost:3000/api";
const categoryNames = ["All", "Burgers", "Pizza", "Sushi", "Mexican", "Bowls", "Desserts", "Drinks"];

gsap.registerPlugin(ScrollTrigger);

function shuffleItems(items) {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
}

function Story({ video, index }) {
  return (
    <Link to={`/food-partner/${video.foodpartner}`} className="group flex w-20 shrink-0 flex-col items-center gap-2">
      <div className={`rounded-full bg-gradient-to-br p-[3px] ${index % 2 ? "from-[#f6ad3d] to-[#e85d26]" : "from-[#e85d26] to-[#8b3d21]"}`}>
        <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-white bg-[#f5ede4]">
          <video src={video.video} muted loop autoPlay playsInline className="h-full w-full object-cover" />
        </div>
      </div>
      <span className="w-full truncate text-center text-[10px] font-bold text-[#75675e]">{video.name}</span>
    </Link>
  );
}

function FoodPost({ video, cartQuantity, onAdd, onLike, onSave }) {
  const [playing, setPlaying] = useState(false);
  const likes = video.likes ?? video.likeCount ?? 0;
  const saves = video.saves ?? video.saveCount ?? 0;

  return (
    <article className="overflow-hidden rounded-[22px] border border-[#eadfd5] bg-white shadow-[0_12px_35px_rgba(81,48,25,0.07)]">
      <header className="flex items-center justify-between px-4 py-3">
        <Link to={`/food-partner/${video.foodpartner}`} className="flex min-w-0 items-center gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#f6ad3d] text-sm font-black text-white">{video.name?.charAt(0)?.toUpperCase() || "F"}</div>
          <div className="min-w-0">
            <p className="truncate text-xs font-black text-[#291e17]">{video.name}</p>
            <p className="text-[10px] font-semibold text-[#a08d80]">Fresh from the kitchen</p>
          </div>
        </Link>
        <button type="button" aria-label="More options" className="text-[#8d7d72]"><RiMoreLine size={20} /></button>
      </header>

      <div className="group relative aspect-[4/4.7] overflow-hidden bg-[#211914]">
        <video src={video.video} muted loop playsInline autoPlay={playing} preload="metadata" onClick={() => setPlaying((value) => !value)} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]" />
        {!playing && <button type="button" onClick={() => setPlaying(true)} className="absolute inset-0 grid place-items-center text-white" aria-label="Play reel"><span className="grid h-14 w-14 place-items-center rounded-full bg-black/35 backdrop-blur-sm"><RiPlayCircleLine size={34} /></span></button>}
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-[#a64f25]">Fresh</span>
      </div>

      <div className="px-4 pb-4 pt-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button type="button" onClick={onLike} disabled={video.likePending} aria-label="Like food"><span className={video.liked ? "text-[#e34e42]" : "text-[#46352c]"}>{video.liked ? <RiHeart3Fill size={23} /> : <RiHeart3Line size={23} />}</span></button>
            <button type="button" aria-label="Share food" className="text-[#46352c]"><RiShareForwardLine size={22} /></button>
            <button type="button" onClick={onSave} disabled={video.savePending} aria-label="Save food" className={video.saved ? "text-[#df571e]" : "text-[#46352c]"}>{video.saved ? <RiBookmarkFill size={22} /> : <RiBookmarkLine size={22} />}</button>
          </div>
          <span className="rounded-full bg-[#fff0df] px-3 py-1 text-[10px] font-black text-[#df571e]">${Number(video.price ?? 4.92).toFixed(2)}</span>
        </div>
        <p className="mt-2 text-[11px] font-black text-[#38291f]">{likes} likes · {saves} saves</p>
        <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#8b7a6d]">{video.description || "A delicious dish prepared fresh by an independent kitchen."}</p>
        <button type="button" onClick={onAdd} className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#e85d26] px-4 text-xs font-black text-white transition hover:bg-[#c94a1d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e85d26]">
          <RiShoppingBag3Line size={17} />
          {cartQuantity ? `Add another · ${cartQuantity} in cart` : "Add to cart"}
        </button>
      </div>
    </article>
  );
}

function CartContents({ items, onChangeQuantity, onClear, onClose }) {
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const formattedTotal = `$${subtotal.toFixed(2).replace(".", ",")}`;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-serif text-[30px] leading-none text-[#2e241d]">My Cart</h2>
          <p className="mt-2 max-w-[205px] text-[10px] font-medium leading-4 text-[#948273]">Manage your purchases and keep track of what you spend.</p>
        </div>
        <div className="flex items-center gap-2">
          <div aria-label={`${itemCount} cart items`} className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-[#776658] shadow-sm">
            <RiNotification3Line size={19} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#ef704f]" />
          </div>
          {onClose && <button type="button" onClick={onClose} aria-label="Close cart" className="grid h-9 w-9 place-items-center rounded-full text-[#75675e] hover:bg-white"><RiCloseLine size={21} /></button>}
        </div>
      </div>
      {items.length === 0 ? (
        <div className="mt-7 grid flex-1 place-items-center rounded-[20px] border border-[#e4d9ce] bg-white px-5 py-10 text-center">
          <div><RiShoppingBag3Line className="mx-auto text-[#c3b2a4]" size={30} /><p className="mt-4 text-[13px] font-extrabold text-[#463428]">Your cart is empty</p><p className="mt-1 text-[10px] font-medium text-[#a39180]">Add something delicious.</p></div>
        </div>
      ) : (
        <div className="mt-7 flex-1 space-y-3 overflow-y-auto">
          {items.map((item) => (
            <div key={item._id} className="flex items-center gap-3 rounded-[19px] border border-[#e4d9ce] bg-white p-3">
              <div className="h-[56px] w-[56px] shrink-0 overflow-hidden rounded-[15px] bg-[#eee5dc]">
                {item.image ? <img src={item.image} alt="" className="h-full w-full object-cover" /> : item.video ? <video src={item.video} muted autoPlay loop playsInline className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center text-sm font-black text-[#df571e]">{item.name?.charAt(0)?.toUpperCase() || "F"}</div>}
              </div>
              <div className="min-w-0 flex-1"><p className="truncate text-[11px] font-extrabold text-[#463428]">{item.name}</p><p className="mt-1 text-[14px] font-extrabold text-[#292018]">${item.price.toFixed(2).replace(".", ",")}</p></div>
              <div className="flex items-center gap-1">
                <button type="button" onClick={() => onChangeQuantity(item._id, -1)} aria-label={`Remove one ${item.name}`} className="grid h-9 w-9 place-items-center rounded-xl bg-[#f4eee8] text-[#685749] hover:bg-[#e9ded3]"><RiSubtractLine size={13} /></button>
                <span className="grid h-9 min-w-9 place-items-center rounded-xl bg-[#302432] px-2 text-[10px] font-extrabold text-white">{item.quantity}</span>
                <button type="button" onClick={() => onChangeQuantity(item._id, 1)} aria-label={`Add one ${item.name}`} className="grid h-9 w-9 place-items-center rounded-xl bg-[#f4eee8] text-[#685749] hover:bg-[#e9ded3]"><RiAddLine size={13} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
      {items.length > 0 && <>
        <div className="mt-7 flex items-center justify-between">
          <button type="button" onClick={onClear} aria-label="Clear cart" className="grid h-14 w-14 place-items-center rounded-2xl bg-[#302432] text-white transition hover:scale-105"><RiDeleteBinLine size={19} /></button>
          <div className="text-right"><p className="text-[10px] font-semibold text-[#918174]">Total</p><p className="text-[25px] font-extrabold text-[#241b15]">{formattedTotal}</p></div>
        </div>
        <button type="button" className="relative mt-4 flex h-[62px] w-full items-center justify-center overflow-hidden rounded-[18px] bg-[#d98226] text-white shadow-[0_12px_25px_rgba(217,130,38,0.22)] transition hover:-translate-y-1">
          <img src="/Images/TraditionalTable.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
          <span className="relative z-10 text-[13px] font-extrabold">Check Out</span>
          <RiArrowRightLine className="relative z-10 ml-2" size={17} />
        </button>
      </>}
    </div>
  );
}

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const pageRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}/food`, { withCredentials: true }).then((response) => {
      setVideos(shuffleItems(response.data.foodItems ?? []));
      setIsAuthenticated(true);
    }).catch((error) => {
      if (error.response?.status === 401) navigate("/user/login", { replace: true });
      else console.error("Failed to fetch food items:", error);
    });
  }, [navigate]);

  useEffect(() => {
    if (!pageRef.current) return undefined;

    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, touchMultiplier: 1.15 });
    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const context = gsap.context(() => {
      gsap.from("[data-home-hero]", { y: 28, opacity: 0, duration: 0.8, ease: "power3.out" });
      gsap.from("[data-home-stories]", { y: 22, opacity: 0, duration: 0.7, delay: 0.12, ease: "power3.out" });
      gsap.from("[data-home-card]", {
        y: 34,
        opacity: 0,
        duration: 0.65,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-home-feed]", start: "top 82%", once: true },
      });
      gsap.utils.toArray("[data-home-card]").forEach((card) => {
        gsap.to(card, {
          y: -5,
          ease: "none",
          scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
      ScrollTrigger.refresh();
    }, pageRef);

    return () => {
      context.revert();
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [videos.length]);

  const updateVideo = (videoId, changes) => setVideos((current) => current.map((video) => video._id === videoId ? { ...video, ...changes } : video));

  const handleAddToCart = (video) => {
    const price = Number(video.price ?? 4.92);
    setCart((current) => {
      const existing = current.find((item) => item._id === video._id);
      if (existing) return current.map((item) => item._id === video._id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...current, { _id: video._id, name: video.name, price: Number.isFinite(price) ? price : 4.92, video: video.video, image: video.image, quantity: 1 }];
    });
  };

  const handleChangeCartQuantity = (videoId, change) => {
    setCart((current) => current.flatMap((item) => {
      if (item._id !== videoId) return [item];
      const quantity = item.quantity + change;
      return quantity > 0 ? [{ ...item, quantity }] : [];
    }));
  };

  const handleLike = async (videoId) => {
    const video = videos.find((item) => item._id === videoId);
    if (!video || video.likePending) return;
    const liked = !video.liked;
    const likes = Math.max(0, (video.likes ?? video.likeCount ?? 0) + (liked ? 1 : -1));
    updateVideo(videoId, { liked, likes, likeCount: likes, likePending: true });
    try { await axios.post(`${API_URL}/food/like`, { foodId: videoId }, { withCredentials: true }); updateVideo(videoId, { likePending: false }); }
    catch (error) { updateVideo(videoId, { liked: !liked, likes: Math.max(0, likes - (liked ? 1 : -1)), likePending: false }); console.error("Failed to update like:", error); }
  };

  const handleSave = async (videoId) => {
    const video = videos.find((item) => item._id === videoId);
    if (!video || video.savePending) return;
    const saved = !video.saved;
    const saves = Math.max(0, (video.saves ?? video.saveCount ?? 0) + (saved ? 1 : -1));
    updateVideo(videoId, { saved, saves, saveCount: saves, savePending: true });
    try { await axios.post(`${API_URL}/food/save`, { foodId: videoId }, { withCredentials: true }); updateVideo(videoId, { savePending: false }); }
    catch (error) { updateVideo(videoId, { saved: !saved, saves: Math.max(0, saves - (saved ? 1 : -1)), savePending: false }); console.error("Failed to update save:", error); }
  };

  const handleLogout = async () => {
    try { await axios.get(`${API_URL}/auth/user/logout`, { withCredentials: true }); }
    finally { setIsAuthenticated(false); navigate("/user/login", { replace: true }); }
  };

  const visibleVideos = activeCategory === "All" ? videos : videos.filter((video) => video.category?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div ref={pageRef} className="min-h-screen bg-[#f7f3ee] text-[#291e17] lg:pl-[250px]">
      {isAuthenticated && <Navbar onLogout={handleLogout} />}
      <main className="mx-auto max-w-[1180px] px-4 pb-12 pt-20 sm:px-7 lg:px-10 lg:pt-10">
        <section data-home-hero className="mb-8 flex flex-col justify-between gap-5 rounded-[26px] bg-[#2f211a] px-6 py-7 text-white shadow-[0_20px_50px_rgba(52,31,18,0.18)] sm:flex-row sm:items-end sm:px-9">
          <div><p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#f6ad3d]">Good food, good mood</p><h1 className="mt-2 max-w-lg font-serif text-4xl font-black leading-[0.95] sm:text-5xl">Taste something<br /><span className="text-[#f6ad3d]">worth sharing.</span></h1><p className="mt-3 max-w-md text-sm leading-6 text-white/65">Discover real dishes and independent kitchens through short, delicious food stories.</p></div><Link to="/reels" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#e85d26] px-5 text-xs font-black text-white transition hover:-translate-y-1 hover:bg-[#f6ad3d]">Watch reels <RiPlayCircleLine size={18} /></Link>
        </section>

        <section data-home-stories className="mb-8 overflow-hidden rounded-[22px] border border-[#eadfd5] bg-white px-4 py-5 shadow-[0_8px_25px_rgba(81,48,25,0.04)] sm:px-6"><div className="mb-4 flex items-center justify-between"><h2 className="font-serif text-2xl font-black">Trending kitchens</h2><Link to="/reels" className="text-[10px] font-black uppercase tracking-[0.14em] text-[#df571e]">See all</Link></div><div className="flex gap-5 overflow-x-auto pb-1 scrollbar-none">{videos.slice(0, 8).map((video, index) => <Story key={video._id} video={video} index={index} />)}</div></section>

        <section className="mb-8"><div className="mb-4 flex items-end justify-between"><div><p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#b19887]">Find your craving</p><h2 className="font-serif text-3xl font-black">Explore cuisines</h2></div></div><div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">{categoryNames.map((category) => <button key={category} type="button" onClick={() => setActiveCategory(category)} className={`shrink-0 rounded-full border px-4 py-2 text-xs font-black transition ${activeCategory === category ? "border-[#e85d26] bg-[#e85d26] text-white" : "border-[#e5d9cf] bg-white text-[#806e61] hover:border-[#f6ad3d]"}`}>{category}</button>)}</div></section>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_clamp(280px,28vw,380px)]">
          <section data-home-feed><div className="mb-4 flex items-end justify-between"><div><p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#b19887]">From the feed</p><h2 className="font-serif text-3xl font-black">Trending bites</h2></div><span className="text-xs font-bold text-[#9b887a]">{visibleVideos.length} stories</span></div><div className="grid gap-5 md:grid-cols-2">{visibleVideos.map((video) => <div data-home-card key={video._id}><FoodPost video={video} cartQuantity={cart.find((item) => item._id === video._id)?.quantity ?? 0} onAdd={() => handleAddToCart(video)} onLike={() => handleLike(video._id)} onSave={() => handleSave(video._id)} /></div>)}</div>{visibleVideos.length === 0 && <div className="rounded-2xl border border-dashed border-[#dfd0c4] bg-white p-12 text-center text-sm text-[#907d70]">No dishes found in this cuisine yet.</div>}</section>
          <aside className="sticky top-0 hidden h-[calc(100dvh-2.5rem)] max-h-[820px] flex-col border-l border-[#e3d9ce] bg-[#f7f3ee] px-5 py-8 xl:flex xl:px-7"><CartContents items={cart} onChangeQuantity={handleChangeCartQuantity} onClear={() => setCart([])} /></aside>
        </div>
      </main>
      <button type="button" onClick={() => setCartOpen(true)} aria-label={`Open cart, ${cart.reduce((total, item) => total + item.quantity, 0)} items`} className="fixed bottom-5 right-5 z-40 flex min-h-12 items-center gap-2 rounded-full bg-[#2f211a] px-5 text-xs font-black text-white shadow-[0_10px_30px_rgba(47,33,26,0.3)] transition hover:bg-[#493326] xl:hidden"><RiShoppingBag3Line size={18} />Cart<span className="grid h-6 min-w-6 place-items-center rounded-full bg-[#e85d26] px-1 text-[10px]">{cart.reduce((total, item) => total + item.quantity, 0)}</span></button>
      {cartOpen && <div className="fixed inset-0 z-50 xl:hidden"><button type="button" onClick={() => setCartOpen(false)} aria-label="Close cart" className="absolute inset-0 bg-black/40" /><aside className="absolute inset-y-0 right-0 flex w-[min(100vw,420px)] max-w-full flex-col bg-[#f7f3ee] px-5 py-7 shadow-2xl"><CartContents items={cart} onChangeQuantity={handleChangeCartQuantity} onClear={() => setCart([])} onClose={() => setCartOpen(false)} /></aside></div>}
    </div>
  );
}
