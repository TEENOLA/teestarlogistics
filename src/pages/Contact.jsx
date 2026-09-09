import { useState } from "react";
import HudPanel from "../components/HudPanel";
import { Readout } from "../components/Readout";

const shipmentTypes = ["International Freight", "Intracity Lagos", "Interstate Nigeria", "General Inquiry"];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", type: shipmentTypes[0], message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div>
      <section className="border-b border-panel-line console-grid">
        <div className="max-w-7xl mx-auto px-5 md:px-8 pt-16 pb-14 md:pt-24 md:pb-20">
          <div className="font-mono text-xs text-radar-500 mb-3">GET IN TOUCH</div>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-ink-50 max-w-2xl leading-tight">
            Talk to the operations desk
          </h1>
          <p className="mt-5 text-ink-500 max-w-xl leading-relaxed">
            Whether it's a single parcel across Lagos or a full container from Shanghai,
            tell us what you're moving and we'll respond within one business day.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-24 grid lg:grid-cols-5 gap-10">
        <HudPanel className="lg:col-span-3">
          {sent ? (
            <div className="py-10 text-center">
              <div className="font-mono text-xs text-radar-500 mb-3">MESSAGE RECEIVED</div>
              <h3 className="font-display font-semibold text-xl text-ink-50">
                Thanks, {form.name.split(" ")[0] || "there"} — we'll be in touch shortly.
              </h3>
              <p className="mt-2 text-sm text-ink-500">
                This is a demo form; nothing was actually sent.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-mono text-xs text-ink-500 mb-2">NAME</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-void border border-panel-line px-4 py-3 text-ink-50 text-sm focus:outline-none focus:border-radar-500"
                    placeholder="Adaeze Okonkwo"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-ink-500 mb-2">EMAIL</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-void border border-panel-line px-4 py-3 text-ink-50 text-sm focus:outline-none focus:border-radar-500"
                    placeholder="you@company.com"
                  />
                </div>
              </div>
              <div>
                <label className="block font-mono text-xs text-ink-500 mb-2">SHIPMENT TYPE</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full bg-void border border-panel-line px-4 py-3 text-ink-50 font-mono text-sm focus:outline-none focus:border-radar-500"
                >
                  {shipmentTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-mono text-xs text-ink-500 mb-2">MESSAGE</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-void border border-panel-line px-4 py-3 text-ink-50 text-sm focus:outline-none focus:border-radar-500 resize-none"
                  placeholder="Tell us what you're shipping, from where, and to where."
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-radar-500 text-void font-semibold text-sm hover:bg-radar-300 transition-colors"
              >
                Send message
              </button>
            </form>
          )}
        </HudPanel>

        <div className="lg:col-span-2 space-y-6">
          <HudPanel>
            <div className="font-mono text-xs text-ink-500 mb-4">LAGOS OFFICE</div>
            <div className="space-y-3 text-sm text-ink-300">
              <div>14 Marina Close, Apapa, Lagos, Nigeria</div>
              <div>+234 803 555 0142</div>
              <div>ops@teestarlogistics.com</div>
            </div>
            <div className="mt-5 pt-5 border-t border-panel-line">
              <a
                href="https://wa.me/2348035550142"
                className="inline-flex items-center gap-2 text-sm text-radar-500 hover:text-radar-300"
              >
                Message us on WhatsApp →
              </a>
            </div>
          </HudPanel>

          <HudPanel>
            <div className="font-mono text-xs text-ink-500 mb-4">COORDINATE READOUT</div>
            <div className="space-y-3">
              <Readout label="LAT" value="6.4531° N" tone="ink" />
              <Readout label="LON" value="3.3958° E" tone="ink" />
              <Readout label="HUB" value="Apapa, Lagos" />
              <Readout label="HOURS" value="Mon–Sat, 8am–7pm WAT" tone="ink" />
            </div>
          </HudPanel>
        </div>
      </div>
    </div>
  );
}
