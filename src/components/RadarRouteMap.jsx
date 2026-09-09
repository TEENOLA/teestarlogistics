import { motion } from "framer-motion";

// Destinations plotted by compass bearing + log-scaled radius from Lagos,
// rendered as a radar/polar chart rather than a literal map — keeps the
// visual language consistent with the tracking radar elsewhere on the site.
const destinations = [
  { code: "LHR", city: "London", country: "UK", bearing: 340, distanceKm: 5030, eta: "1–2d air" },
  { code: "JFK", city: "New York", country: "US", bearing: 282, distanceKm: 8480, eta: "2–3d air" },
  { code: "YYZ", city: "Toronto", country: "CA", bearing: 300, distanceKm: 8770, eta: "2–3d air" },
  { code: "PVG", city: "Shanghai", country: "CN", bearing: 78, distanceKm: 11640, eta: "3–4d air" },
];

const CX = 300;
const CY = 300;
const MAX_R = 250;

function polar(bearingDeg, radius) {
  const rad = ((bearingDeg - 90) * Math.PI) / 180;
  return { x: CX + radius * Math.cos(rad), y: CY + radius * Math.sin(rad) };
}

export default function RadarRouteMap({ className = "" }) {
  const minDist = Math.min(...destinations.map((d) => d.distanceKm));
  const maxDist = Math.max(...destinations.map((d) => d.distanceKm));

  const scaled = destinations.map((d) => {
    const t = (Math.log(d.distanceKm) - Math.log(minDist)) / (Math.log(maxDist) - Math.log(minDist));
    const radius = 90 + t * (MAX_R - 90);
    return { ...d, ...polar(d.bearing, radius) };
  });

  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 600 600" className="w-full h-auto">
        <defs>
          <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#39FF8E" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#39FF8E" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx={CX} cy={CY} r={MAX_R + 30} fill="url(#radarGlow)" />

        {/* range rings */}
        {[0.32, 0.55, 0.78, 1].map((f, i) => (
          <circle
            key={i}
            cx={CX}
            cy={CY}
            r={MAX_R * f}
            fill="none"
            stroke="#39FF8E"
            strokeOpacity={0.14}
            strokeWidth="1"
          />
        ))}

        {/* compass spokes */}
        {Array.from({ length: 12 }).map((_, i) => {
          const p = polar(i * 30, MAX_R);
          return (
            <line
              key={i}
              x1={CX}
              y1={CY}
              x2={p.x}
              y2={p.y}
              stroke="#39FF8E"
              strokeOpacity={0.08}
              strokeWidth="1"
            />
          );
        })}

        {/* route lines to each destination */}
        {scaled.map((d, i) => (
          <line
            key={d.code}
            x1={CX}
            y1={CY}
            x2={d.x}
            y2={d.y}
            stroke="#39FF8E"
            strokeOpacity={0.5}
            strokeWidth="1.25"
            strokeDasharray="400"
            style={{
              strokeDashoffset: 400,
              animation: `draw-line 1.6s ease-out ${0.15 * i + 0.2}s forwards`,
            }}
          />
        ))}

        {/* Lagos origin */}
        <circle cx={CX} cy={CY} r="5" fill="#39FF8E" />
        <circle cx={CX} cy={CY} r="10" fill="none" stroke="#39FF8E" strokeOpacity="0.5" strokeWidth="1" />
        <text
          x={CX}
          y={CY + 26}
          textAnchor="middle"
          className="fill-radar-500"
          style={{ font: "600 13px 'IBM Plex Mono', monospace" }}
        >
          LOS
        </text>
        <text
          x={CX}
          y={CY - 16}
          textAnchor="middle"
          className="fill-ink-500"
          style={{ font: "500 10px 'IBM Plex Mono', monospace", letterSpacing: "0.04em" }}
        >
          LAGOS
        </text>

        {/* destination blips */}
        {scaled.map((d, i) => (
          <g key={d.code}>
            <motion.circle
              cx={d.x}
              cy={d.y}
              r="4.5"
              fill="#39FF8E"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 * i + 1.3, duration: 0.3 }}
            />
            <circle cx={d.x} cy={d.y} r="4.5" fill="none" stroke="#39FF8E" strokeOpacity="0.5">
              <animate attributeName="r" values="4.5;16;4.5" dur="2.4s" repeatCount="indefinite" begin={`${1.5 + i * 0.3}s`} />
              <animate attributeName="opacity" values="0.6;0;0.6" dur="2.4s" repeatCount="indefinite" begin={`${1.5 + i * 0.3}s`} />
            </circle>
          </g>
        ))}

        {/* labels, offset outward from each blip */}
        {scaled.map((d) => {
          const offsetX = d.x > CX ? 14 : -14;
          const anchor = d.x > CX ? "start" : "end";
          return (
            <g key={`${d.code}-label`}>
              <text
                x={d.x + offsetX}
                y={d.y - 2}
                textAnchor={anchor}
                className="fill-ink-50"
                style={{ font: "600 13px 'IBM Plex Mono', monospace" }}
              >
                {d.code}
              </text>
              <text
                x={d.x + offsetX}
                y={d.y + 14}
                textAnchor={anchor}
                className="fill-ink-500"
                style={{ font: "400 10px 'IBM Plex Mono', monospace" }}
              >
                {d.eta}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
