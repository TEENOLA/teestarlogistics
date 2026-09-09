import { useState } from "react";
import HudPanel from "../components/HudPanel";
import { PrimaryButton } from "../components/ui";
import { intracityRates, interstateRates, internationalRates, destinationMeta } from "../data/rates";

const naira = (n) => `₦${n.toLocaleString("en-NG")}`;

function Table({ headers, rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm font-mono min-w-[520px]">
        <thead>
          <tr className="border-b border-panel-line text-ink-500 text-xs">
            {headers.map((h) => (
              <th key={h} className="text-left font-normal py-3 pr-4 tracking-wide">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-panel-line/60 text-ink-300">
              {r.map((c, j) => (
                <td key={j} className={`py-3 pr-4 ${j === 0 ? "text-ink-50" : ""}`}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function CostOfDeliveries() {
  const [intlDest, setIntlDest] = useState("uk");
  const intl = internationalRates[intlDest];

  return (
    <div>
      <section className="border-b border-panel-line console-grid">
        <div className="max-w-7xl mx-auto px-5 md:px-8 pt-16 pb-14 md:pt-24 md:pb-20">
          <div className="font-mono text-xs text-radar-500 mb-3">RATE CARD — REFERENCE ONLY</div>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-ink-50 max-w-2xl leading-tight">
            Cost of deliveries, published
          </h1>
          <p className="mt-5 text-ink-500 max-w-xl leading-relaxed">
            These are indicative rates for planning purposes. Actual pricing depends on
            weight, dimensions and current carrier capacity — use the{" "}
            <a href="/calculator" className="text-radar-500 underline underline-offset-4">
              pricing calculator
            </a>{" "}
            or contact us for a locked-in quote.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-24 space-y-16">
        {/* Intracity */}
        <section>
          <div className="flex items-baseline justify-between mb-6 flex-wrap gap-3">
            <h2 className="font-display font-semibold text-2xl text-ink-50">Intracity — Lagos zones</h2>
            <span className="font-mono text-xs text-ink-700">FROM APAPA HUB · NAIRA</span>
          </div>
          <HudPanel>
            <Table
              headers={["Zone", "Code", "Same-day", "Next-day"]}
              rows={intracityRates.map((r) => [r.zone, r.code, naira(r.sameDay), naira(r.nextDay)])}
            />
          </HudPanel>
        </section>

        {/* Interstate */}
        <section>
          <div className="flex items-baseline justify-between mb-6 flex-wrap gap-3">
            <h2 className="font-display font-semibold text-2xl text-ink-50">Interstate — major cities</h2>
            <span className="font-mono text-xs text-ink-700">FROM LAGOS · NAIRA</span>
          </div>
          <HudPanel>
            <Table
              headers={["City", "Code", "Distance", "Standard (1–4d)", "Express"]}
              rows={interstateRates.map((r) => [
                r.city,
                r.code,
                `${r.km} km`,
                naira(r.standard),
                naira(r.express),
              ])}
            />
          </HudPanel>
        </section>

        {/* International */}
        <section>
          <div className="flex items-baseline justify-between mb-6 flex-wrap gap-3">
            <h2 className="font-display font-semibold text-2xl text-ink-50">International — by weight tier</h2>
            <span className="font-mono text-xs text-ink-700">FROM LAGOS · PER KG OR CBM</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {Object.entries(destinationMeta).map(([key, d]) => (
              <button
                key={key}
                onClick={() => setIntlDest(key)}
                className={`font-mono text-xs px-4 py-2 border transition-colors ${
                  intlDest === key
                    ? "border-radar-500 text-radar-500 bg-radar-500/10"
                    : "border-panel-line text-ink-500 hover:text-ink-50"
                }`}
              >
                {d.code} · {d.name}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <HudPanel>
              <div className="font-mono text-xs text-ink-500 mb-4">AIR FREIGHT</div>
              <Table
                headers={["Weight tier", "Rate per kg"]}
                rows={intl.air.map((r) => [r.tier, `${intl.currency}${r.perKg}`])}
              />
            </HudPanel>
            <HudPanel>
              <div className="font-mono text-xs text-ink-500 mb-4">SEA FREIGHT</div>
              <Table
                headers={["Load type", "Rate"]}
                rows={intl.sea.map((r) => [
                  r.tier,
                  `${intl.currency}${r.perKg.toLocaleString()} / ${r.unit}`,
                ])}
              />
            </HudPanel>
          </div>
        </section>

        <HudPanel className="bg-panel text-center py-10">
          <p className="text-ink-300 max-w-lg mx-auto">
            Rates above are indicative and change with fuel surcharges and carrier space.
            For an exact figure on your shipment, use the calculator.
          </p>
          <div className="mt-6">
            <PrimaryButton to="/calculator">Get a precise estimate</PrimaryButton>
          </div>
        </HudPanel>
      </div>
    </div>
  );
}
