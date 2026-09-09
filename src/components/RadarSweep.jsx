export default function RadarSweep({ size = 900 }) {
  return (
    <div
      className="radar-sweep-wrap"
      style={{ width: size, height: size, left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}
      aria-hidden="true"
    >
      <div className="radar-rings">
        {[0.22, 0.42, 0.62, 0.82, 1].map((f, i) => (
          <div
            key={i}
            className="radar-ring"
            style={{ width: size * f, height: size * f }}
          />
        ))}
      </div>
      <div
        className="radar-sweep"
        style={{ width: size, height: size, top: 0, left: 0 }}
      />
    </div>
  );
}
