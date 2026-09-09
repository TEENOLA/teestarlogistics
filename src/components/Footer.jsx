import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-panel-line bg-panel/40">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-14 grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2">
          <Link to="/" className="flex items-center gap-2.5 mb-4">
            <span className="relative w-6 h-6 flex items-center justify-center">
              <span className="absolute inset-0 rounded-full border border-radar-500/50" />
              <span className="w-1.5 h-1.5 rounded-full bg-radar-500" />
            </span>
            <span className="font-display font-semibold text-lg text-ink-50">
              TeeStar<span className="text-radar-500">Logistics</span>
            </span>
          </Link>
          <p className="text-sm text-ink-500 max-w-xs leading-relaxed">
            Freight forwarding and logistics out of Lagos, built around one idea:
            you should always know exactly where your cargo is.
          </p>
          <div className="mt-5 font-mono text-[11px] text-ink-700 space-y-1">
            <div>HQ: 14 Marina Close, Apapa, Lagos</div>
            <div>NGAPP · LOS</div>
          </div>
        </div>

        <div>
          <h4 className="font-mono text-xs text-ink-500 tracking-wide mb-3">NAVIGATE</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/services" className="text-ink-300 hover:text-radar-500">Services</Link></li>
            <li><Link to="/cost-of-deliveries" className="text-ink-300 hover:text-radar-500">Cost of Deliveries</Link></li>
            <li><Link to="/calculator" className="text-ink-300 hover:text-radar-500">Pricing Calculator</Link></li>
            <li><Link to="/track" className="text-ink-300 hover:text-radar-500">Track Shipment</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs text-ink-500 tracking-wide mb-3">COMPANY</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/about" className="text-ink-300 hover:text-radar-500">About</Link></li>
            <li><Link to="/contact" className="text-ink-300 hover:text-radar-500">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs text-ink-500 tracking-wide mb-3">ROUTES</h4>
          <ul className="space-y-2.5 text-sm font-mono text-ink-300">
            <li>LOS → LHR</li>
            <li>LOS → JFK</li>
            <li>LOS → YYZ</li>
            <li>LOS → PVG</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-panel-line">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-700 font-mono">
          <span>© {new Date().getFullYear()} TeeStarLogistics. Demo site — not a real freight carrier.</span>
          <span>Built by deolustudio</span>
        </div>
      </div>
    </footer>
  );
}
