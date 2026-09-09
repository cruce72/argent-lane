document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("#admin-table tbody");
  if (!body || !AL.products) return;

  function binFor(p, i) {
    if (p.bin) return p.bin;
    const aisle = ["A", "B", "C", "D"][i % 4];
    const rack = String((i % 8) + 1).padStart(2, "0");
    return "Kent-" + aisle + "-" + rack;
  }

  function reorderFor(p) {
    if (p.reorderPoint != null) return p.reorderPoint;
    if (p.reorderOz != null) return p.reorderOz;
    return Math.max(2, Math.ceil(p.stock * 0.25));
  }

  body.innerHTML = AL.products.map((p, i) => {
    const onHand = +(p.troyOz * p.stock).toFixed(2);
    const reorder = reorderFor(p);
    const low = onHand <= reorder;
    const status = p.stock === 0 ? "Out" : low ? "Reorder" : "On hand";
    return `<tr class="${low ? "is-low" : ""}">
      <td><code>${p.sku || p.id}</code></td>
      <td>${p.name}</td>
      <td>${AL.formatOz(onHand)}</td>
      <td>${p.stock}</td>
      <td>${binFor(p, i)}</td>
      <td>${reorder} pcs</td>
      <td>${status}</td>
    </tr>`;
  }).join("");
});
