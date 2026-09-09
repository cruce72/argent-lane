window.AL = window.AL || {};

AL.config = {
  brand: "Argent Lane",
  short: "ARGENT",
  parent: "Cruce Works",
  tagline: "Physical silver. On hand. Shipped from our vault.",
  email: "desk@argentlane.com",
  phone: "(253) 555-0188",
  hours: "Weekdays 9:00–17:00 PT",
  address: {
    line1: "Cruce Works / Argent Lane",
    line2: "Kent, Washington",
    region: "WA",
    country: "United States"
  },
  shipFrom: "Kent, WA",
  spotFallback: 67.8,
  spotUpdated: "2026-09-09T19:00:00Z",
  cardSurcharge: 0.035,
  freeShipAt: 199,
  shipUnder: 12.5,
  signatureAt: 500,
  storageKey: "argent-lane-cart",
  formName: "order"
};

AL.spot = AL.config.spotFallback;
AL.spotSource = "seed";
AL.spotStamp = AL.config.spotUpdated;
