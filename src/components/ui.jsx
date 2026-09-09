import { Link } from "react-router-dom";

export function PrimaryButton({ to, href, children, className = "", ...rest }) {
  const cls = `inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-radar-500 text-void font-semibold text-sm hover:bg-radar-300 transition-colors ${className}`;
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>;
  return <a href={href} className={cls} {...rest}>{children}</a>;
}

export function SecondaryButton({ to, href, children, className = "", ...rest }) {
  const cls = `inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-ink-500/40 text-ink-50 font-semibold text-sm hover:border-radar-500 hover:text-radar-500 transition-colors ${className}`;
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>;
  return <a href={href} className={cls} {...rest}>{children}</a>;
}

export function SectionHeading({ kicker, title, description, align = "left" }) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {kicker && (
        <div className="font-mono text-xs text-radar-500 mb-3 tracking-wide">{kicker}</div>
      )}
      <h2 className="font-display font-semibold text-3xl md:text-4xl text-ink-50 leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-ink-500 leading-relaxed">{description}</p>
      )}
    </div>
  );
}

export function StatBlock({ value, suffix, label }) {
  return (
    <div>
      <div className="font-mono text-3xl md:text-4xl font-semibold text-radar-500">
        {value}
        <span className="text-2xl">{suffix}</span>
      </div>
      <div className="mt-1.5 text-sm text-ink-500">{label}</div>
    </div>
  );
}
