/* RealCut — product catalog data + render logic.
   NOTE: These are sample/showcase entries for the publisher portfolio.
   Replace images, links and copy with real asset data before going live. */

const PRODUCTS = {
  "smart-save": {
    name: "Smart Save System",
    tagline: "A complete, encrypted save & load solution for Unity — set up in minutes.",
    shortDesc:
      "Plug-and-play save/load framework with AES encryption, auto-save, multiple slots and cloud-ready serialization.",
    version: "1.3.0",
    unity: "2021.3 LTS – Unity 6",
    updated: "July 2026",
    price: "$24.99",
    category: "Tools / Utilities",
    storeUrl: "https://assetstore.unity.com/",
    images: [
      "assets/img/smart-save-1.svg",
      "assets/img/smart-save-2.svg",
      "assets/img/smart-save-3.svg",
    ],
    features: [
      "<strong>One-line saving</strong> — save any object with a single attribute, no boilerplate code.",
      "<strong>AES-256 encryption</strong> — protect player data from tampering out of the box.",
      "<strong>Auto-save & save slots</strong> — configurable intervals and unlimited named slots.",
      "<strong>Cloud-ready</strong> — JSON serialization compatible with Steam Cloud & PlayFab.",
      "<strong>Cross-platform</strong> — PC, mobile, WebGL and consoles with one API.",
      "<strong>Zero dependencies</strong> — pure C#, no third-party packages required.",
    ],
    howToUse: [
      "Import the package from the Unity Asset Store.",
      "Add the <code>SmartSaveManager</code> prefab to your first scene.",
      "Mark any field you want persisted with the <code>[SmartSave]</code> attribute.",
      "Call <code>SmartSave.Save()</code> and <code>SmartSave.Load()</code> — that's it.",
    ],
    compatibility: [
      ["Unity 2021.3 LTS", "yes"],
      ["Unity 2022.3 LTS", "yes"],
      ["Unity 2023 / Unity 6", "yes"],
      ["Built-in / URP / HDRP", "yes"],
      ["IL2CPP & Mono", "yes"],
    ],
    changelog: [
      ["v1.3.0", "July 2026", "Added Unity 6 support, new visual save-slot browser window, WebGL IndexedDB backend."],
      ["v1.2.1", "April 2026", "Fixed auto-save timing issue on scene reload; performance improvements for large save files."],
      ["v1.2.0", "February 2026", "Added AES-256 encryption option and save-file versioning/migration API."],
      ["v1.0.0", "November 2025", "Initial release."],
    ],
    faq: [
      ["Does it work with my existing project?", "Yes — Smart Save System is additive. You mark the fields you want saved and it never touches the rest of your code."],
      ["Can I save custom classes?", "Absolutely. Any serializable class works, and you can write custom converters for special types."],
      ["Is multiplayer supported?", "The system is local-first, but its JSON output can be synced through any backend (PlayFab, Firebase, your own server)."],
      ["Do I get updates for free?", "Yes, all 1.x updates are free for existing customers on the Unity Asset Store."],
    ],
  },

  "advanced-inventory": {
    name: "Advanced Inventory System",
    tagline: "Grid-based inventory with drag & drop, crafting and full UI — ready for your RPG or survival game.",
    shortDesc:
      "Feature-complete inventory framework: grid & list layouts, drag-and-drop, stacking, crafting recipes and equipment slots.",
    version: "2.1.0",
    unity: "2021.3 LTS – Unity 6",
    updated: "June 2026",
    price: "$34.99",
    category: "Systems / Gameplay",
    storeUrl: "https://assetstore.unity.com/",
    images: [
      "assets/img/inventory-1.svg",
      "assets/img/inventory-2.svg",
      "assets/img/inventory-3.svg",
    ],
    features: [
      "<strong>Grid & list layouts</strong> — Resident-Evil-style grids or classic RPG lists, switchable at runtime.",
      "<strong>Drag, drop & stack</strong> — polished interactions with ghost previews and stack splitting.",
      "<strong>Crafting system</strong> — recipe ScriptableObjects with ingredient validation and crafting queues.",
      "<strong>Equipment slots</strong> — weapon, armor and accessory slots with stat modifiers.",
      "<strong>Save integration</strong> — works out of the box with Smart Save System.",
      "<strong>UGUI + UI Toolkit</strong> — prefabs for both UI systems included.",
    ],
    howToUse: [
      "Import the package and open the included demo scene.",
      "Create your items as <code>ItemDefinition</code> ScriptableObjects.",
      "Drop the <code>InventoryPanel</code> prefab into your canvas.",
      "Hook pickup/use events through the built-in <code>InventoryEvents</code> API.",
    ],
    compatibility: [
      ["Unity 2021.3 LTS", "yes"],
      ["Unity 2022.3 LTS", "yes"],
      ["Unity 2023 / Unity 6", "yes"],
      ["UGUI", "yes"],
      ["UI Toolkit", "yes"],
    ],
    changelog: [
      ["v2.1.0", "June 2026", "Added UI Toolkit prefab set, controller/gamepad navigation and item tooltip designer."],
      ["v2.0.0", "March 2026", "Major rewrite: new crafting queue system, equipment stat modifiers, 40% faster grid rendering."],
      ["v1.5.0", "December 2025", "Added stack splitting, item rarity tiers and localization support."],
      ["v1.0.0", "September 2025", "Initial release."],
    ],
    faq: [
      ["Does it include example art?", "Yes — a full set of demo item icons and UI sprites is included (CC0, safe to ship)."],
      ["Can I use my own UI design?", "Yes. All visuals are plain prefabs — restyle them or bind the API to your own UI."],
      ["Does it support gamepads?", "Yes, full controller navigation was added in v2.1.0."],
      ["Does it work with Smart Save System?", "Yes, first-class integration is included — inventories persist with one checkbox."],
    ],
  },
};

/* ---- Products listing page ---- */
function renderProductGrid(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = Object.entries(PRODUCTS)
    .map(
      ([id, p]) => `
    <article class="product-card">
      <a class="thumb" href="product.html?id=${id}"><img src="${p.images[0]}" alt="${p.name} cover image"></a>
      <div class="body">
        <div class="meta-row">
          <span class="badge accent">v${p.version}</span>
          <span class="badge">Unity ${p.unity}</span>
          <span class="badge">Updated ${p.updated}</span>
        </div>
        <h3><a href="product.html?id=${id}">${p.name}</a></h3>
        <p class="desc">${p.shortDesc}</p>
        <div class="card-actions">
          <a class="btn btn-outline" href="product.html?id=${id}">Details</a>
          <a class="btn btn-store" href="${p.storeUrl}" target="_blank" rel="noopener">Buy on Unity Store — ${p.price}</a>
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
            <li><span class="k">Current version</span><span class="v">v${p.version}</span></li>
            <li><span class="k">Supported Unity</span><span class="v">${p.unity}</span></li>
            <li><span class="k">Last update</span><span class="v">${p.updated}</span></li>
            <li><span class="k">Category</span><span class="v">${p.category}</span></li>
          </ul>
          <div class="card-actions">
            <a class="btn btn-store" href="${p.storeUrl}" target="_blank" rel="noopener">Buy on Unity Asset Store — ${p.price}</a>
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
      <a class="btn btn-store" href="${p.storeUrl}" target="_blank" rel="noopener" style="font-size:1.05rem;padding:0.9rem 2.2rem">
        Buy ${p.name} on the Unity Asset Store — ${p.price}
      </a>
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
