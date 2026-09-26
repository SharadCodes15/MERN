const Footer = () => {
  return (
    <footer className="bg-black px-8 py-10 text-white">

      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">

        <h2 className="text-5xl font-black tracking-tight">
          CRAVE.
        </h2>

        <div className="flex gap-8 text-sm text-white/60">
          <a href="#">Instagram</a>
          <a href="#">Menu</a>
          <a href="#">Contact</a>
        </div>

      </div>

      <div className="mt-10 border-t border-white/10 pt-5 text-xs text-white/40">
        © 2026 Your Restaurant. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;