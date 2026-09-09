import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import RadarSweep from "../components/RadarSweep";
import RadarRouteMap from "../components/RadarRouteMap";
import HudPanel from "../components/HudPanel";
import ScanPhoto from "../components/ScanPhoto";
import { Readout, StatusPill } from "../components/Readout";
import { PrimaryButton, SecondaryButton, SectionHeading, StatBlock } from "../components/ui";
import { trustStats, services, testimonials } from "../data/routes";
import { photos } from "../data/images";

const heroServices = services.slice(0, 4);

export default function Home() {
  return (
    <div>
      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden border-b border-panel-line console-grid">
        <RadarSweep size={1100} />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 font-mono text-xs text-radar-500 border border-radar-500/30 px-3 py-1.5 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-radar-500 blip-pulse" />
                LIVE TRACKING ACROSS 4 COUNTRIES
              </div>
              <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-[3.4rem] leading-[1.08] text-ink-50">
                Your cargo, visible the entire time it's out of your hands.
              </h1>
              <p className="mt-6 text-lg text-ink-300 max-w-xl leading-relaxed">
                TeeStarLogistics moves freight between Nigeria, the UK, US, Canada and
                China, and runs delivery across Lagos and interstate — all tracked on one
                radar, from pickup to your doorstep.
              </p>
              <div className="mt-9 flex flex-col sm:flex-row gap-4">
                <PrimaryButton to="/track">Track a shipment</PrimaryButton>
                <SecondaryButton to="/calculator">Get a quote</SecondaryButton>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
                <Readout label="ORIGIN" value="LOS · Lagos" />
                <Readout label="DESTINATIONS" value="LHR · JFK · YYZ · PVG" />
                <Readout label="STATUS" value="OPERATIONAL" />
              </div>
            </motion.div>

            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <RadarRouteMap />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------------- TRUST BAR ---------------- */}
      <section className="border-b border-panel-line bg-panel/30">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {trustStats.map((s) => (
            <StatBlock key={s.label} {...s} />
          ))}
        </div>
      </section>

      {/* ---------------- ROUTE OVERVIEW ---------------- */}
      <section className="py-20 md:py-28 border-b border-panel-line">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <SectionHeading
            kicker="ROUTE NETWORK"
            title="Four destinations, one consistent handoff"
            description="Every international lane runs through the same pickup, consolidation and customs process out of our Apapa warehouse — so the experience doesn't change whether your cargo lands in London or Shanghai."
          />
          <div className="mt-14 grid lg:grid-cols-2 gap-10 items-center">
            <ScanPhoto src={photos.shipContainers} alt="Shipping containers stacked on a cargo vessel" className="aspect-[4/5] lg:order-1" />
            <div className="grid sm:grid-cols-2 gap-5 lg:order-2">
              {[
                { code: "LHR", city: "London, UK", air: "1–2 days", sea: "18–22 days" },
                { code: "JFK", city: "New York, US", air: "2–3 days", sea: "24–29 days" },
                { code: "YYZ", city: "Toronto, CA", air: "2–3 days", sea: "27–32 days" },
                { code: "PVG", city: "Shanghai, CN", air: "3–4 days", sea: "32–38 days" },
              ].map((r) => (
                <HudPanel key={r.code} tight>
                  <div className="font-mono text-xs text-ink-500">LOS → {r.code}</div>
                  <div className="mt-1 font-display font-semibold text-ink-50">{r.city}</div>
                  <div className="mt-4 space-y-1.5 text-sm">
                    <div className="flex justify-between text-ink-300">
                      <span>Air</span>
                      <span className="font-mono text-radar-500">{r.air}</span>
                    </div>
                    <div className="flex justify-between text-ink-300">
                      <span>Sea</span>
                      <span className="font-mono text-ink-300">{r.sea}</span>
                    </div>
                  </div>
                </HudPanel>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SERVICES TEASER ---------------- */}
      <section className="py-20 md:py-28 border-b border-panel-line bg-panel/20">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <SectionHeading
              kicker="WHAT WE MOVE"
              title="One provider for the full chain"
              description="From an air freight pallet leaving China to a same-day parcel crossing Lagos, it runs through the same operations team and the same radar."
            />
            <Link to="/services" className="font-mono text-sm text-radar-500 hover:text-radar-300 whitespace-nowrap">
              View all services
            </Link>
          </div>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {heroServices.map((s) => (
              <HudPanel key={s.id} className="flex flex-col">
                <div className="font-display font-semibold text-ink-50 leading-snug">{s.name}</div>
                <p className="mt-3 text-sm text-ink-500 leading-relaxed flex-1">{s.summary}</p>
                <div className="mt-5 font-mono text-xs text-ink-700 border-t border-panel-line pt-4">
                  {s.transit}
                </div>
              </HudPanel>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- HOW TRACKING WORKS ---------------- */}
      <section className="py-20 md:py-28 border-b border-panel-line">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <SectionHeading
              kicker="THE RADAR"
              title="Every shipment is a blip you can watch move"
              description="Enter your tracking number and see exactly where your cargo sits on the route — plus a scan-log of every stage it's cleared, from pickup to delivery."
            />
            <div className="mt-8">
              <PrimaryButton to="/track">Try the radar</PrimaryButton>
            </div>
          </div>

          <HudPanel className="bg-panel">
            <div className="flex items-center justify-between mb-5">
              <div className="font-mono text-xs text-ink-500">TSL-2026-88421</div>
              <StatusPill status="IN TRANSIT" />
            </div>
            <div className="relative h-40 console-grid-fine border border-panel-line mb-5 overflow-hidden">
              <div className="absolute left-[12%] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-ink-500" />
              <div className="absolute left-[62%] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-amber-500 blip-pulse-amber" />
              <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-ink-700" />
              <svg className="absolute inset-0 w-full h-full">
                <line x1="12%" y1="50%" x2="90%" y2="50%" stroke="#39FF8E" strokeOpacity="0.25" strokeDasharray="4 4" />
              </svg>
              <span className="absolute left-[12%] top-[62%] font-mono text-[10px] text-ink-700">LOS</span>
              <span className="absolute right-[8%] top-[62%] font-mono text-[10px] text-ink-700">LHR</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Readout label="ETA" value="2D 6H" tone="amber" />
              <Readout label="WEIGHT" value="68 kg" tone="ink" />
              <Readout label="PIECES" value="4" tone="ink" />
              <Readout label="MODE" value="AIR" tone="ink" />
            </div>
          </HudPanel>
        </div>
      </section>

      {/* ---------------- TESTIMONIALS ---------------- */}
      <section className="py-20 md:py-28 border-b border-panel-line bg-panel/20">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <SectionHeading kicker="WHO SHIPS WITH US" title="Businesses that stopped chasing updates" align="center" />
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <HudPanel key={t.name} className="flex flex-col">
                <p className="text-ink-300 leading-relaxed flex-1">"{t.quote}"</p>
                <div className="mt-6 pt-5 border-t border-panel-line">
                  <div className="font-display font-medium text-ink-50">{t.name}</div>
                  <div className="text-sm text-ink-500">{t.role}</div>
                </div>
              </HudPanel>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CTA BAND ---------------- */}
      <section className="relative overflow-hidden py-20 md:py-24">
        <div className="absolute inset-0 console-grid opacity-60" />
        <div className="relative max-w-4xl mx-auto px-5 md:px-8 text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-ink-50">
            Know what your next shipment will cost before you book it.
          </h2>
          <p className="mt-4 text-ink-500 max-w-xl mx-auto">
            Run intracity, interstate or international numbers through the calculator —
            no account needed.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-4 justify-center">
            <PrimaryButton to="/calculator">Open the calculator</PrimaryButton>
            <SecondaryButton to="/contact">Talk to the team</SecondaryButton>
          </div>
        </div>
      </section>
    </div>
  );
}
