export function Readout({ label, value, tone = "radar" }) {
  const toneClass =
    tone === "amber" ? "text-amber-400" : tone === "ink" ? "text-ink-300" : "text-radar-500";
  return (
    <div className="flex items-baseline gap-2 font-mono text-xs">
      <span className="text-ink-500 tracking-wide">{label}</span>
      <span className={`${toneClass} font-medium`}>{value}</span>
    </div>
  );
}

export function StatusPill({ status }) {
  const map = {
    "IN TRANSIT": "text-amber-400 border-amber-500/40 bg-amber-500/10",
    "OUT FOR DELIVERY": "text-radar-500 border-radar-500/40 bg-radar-500/10",
    DELIVERED: "text-radar-500 border-radar-500/40 bg-radar-500/10",
    "PICKED UP": "text-ink-300 border-ink-500/30 bg-ink-500/10",
  };
  const cls = map[status] || "text-ink-300 border-ink-500/30 bg-ink-500/10";
  return (
    <span className={`inline-flex items-center gap-1.5 font-mono text-[11px] tracking-wide px-2.5 py-1 border ${cls}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
