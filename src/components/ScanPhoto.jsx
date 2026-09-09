export default function ScanPhoto({ src, alt, className = "", children }) {
  return (
    <div className={`console-photo hud-frame overflow-hidden ${className}`}>
      <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
      {children && (
        <div className="absolute inset-0 z-3 flex items-end p-4">{children}</div>
      )}
    </div>
  );
}
