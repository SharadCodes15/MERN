import {
  RiBookmarkLine,
  RiCompass3Line,
  RiHome5Line,
  RiLogoutBoxLine,
  RiPlayCircleLine,
  RiSearchLine,
} from "@remixicon/react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/home", icon: RiHome5Line },
  { label: "Reels", to: "/reels", icon: RiPlayCircleLine },
  { label: "Saved", to: "/saved", icon: RiBookmarkLine },
];

export default function Navbar({ onLogout }) {
  const location = useLocation();

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[250px] border-r border-[#e9e0d7] bg-[#fffdf9] px-7 py-8 lg:block">
        <Link to="/home" className="font-serif text-3xl font-black tracking-[-0.06em] text-[#211914]">
          crave<span className="text-[#e85d26]">.</span>
        </Link>

        <nav className="mt-16 space-y-2" aria-label="Primary navigation">
          {navItems.map(({ label, to, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex min-h-12 items-center gap-4 rounded-2xl px-4 text-sm font-bold transition ${active ? "bg-[#fff0df] text-[#df571e]" : "text-[#75675e] hover:bg-[#f8f2ec] hover:text-[#211914]"}`}
              >
                <Icon size={22} />
                {label}
              </Link>
            );
          })}
          <button type="button" className="flex min-h-12 w-full items-center gap-4 rounded-2xl px-4 text-sm font-bold text-[#75675e] transition hover:bg-[#f8f2ec] hover:text-[#211914]">
            <RiSearchLine size={22} />
            Search
          </button>
          <button type="button" className="flex min-h-12 w-full items-center gap-4 rounded-2xl px-4 text-sm font-bold text-[#75675e] transition hover:bg-[#f8f2ec] hover:text-[#211914]">
            <RiCompass3Line size={22} />
            Explore
          </button>
        </nav>

        <button type="button" onClick={onLogout} className="absolute bottom-8 left-7 flex items-center gap-4 rounded-2xl px-4 py-3 text-sm font-bold text-[#75675e] transition hover:bg-[#f8f2ec] hover:text-[#211914]">
          <RiLogoutBoxLine size={22} />
          Logout
        </button>
      </aside>

      <header className="fixed inset-x-0 top-0 z-30 flex h-16 items-center justify-between border-b border-[#e9e0d7] bg-[#fffdf9]/95 px-5 backdrop-blur lg:hidden">
        <Link to="/home" className="font-serif text-2xl font-black tracking-[-0.06em] text-[#211914]">
          crave<span className="text-[#e85d26]">.</span>
        </Link>
        <nav className="flex items-center gap-4" aria-label="Mobile navigation">
          {navItems.map(({ label, to, icon: Icon }) => (
            <Link key={to} to={to} aria-label={label} className={location.pathname === to ? "text-[#df571e]" : "text-[#75675e]"}>
              <Icon size={22} />
            </Link>
          ))}
          <button type="button" onClick={onLogout} aria-label="Logout" className="text-[#75675e]"><RiLogoutBoxLine size={22} /></button>
        </nav>
      </header>
    </>
  );
}
