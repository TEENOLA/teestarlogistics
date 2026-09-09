# TeeStarLogistics

A portfolio/demo freight & logistics site with a "Control Deck" radar visual
language, built with React + Vite + Tailwind CSS v4 + React Router + Framer
Motion. All content, rates and tracking data are mock — there's no backend.

## Run it locally

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview   # to check the production build locally
```

## Structure

- `src/pages/` — the 7 site pages (Home, Services, Cost of Deliveries,
  Pricing Calculator, Track Shipment, About, Contact)
- `src/components/` — shared UI: Navbar, Footer, RadarSweep, RadarRouteMap
  (the polar route-network chart), HudPanel (the corner-bracket frame used
  everywhere), ScanPhoto (the console photo treatment), Readout/StatusPill
- `src/data/` — mock rates, routes, shipments and sourced photo references

## Notes

- Photography is hotlinked from Unsplash (free license, no attribution
  required) — an internet connection is needed for images to load.
- Try tracking numbers `TSL-2026-88421`, `TSL-2026-77190` or
  `TSL-2026-65004` on the Track Shipment page.
- Fonts: Sora (display), Plus Jakarta Sans (body), IBM Plex Mono (data/mono),
  loaded from Google Fonts in `index.html`.
# teestarlogistics
