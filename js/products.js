/* RealCut — product catalog.

   Everything here is checked against the packages themselves. Test counts come from
   the suites that actually run; the Unity range is the range the packages were
   imported into and tested in, not the range we hope works.

   `storeUrl` is empty until an asset is live on the Asset Store. While empty, the
   buy button sends people to the publisher page — a real destination — instead of
   a dead link or a lie about being purchasable. Fill storeUrl on approval and the
   button switches itself. */

const PUBLISHER_URL = "https://assetstore.unity.com/publishers/152456";

const PRODUCTS = {
  "smart-stats": {
    name: "Smart Stats System",
    tagline: "The stat system that shows its work.",
    shortDesc:
      "Stats, modifiers, resources and effects with a fixed calculation order — and a breakdown that explains every number it produces.",
    version: "1.0.0",
    unity: "2022.3 LTS – Unity 6",
    price: "$39.99",
    status: "live",
    category: "Tools / Game Toolkits",
    accent: "#3FB6A8",
    tests: "403 automated tests",
    storeUrl: "https://assetstore.unity.com/packages/tools/game-toolkits/smart-stats-system-396696",
    cover: "assets/img/covers/smart-stats.png",
    icon: "assets/img/icons/smart-stats.png",
    shot: "assets/img/shots/smart-stats.png",
    features: [
      "<strong>A fixed pipeline</strong> — base → flat → additive % → multiplicative % → override → clamp. Each stage sums or multiplies its whole group, so no modifier can miss another's contribution.",
      "<strong>Order-independent results</strong> — modifiers are held in canonical order, so the same set produces the same float bit for bit however they were added.",
      "<strong>Every value explains itself</strong> — <code>GetBreakdown()</code> returns each stage, its input, its output and which modifier contributed what.",
      "<strong>Derived stats</strong> — Max Health from Constitution, kept up to date automatically, with cycles refused at registration and the loop named.",
      "<strong>Resources</strong> — health, mana, stamina with regeneration, depletion and fill events.",
      "<strong>Timed effects</strong> — buffs, debuffs, stacking rules and pulses, with a guard against a single huge frame paying thousands of ticks.",
      "<strong>No Unity dependency in the core</strong> — the whole calculation is unit-testable without entering Play mode.",
      "<strong>Allocation-free reads</strong> — the hot path allocates nothing, and a test proves it rather than the description claiming it.",
    ],
    howToUse: [
      "Create a <code>StatSet</code> and add the stats your game needs.",
      "Add modifiers from equipment, buffs or anything else — order does not matter.",
      "Read <code>stat.Value</code> for the number, or <code>stat.GetBreakdown()</code> for the reasoning.",
      "Open the Stat Explainer window to watch any character's numbers resolve live.",
    ],
    compatibility: [
      ["Unity 2022.3 LTS", "yes"],
      ["Unity 6 (6000.x)", "yes"],
      ["Built-in / URP / HDRP", "yes"],
      ["IL2CPP &amp; Mono", "yes"],
      ["Package dependencies", "None"],
    ],
    changelog: [["v1.0.0", "3 September 2026", "Initial release."]],
    faq: [
      ["Will the same build give the same numbers?", "Yes. Modifiers are stored in canonical order rather than arrival order, and the determinism tests assert it."],
      ["What happens if a calculation produces NaN?", "It is caught at the clamp stage and replaced with the lower bound, and the breakdown says so instead of hiding it."],
      ["Does it need any other package?", "No. The core is plain C# with no package dependencies."],
    ],
  },

  "smart-quest": {
    name: "Smart Quest System",
    tagline: "Quests that explain themselves.",
    shortDesc:
      "A quest framework where a locked quest tells the player exactly why — objectives, conditions, choices, rewards and failure, all testable without Play mode.",
    version: "1.0.0",
    unity: "2022.3 LTS – Unity 6",
    price: "$34.99",
    status: "in-review",
    category: "Tools / Game Toolkits",
    accent: "#F0B429",
    tests: "131 automated tests",
    storeUrl: "",
    cover: "assets/img/covers/smart-quest.png",
    icon: "assets/img/icons/smart-quest.png",
    shot: "assets/img/shots/smart-quest.png",
    features: [
      "<strong>Reasons, not booleans</strong> — availability returns a verdict naming every unmet condition, so the quest log can say <em>why</em> instead of just greying a row out.",
      "<strong>Objectives</strong> — collect, reach, talk, defeat and custom signals, with distinct-key counting.",
      "<strong>Conditions</strong> — quest state, player choices, world values, composed into sets.",
      "<strong>Branching choices</strong> with per-choice rewards and consequences.",
      "<strong>Failure and expiry</strong> — deadlines, overdue handling and named failure reasons.",
      "<strong>Save-ready snapshots</strong> — restore reports unknown quests and clamped values instead of throwing, so a save from an older build still loads.",
      "<strong>Editor tooling</strong> — quest graph window, validator and debugger.",
      "<strong>No node-graph lock-in</strong> — quests are data you can author, generate or import however you like.",
    ],
    howToUse: [
      "Author quests as ScriptableObjects, or build them in the graph window.",
      "Drop a <code>QuestRunner</code> into your scene — no singleton, so co-op can run one per player.",
      "Report progress with <code>Report(signal, subject, amount)</code>.",
      "Ask <code>CanStart(questId)</code> for a verdict and show its reasons in your UI.",
    ],
    compatibility: [
      ["Unity 2022.3 LTS", "yes"],
      ["Unity 6 (6000.x)", "yes"],
      ["Built-in / URP / HDRP", "yes"],
      ["IL2CPP &amp; Mono", "yes"],
      ["Optional UI", "uGUI + TextMeshPro"],
    ],
    changelog: [["v1.0.0", "In review", "Initial release."]],
    faq: [
      ["Can I use my own quest UI?", "Yes. The included UI is optional; the framework is fully usable with none of it."],
      ["What happens to old saves when I remove a quest?", "Restoring reports it as an unknown quest and carries on, rather than throwing. You get a report of what was skipped."],
      ["Does it force a manager into my bootstrap?", "No. Nothing is static or singleton — you place a runner where you want one."],
    ],
  },

  "smart-inventory": {
    name: "Smart Inventory System",
    tagline: "Drop-in inventory and equipment for Unity.",
    shortDesc:
      "A layered inventory framework — stacking, categories, rarity, weight, equipment slots and a full drag-and-drop UI — built to fit the project you already have.",
    version: "1.0.0",
    unity: "2022.3 LTS – Unity 6",
    price: "Free",
    status: "in-review",
    category: "Tools / Game Toolkits",
    accent: "#D4AF37",
    tests: "183 automated tests",
    storeUrl: "",
    cover: "assets/img/covers/smart-inventory.png",
    icon: "assets/img/icons/smart-inventory.png",
    shot: "assets/img/shots/smart-inventory.png",
    features: [
      "<strong>Integration-first</strong> — a layered architecture (Core / Data / Components / UI) that drops into an existing project instead of taking it over.",
      "<strong>Stacking, categories, tags, rarity and weight</strong> — the inventory model most games actually need.",
      "<strong>Equipment slots</strong> with per-slot constraints and validated transfers.",
      "<strong>Zero-allocation drag and drop</strong> with ghost preview, drop feedback and tooltips.",
      "<strong>Rules engine</strong> — weight and category rules you can extend without touching the core.",
      "<strong>Saves that survive renaming</strong> — ID-based state, so refactoring your assets does not break a player's inventory.",
      "<strong>Any save system</strong> — works with Smart Save, works with yours, requires neither.",
      "<strong>Testable core</strong> — inventory logic provable without entering Play mode.",
    ],
    howToUse: [
      "Import the package and open the demo scene.",
      "Define items as ScriptableObject definitions.",
      "Drop the inventory UI prefab into your canvas.",
      "Drive it through typed events — nothing is forced into your bootstrap.",
    ],
    compatibility: [
      ["Unity 2022.3 LTS", "yes"],
      ["Unity 6 (6000.x)", "yes"],
      ["Built-in / URP / HDRP", "yes"],
      ["IL2CPP &amp; Mono", "yes"],
      ["UI layer", "uGUI + TextMeshPro"],
    ],
    changelog: [["v1.0.0", "In review", "Initial free release."]],
    faq: [
      ["Why is it free?", "It is the front door to the RealCut line — a complete inventory foundation, released so you can judge the engineering before paying for anything."],
      ["Do I have to adopt a whole ecosystem?", "No. It is a layer that fits your architecture, UI and save system rather than replacing them."],
      ["Can I use my own UI?", "Yes. The UI is optional and replaceable; the framework works with none of it."],
    ],
  },

  "smart-save": {
    name: "Smart Save System",
    tagline: "Encrypted save and load for Unity.",
    shortDesc:
      "Save and load with AES-256 encryption, multiple slots with screenshots, auto-save, versioned migration and an in-editor Save Debugger.",
    version: "1.0.0",
    unity: "2022.3 LTS – Unity 6",
    price: "$19.99",
    status: "live",
    category: "Tools / Utilities",
    accent: "#3FC3E8",
    tests: "26 automated tests",
    storeUrl: "https://assetstore.unity.com/packages/tools/utilities/smart-save-system-394386",
    cover: "assets/img/covers/smart-save.png",
    icon: "assets/img/icons/smart-save.png",
    shot: "assets/img/shots/smart-save.png",
    features: [
      "<strong>Two APIs</strong> — key/value (<code>SmartSave.Set/Get</code>) or mark fields with <code>[SmartSave]</code> and let a <code>SaveableEntity</code> capture them.",
      "<strong>AES-256 encryption</strong> with a fresh initialisation vector per save, plus optional GZip compression.",
      "<strong>Writes that survive a crash</strong> — the new file is swapped in atomically, so a game killed mid-save still has the save it had before.",
      "<strong>Versioned migration</strong> — and a migration that fails is <em>not</em> recorded as done, so the next load tries again instead of stranding a half-converted save.",
      "<strong>Duplicate ids are reported</strong> — copy a saveable object and the system names both instead of letting them silently overwrite each other.",
      "<strong>Multiple slots</strong> with gameplay screenshots and metadata.",
      "<strong>Async saving</strong> — heavy work off the main thread so large saves never hitch a frame.",
      "<strong>In-editor Save Debugger</strong> — inspect, edit, export and delete saves as you develop.",
    ],
    howToUse: [
      "<code>SmartSave.Set(\"coins\", 100)</code> then <code>SmartSave.Save()</code> — encrypted, on disk.",
      "Or mark fields with <code>[SmartSave]</code> and add a <code>SaveableEntity</code> component.",
      "<code>SmartSave.Load()</code> — everything comes back.",
      "Change the encryption password before you ship; the system warns you once if you have not.",
    ],
    compatibility: [
      ["Unity 2022.3 LTS", "yes"],
      ["Unity 6 (6000.x)", "yes"],
      ["PC / mobile / WebGL / console", "yes"],
      ["IL2CPP &amp; Mono", "yes"],
      ["Optional slot UI", "uGUI + TextMeshPro"],
    ],
    changelog: [["v1.0.0", "3 September 2026", "Initial release."]],
    faq: [
      ["Can I save my own classes?", "Yes — any [Serializable] type, including Vector3 and Color. Types Unity's JsonUtility cannot see, such as DateTime, are reported rather than silently saved as nothing."],
      ["Will player saves break when I update my game?", "That is what versioning is for. And if your migration handler throws, the save keeps its old version so the next load can try again."],
      ["Does the save system need TextMeshPro?", "No. The framework is plain C#; only the optional ready-made slot menu uses uGUI and TextMeshPro, and it lives in its own assembly."],
    ],
  },
};

