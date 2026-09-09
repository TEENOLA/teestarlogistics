import HudPanel from "../components/HudPanel";
import ScanPhoto from "../components/ScanPhoto";
import RadarRouteMap from "../components/RadarRouteMap";
import { SectionHeading, StatBlock } from "../components/ui";
import { trustStats } from "../data/routes";
import { photos } from "../data/images";

const values = [
  {
    title: "Visibility over reassurance",
    body: "We'd rather show you the actual position of your cargo than tell you it's 'on its way.' The radar exists because vague updates aren't updates.",
  },
  {
    title: "One process, every lane",
    body: "A shipment to Shanghai and a parcel to Ikorodu go through the same discipline — documented handoffs, a scanned status at every stage.",
  },
  {
    title: "Built for Nigerian trade",
    body: "Our customs and consolidation workflows are built around Apapa and Lagos realities first, not adapted from a template made for somewhere else.",
  },
];

export default function About() {
  return (
    <div>
      <section className="border-b border-panel-line console-grid">
        <div className="max-w-7xl mx-auto px-5 md:px-8 pt-16 pb-14 md:pt-24 md:pb-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="font-mono text-xs text-radar-500 mb-3">ABOUT TEESTARLOGISTICS</div>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-ink-50 leading-tight">
              We built a radar because "it's on the way" wasn't good enough
            </h1>
            <p className="mt-6 text-ink-300 leading-relaxed">
              TeeStarLogistics started in Lagos moving pallets for a handful of importers
              who were tired of calling their freight forwarder to ask where things stood.
              Nine years on, we run freight into three continents and delivery across
              Nigeria — but the original complaint is still what we build against: don't
              make the customer ask.
            </p>
          </div>
          <ScanPhoto src={photos.lagosSkyline} alt="Lagos Island skyline" className="aspect-[4/3]" />
        </div>
      </section>

      <section className="border-b border-panel-line bg-panel/30">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {trustStats.map((s) => (
            <StatBlock key={s.label} {...s} />
          ))}
        </div>
      </section>

      <section className="py-20 md:py-28 border-b border-panel-line">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <SectionHeading
              kicker="WHY RADAR"
              title="Freight visibility, borrowed from air traffic control"
              description="Air traffic and maritime control rooms have tracked moving assets on a radar for decades because a blip in motion tells you more, faster, than a status string. We applied the same idea to freight: your shipment is a blip with a route, a speed, and a destination — not a line in a spreadsheet."
            />
          </div>
          <RadarRouteMap />
        </div>
      </section>

      <section className="py-20 md:py-28 border-b border-panel-line bg-panel/20">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <SectionHeading kicker="WHAT WE VALUE" title="The principles behind the operations desk" />
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {values.map((v) => (
              <HudPanel key={v.title}>
                <h3 className="font-display font-semibold text-lg text-ink-50">{v.title}</h3>
                <p className="mt-3 text-sm text-ink-500 leading-relaxed">{v.body}</p>
              </HudPanel>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <SectionHeading kicker="COVERAGE" title="Where we operate" />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <HudPanel>
              <div className="font-mono text-xs text-ink-500">DOMESTIC</div>
              <div className="font-display font-semibold text-ink-50 mt-2">Lagos + 8 states</div>
              <p className="text-sm text-ink-500 mt-2">Intracity across all Lagos zones, interstate to major state capitals.</p>
            </HudPanel>
            <HudPanel>
              <div className="font-mono text-xs text-ink-500">INTERNATIONAL</div>
              <div className="font-display font-semibold text-ink-50 mt-2">4 countries</div>
              <p className="text-sm text-ink-500 mt-2">UK, US, Canada and China, by air and sea.</p>
            </HudPanel>
            <HudPanel>
              <div className="font-mono text-xs text-ink-500">HUB</div>
              <div className="font-display font-semibold text-ink-50 mt-2">Apapa, Lagos</div>
              <p className="text-sm text-ink-500 mt-2">Consolidation, warehousing and customs handling under one roof.</p>
            </HudPanel>
          </div>
        </div>
      </section>
    </div>
  );
}
