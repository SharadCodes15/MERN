import { Link } from "react-router-dom";

export default function BackToLanding() {
  return (
    <Link
      to="/landing"
      className="mb-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-black/50 transition hover:text-black"
    >
      <span aria-hidden="true">&larr;</span>
      Back to landing
    </Link>
  );
}
