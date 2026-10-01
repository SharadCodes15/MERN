import { Link } from "react-router-dom";
import BackToLanding from "./BackToLanding";

export default function AuthLayout({
  children,
  image,
  imageAlt,
  imageLabel,
  heroTitle,
  heroAccent,
  audienceLabel,
}) {
  return (
    <main className="min-h-[100dvh] overflow-x-hidden overflow-y-auto bg-[#f4ad32] p-3 md:p-5">
      <div className="flex min-h-[calc(100dvh-24px)] overflow-hidden rounded-[36px] border border-black/10 bg-[#fffaf3] shadow-[0_24px_80px_rgba(66,34,10,0.24)] md:min-h-[calc(100dvh-40px)]">
        <section className="relative hidden w-[48%] overflow-hidden bg-[#f6ad3d] lg:block">
          <div className="absolute -left-32 top-20 h-[420px] w-[420px] rounded-full border-[60px] border-black/[0.06]" />
          <div className="absolute -bottom-48 -right-32 h-[550px] w-[550px] rounded-full border-[70px] border-black/[0.06]" />

          <Link to="/" className="absolute left-10 top-8 z-30 text-3xl font-black text-black transition-transform duration-300 hover:scale-105">
            CRAVE.
          </Link>

          <div className="group absolute bottom-[20%] left-10 right-10 top-[12%] overflow-hidden rounded-[40px] border-[8px] border-white/90 bg-black/10 shadow-[0_30px_60px_rgba(0,0,0,0.25)]">
            <img src={image} alt={imageAlt} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
            <div className="absolute bottom-6 left-6 z-10 rounded-full border border-white/50 bg-white/90 px-5 py-3 shadow-xl backdrop-blur-md">
              <p className="text-sm font-black text-black">{imageLabel}</p>
            </div>
            <span className="absolute right-6 top-6 z-10 rounded-full border border-white/40 bg-black/45 px-4 py-2 text-[9px] font-black uppercase tracking-[0.16em] text-white backdrop-blur-sm">
              {audienceLabel}
            </span>
          </div>

          <div className="absolute bottom-8 left-10 z-20">
            <h2 className="text-4xl font-black leading-[0.9] text-black xl:text-5xl">
              {heroTitle}<br />{heroAccent}
            </h2>
          </div>
        </section>

        <section className="auth-form-scroll relative flex min-h-0 flex-1 items-center justify-center bg-[#fffaf3] px-6 py-8 md:px-10 lg:px-14">
          <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full border-[80px] border-[#f6ad3d]/10" />
          <div className="relative z-10 w-full max-w-[440px]">
            <BackToLanding />
            <Link to="/" className="mb-8 block text-3xl font-black text-black lg:hidden">CRAVE.</Link>
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}