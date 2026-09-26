export default function AuthLayout({
  children,
  badgeText = "Customer Access",
  headline = "Real food, from kitchens near you.",
  description = "Connect directly with neighbourhood cooks, artisan bakers, and independent dining houses.",
  quoteAuthor = "Seasonal Kitchen Digest",
  partnerMode = false,
}) {
  return (
    <main className="relative min-h-screen overflow-auto bg-[#ddd7ce] p-3 font-sans sm:p-5 lg:p-8">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-orange-300/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-black/10 blur-3xl" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-24px)] w-full max-w-6xl overflow-hidden rounded-[30px] border border-black/10 bg-[#fffaf3] shadow-[0_25px_80px_rgba(0,0,0,0.15)] sm:min-h-[calc(100vh-40px)] lg:grid-cols-12">
        
        {/* ================= LEFT PANEL ================= */}
        <section
          className={`relative flex flex-col justify-between p-7 text-white sm:p-10 lg:col-span-5 ${
            partnerMode ? "bg-[#191919]" : "bg-[#f6ad3d]"
          }`}
        >
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  partnerMode ? "bg-orange-500" : "bg-black"
                }`}
              />

              <span
                className={`text-[10px] font-black uppercase tracking-[0.18em] ${
                  partnerMode ? "text-white/60" : "text-black/60"
                }`}
              >
                {badgeText}
              </span>
            </div>

            {/* Headline */}
            <div className="mt-16 space-y-4">
              <h2
                className={`max-w-md text-3xl font-black leading-[1.05] tracking-[-0.04em] sm:text-4xl ${
                  partnerMode ? "text-white" : "text-black"
                }`}
              >
                {headline}
              </h2>

              <p
                className={`max-w-md text-sm leading-6 ${
                  partnerMode ? "text-white/55" : "text-black/55"
                }`}
              >
                {description}
              </p>
            </div>
          </div>

          {/* Quote */}
          <div
            className={`mt-12 border-t pt-6 ${
              partnerMode
                ? "border-white/10"
                : "border-black/10"
            }`}
          >
            <p
              className={`text-xs italic leading-5 ${
                partnerMode ? "text-white/50" : "text-black/50"
              }`}
            >
              “Crafted with respect for real ingredients and human scale.”
            </p>

            <p
              className={`mt-2 text-[10px] font-black uppercase tracking-[0.15em] ${
                partnerMode ? "text-white/30" : "text-black/35"
              }`}
            >
              — {quoteAuthor}
            </p>
          </div>
        </section>

        {/* ================= RIGHT PANEL ================= */}
        <section className="flex items-center justify-center bg-[#fffaf3] p-6 sm:p-10 md:p-12 lg:col-span-7">
          <div className="w-full max-w-md">
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}