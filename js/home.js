document.addEventListener("DOMContentLoaded", () => {
  const featured = document.getElementById("featured");
  const low = document.getElementById("low-prem");
  const clearance = document.getElementById("clearance");
  const card = AL.productCard || AL.cardHTML;
  if (featured) {
    featured.innerHTML = AL.products.filter((p) => p.featured && !p.clearance).slice(0, 4).map(card).join("");
  }
  if (low) {
    low.innerHTML = AL.products.filter((p) => p.lowestPremium && !p.clearance).slice(0, 4).map(card).join("");
  }
  if (clearance) {
    clearance.innerHTML = AL.products.filter((p) => p.clearance).map(card).join("");
  }
  const art = document.getElementById("art-rounds");
  if (art) {
    art.innerHTML = AL.products.filter((p) => p.category === "art").map(card).join("");
  }
  const oz = document.getElementById("vault-oz");
  const pos = document.getElementById("vault-pos");
  if (oz) oz.textContent = AL.formatOz(AL.products.reduce((n, p) => n + p.troyOz * p.stock, 0));
  if (pos) pos.textContent = String(AL.products.reduce((n, p) => n + p.stock, 0));
  const hero = document.getElementById("hero-spot");
  const note = document.getElementById("hero-spot-note");
  if (hero) hero.textContent = AL.formatMoney(AL.spot, 2);
  if (note) note.textContent = (AL.config.spotLabel || AL.config.spotNote) + " · printed " + (AL.config.spotPrinted || AL.config.spotStamp);
});
