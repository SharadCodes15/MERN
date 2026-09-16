export default function AuthLayout({
  children,
  badgeText = "Customer Access",
  headline = "Real food, from kitchens near you.",
  description = "Connect directly with neighbourhood cooks, artisan bakers, and independent dining houses.",
  quoteAuthor = "Seasonal Kitchen Digest",
  partnerMode = false,
}) {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-10 font-sans selection:bg-neutral-900 selection:text-white dark:selection:bg-neutral-100 dark:selection:text-black">
      {/* Dynamic Background Pattern */}
      <div className="architectural-pattern absolute inset-0 pointer-events-none" />

      {/* Main Responsive Grid Container */}
      <div className="relative z-10 w-full max-w-5xl auth-surface rounded-2xl border overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        {/* Left Side: Context / Branding Sidebar */}
        <div
          className={`lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[var(--border-subtle)] ${
            partnerMode ? "bg-[#18110e] text-[#fbeee9]" : "bg-[#0b1411] text-[#e8f1ec]"
          }`}
        >
          <div>
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  partnerMode ? "bg-[var(--partner-primary)]" : "bg-[var(--primary)]"
                }`}
              />
              <span className="text-xs font-semibold tracking-wider uppercase opacity-80">
                {badgeText}
              </span>
            </div>

            <div className="mt-14 space-y-3">
              <h2 className="text-2xl sm:text-3xl font-serif tracking-tight leading-snug">
                {headline}
              </h2>
              <p className="text-sm leading-relaxed opacity-70">
                {description}
              </p>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-white/10">
            <p className="text-xs italic opacity-60">“Crafted with respect for real ingredients and human scale.”</p>
            <p className="text-xs font-medium mt-1 tracking-wide uppercase opacity-40">
              — {quoteAuthor}
            </p>
          </div>
        </div>

        {/* Right Side: Interactive Forms */}
        <div className="lg:col-span-7 p-6 sm:p-10 md:p-12 flex flex-col justify-center bg-[var(--bg-surface)]">
          {children}
        </div>
      </div>
    </div>
  );
}