/* ---------- helpers ---------- */

const isLive = (p) => p.status === "live" && !!p.storeUrl;

// Where "buy" goes. Before an asset is live it has no store URL, so the button
// points at the publisher page rather than nowhere — and says what it is.
function storeHref(p) {
  return isLive(p) ? p.storeUrl : PUBLISHER_URL;
}

function storeLabel(p) {
  if (isLive(p)) return p.price === "Free" ? "Get it free on the Asset Store" : `Buy on the Asset Store — ${p.price}`;
  return "In review — see publisher page";
}

function priceTag(p) {
  return p.price === "Free"
    ? '<span class="price price-free">Free</span>'
    : `<span class="price">${p.price}</span>`;
}

function statusTag(p) {
  return isLive(p)
    ? '<span class="tag tag-live">On the Asset Store</span>'
    : '<span class="tag tag-review">In review</span>';
}

/* ---------- grid ---------- */

function renderProductGrid(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;

  el.innerHTML = Object.entries(PRODUCTS)
    .map(
      ([id, p], i) => `
    <article class="product-card reveal" style="--accent:${p.accent}; --i:${i}">
      <a class="thumb" href="product.html?id=${id}" aria-label="${p.name} details">
        <img src="${p.cover}" alt="" loading="lazy" width="1950" height="1300">
      </a>
      <div class="body">
        <div class="card-head">
          <img class="card-icon" src="${p.icon}" alt="" width="160" height="160" loading="lazy">
          <div>
            <h3><a href="product.html?id=${id}">${p.name}</a></h3>
            <p class="card-tagline">${p.tagline}</p>
          </div>
        </div>
        <p class="desc">${p.shortDesc}</p>
        <div class="meta-row">
          ${priceTag(p)}
          <span class="tag">Unity ${p.unity}</span>
          <span class="tag">${p.tests}</span>
          ${statusTag(p)}
        </div>
        <div class="card-actions">
          <a class="btn btn-ghost" href="product.html?id=${id}">Details</a>
          <a class="btn btn-solid" href="${storeHref(p)}" target="_blank" rel="noopener">${storeLabel(p)}</a>
        </div>
      </div>
    </article>`
    )
    .join("");

  if (window.RealCut) window.RealCut.observeReveals();
}

