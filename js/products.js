/* RealCut — product catalog data + render logic.
   Real asset data. `status` drives the card/button: "coming-soon" shows a
   disabled button and hides the (not-yet-real) store link; "live" shows a
   working Buy button. Flip Smart Save to "live" and fill storeUrl on launch. */

const PRODUCTS = {
  "smart-save": {
    name: "Smart Save System",
    tagline: "A complete, encrypted save & load framework for Unity — two simple APIs, zero setup.",
    shortDesc:
      "Encrypted save/load with multiple slots, auto-save, versioning & migration, a ready-made slot UI and an in-editor Save Debugger.",
    version: "1.0.0",
    unity: "2021.3 LTS – Unity 6",
    updated: "Launching soon",
    price: "$19.99",
    status: "coming-soon",
    launchOffer: "30% off launch week",
    category: "Tools / Utilities",
    storeUrl: "",
    images: [
      "assets/img/smart-save-1.svg",
      "assets/img/smart-save-2.svg",
      "assets/img/smart-save-3.svg",
    ],
    features: [
      "<strong>Two APIs</strong> — simple key/value (<code>SmartSave.Set/Get</code>) and <code>[SmartSave]</code> attribute auto-capture.",
      "<strong>AES-256 encryption</strong> (or XOR / none) with optional GZip compression.",
      "<strong>Async saving</strong> — non-blocking writes so large saves never hitch your frame rate.",
      "<strong>Multiple save slots</strong> with automatic gameplay screenshots and metadata.",
      "<strong>Ready-made Save Slots menu</strong> (uGUI + TextMeshPro) with delete confirmation.",
      "<strong>Auto Save Manager</strong> — timer, scene change, checkpoint, pause or quit triggers.",
      "<strong>Save versioning & migration</strong> — old player saves keep working across updates.",
      "<strong>In-editor Save Debugger</strong> — inspect, edit, export and delete saves as you develop.",
      "<strong>Cross-platform, zero dependencies</strong> — PC, mobile, WebGL, consoles · IL2CPP & Mono.",
    ],
    howToUse: [
      "Import the package from the Unity Asset Store.",
      "Call <code>SmartSave.Set(\"coins\", 100)</code> then <code>SmartSave.Save()</code> — encrypted, on disk.",
      "Or mark fields with <code>[SmartSave]</code> and add a <code>SaveableEntity</code> component.",
      "Call <code>SmartSave.Load()</code> — everything comes back. That's it.",
    ],
    compatibility: [
      ["Unity 2021.3 LTS", "yes"],
      ["Unity 2022.3 LTS", "yes"],
      ["Unity 2023 / Unity 6", "yes"],
      ["Built-in / URP / HDRP", "yes"],
      ["IL2CPP & Mono", "yes"],
    ],
    changelog: [
      ["v1.0.0", "Launching soon", "Initial release — two APIs, AES-256 encryption, slots, auto-save, versioning, ready-made slot UI and Save Debugger."],
    ],
    faq: [
      ["Does it work with my existing project?", "Yes — Smart Save System is additive. You mark the fields you want saved and it never touches the rest of your code."],
      ["Can I save custom classes?", "Yes. Any [Serializable] type works — Vector3, Color and your own classes included."],
      ["Will player saves break when I update my game?", "No. Built-in save versioning and migration callbacks keep old saves loading across updates."],
      ["Does it have dependencies?", "None. Pure C# with full source; TextMeshPro (built into Unity) is only used by the optional ready-made menu."],
    ],
  },

  "smart-inventory": {
    name: "Smart Inventory System",
    tagline: "An integration-first inventory framework that drops into the game you already have.",
    shortDesc:
      "A clean, layered inventory framework — stacking, categories, equipment and a polished UI — designed to fit your existing project, not replace it. Free.",
    version: "1.0.0",
    unity: "Unity 6 (6000.5)",
    updated: "Coming soon",
    price: "Free",
    status: "coming-soon",
    category: "Systems / Gameplay",
    storeUrl: "",
    images: [
      "assets/img/inventory-1.svg",
      "assets/img/inventory-2.svg",
      "assets/img/inventory-3.svg",
    ],
    features: [
      "<strong>Integration-first</strong> — a strictly layered architecture (Data / Runtime / Service / UI) that drops into an existing project without taking it over.",
      "<strong>Stacking, categories, tags, rarity & weight</strong> — the inventory model most games actually need.",
      "<strong>Equipment slots</strong> with per-slot constraints.",
      "<strong>Polished AAA UI</strong> — grid & list, drag & drop with ghost preview, tooltips, context menu, hotbar, search, sort, filter and themes.",
      "<strong>Any save system</strong> — ID-based runtime state; first-class Smart Save integration, never required.",
      "<strong>Engine-light, testable core</strong> — quest/inventory logic provable without entering Play mode.",
    ],
    howToUse: [
      "Import the package and open the included demo scene.",
      "Define your items as ScriptableObject definitions.",
      "Drop the inventory UI prefab into your canvas.",
      "Drive it through the typed event system — no manager forced into your bootstrap.",
    ],
    compatibility: [
      ["Unity 6 (6000.5)", "yes"],
      ["Built-in / URP / HDRP", "yes"],
      ["uGUI + TextMeshPro", "yes"],
      ["IL2CPP & Mono", "yes"],
      ["Works with Smart Save", "yes"],
    ],
    changelog: [
      ["v1.0.0", "Coming soon", "Initial free release — layered inventory framework with a full UI kit and developer tools."],
    ],
    faq: [
      ["How much does it cost?", "It's free — released to introduce RealCut and give developers a clean inventory foundation to build on."],
      ["Do I have to adopt a whole ecosystem?", "No. That's the whole point: it's a layer that fits your existing architecture, UI and save system — not a host that replaces them."],
      ["Can I use my own UI?", "Yes. The UI is optional and replaceable; the framework is fully usable with zero UI."],
      ["Does it work with Smart Save System?", "Yes — first-class integration in one line, and never a hard dependency."],
    ],
  },
};

