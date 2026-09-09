import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HudPanel from "../components/HudPanel";
import { Readout, StatusPill } from "../components/Readout";
import { PrimaryButton } from "../components/ui";
import { shipments, sampleTrackingNumbers } from "../data/shipments";

function RadarBlip({ shipment }) {
  const p = shipment.routePoint;
  // normalise the mock 1000x520 route canvas to a 0-100% box
  const left = (p.x / 1000) * 100;
  const top = (p.y / 520) * 100;

  return (
    <div className="relative aspect-[16/9] border border-panel-line console-grid-fine overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line
          x1={(shipment.origin.code.includes("LOS") ? 8 : 8)}
          y1="60"
          x2="92"
          y2="30"
          stroke="#39FF8E"
          strokeOpacity="0.18"
          strokeWidth="0.4"
          strokeDasharray="1.5 1.5"
        />
      </svg>
      <div className="absolute left-[8%] top-[58%] flex flex-col items-center gap-1">
        <span className="w-2 h-2 rounded-full bg-ink-500" />
        <span className="font-mono text-[10px] text-ink-700">{shipment.origin.code}</span>
      </div>
      <div className="absolute right-[6%] top-[28%] flex flex-col items-center gap-1">
        <span className="w-2 h-2 rounded-full bg-ink-700" />
        <span className="font-mono text-[10px] text-ink-700">{shipment.destination.code}</span>
      </div>
      <motion.div
        className="absolute flex flex-col items-center gap-1 -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${left}%`, top: `${top}%` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <span className={`w-3 h-3 rounded-full ${shipment.status === "IN TRANSIT" ? "bg-amber-500 blip-pulse-amber" : "bg-radar-500 blip-pulse"}`} />
        <span className="font-mono text-[10px] text-ink-50 whitespace-nowrap bg-void/80 px-1.5">
          {shipment.currentLocation}
        </span>
      </motion.div>
    </div>
  );
}

function Timeline({ log }) {
  return (
    <div className="space-y-0">
      {log.map((step, i) => (
        <div key={step.stage} className="flex gap-4">
          <div className="flex flex-col items-center">
            <span
              className={`w-2.5 h-2.5 rounded-full shrink-0 mt-1 ${
                step.done ? "bg-radar-500" : "bg-panel-line border border-ink-700"
              }`}
            />
            {i < log.length - 1 && (
              <span className={`w-px flex-1 min-h-[28px] ${step.done ? "bg-radar-500/40" : "bg-panel-line"}`} />
            )}
          </div>
          <div className="pb-6">
            <div className={`text-sm font-medium ${step.done ? "text-ink-50" : "text-ink-700"}`}>
              {step.stage}
            </div>
            <div className="font-mono text-xs text-ink-700 mt-0.5">{step.time}</div>
            {step.note && <div className="text-xs text-ink-500 mt-1">{step.note}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function TrackShipment() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const key = input.trim().toUpperCase();
    if (shipments[key]) {
      setResult(shipments[key]);
      setError("");
    } else {
      setResult(null);
      setError("No shipment found for that tracking number. Try one of the samples below.");
    }
  };

  return (
    <div>
      <section className="border-b border-panel-line console-grid">
        <div className="max-w-5xl mx-auto px-5 md:px-8 pt-16 pb-14 md:pt-24 md:pb-20">
          <div className="font-mono text-xs text-radar-500 mb-3">SHIPMENT RADAR</div>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-ink-50 max-w-2xl leading-tight">
            Track a shipment
          </h1>
          <p className="mt-5 text-ink-500 max-w-xl leading-relaxed">
            Enter a tracking number to see its position on the route and a full scan-log
            of its status.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. TSL-2026-88421"
              className="flex-1 bg-panel border border-panel-line px-4 py-3.5 font-mono text-sm text-ink-50 placeholder:text-ink-700 focus:outline-none focus:border-radar-500"
            />
            <button
              type="submit"
              className="px-6 py-3.5 bg-radar-500 text-void font-semibold text-sm hover:bg-radar-300 transition-colors whitespace-nowrap"
            >
              Track
            </button>
          </form>

          <div className="mt-4 flex flex-wrap gap-2 items-center">
            <span className="font-mono text-xs text-ink-700">TRY:</span>
            {sampleTrackingNumbers.map((n) => (
              <button
                key={n}
                onClick={() => {
                  setInput(n);
                  setResult(shipments[n]);
                  setError("");
                }}
                className="font-mono text-xs text-ink-500 hover:text-radar-500 underline underline-offset-4"
              >
                {n}
              </button>
            ))}
          </div>

          {error && <p className="mt-4 text-sm text-amber-400">{error}</p>}
        </div>
      </section>

      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            key={result.trackingNumber}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-5xl mx-auto px-5 md:px-8 py-14 md:py-20"
          >
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div>
                <div className="font-mono text-xs text-ink-500">{result.type}</div>
                <div className="font-display font-semibold text-2xl text-ink-50 mt-1">
                  {result.trackingNumber}
                </div>
              </div>
              <StatusPill status={result.status} />
            </div>

            <HudPanel className="mb-8">
              <RadarBlip shipment={result} />
            </HudPanel>

            <div className="grid md:grid-cols-3 gap-8">
              <HudPanel className="md:col-span-1 h-fit">
                <div className="font-mono text-xs text-ink-500 mb-5">SHIPMENT DETAIL</div>
                <div className="space-y-4">
                  <Readout label="ORIGIN" value={`${result.origin.city} (${result.origin.code})`} tone="ink" />
                  <Readout label="DESTINATION" value={`${result.destination.city} (${result.destination.code})`} tone="ink" />
                  <Readout label="WEIGHT" value={result.weight} tone="ink" />
                  <Readout label="PIECES" value={String(result.pieces)} tone="ink" />
                  <Readout label="ETA" value={result.etaLabel} tone="amber" />
                </div>
              </HudPanel>

              <HudPanel className="md:col-span-2">
                <div className="font-mono text-xs text-ink-500 mb-5">SCAN LOG</div>
                <Timeline log={result.log} />
              </HudPanel>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!result && (
        <div className="max-w-5xl mx-auto px-5 md:px-8 py-14 md:py-20 text-center text-ink-700 font-mono text-sm">
          Awaiting tracking number input —
        </div>
      )}
    </div>
  );
}
