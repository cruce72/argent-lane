window.AL = window.AL || {};

AL.spot = AL.config.spotFallback;
AL.spotUpdated = AL.config.spotStamp;
AL.spotSource = "demo";

AL.formatMoney = function (n, digits) {
  const d = digits == null ? 2 : digits;
  return Number(n).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: d,
    maximumFractionDigits: d
  });
};

AL.formatOz = function (n) {
  return Number(n).toLocaleString("en-US", {
    minimumFractionDigits: n % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2
  });
};

AL.premiumFor = function (product, qty) {
  const tiers = (product.premiumTiers || []).slice().sort((a, b) => a.min - b.min);
  let prem = tiers.length ? tiers[0].premium : 0;
  tiers.forEach((t) => {
    if (qty >= t.min) prem = t.premium;
  });
  return prem;
};

AL.price = function (product, qty, method) {
  qty = Math.max(1, Number(qty) || 1);
  method = method || "wire";
  const spot = AL.spot || AL.config.spotFallback;
  const prem = AL.premiumFor(product, qty);
  const melt = spot * product.troyOz;
  const unitWire = melt + prem * product.troyOz;
  const mult = method === "card" ? AL.config.cardMultiplier : 1;
  const unit = unitWire * mult;
  return {
    spot,
    melt,
    premiumPerOz: prem,
    premiumTotal: prem * product.troyOz,
    method,
    multiplier: mult,
    unit,
    unitWire,
    total: unit * qty,
    totalWire: unitWire * qty,
    oz: product.troyOz * qty,
    perOz: unit / product.troyOz,
    metal: melt * qty,
    premium: prem * product.troyOz * qty,
    surcharge: unit * qty - unitWire * qty
  };
};

AL.loadSpot = async function () {
  AL.spot = AL.config.spotFallback;
  AL.spotUpdated = AL.config.spotStamp;
  AL.spotSource = "demo";
  window.dispatchEvent(new CustomEvent("al:spot", { detail: AL.spot }));
  return AL.spot;
};