/* ---- shared helpers ---- */
function isComingSoon(p) {
  return p.status === "coming-soon" || !p.storeUrl;
}

// The primary action for a product. Coming-soon assets show a disabled button
// instead of a dead store link — no false "Buy" before the asset is purchasable.
function storeButton(p, label) {
  if (isComingSoon(p)) {
    return `<span class="btn btn-store is-disabled" aria-disabled="true">Coming soon</span>`;
  }
  return `<a class="btn btn-store" href="${p.storeUrl}" target="_blank" rel="noopener">${label} — ${p.price}</a>`;
}

// Price line: "Free", or the price with an optional launch-offer note.
function priceLine(p) {
  if (p.price === "Free") return `<span class="price-tag free">Free</span>`;
  const offer = p.launchOffer
    ? ` <span class="price-offer">${p.launchOffer}</span>`
    : "";
  return `<span class="price-tag">${p.price}</span>${offer}`;
}

/* ---- Products listing page ---- */
function renderProductGrid(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = Object.entries(PRODUCTS)
    .map(
      ([id, p]) => `
    <article class="product-card">
      <a class="thumb" href="product.html?id=${id}">
        <img src="${p.images[0]}" alt="${p.name} cover image">
        ${isComingSoon(p) ? '<span class="ribbon">Coming soon</span>' : ""}
      </a>
      <div class="body">
        <div class="meta-row">
          <span class="badge accent">v${p.version}</span>
          <span class="badge">Unity ${p.unity}</span>
          <span class="badge">${p.price === "Free" ? "Free" : p.price}</span>
        </div>
        <h3><a href="product.html?id=${id}">${p.name}</a></h3>
        <p class="desc">${p.shortDesc}</p>
        <div class="card-actions">
          <a class="btn btn-outline" href="product.html?id=${id}">Details</a>
          ${storeButton(p, "View on Unity Store")}
        </div>
      </div>
    </article>`
    )
    .join("");
}

