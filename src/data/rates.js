// All figures are indicative mock rates for demo purposes.

export const intracityRates = [
  { zone: "Ikeja", code: "IKJ", sameDay: 3500, nextDay: 2200 },
  { zone: "Lekki", code: "LKI", sameDay: 4200, nextDay: 2800 },
  { zone: "Victoria Island", code: "VI", sameDay: 3800, nextDay: 2500 },
  { zone: "Ikorodu", code: "IKD", sameDay: 4500, nextDay: 3000 },
  { zone: "Ajah", code: "AJH", sameDay: 4800, nextDay: 3200 },
  { zone: "Surulere", code: "SRL", sameDay: 3200, nextDay: 2000 },
  { zone: "Apapa", code: "APP", sameDay: 3000, nextDay: 1900 },
  { zone: "Yaba", code: "YAB", sameDay: 3000, nextDay: 1900 },
];

export const interstateRates = [
  { city: "Abuja", code: "ABV", km: 760, standard: 18500, express: 27000 },
  { city: "Port Harcourt", code: "PHC", km: 620, standard: 16000, express: 23500 },
  { city: "Kano", code: "KAN", km: 990, standard: 22500, express: 33000 },
  { city: "Ibadan", code: "IBA", km: 130, standard: 8500, express: 13000 },
  { city: "Enugu", code: "ENU", km: 540, standard: 14500, express: 21000 },
  { city: "Benin City", code: "BEN", km: 320, standard: 11500, express: 17000 },
  { city: "Calabar", code: "CBQ", km: 700, standard: 17500, express: 25500 },
  { city: "Jos", code: "JOS", km: 890, standard: 20500, express: 30000 },
];

// International: cost per kg by weight tier, air vs sea, in destination currency.
export const internationalRates = {
  uk: {
    currency: "£",
    air: [
      { tier: "0–20kg", perKg: 6.8 },
      { tier: "21–100kg", perKg: 5.4 },
      { tier: "101–500kg", perKg: 4.1 },
      { tier: "500kg+", perKg: 3.2 },
    ],
    sea: [
      { tier: "LCL (per CBM)", perKg: 95, unit: "cbm" },
      { tier: "20ft FCL", perKg: 1450, unit: "container" },
      { tier: "40ft FCL", perKg: 2350, unit: "container" },
    ],
  },
  us: {
    currency: "$",
    air: [
      { tier: "0–20kg", perKg: 8.9 },
      { tier: "21–100kg", perKg: 7.1 },
      { tier: "101–500kg", perKg: 5.6 },
      { tier: "500kg+", perKg: 4.3 },
    ],
    sea: [
      { tier: "LCL (per CBM)", perKg: 110, unit: "cbm" },
      { tier: "20ft FCL", perKg: 1850, unit: "container" },
      { tier: "40ft FCL", perKg: 2950, unit: "container" },
    ],
  },
  ca: {
    currency: "C$",
    air: [
      { tier: "0–20kg", perKg: 11.6 },
      { tier: "21–100kg", perKg: 9.3 },
      { tier: "101–500kg", perKg: 7.2 },
      { tier: "500kg+", perKg: 5.6 },
    ],
    sea: [
      { tier: "LCL (per CBM)", perKg: 128, unit: "cbm" },
      { tier: "20ft FCL", perKg: 2050, unit: "container" },
      { tier: "40ft FCL", perKg: 3250, unit: "container" },
    ],
  },
  cn: {
    currency: "¥",
    air: [
      { tier: "0–20kg", perKg: 48 },
      { tier: "21–100kg", perKg: 39 },
      { tier: "101–500kg", perKg: 31 },
      { tier: "500kg+", perKg: 24 },
    ],
    sea: [
      { tier: "LCL (per CBM)", perKg: 620, unit: "cbm" },
      { tier: "20ft FCL", perKg: 9800, unit: "container" },
      { tier: "40ft FCL", perKg: 15600, unit: "container" },
    ],
  },
};

export const destinationMeta = {
  uk: { name: "United Kingdom", code: "LHR" },
  us: { name: "United States", code: "JFK" },
  ca: { name: "Canada", code: "YYZ" },
  cn: { name: "China", code: "PVG" },
};
