import { useMemo, useState } from "react";
import HudPanel from "../components/HudPanel";
import { PrimaryButton } from "../components/ui";
import { intracityRates, interstateRates, internationalRates, destinationMeta } from "../data/rates";
import { lagosZones } from "../data/routes";

const naira = (n) => `₦${Math.round(n).toLocaleString("en-NG")}`;

function airTierFor(weight) {
  if (weight <= 20) return 0;
  if (weight <= 100) return 1;
  if (weight <= 500) return 2;
  return 3;
}

export default function PricingCalculator() {
  const [shipmentType, setShipmentType] = useState("intracity");

  // intracity
  const [zone, setZone] = useState(lagosZones[0].name);
  const [speed, setSpeed] = useState("nextDay");

  // interstate
  const [city, setCity] = useState(interstateRates[0].city);
  const [interstateSpeed, setInterstateSpeed] = useState("standard");

  // international
  const [destKey, setDestKey] = useState("uk");
  const [mode, setMode] = useState("air");
  const [weight, setWeight] = useState(50);

  const result = useMemo(() => {
    if (shipmentType === "intracity") {
      const z = intracityRates.find((r) => r.zone === zone);
      const base = speed === "sameDay" ? z.sameDay : z.nextDay;
      const surcharge = speed === "sameDay" ? base * 0.08 : 0;
      return {
        breakdown: [
          { label: "Base rate", value: base },
          ...(surcharge ? [{ label: "Same-day surcharge (8%)", value: surcharge }] : []),
        ],
        total: base + surcharge,
        currency: "₦",
      };
    }

    if (shipmentType === "interstate") {
      const c = interstateRates.find((r) => r.city === city);
      const base = interstateSpeed === "express" ? c.express : c.standard;
      const distanceNote = `${c.km} km from Lagos`;
      return {
        breakdown: [
          { label: `Base rate (${distanceNote})`, value: base },
        ],
        total: base,
        currency: "₦",
        note: distanceNote,
      };
    }

    // international
    const d = internationalRates[destKey];
    if (mode === "air") {
      const tierIdx = airTierFor(weight);
      const tier = d.air[tierIdx];
      const baseCost = tier.perKg * weight;
      const destinationMultiplier = destKey === "cn" ? 1.0 : destKey === "ca" ? 1.08 : 1;
      const adjusted = baseCost * destinationMultiplier;
      const fuelSurcharge = adjusted * 0.12;
      return {
        breakdown: [
          { label: `Weight × rate (${weight}kg @ ${d.currency}${tier.perKg}/kg, ${tier.tier})`, value: baseCost },
          ...(destinationMultiplier !== 1
            ? [{ label: `Destination multiplier (×${destinationMultiplier})`, value: adjusted - baseCost }]
            : []),
          { label: "Fuel surcharge (12%)", value: fuelSurcharge },
        ],
        total: adjusted + fuelSurcharge,
        currency: d.currency,
      };
    }

    // sea — LCL per CBM approximation using weight as a stand-in volume proxy (1 CBM ≈ 167kg mock density)
    const cbm = Math.max(0.5, weight / 167);
    const lcl = d.sea[0];
    const baseCost = lcl.perKg * cbm;
    const handling = baseCost * 0.06;
    return {
      breakdown: [
        { label: `Volume (${weight}kg ≈ ${cbm.toFixed(2)} CBM @ ${d.currency}${lcl.perKg}/CBM)`, value: baseCost },
        { label: "Port handling (6%)", value: handling },
      ],
      total: baseCost + handling,
      currency: d.currency,
      note: "For full containers (20ft/40ft FCL), see the Cost of Deliveries page.",
    };
  }, [shipmentType, zone, speed, city, interstateSpeed, destKey, mode, weight]);

  const fmt = (n) =>
    result.currency === "₦" ? naira(n) : `${result.currency}${n.toFixed(2)}`;

  return (
    <div>
      <section className="border-b border-panel-line console-grid">
        <div className="max-w-7xl mx-auto px-5 md:px-8 pt-16 pb-14 md:pt-24 md:pb-20">
          <div className="font-mono text-xs text-radar-500 mb-3">ESTIMATE ENGINE</div>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-ink-50 max-w-2xl leading-tight">
            Pricing calculator
          </h1>
          <p className="mt-5 text-ink-500 max-w-xl leading-relaxed">
            Pick a shipment type and get a live estimate with the full breakdown —
            no forms, no waiting on a callback.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24">
        <div className="flex gap-2 mb-10 flex-wrap">
          {[
            { key: "intracity", label: "Intracity Lagos" },
            { key: "interstate", label: "Interstate" },
            { key: "international", label: "International" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setShipmentType(t.key)}
              className={`font-mono text-xs px-5 py-2.5 border transition-colors ${
                shipmentType === t.key
                  ? "border-radar-500 text-radar-500 bg-radar-500/10"
                  : "border-panel-line text-ink-500 hover:text-ink-50"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Inputs */}
          <HudPanel className="lg:col-span-3">
            {shipmentType === "intracity" && (
              <div className="space-y-6">
                <div>
                  <label className="block font-mono text-xs text-ink-500 mb-2">DESTINATION ZONE</label>
                  <select
                    value={zone}
                    onChange={(e) => setZone(e.target.value)}
                    className="w-full bg-void border border-panel-line px-4 py-3 text-ink-50 font-mono text-sm focus:outline-none focus:border-radar-500"
                  >
                    {lagosZones.map((z) => (
                      <option key={z.code} value={z.name}>{z.name} ({z.code})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-xs text-ink-500 mb-2">SPEED</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[{ k: "sameDay", label: "Same-day" }, { k: "nextDay", label: "Next-day" }].map((o) => (
                      <button
                        key={o.k}
                        onClick={() => setSpeed(o.k)}
                        className={`py-3 text-sm border transition-colors ${
                          speed === o.k ? "border-radar-500 text-radar-500 bg-radar-500/10" : "border-panel-line text-ink-300"
                        }`}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {shipmentType === "interstate" && (
              <div className="space-y-6">
                <div>
                  <label className="block font-mono text-xs text-ink-500 mb-2">DESTINATION CITY</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-void border border-panel-line px-4 py-3 text-ink-50 font-mono text-sm focus:outline-none focus:border-radar-500"
                  >
                    {interstateRates.map((c) => (
                      <option key={c.code} value={c.city}>{c.city} ({c.code}) — {c.km}km</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-xs text-ink-500 mb-2">SERVICE LEVEL</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[{ k: "standard", label: "Standard (1–4d)" }, { k: "express", label: "Express" }].map((o) => (
                      <button
                        key={o.k}
                        onClick={() => setInterstateSpeed(o.k)}
                        className={`py-3 text-sm border transition-colors ${
                          interstateSpeed === o.k ? "border-radar-500 text-radar-500 bg-radar-500/10" : "border-panel-line text-ink-300"
                        }`}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {shipmentType === "international" && (
              <div className="space-y-6">
                <div>
                  <label className="block font-mono text-xs text-ink-500 mb-2">DESTINATION</label>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(destinationMeta).map(([key, d]) => (
                      <button
                        key={key}
                        onClick={() => setDestKey(key)}
                        className={`py-3 text-sm border transition-colors ${
                          destKey === key ? "border-radar-500 text-radar-500 bg-radar-500/10" : "border-panel-line text-ink-300"
                        }`}
                      >
                        {d.code} · {d.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block font-mono text-xs text-ink-500 mb-2">MODE</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[{ k: "air", label: "Air freight" }, { k: "sea", label: "Sea freight (LCL)" }].map((o) => (
                      <button
                        key={o.k}
                        onClick={() => setMode(o.k)}
                        className={`py-3 text-sm border transition-colors ${
                          mode === o.k ? "border-radar-500 text-radar-500 bg-radar-500/10" : "border-panel-line text-ink-300"
                        }`}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block font-mono text-xs text-ink-500 mb-2">
                    WEIGHT — {weight} KG
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="1000"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="w-full accent-[#39FF8E]"
                  />
                  <div className="flex justify-between font-mono text-[11px] text-ink-700 mt-1">
                    <span>1kg</span>
                    <span>1000kg</span>
                  </div>
                </div>
              </div>
            )}
          </HudPanel>

          {/* Output */}
          <HudPanel className="lg:col-span-2 bg-panel flex flex-col">
            <div className="font-mono text-xs text-ink-500 mb-1">ESTIMATED COST</div>
            <div className="font-mono text-4xl font-semibold text-radar-500 mb-6">
              {fmt(result.total)}
            </div>

            <div className="space-y-3 flex-1">
              {result.breakdown.map((b, i) => (
                <div key={i} className="flex justify-between gap-4 text-sm border-b border-panel-line pb-2.5">
                  <span className="text-ink-500">{b.label}</span>
                  <span className="font-mono text-ink-300 whitespace-nowrap">{fmt(b.value)}</span>
                </div>
              ))}
            </div>

            {result.note && (
              <p className="mt-5 text-xs text-ink-700 leading-relaxed">{result.note}</p>
            )}

            <PrimaryButton to="/contact" className="mt-6 w-full">
              Proceed to booking
            </PrimaryButton>
          </HudPanel>
        </div>
      </div>
    </div>
  );
}
