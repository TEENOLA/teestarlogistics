import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";

const links = [
  { to: "/services", label: "Services" },
  { to: "/cost-of-deliveries", label: "Cost of Deliveries" },
  { to: "/calculator", label: "Pricing Calculator" },
  { to: "/track", label: "Track Shipment" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled ? "bg-void/90 backdrop-blur border-panel-line" : "bg-void/40 backdrop-blur-sm border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="relative w-6 h-6 flex items-center justify-center">
            <span className="absolute inset-0 rounded-full border border-radar-500/50" />
            <span className="w-1.5 h-1.5 rounded-full bg-radar-500 blip-pulse" />
          </span>
          <span className="font-display font-semibold text-lg tracking-tight text-ink-50">
            TeeStar<span className="text-radar-500">Logistics</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive ? "text-radar-500" : "text-ink-300 hover:text-ink-50"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            to="/track"
            className="font-mono text-xs px-4 py-2.5 border border-radar-500/50 text-radar-500 hover:bg-radar-500 hover:text-void transition-colors"
          >
            Track a shipment
          </Link>
        </div>

        <button
          className="lg:hidden text-ink-50 p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <div className="w-5 flex flex-col gap-1.5">
            <span className={`h-px bg-current transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`h-px bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`h-px bg-current transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-panel-line bg-void px-5 py-4 flex flex-col gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `py-2.5 text-sm font-medium border-b border-panel-line/60 ${
                  isActive ? "text-radar-500" : "text-ink-300"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/track"
            onClick={() => setOpen(false)}
            className="mt-3 font-mono text-xs px-4 py-2.5 border border-radar-500/50 text-radar-500 text-center"
          >
            Track a shipment
          </Link>
        </div>
      )}
    </header>
  );
}
