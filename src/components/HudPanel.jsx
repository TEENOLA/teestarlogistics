export default function HudPanel({ children, className = "", tight = false }) {
  return (
    <div
      className={`hud-frame bg-panel/70 border border-panel-line ${
        tight ? "p-4" : "p-6 md:p-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}
