import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  RiArchive2Line,
  RiAddLine,
  RiArrowDownSLine,
  RiArrowRightLine,
  RiBarChart2Line,
  RiBookmarkLine,
  RiCheckLine,
  RiCloseLine,
  RiDashboardLine,
  RiEdit2Line,
  RiExternalLinkLine,
  RiFireLine,
  RiHeart3Line,
  RiLogoutBoxLine,
  RiInboxUnarchiveLine,
  RiPlayCircleLine,
  RiRestaurantLine,
  RiSearchLine,
  RiStore2Line,
  RiVideoUploadLine,
} from "@remixicon/react";

const views = [
  { id: "overview", label: "Overview", icon: RiDashboardLine },
  { id: "menu", label: "Your dishes", icon: RiRestaurantLine },
  { id: "reels", label: "Reels", icon: RiPlayCircleLine },
  { id: "insights", label: "Insights", icon: RiBarChart2Line },
];

const emptyForm = { name: "", description: "" };
const API = "/api";

function formatCount(value) {
  return new Intl.NumberFormat("en", { notation: "compact" }).format(value || 0);
}

function FoodCard({ food, index, onEdit, onToggleAvailability }) {
  const fallbackImage = index % 2 ? "/Images/roll-removebg-preview.png" : "/Images/biryani-removebg-preview.png";

  return (
    <article className="group min-w-0 overflow-hidden rounded-[18px] border border-[#e9dfd3] bg-white shadow-[0_9px_26px_rgba(54,37,23,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_17px_38px_rgba(54,37,23,0.12)]">
      <div className="relative aspect-[1.22/1] overflow-hidden bg-[#eee5d9]">
        <img
          src={fallbackImage}
          alt=""
          className="absolute inset-0 m-auto h-[82%] w-[82%] object-contain transition duration-500 group-hover:scale-105"
        />
        <video
          src={food.video}
          muted
          playsInline
          preload="metadata"
          controls
          poster={fallbackImage}
          aria-label={`Preview reel for ${food.name}`}
          className="absolute inset-0 h-full w-full bg-black object-cover"
        />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-[#1b211c]/75 px-2.5 py-1 text-[9px] font-black uppercase text-white backdrop-blur">
          <RiPlayCircleLine size={13} /> Live reel
        </span>
      </div>
      <div className="p-4">
        <h3 className="truncate text-sm font-black text-[#29221c]">{food.name}</h3>
        <p className="mt-1 line-clamp-2 min-h-9 text-xs leading-[18px] text-[#8f8174]">
          {food.description || "Fresh from your kitchen."}
        </p>
        <div className="mt-4 flex items-center gap-4 border-t border-[#f0e8df] pt-3 text-[10px] font-bold text-[#8b7a6d]">
          <span className="inline-flex items-center gap-1"><RiHeart3Line size={14} className="text-[#e85d58]" />{formatCount(food.likeCount)}</span>
          <span className="inline-flex items-center gap-1"><RiBookmarkLine size={14} className="text-[#d49328]" />{formatCount(food.saveCount)}</span>
          <span className={`ml-auto rounded-full px-2.5 py-1 text-[9px] font-black uppercase ${food.isAvailable === false ? "bg-[#f3ebe5] text-[#9a7660]" : "bg-[#edf5ea] text-[#548150]"}`}>{food.isAvailable === false ? "Archived" : "Live"}</span>
        </div>
        <div className="mt-3 flex gap-2">
          <button type="button" onClick={() => onEdit(food)} className="inline-flex min-h-8 flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#e9dfd5] text-[9px] font-black text-[#766655] transition hover:border-[#d99a4d] hover:bg-[#fff8ef] hover:text-[#9a5c24]"><RiEdit2Line size={14} />Edit details</button>
          <button type="button" onClick={() => onToggleAvailability(food)} aria-label={food.isAvailable === false ? `Restore ${food.name}` : `Archive ${food.name}`} className="grid h-8 w-9 shrink-0 place-items-center rounded-lg border border-[#e9dfd5] text-[#89796b] transition hover:border-[#d6bda1] hover:bg-[#f8f2ec] hover:text-[#604c3a]">{food.isAvailable === false ? <RiInboxUnarchiveLine size={14} /> : <RiArchive2Line size={14} />}</button>
        </div>
      </div>
    </article>
  );
}

function Metric({ label, value, note, icon: Icon, tone }) {
  return (
    <article className="flex min-h-[112px] items-center gap-3 rounded-[17px] border border-[#ede5dc] bg-white p-4 shadow-[0_8px_25px_rgba(54,37,23,0.04)] sm:gap-4 sm:p-5">
      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-[13px] ${tone}`}><Icon size={19} /></span>
      <div className="min-w-0">
        <p className="text-[10px] font-bold text-[#98897b]">{label}</p>
        <p className="mt-0.5 truncate text-2xl font-black leading-tight text-[#28221d]">{value}</p>
        <p className="mt-1 truncate text-[9px] font-semibold text-[#a99b8d]">{note}</p>
      </div>
    </article>
  );
}

function PartnerSidebar({ activeView, onChangeView, partner, onLogout }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[252px] flex-col bg-[#263b30] px-5 py-6 text-white lg:flex">
      <Link to="/create-food" className="flex items-center gap-2 px-2 font-serif text-[25px] font-black tracking-[-0.04em]">
        crave<span className="text-[#f5a63b]">.</span>
        <span className="ml-1 rounded-full bg-white/10 px-2 py-1 font-sans text-[8px] font-black uppercase tracking-[0.08em] text-white/65">partner</span>
      </Link>

      <div className="relative mt-9 overflow-hidden rounded-[17px] border border-white/10 bg-white/[0.07] p-3">
        <img src="/Images/Culinary Chef.jpg" alt="Chef preparing a dish" className="h-[102px] w-full rounded-xl object-cover object-center" />
        <div className="relative -mt-5 ml-3 grid h-10 w-10 place-items-center rounded-[13px] border-[3px] border-[#263b30] bg-[#f3a33a] font-serif text-sm font-black text-[#263b30]">
          {partner.name?.charAt(0)?.toUpperCase() || "K"}
        </div>
        <p className="mt-2 truncate text-xs font-black">{partner.name || "Your kitchen"}</p>
        <p className="mt-1 truncate text-[9px] font-semibold text-white/45">{partner.address || partner.email || "Food partner account"}</p>
      </div>

      <p className="mb-2 mt-9 px-3 text-[9px] font-black uppercase tracking-[0.16em] text-white/35">Workspace</p>
      <nav aria-label="Partner dashboard" className="space-y-1">
        {views.map(({ id, label, icon: Icon }) => {
          const active = activeView === id;
          return (
            <button
              type="button"
              key={id}
              onClick={() => onChangeView(id)}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-xs font-bold transition ${active ? "bg-[#f2a43c] text-[#25372e] shadow-[0_7px_18px_rgba(242,164,60,0.2)]" : "text-white/60 hover:bg-white/[0.08] hover:text-white"}`}
            >
              <Icon size={18} />{label}
              {active && <RiArrowRightLine className="ml-auto" size={15} />}
            </button>
          );
        })}
      </nav>

      {partner.id && (
        <Link to={`/food-partner/${partner.id}`} className="mt-5 flex min-h-10 items-center gap-3 rounded-xl px-3 text-xs font-bold text-white/60 transition hover:bg-white/[0.08] hover:text-white">
          <RiStore2Line size={18} /> View storefront <RiExternalLinkLine className="ml-auto" size={13} />
        </Link>
      )}

      <div className="mt-auto border-t border-white/10 pt-4">
        <button type="button" onClick={onLogout} className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-xs font-bold text-white/55 transition hover:bg-white/[0.08] hover:text-white">
          <RiLogoutBoxLine size={18} /> Sign out
        </button>
        <p className="mt-4 px-3 text-[9px] font-semibold text-white/30">CRAVE PARTNER STUDIO</p>
      </div>
    </aside>
  );
}