/* ---- Product detail page ---- */
function renderProductPage() {
  const root = document.getElementById("product-root");
  if (!root) return;

  const id = new URLSearchParams(location.search).get("id");
  const p = PRODUCTS[id];

  if (!p) {
    root.innerHTML = `
      <div class="container section" style="text-align:center">
        <h1>Product not found</h1>
        <p style="color:var(--text-dim);margin:1rem 0 2rem">The asset you are looking for doesn't exist or was moved.</p>
        <a class="btn btn-primary" href="products.html">Back to Products</a>
      </div>`;
    return;
  }

  document.title = `${p.name} — RealCut`;

  const thumbs = p.images
    .map(
      (src, i) => `
      <button class="${i === 0 ? "active" : ""}" data-src="${src}" aria-label="Screenshot ${i + 1}">
        <img src="${src}" alt="${p.name} screenshot ${i + 1}">
      </button>`
    )
    .join("");

  const features = p.features.map((f) => `<li>${f}</li>`).join("");
  const steps = p.howToUse.map((s) => `<li><span>${s}</span></li>`).join("");
  const compat = p.compatibility
    .map(([k, v]) => `<tr><td>${k}</td><td class="yes">${v === "yes" ? "✓ Supported" : v}</td></tr>`)
    .join("");
  const changelog = p.changelog
    .map(
      ([ver, date, note]) =>
        `<li><span class="ver">${ver}</span><span class="date">${date}</span><p>${note}</p></li>`
    )
    .join("");
  const faq = p.faq
    .map(
      ([q, a]) =>
        `<details><summary>${q}</summary><div class="answer">${a}</div></details>`
    )
    .join("");

  root.innerHTML = `
  <div class="product-hero">
    <div class="container">
      <div class="breadcrumb"><a href="index.html">Home</a> / <a href="products.html">Products</a> / ${p.name}</div>
      <div class="product-top">
        <div>
          <div class="gallery-main"><img id="gallery-main-img" src="${p.images[0]}" alt="${p.name} main screenshot"></div>
          <div class="gallery-thumbs">${thumbs}</div>
        </div>
        <div class="product-info">
          <h1>${p.name}</h1>
          <p class="lead">${p.tagline}</p>
          <ul class="spec-list">
            <li><span class="k">Version</span><span class="v">v${p.version}</span></li>
            <li><span class="k">Supported Unity</span><span class="v">${p.unity}</span></li>
            <li><span class="k">Status</span><span class="v">${p.updated}</span></li>
            <li><span class="k">Price</span><span class="v">${priceLine(p)}</span></li>
            <li><span class="k">Category</span><span class="v">${p.category}</span></li>
          </ul>
          <div class="card-actions">
            ${storeButton(p, "View on Unity Asset Store")}
            <a class="btn btn-outline" href="docs.html">Documentation</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <section class="detail-section">
      <h2>🎬 Trailer</h2>
      <div class="video-box">
        <div class="placeholder">
          <div class="play-circle">▶</div>
          <p><strong>${p.name} — Overview Trailer</strong><br>Short video demo goes here (YouTube embed).</p>
        </div>
      </div>
    </section>

    <section class="detail-section">
      <h2>✨ Features</h2>
      <ul class="check-list">${features}</ul>
    </section>

    <section class="detail-section">
      <h2>🚀 How to Use</h2>
      <ol class="steps">${steps}</ol>
    </section>

    <section class="detail-section">
      <h2>🧩 Unity Compatibility</h2>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Version / Pipeline</th><th>Status</th></tr></thead>
          <tbody>${compat}</tbody>
        </table>
      </div>
    </section>

    <section class="detail-section">
      <h2>📝 Changelog</h2>
      <ul class="changelog">${changelog}</ul>
    </section>

    <section class="detail-section faq">
      <h2>❓ FAQ</h2>
      ${faq}
    </section>

    <section class="detail-section" style="text-align:center">
      ${
        isComingSoon(p)
          ? `<p style="color:var(--text-dim);margin-bottom:1rem">${
              p.price === "Free"
                ? "Free on the Unity Asset Store — coming soon."
                : `Launching soon on the Unity Asset Store at ${p.price}${
                    p.launchOffer ? ` · ${p.launchOffer}` : ""
                  }.`
            }</p>
             <span class="btn btn-store is-disabled" aria-disabled="true" style="font-size:1.05rem;padding:0.9rem 2.2rem">Coming soon</span>`
          : `<a class="btn btn-store" href="${p.storeUrl}" target="_blank" rel="noopener" style="font-size:1.05rem;padding:0.9rem 2.2rem">
               View ${p.name} on the Unity Asset Store — ${p.price}
             </a>`
      }
    </section>
  </div>`;

  // gallery interaction
  root.querySelectorAll(".gallery-thumbs button").forEach((btn) => {
    btn.addEventListener("click", () => {
      root.querySelectorAll(".gallery-thumbs button").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById("gallery-main-img").src = btn.dataset.src;
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderProductGrid("product-grid");
  renderProductPage();
});
