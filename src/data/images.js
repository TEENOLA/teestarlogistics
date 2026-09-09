// Real sourced photography (Unsplash, free license). Sized via the Unsplash
// Imgix params rather than bundling, since this is a demo/portfolio build.
const base = (id, w = 1600, q = 70) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=${q}`;

export const photos = {
  shipContainers: base("photo-1741792003907-11e3bdc2a180"), // stacked containers, Hamburg
  shipHarbor: base("photo-1634638022845-1ab614a94128"), // cargo ship pulled into harbor
  motorbikeRider: base("photo-1753806901333-44632dc78b49"), // delivery rider, dense city traffic
  warehouseForklift: base("photo-1645736315000-6f788915923b"), // forklift among pallets
  cargoPlaneTarmac: base("photo-1716718810773-d2a52b43602f"), // freighter on tarmac
  lagosSkyline: base("photo-1640475168764-b0a8860c0fcf"), // Lagos Island high-rises
  highwayTruckAerial: base("photo-1708193203896-ba0630862bb6"), // aerial highway, truck
};