export default function PartnerDashboard() {
  const navigate = useNavigate();
  const [partner, setPartner] = useState({});
  const [partnerId, setPartnerId] = useState("");
  const [foods, setFoods] = useState([]);
  const [activeView, setActiveView] = useState("overview");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingFood, setEditingFood] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let active = true;

    async function loadDashboard() {
      setLoading(true);
      setPageError("");
      try {
        const sessionResponse = await axios.get(`${API}/auth/session`, { withCredentials: true });
        const session = sessionResponse.data;
        if (session.role !== "partner") {
          navigate(session.role === "user" ? "/home" : "/food-partner/login", { replace: true });
          return;
        }

        const id = String(session.userId);
        const [foodResponse, partnerResult] = await Promise.all([
          axios.get(`${API}/food/partner`, { withCredentials: true }),
          axios.get(`${API}/auth/foodpartner/${id}`, { withCredentials: true }).catch(() => null),
        ]);
        const profile = partnerResult?.data?.foodPartner || {};

        if (active) {
          setPartnerId(id);
          setPartner(profile);
          setFoods(foodResponse.data.foodItems || []);
        }
      } catch (requestError) {
        if (requestError.response?.status === 401) {
          navigate("/food-partner/login", { replace: true });
        } else if (active) {
          setPageError("We could not load your kitchen right now. Check your connection and try again.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadDashboard();
    return () => { active = false; };
  }, [navigate]);

  useEffect(() => {
    return () => {
      if (videoPreview) URL.revokeObjectURL(videoPreview);
    };
  }, [videoPreview]);

  useEffect(() => {
    if (!showCreateForm) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !isSubmitting) {
        setShowCreateForm(false);
        setEditingFood(null);
        setFormData(emptyForm);
        setVideoFile(null);
        setVideoPreview("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showCreateForm, isSubmitting]);

  const publishedFoods = useMemo(() => foods.filter((food) => food.isAvailable !== false), [foods]);

  const metrics = useMemo(() => {
    const likes = publishedFoods.reduce((total, food) => total + Number(food.likeCount || 0), 0);
    const saves = publishedFoods.reduce((total, food) => total + Number(food.saveCount || 0), 0);
    const best = [...publishedFoods].sort((first, second) => (
      Number(second.likeCount || 0) + Number(second.saveCount || 0)
    ) - (
      Number(first.likeCount || 0) + Number(first.saveCount || 0)
    ))[0];
    return { likes, saves, best };
  }, [publishedFoods]);

  const visibleFoods = useMemo(() => {
    const query = search.trim().toLowerCase();
    const result = foods.filter((food) => `${food.name} ${food.description || ""}`.toLowerCase().includes(query));
    if (sortBy === "likes") result.sort((first, second) => Number(second.likeCount || 0) - Number(first.likeCount || 0));
    if (sortBy === "saves") result.sort((first, second) => Number(second.saveCount || 0) - Number(first.saveCount || 0));
    return result;
  }, [foods, search, sortBy]);

  const closeCreateForm = () => {
    if (isSubmitting) return;
    setShowCreateForm(false);
    setEditingFood(null);
    setFormError("");
    setFormData(emptyForm);
    setVideoFile(null);
    setVideoPreview("");
  };

  const handleVideoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("video/")) {
      setFormError("Choose a valid video file.");
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      setFormError("Choose a video under 50 MB.");
      return;
    }
    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
    setFormError("");
  };

  const handleCreateFood = async (event) => {
    event.preventDefault();
    if (!formData.name.trim() || !formData.description.trim() || (!editingFood && !videoFile)) {
      setFormError(editingFood ? "Add a dish name and description." : "Add a dish name, a description, and a kitchen video.");
      return;
    }

    setIsSubmitting(true);
    setFormError("");

    try {
      let savedFood;
      if (editingFood) {
        const response = await axios.patch(`${API}/food/${editingFood._id}`, {
          name: formData.name.trim(),
          description: formData.description.trim(),
        }, { withCredentials: true });
        savedFood = response.data.food;
        setFoods((current) => current.map((food) => food._id === savedFood._id ? savedFood : food));
        setNotice(`${savedFood.name} details updated.`);
      } else {
        const data = new FormData();
        data.append("name", formData.name.trim());
        data.append("description", formData.description.trim());
        data.append("video", videoFile);
        const response = await axios.post(`${API}/food`, data, { withCredentials: true });
        savedFood = response.data.food;
        setFoods((current) => [savedFood, ...current]);
        setNotice(`${savedFood.name} is now published.`);
      }
      setShowCreateForm(false);
      setEditingFood(null);
      setFormData(emptyForm);
      setVideoFile(null);
      setVideoPreview("");
      if (!editingFood) setActiveView("menu");
    } catch (requestError) {
      setFormError(requestError.response?.data?.message || "We could not publish this dish. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditFood = (food) => {
    setEditingFood(food);
    setFormData({ name: food.name || "", description: food.description || "" });
    setVideoFile(null);
    setVideoPreview("");
    setFormError("");
    setNotice("");
    setShowCreateForm(true);
  };

  const handleToggleAvailability = async (food) => {
    const isAvailable = food.isAvailable === false;
    if (!isAvailable && !window.confirm(`Archive ${food.name} from your public menu?`)) return;

    try {
      const response = await axios.patch(`${API}/food/${food._id}`, { isAvailable }, { withCredentials: true });
      const updatedFood = response.data.food;
      setFoods((current) => current.map((item) => item._id === updatedFood._id ? updatedFood : item));
      setNotice(`${updatedFood.name} ${isAvailable ? "restored to" : "archived from"} your menu.`);
    } catch (requestError) {
      setPageError(requestError.response?.data?.message || "We could not update this dish. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get(`${API}/auth/foodpartner/logout`, { withCredentials: true });
    } finally {
      navigate("/food-partner/login", { replace: true });
    }
  };

  const orderedFoods = activeView === "overview"
    ? visibleFoods.filter((food) => food.isAvailable !== false)
    : visibleFoods;
  const sectionTitle = activeView === "menu" ? "Your dishes" : activeView === "reels" ? "Published reels" : "Your content";
  const activeNav = (id) => {
    setActiveView(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#f6f2ec] text-[#29221c] lg:pl-[252px]">
      <PartnerSidebar activeView={activeView} onChangeView={activeNav} partner={{ ...partner, id: partnerId }} onLogout={handleLogout} />

      <header className="sticky top-0 z-20 flex min-h-[68px] items-center justify-between gap-3 border-b border-[#eae1d7] bg-[#fbf8f3]/95 px-4 backdrop-blur-md sm:px-7 lg:px-9">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#263b30] font-serif text-base font-black text-white lg:hidden">c<span className="text-[#f5a63b]">.</span></div>
          <div className="hidden min-w-0 sm:block">
            <p className="truncate text-[9px] font-black uppercase tracking-[0.15em] text-[#a88b6f]">Kitchen workspace</p>
            <p className="truncate text-xs font-black text-[#33271e]">{partner.name || "Food partner"}</p>
          </div>
          <label className="relative hidden w-[min(34vw,330px)] md:block">
            <RiSearchLine size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a19080]" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search your dishes"
              aria-label="Search your dishes"
              className="h-10 w-full rounded-xl border border-[#ebe2d8] bg-white pl-9 pr-3 text-xs font-semibold outline-none placeholder:text-[#ab9f92] focus:border-[#d99537] focus:ring-4 focus:ring-[#d99537]/10"
            />
          </label>
        </div>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {partnerId && <Link to={`/food-partner/${partnerId}`} className="hidden min-h-10 items-center gap-2 rounded-xl px-3 text-[10px] font-black text-[#75675e] transition hover:bg-white sm:inline-flex"><RiStore2Line size={16} />Storefront</Link>}
          <button type="button" onClick={() => { setShowCreateForm(true); setNotice(""); }} className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-[#e85d26] px-3.5 text-[10px] font-black text-white shadow-[0_6px_16px_rgba(232,93,38,0.18)] transition hover:bg-[#cb4d1e] sm:px-4 sm:text-xs"><RiAddLine size={17} />Add a dish</button>
          <button type="button" onClick={handleLogout} aria-label="Sign out" className="grid h-10 w-10 place-items-center rounded-xl border border-[#e9dfd5] bg-white text-[#78695b] transition hover:text-[#bd4b24] lg:hidden"><RiLogoutBoxLine size={18} /></button>
        </div>
      </header>

      <main className="mx-auto max-w-[1450px] px-4 pb-28 pt-5 sm:px-7 sm:pt-7 lg:px-9 lg:pb-12">
        {pageError && <div role="alert" className="mb-5 flex items-center justify-between gap-4 rounded-xl border border-[#efc9b6] bg-[#fff2eb] px-4 py-3 text-xs font-bold text-[#a64626]">{pageError}<button type="button" onClick={() => window.location.reload()} className="shrink-0 underline underline-offset-2">Try again</button></div>}
        {notice && <div role="status" className="mb-5 flex items-center gap-2 rounded-xl border border-[#d6e8d7] bg-[#f1f8f0] px-4 py-3 text-xs font-bold text-[#326642]"><RiCheckLine size={17} />{notice}<button type="button" onClick={() => setNotice("")} aria-label="Dismiss notice" className="ml-auto"><RiCloseLine size={17} /></button></div>}

        <section className="relative isolate min-h-[235px] overflow-hidden rounded-[21px] bg-[#32271f] shadow-[0_17px_45px_rgba(54,37,23,0.16)] sm:min-h-[255px]">
          <img src="/Images/Culinary Chef.jpg" alt="Chef preparing a meal in the kitchen" className="absolute inset-0 h-full w-full object-cover object-[center_42%]" />
          <div className="absolute inset-0 bg-linear-to-r from-[#1e2922]/95 via-[#26352b]/74 to-[#26352b]/10" />
          <div className="relative z-10 flex min-h-[235px] flex-col justify-center px-6 py-8 text-white sm:min-h-[255px] sm:px-9 lg:px-11">
            <span className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-black/15 px-3 py-1.5 text-[9px] font-black uppercase text-[#ffd38a] backdrop-blur"><span className="h-1.5 w-1.5 rounded-full bg-[#7ed49d]" />Partner studio</span>
            <h1 className="max-w-xl font-serif text-3xl font-black leading-[1.02] sm:text-4xl lg:text-[42px]">Good food deserves<br /><span className="text-[#f8b64c]">a bigger table.</span></h1>
            <p className="mt-3 max-w-md text-xs leading-5 text-white/72 sm:text-sm">Your kitchen at a glance. Keep your menu fresh and your best stories in view.</p>
            <button type="button" onClick={() => setShowCreateForm(true)} className="mt-5 inline-flex min-h-10 w-fit items-center gap-2 rounded-xl bg-[#f4a43b] px-4 text-[10px] font-black text-[#2c3429] transition hover:bg-[#ffbd5d]"><RiAddLine size={16} />Publish a new dish</button>
          </div>
          <div className="absolute bottom-4 right-4 hidden w-[190px] rotate-2 rounded-[16px] border border-white/30 bg-[#fffdf7] p-3 text-[#33271e] shadow-[0_18px_40px_rgba(0,0,0,0.25)] sm:block md:right-8 md:w-[215px]">
            <div className="flex items-center gap-3">
              <img src="/Images/biryani-removebg-preview.png" alt="Biryani dish" className="h-12 w-12 rounded-xl bg-[#f7ead8] object-contain" />
              <div className="min-w-0"><p className="text-[8px] font-black uppercase text-[#bd7841]">Your most loved</p><p className="mt-1 truncate text-xs font-black">{metrics.best?.name || "Your first signature dish"}</p><p className="mt-1 inline-flex items-center gap-1 text-[9px] font-bold text-[#8d7a67]"><RiHeart3Line size={12} className="text-[#e85d58]" />{formatCount(metrics.best?.likeCount)} likes</p></div>
            </div>
          </div>
        </section>

        <div className="relative z-10 -mt-3 grid grid-cols-2 gap-3 px-1 sm:grid-cols-4 sm:gap-4 sm:px-4">
          <Metric label="Published dishes" value={loading ? "—" : formatCount(publishedFoods.length)} note={foods.length > publishedFoods.length ? `${formatCount(foods.length - publishedFoods.length)} archived` : "Your live food stories"} icon={RiRestaurantLine} tone="bg-[#fff0df] text-[#d75a28]" />
          <Metric label="Total likes" value={loading ? "—" : formatCount(metrics.likes)} note="Across your published reels" icon={RiHeart3Line} tone="bg-[#fff0ed] text-[#df6658]" />
          <Metric label="Saved by customers" value={loading ? "—" : formatCount(metrics.saves)} note="Added to customer collections" icon={RiBookmarkLine} tone="bg-[#fff5db] text-[#b98123]" />
          <Metric label="Top dish" value={loading ? "—" : metrics.best ? metrics.best.name : "Not yet"} note={metrics.best ? `${formatCount(Number(metrics.best.likeCount || 0) + Number(metrics.best.saveCount || 0))} likes + saves` : "Publish your first dish"} icon={RiFireLine} tone="bg-[#eaf3eb] text-[#467654]" />
        </div>

        <div className="mt-8 flex items-end justify-between gap-4">
          <div><p className="text-[9px] font-black uppercase text-[#bd7841]">Your workspace</p><h2 className="mt-1 font-serif text-2xl font-black text-[#30251d] sm:text-[28px]">{activeView === "overview" ? "Kitchen overview" : activeView === "insights" ? "Kitchen insights" : sectionTitle}</h2></div>
          {activeView !== "overview" && activeView !== "insights" && <label className="relative hidden sm:block"><span className="sr-only">Sort dishes</span><select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="h-10 appearance-none rounded-xl border border-[#e9dfd5] bg-white pl-3 pr-9 text-[10px] font-black text-[#75675e] outline-none focus:border-[#d99537]"><option value="recent">Recently added</option><option value="likes">Most liked</option><option value="saves">Most saved</option></select><RiArrowDownSLine size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#8d7a67]" /></label>}
        </div>

        <div className="mt-4 flex gap-1 overflow-x-auto border-b border-[#e6ddd3] pb-0.5 scrollbar-none" role="tablist" aria-label="Dashboard sections">
          {views.map(({ id, label }) => <button key={id} type="button" role="tab" aria-selected={activeView === id} onClick={() => activeNav(id)} className={`shrink-0 border-b-2 px-3 py-2.5 text-[10px] font-black transition sm:px-4 ${activeView === id ? "border-[#e85d26] text-[#cc5124]" : "border-transparent text-[#978879] hover:text-[#3d3025]"}`}>{label}{id === "menu" || id === "reels" ? <span className="ml-2 rounded-full bg-[#f0e9e0] px-1.5 py-0.5 text-[8px] text-[#857667]">{formatCount(foods.length)}</span> : null}</button>)}
        </div>

        {activeView === "overview" && (
          <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(280px,0.85fr)]">
            <section className="min-w-0">
              <div className="mb-3 flex items-center justify-between"><div><h3 className="text-sm font-black text-[#35291f]">Your latest dishes</h3><p className="mt-1 text-[10px] text-[#9a8b7c]">Fresh from your kitchen to the feed</p></div><button type="button" onClick={() => activeNav("menu")} className="inline-flex items-center gap-1 text-[10px] font-black text-[#cf5829] hover:text-[#a9421c]">View menu <RiArrowRightLine size={14} /></button></div>
              {loading ? <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-3">{[0, 1].map((item) => <div key={item} className="h-[275px] animate-pulse rounded-[18px] bg-[#ebe3d9]" />)}</div> : orderedFoods.length ? <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-3">{orderedFoods.slice(0, 3).map((food, index) => <FoodCard key={food._id} food={food} index={index} onEdit={handleEditFood} onToggleAvailability={handleToggleAvailability} />)}</div> : <EmptyState onCreate={() => { setEditingFood(null); setShowCreateForm(true); }} />}
            </section>

            <section className="grid content-start gap-4 sm:grid-cols-2 xl:grid-cols-1">
              <div className="overflow-hidden rounded-[18px] border border-[#e9dfd5] bg-white shadow-[0_8px_25px_rgba(54,37,23,0.04)]">
                <div className="flex items-center justify-between border-b border-[#f0e8df] px-4 py-3.5"><div><h3 className="text-xs font-black">Top dishes</h3><p className="mt-1 text-[9px] text-[#a09080]">By customer engagement</p></div><RiFireLine size={17} className="text-[#d95b2d]" /></div>
                <div className="space-y-4 p-4">{publishedFoods.length ? [...publishedFoods].sort((a, b) => (Number(b.likeCount || 0) + Number(b.saveCount || 0)) - (Number(a.likeCount || 0) + Number(a.saveCount || 0))).slice(0, 3).map((food, index) => {
                  const score = Number(food.likeCount || 0) + Number(food.saveCount || 0);
                  const maxScore = Math.max(1, ...foods.map((item) => Number(item.likeCount || 0) + Number(item.saveCount || 0)));
                  return <div key={food._id}><div className="mb-1.5 flex items-center justify-between gap-3"><span className="truncate text-[10px] font-bold text-[#655548]"><span className="mr-2 text-[#c28b4d]">0{index + 1}</span>{food.name}</span><span className="shrink-0 text-[9px] font-black text-[#8b7a6d]">{formatCount(score)}</span></div><div className="h-1.5 overflow-hidden rounded-full bg-[#f1ebe3]"><div className="h-full rounded-full bg-linear-to-r from-[#e85d26] to-[#f3b247]" style={{ width: `${Math.max(score ? 8 : 0, (score / maxScore) * 100)}%` }} /></div></div>;
                }) : <p className="py-3 text-center text-[10px] text-[#9a8b7c]">Your first published dish will appear here.</p>}</div>
              </div>
              <div className="relative min-h-[146px] overflow-hidden rounded-[18px] bg-[#263b30] p-5 text-white sm:col-span-2 xl:col-span-1">
                <img src="/Images/roll-removebg-preview.png" alt="" className="absolute -bottom-8 -right-1 h-40 w-32 object-contain opacity-80" />
                <div className="relative z-10 max-w-[240px]"><p className="text-[9px] font-black uppercase text-[#f5b75b]">Keep the feed fresh</p><h3 className="mt-2 font-serif text-xl font-black">Have something cooking?</h3><p className="mt-1 text-[10px] leading-4 text-white/60">Show customers the dish behind the delicious.</p><button type="button" onClick={() => setShowCreateForm(true)} className="mt-3 inline-flex min-h-9 items-center gap-2 rounded-lg bg-white px-3 text-[9px] font-black text-[#263b30] transition hover:bg-[#f5b75b]"><RiAddLine size={14} />Add a dish</button></div>
              </div>
            </section>
          </div>
        )}

        {(activeView === "menu" || activeView === "reels") && (
          <section className="mt-5">
            <div className="mb-4 flex items-center justify-between gap-3 md:hidden"><label className="relative min-w-0 flex-1"><span className="sr-only">Search your dishes</span><RiSearchLine size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a19080]" /><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search your dishes" className="h-10 w-full rounded-xl border border-[#e9dfd5] bg-white pl-9 pr-3 text-xs outline-none" /></label><label className="relative shrink-0"><span className="sr-only">Sort dishes</span><select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="h-10 appearance-none rounded-xl border border-[#e9dfd5] bg-white pl-3 pr-8 text-[9px] font-bold"><option value="recent">Recent</option><option value="likes">Most liked</option><option value="saves">Most saved</option></select><RiArrowDownSLine size={14} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" /></label></div>
            <div className="mb-4 flex items-end justify-between"><div><h3 className="text-sm font-black">{activeView === "menu" ? "All published dishes" : "Your food reels"}</h3><p className="mt-1 text-[10px] text-[#9a8b7c]">{visibleFoods.length} {visibleFoods.length === 1 ? "story" : "stories"} in your kitchen</p></div></div>
            {loading ? <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{[0, 1, 2].map((item) => <div key={item} className="h-[275px] animate-pulse rounded-[18px] bg-[#ebe3d9]" />)}</div> : visibleFoods.length ? <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{visibleFoods.map((food, index) => <FoodCard key={food._id} food={food} index={index} onEdit={handleEditFood} onToggleAvailability={handleToggleAvailability} />)}</div> : <EmptyState onCreate={() => { setEditingFood(null); setShowCreateForm(true); }} emptySearch={Boolean(search)} />}
          </section>
        )}

        {activeView === "insights" && (
          <section className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.8fr)]">
            <div className="rounded-[18px] border border-[#e9dfd5] bg-white p-5 shadow-[0_8px_25px_rgba(54,37,23,0.04)] sm:p-6"><div className="flex items-start justify-between"><div><p className="text-[9px] font-black uppercase text-[#bd7841]">All-time activity</p><h3 className="mt-1 font-serif text-2xl font-black">What customers love</h3></div><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#fff0df] text-[#d75a28]"><RiBarChart2Line size={19} /></span></div><div className="mt-6 space-y-5">{publishedFoods.length ? [...publishedFoods].sort((a, b) => (Number(b.likeCount || 0) + Number(b.saveCount || 0)) - (Number(a.likeCount || 0) + Number(a.saveCount || 0))).map((food) => {
              const score = Number(food.likeCount || 0) + Number(food.saveCount || 0);
              const maxScore = Math.max(1, ...foods.map((item) => Number(item.likeCount || 0) + Number(item.saveCount || 0)));
              return <div key={food._id}><div className="mb-2 flex items-center justify-between gap-3"><p className="truncate text-xs font-bold text-[#58493b]">{food.name}</p><p className="shrink-0 text-[10px] font-black text-[#947d65]">{formatCount(score)} interactions</p></div><div className="flex h-2 overflow-hidden rounded-full bg-[#f1ebe3]"><div className="h-full bg-[#e85d26]" style={{ width: `${Math.max(score ? 5 : 0, (Number(food.likeCount || 0) / maxScore) * 100)}%` }} /><div className="h-full bg-[#f4b84a]" style={{ width: `${Math.max(Number(food.saveCount) ? 5 : 0, (Number(food.saveCount || 0) / maxScore) * 100)}%` }} /></div></div>;
            }) : <EmptyState onCreate={() => setShowCreateForm(true)} />}</div><div className="mt-5 flex flex-wrap gap-4 border-t border-[#f0e8df] pt-4 text-[9px] font-bold text-[#8d7a67]"><span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#e85d26]" />Likes</span><span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#f4b84a]" />Saves</span><span className="ml-auto text-[#aa9b8c]">Counts from your published dishes</span></div></div>
            <div className="grid content-start gap-3 sm:grid-cols-2 lg:grid-cols-1"><Metric label="Published dishes" value={formatCount(publishedFoods.length)} note="Reels in your kitchen" icon={RiRestaurantLine} tone="bg-[#fff0df] text-[#d75a28]" /><Metric label="Customer likes" value={formatCount(metrics.likes)} note="Across every dish" icon={RiHeart3Line} tone="bg-[#fff0ed] text-[#df6658]" /><Metric label="Customer saves" value={formatCount(metrics.saves)} note="Across every dish" icon={RiBookmarkLine} tone="bg-[#fff5db] text-[#b98123]" /></div>
          </section>
        )}

        {!loading && foods.length === 0 && activeView === "overview" && <section className="mt-5"><EmptyState onCreate={() => setShowCreateForm(true)} /></section>}
        <footer className="mt-10 hidden items-center justify-between border-t border-[#e7ded4] pt-4 text-[9px] font-semibold text-[#aa9b8c] sm:flex"><span>CRAVE Partner Studio</span><span>{partner.email || "Manage your kitchen's food stories"}</span></footer>
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-[#e6ddd3] bg-[#fffdf9]/95 px-2 pb-[env(safe-area-inset-bottom)] pt-1 backdrop-blur lg:hidden" aria-label="Mobile dashboard">
        {views.map(({ id, label, icon: Icon }) => <button key={id} type="button" onClick={() => activeNav(id)} aria-current={activeView === id ? "page" : undefined} className={`flex min-h-14 flex-col items-center justify-center gap-1 text-[8px] font-black ${activeView === id ? "text-[#d75a28]" : "text-[#938476]"}`}><Icon size={19} />{label}</button>)}
      </nav>

      {showCreateForm && (
        <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-[#17221c]/65 p-3 backdrop-blur-sm sm:p-5" onMouseDown={(event) => { if (event.target === event.currentTarget) closeCreateForm(); }}>
          <section role="dialog" aria-modal="true" aria-labelledby="publish-title" className="my-auto grid max-h-[94dvh] w-full max-w-[850px] overflow-y-auto rounded-[21px] bg-[#fffdf9] shadow-[0_30px_90px_rgba(0,0,0,0.32)] md:grid-cols-[minmax(0,1.05fr)_minmax(250px,0.75fr)]">
            <div className="p-5 sm:p-7">
              <div className="mb-6 flex items-start justify-between gap-4"><div><p className="text-[9px] font-black uppercase text-[#bd7841]">{editingFood ? "Update kitchen story" : "New kitchen story"}</p><h2 id="publish-title" className="mt-1 font-serif text-2xl font-black">{editingFood ? "Edit dish details" : "Publish a dish"}</h2><p className="mt-1 text-xs text-[#938476]">{editingFood ? "Keep your dish details up to date." : "A great dish and a real kitchen moment."}</p></div><button type="button" onClick={closeCreateForm} aria-label="Close publish form" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#f2ece4] text-[#75675e] transition hover:bg-[#eadfd5]"><RiCloseLine size={19} /></button></div>
              {formError && <div role="alert" className="mb-4 rounded-xl border border-[#efc9b6] bg-[#fff2eb] px-3.5 py-3 text-xs font-semibold text-[#a64626]">{formError}</div>}
              <form onSubmit={handleCreateFood} className="space-y-4">
                <div><label htmlFor="dish-name" className="mb-1.5 block text-[10px] font-black text-[#56483c]">Dish name <span className="text-[#e85d26]">*</span></label><input id="dish-name" value={formData.name} onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))} maxLength={80} required placeholder="e.g. Sunday slow-cooked biryani" className="h-11 w-full rounded-xl border border-[#e6dcd1] bg-white px-3.5 text-xs outline-none placeholder:text-[#b4a79a] focus:border-[#df8b37] focus:ring-4 focus:ring-[#df8b37]/10" /></div>
                <div><div className="mb-1.5 flex justify-between"><label htmlFor="dish-description" className="text-[10px] font-black text-[#56483c]">Description <span className="text-[#e85d26]">*</span></label><span className="text-[9px] text-[#a99b8c]">{formData.description.length}/500</span></div><textarea id="dish-description" value={formData.description} onChange={(event) => setFormData((current) => ({ ...current, description: event.target.value }))} maxLength={500} rows={4} required placeholder="What makes this dish worth coming back for?" className="w-full resize-y rounded-xl border border-[#e6dcd1] bg-white px-3.5 py-3 text-xs leading-5 outline-none placeholder:text-[#b4a79a] focus:border-[#df8b37] focus:ring-4 focus:ring-[#df8b37]/10" /></div>
                {!editingFood && <div><div className="mb-1.5 flex items-center justify-between"><label htmlFor="dish-video" className="text-[10px] font-black text-[#56483c]">Dish reel <span className="text-[#e85d26]">*</span></label><span className="text-[9px] text-[#a99b8c]">Max 50 MB</span></div><input id="dish-video" type="file" accept="video/*" onChange={handleVideoChange} className="sr-only" />{videoFile ? <div className="flex min-h-12 items-center justify-between gap-3 rounded-xl border border-[#e6dcd1] bg-white px-3"><span className="flex min-w-0 items-center gap-2 text-xs font-bold text-[#56483c]"><RiPlayCircleLine size={17} className="shrink-0 text-[#d75a28]" /><span className="truncate">{videoFile.name}</span></span><button type="button" onClick={() => { setVideoFile(null); setVideoPreview(""); }} aria-label="Remove selected video" className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[#8c7e70] hover:bg-[#f4eee7]"><RiCloseLine size={17} /></button></div> : <label htmlFor="dish-video" className="flex min-h-[94px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#d7c7b7] bg-white text-center transition hover:border-[#df8b37] hover:bg-[#fff9f1]"><RiVideoUploadLine size={22} className="mb-1.5 text-[#d75a28]" /><span className="text-[10px] font-black text-[#56483c]">Choose a reel video</span><span className="mt-1 text-[9px] text-[#a99b8c]">MP4, MOV, or WebM</span></label>}</div>}
                {editingFood && <p className="rounded-xl bg-[#f5f0e9] px-3.5 py-3 text-[10px] leading-4 text-[#877767]">Your current reel stays attached. Update the name or description below.</p>}
                <button type="submit" disabled={isSubmitting} className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#e85d26] px-4 text-xs font-black text-white transition hover:bg-[#c94d20] disabled:cursor-not-allowed disabled:opacity-60">{isSubmitting ? <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />{editingFood ? "Saving changes" : "Publishing your dish"}</> : <>{editingFood ? "Save dish details" : "Publish dish"} <RiArrowRightLine size={16} /></>}</button>
              </form>
            </div>
            <div className="relative hidden min-h-[450px] overflow-hidden bg-[#263b30] md:block">
              {videoPreview || editingFood?.video ? <video src={videoPreview || editingFood.video} controls playsInline className="absolute inset-0 h-full w-full object-cover" /> : <><img src="/Images/Culinary Chef.jpg" alt="Chef preparing food" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-linear-to-t from-[#17221c]/90 via-[#17221c]/10 to-[#17221c]/20" /><span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-[8px] font-black uppercase text-[#a64f25]">Reel preview</span><div className="absolute inset-x-0 bottom-0 p-6 text-white"><span className="mb-4 grid h-10 w-10 place-items-center rounded-[13px] bg-[#f3a33a] font-serif text-lg font-black text-[#263b30]">{partner.name?.charAt(0)?.toUpperCase() || "K"}</span><p className="text-[9px] font-black uppercase text-[#f6bc62]">{partner.name || "Your kitchen"}</p><p className="mt-1 line-clamp-2 font-serif text-2xl font-black">{formData.name || "Your next signature dish"}</p><p className="mt-2 line-clamp-3 text-xs leading-5 text-white/75">{formData.description || "A glimpse of the care and craft behind every plate."}</p></div></>}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

function EmptyState({ onCreate, emptySearch = false }) {
  return (
    <div className="relative flex min-h-[230px] flex-col items-center justify-center overflow-hidden rounded-[18px] border border-dashed border-[#ddcfc0] bg-[#fbf8f3] px-5 py-8 text-center">
      <img src="/Images/biryani-removebg-preview.png" alt="" className="absolute -right-3 -top-7 h-40 w-40 rotate-12 object-contain opacity-[0.12]" />
      <span className="relative z-10 grid h-11 w-11 place-items-center rounded-[14px] bg-[#fff0df] text-[#d75a28]"><RiRestaurantLine size={20} /></span>
      <h3 className="relative z-10 mt-3 text-sm font-black">{emptySearch ? "No dishes found" : "Your kitchen is ready for its first story"}</h3>
      <p className="relative z-10 mt-1 max-w-sm text-[10px] leading-4 text-[#968678]">{emptySearch ? "Try another search or clear the field to see your full menu." : "Publish a dish with a short kitchen reel and it will appear here."}</p>
      {!emptySearch && <button type="button" onClick={onCreate} className="relative z-10 mt-4 inline-flex min-h-9 items-center gap-2 rounded-lg bg-[#e85d26] px-3 text-[9px] font-black text-white transition hover:bg-[#c94d20]"><RiAddLine size={14} />Publish your first dish</button>}
    </div>
  );
}