/* ---------- detail page ---------- */

function renderProductPage() {
  const root = document.getElementById("product-root");
  if (!root) return;

  const id = new URLSearchParams(location.search).get("id");
  const p = PRODUCTS[id];

  if (!p) {
    root.innerHTML = `
      <div class="container section center">
        <h1>Asset not found</h1>
        <p class="dim">That asset does not exist, or it moved.</p>
        <a class="btn btn-solid" href="products.html">Back to all assets</a>
      </div>`;
    return;
  }

  document.title = `${p.name} — RealCut`;
  document.documentElement.style.setProperty("--accent", p.accent);

  const li = (arr, fn) => arr.map(fn).join("");

  root.innerHTML = `
  <section class="detail-hero" style="--accent:${p.accent}">
    <div class="container">
      <nav class="crumbs"><a href="index.html">Home</a><span>/</span><a href="products.html">Assets</a><span>/</span>${p.name}</nav>
      <div class="detail-top">
        <div class="detail-copy reveal">
          <img class="detail-icon" src="${p.icon}" alt="" width="160" height="160">
          <h1>${p.name}</h1>
          <p class="lead">${p.tagline}</p>
          <div class="meta-row">
            ${priceTag(p)}
            <span class="tag">v${p.version}</span>
            <span class="tag">Unity ${p.unity}</span>
            <span class="tag">${p.tests}</span>
            ${statusTag(p)}
          </div>
          <div class="card-actions">
            <a class="btn btn-solid" href="${storeHref(p)}" target="_blank" rel="noopener">${storeLabel(p)}</a>
            <a class="btn btn-ghost" href="docs.html">Documentation</a>
          </div>
          ${isLive(p) ? "" : '<p class="note">This asset is with Unity\'s review team. The link above goes to the RealCut publisher page, where it appears the moment it is approved.</p>'}
        </div>
        <div class="detail-art reveal">
          <img src="${p.cover}" alt="${p.name}" width="1950" height="1300">
        </div>
      </div>
    </div>
  </section>

  <div class="container">
    <section class="detail-section reveal">
      <h2>What it looks like</h2>
      <figure class="shot">
        <img src="${p.shot}" alt="${p.name} in use" loading="lazy">
      </figure>
    </section>

    <section class="detail-section reveal">
      <h2>Features</h2>
      <ul class="check-list">${li(p.features, (f) => `<li>${f}</li>`)}</ul>
    </section>

    <section class="detail-section reveal">
      <h2>How to use it</h2>
      <ol class="steps">${li(p.howToUse, (s) => `<li><span>${s}</span></li>`)}</ol>
    </section>

    <section class="detail-section reveal">
      <h2>Compatibility</h2>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Requirement</th><th>Status</th></tr></thead>
          <tbody>${li(p.compatibility, ([k, v]) => `<tr><td>${k}</td><td class="${v === "yes" ? "yes" : ""}">${v === "yes" ? "Supported" : v}</td></tr>`)}</tbody>
        </table>
      </div>
      <p class="note">Verified by importing the package into a clean Unity 2022.3 project and a Unity 6 project and running the full test suite in both.</p>
    </section>

    <section class="detail-section reveal">
      <h2>Changelog</h2>
      <ul class="changelog">${li(p.changelog, ([v, d, n]) => `<li><span class="ver">${v}</span><span class="date">${d}</span><p>${n}</p></li>`)}</ul>
    </section>

    <section class="detail-section reveal">
      <h2>Questions</h2>
      ${li(p.faq, ([q, a]) => `<details><summary>${q}</summary><div class="answer">${a}</div></details>`)}
    </section>

    <section class="detail-section center reveal">
      <a class="btn btn-solid btn-lg" href="${storeHref(p)}" target="_blank" rel="noopener">${storeLabel(p)}</a>
    </section>
  </div>`;

  if (window.RealCut) window.RealCut.observeReveals();
}

document.addEventListener("DOMContentLoaded", () => {
  renderProductGrid("product-grid");
  renderProductPage();
});
