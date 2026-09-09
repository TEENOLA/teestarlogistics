// Mock route network. Coordinates are simplified positions on a 1000x520
// equirectangular-ish canvas used by the RouteRadar component, not real
// projected lat/long — close enough to read as "a map" without a mapping lib.

export const originLagos = {
  code: "LOS",
  name: "Lagos",
  country: "Nigeria",
  x: 478,
  y: 305,
};

export const internationalRoutes = [
  {
    id: "uk",
    code: "LHR",
    city: "London",
    country: "United Kingdom",
    x: 470,
    y: 130,
    distanceKm: 5030,
    airTransit: "1–2 days",
    seaTransit: "18–22 days",
    currency: "GBP",
  },
  {
    id: "us",
    code: "JFK",
    city: "New York",
    country: "United States",
    x: 245,
    y: 165,
    distanceKm: 8480,
    airTransit: "2–3 days",
    seaTransit: "24–29 days",
    currency: "USD",
  },
  {
    id: "ca",
    code: "YYZ",
    city: "Toronto",
    country: "Canada",
    x: 218,
    y: 108,
    distanceKm: 8770,
    airTransit: "2–3 days",
    seaTransit: "27–32 days",
    currency: "CAD",
  },
  {
    id: "cn",
    code: "PVG",
    city: "Shanghai",
    country: "China",
    x: 855,
    y: 200,
    distanceKm: 11640,
    airTransit: "3–4 days",
    seaTransit: "32–38 days",
    currency: "CNY",
  },
];

export const interstateHubs = [
  { code: "ABV", city: "Abuja", zone: "North Central" },
  { code: "PHC", city: "Port Harcourt", zone: "South South" },
  { code: "KAN", city: "Kano", zone: "North West" },
  { code: "IBA", city: "Ibadan", zone: "South West" },
  { code: "ENU", city: "Enugu", zone: "South East" },
  { code: "BEN", city: "Benin City", zone: "South South" },
  { code: "CBQ", city: "Calabar", zone: "South South" },
  { code: "JOS", city: "Jos", zone: "North Central" },
];

export const lagosZones = [
  { code: "IKJ", name: "Ikeja" },
  { code: "LKI", name: "Lekki" },
  { code: "VI", name: "Victoria Island" },
  { code: "IKD", name: "Ikorodu" },
  { code: "AJH", name: "Ajah" },
  { code: "SRL", name: "Surulere" },
  { code: "APP", name: "Apapa" },
  { code: "YAB", name: "Yaba" },
];

export const trustStats = [
  { label: "Years in operation", value: "9", suffix: "" },
  { label: "Shipments tracked", value: "42", suffix: "K+" },
  { label: "Countries served", value: "4", suffix: "" },
  { label: "On-time delivery rate", value: "97.4", suffix: "%" },
];

export const services = [
  {
    id: "freight",
    name: "International Freight Forwarding",
    summary: "Air and sea freight to the UK, US, Canada and China, door-to-port or door-to-door.",
    transit: "1 day – 38 days, mode-dependent",
    includes: [
      "Rate comparison across air and sea",
      "Booking with vetted carrier partners",
      "Full radar tracking from pickup to delivery",
      "Documentation prep (commercial invoice, packing list, B/L or AWB)",
    ],
  },
  {
    id: "consolidation",
    name: "Cargo Consolidation & Warehousing",
    summary: "Short-term storage in Lagos plus consolidation of multiple supplier shipments into one container.",
    transit: "Storage from 1 day; consolidation cycles weekly",
    includes: [
      "Bonded and non-bonded warehousing in Apapa",
      "Multi-supplier consolidation to cut per-unit freight cost",
      "Inventory counts on intake and release",
      "Repacking and palletizing on request",
    ],
  },
  {
    id: "customs",
    name: "Customs Clearance Support",
    summary: "Clearance handling at Nigerian ports and airports, and on the receiving end where we operate.",
    transit: "1–5 business days, port-dependent",
    includes: [
      "HS code classification and duty estimation",
      "Liaison with NCS and terminal operators",
      "Import/export documentation review",
      "Demurrage risk flagged before it becomes a cost",
    ],
  },
  {
    id: "intracity",
    name: "Intracity Lagos Delivery",
    summary: "Same-day and next-day delivery across Lagos mainland and island zones.",
    transit: "Same-day (booked before 1pm) or next-day",
    includes: [
      "Real-time rider tracking on the radar",
      "Proof of delivery with signature capture",
      "Fragile and bulk-item handling options",
      "Scheduled pickup windows",
    ],
  },
  {
    id: "interstate",
    name: "Interstate Nigeria Logistics",
    summary: "Scheduled runs between Lagos and major state capitals, with consolidated load options.",
    transit: "1–4 days, distance-dependent",
    includes: [
      "Fixed routes to Abuja, Port Harcourt, Kano, Ibadan and more",
      "Full-truck and shared-load pricing",
      "Checkpoint-to-checkpoint status updates",
      "Depot pickup or last-mile delivery",
    ],
  },
];

export const testimonials = [
  {
    name: "Adaeze Okonkwo",
    role: "Founder, Adaeze Fabrics & Prints",
    quote:
      "I used to call three times a day asking where my container was. Now I just check the radar. It's the first logistics partner that's made me feel like I'm not in the dark.",
  },
  {
    name: "Femi Adebayo",
    role: "Ops Lead, Bayo Electronics Ltd",
    quote:
      "Our Shanghai-to-Lagos runs used to have a two-week margin of error. TeeStarLogistics gets us within a day, and their customs team hasn't missed a beat yet.",
  },
  {
    name: "Grace Effiong",
    role: "Owner, Effiong Beauty Supplies",
    quote:
      "Intracity delivery across Lagos used to be my biggest headache. Their riders show up on schedule and the tracking link means my customers stop calling me.",
  },
];
