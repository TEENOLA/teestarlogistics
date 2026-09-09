import HudPanel from "../components/HudPanel";
import ScanPhoto from "../components/ScanPhoto";
import { PrimaryButton, SectionHeading } from "../components/ui";
import { services } from "../data/routes";
import { photos } from "../data/images";

const serviceImages = {
  freight: photos.cargoPlaneTarmac,
  consolidation: photos.warehouseForklift,
  customs: photos.shipHarbor,
  intracity: photos.motorbikeRider,
  interstate: photos.highwayTruckAerial,
};

export default function Services() {
  return (
    <div>
      <section className="border-b border-panel-line console-grid">
        <div className="max-w-7xl mx-auto px-5 md:px-8 pt-16 pb-14 md:pt-24 md:pb-20">
          <div className="font-mono text-xs text-radar-500 mb-3">SERVICE LINES</div>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-ink-50 max-w-2xl leading-tight">
            Five ways we move things, one operations desk behind all of them
          </h1>
          <p className="mt-5 text-ink-500 max-w-xl leading-relaxed">
            Whichever service you need, it runs through the same Apapa hub, the same
            documentation process, and the same live tracking.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-24 space-y-24 md:space-y-32">
        {services.map((s, i) => (
          <section key={s.id} id={s.id} className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center scroll-mt-24">
            <div className={i % 2 === 1 ? "lg:order-2" : ""}>
              <ScanPhoto src={serviceImages[s.id]} alt={s.name} className="aspect-[4/3]" />
            </div>
            <div className={i % 2 === 1 ? "lg:order-1" : ""}>
              <div className="font-mono text-xs text-ink-700 mb-3">
                SERVICE {String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
              </div>
              <h2 className="font-display font-semibold text-2xl md:text-3xl text-ink-50">{s.name}</h2>
              <p className="mt-4 text-ink-300 leading-relaxed">{s.summary}</p>

              <HudPanel tight className="mt-6">
                <div className="font-mono text-xs text-ink-500 mb-1">INDICATIVE TRANSIT</div>
                <div className="font-mono text-radar-500 text-sm">{s.transit}</div>
              </HudPanel>

              <ul className="mt-6 space-y-3">
                {s.includes.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-ink-300">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-radar-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

      <section className="border-t border-panel-line bg-panel/30 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-5 md:px-8 text-center">
          <h2 className="font-display font-semibold text-2xl md:text-3xl text-ink-50">
            Not sure which service fits your shipment?
          </h2>
          <p className="mt-3 text-ink-500">Run it through the calculator or send us the details directly.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <PrimaryButton to="/calculator">Estimate a cost</PrimaryButton>
            <PrimaryButton to="/contact" className="bg-transparent border border-ink-500/40 text-ink-50 hover:border-radar-500 hover:text-radar-500 hover:bg-transparent">
              Contact us
            </PrimaryButton>
          </div>
        </div>
      </section>
    </div>
  );
}
