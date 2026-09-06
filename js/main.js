/* RealCut — shared shell (header / footer) and the site's motion.

   The motion here is deliberately small: things arrive, they do not perform.
   Floating blobs, drifting gradients and particle fields are what make a site
   read as generated, so there are none. Everything is off by default for anyone
   who asked their system for reduced motion. */

const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* The real mark: a gold R sliced by a diagonal cut on a dark badge. The old site
   used a cyan-to-violet gradient version that was never the brand. */
const LOGO_SVG = `
<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
  <defs>
    <clipPath id="rc-up"><polygon points="0,0 400,0 400,16 0,395"/></clipPath>
    <clipPath id="rc-lo"><polygon points="0,413 400,34 400,400 0,400"/></clipPath>
    <g id="rc-r">
      <rect x="120" y="96" width="46" height="208" rx="8"/>
      <path d="M143,102 C233,98 262,132 262,153 C262,175 231,203 143,203" fill="none" stroke-width="46" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M170,198 L256,306" fill="none" stroke-width="46" stroke-linecap="round"/>
    </g>
  </defs>
  <rect x="0" y="0" width="400" height="400" rx="88" fill="#0e1621"/>
  <g fill="#edb840" stroke="#edb840" clip-path="url(#rc-up)"><use href="#rc-r"/></g>
  <g fill="#c68a24" stroke="#c68a24" clip-path="url(#rc-lo)"><use href="#rc-r"/></g>
</svg>`;

const NAV = [
  ["index.html", "Home", "home"],
  ["products.html", "Assets", "products"],
  ["docs.html", "Documentation", "docs"],
  ["support.html", "Support", "support"],
  ["about.html", "About", "about"],
  ["contact.html", "Contact", "contact"],
];

const ASSET_LINKS = [
  ["product.html?id=smart-stats", "Smart Stats System"],
  ["product.html?id=smart-quest", "Smart Quest System"],
  ["product.html?id=smart-inventory", "Smart Inventory System"],
  ["product.html?id=smart-save", "Smart Save System"],
];

const PUBLISHER = "https://assetstore.unity.com/publishers/152456";
const EMAIL = "amm540198@gmail.com";

function renderHeader() {
  const host = document.getElementById("site-header");
  if (!host) return;
  const page = document.body.dataset.page || "";

  host.innerHTML = `
    <div class="container nav-wrap">
      <a href="index.html" class="brand">${LOGO_SVG}<span>Real<b>Cut</b></span></a>
      <button class="nav-toggle" aria-label="Menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <nav class="main-nav">
        ${NAV.map(([h, l, k]) => `<a href="${h}"${k === page ? ' class="active" aria-current="page"' : ""}>${l}</a>`).join("")}
      </nav>
    </div>`;

  const toggle = host.querySelector(".nav-toggle");
  const nav = host.querySelector(".main-nav");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.classList.toggle("is-open", open);
  });

  // Solid header once the page has moved, so the nav never floats over content
  // it cannot be read against.
  const onScroll = () => host.classList.toggle("scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function renderFooter() {
  const host = document.getElementById("site-footer");
  if (!host) return;

  host.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="index.html" class="brand">${LOGO_SVG}<span>Real<b>Cut</b></span></a>
          <p>Unity systems that explain themselves. Every asset ships with the test suite that proves it.</p>
          <a class="footer-store" href="${PUBLISHER}" target="_blank" rel="noopener">RealCut on the Unity Asset Store</a>
        </div>
        <div>
          <h4>Assets</h4>
          <ul>${ASSET_LINKS.map(([h, l]) => `<li><a href="${h}">${l}</a></li>`).join("")}</ul>
        </div>
        <div>
          <h4>Resources</h4>
          <ul>
            <li><a href="products.html">All assets</a></li>
            <li><a href="docs.html">Documentation</a></li>
            <li><a href="support.html">Support</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4>Legal</h4>
          <ul>
            <li><a href="privacy.html">Privacy policy</a></li>
            <li><a href="terms.html">Terms &amp; conditions</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} RealCut</span>
        <span>
          <a href="mailto:${EMAIL}">${EMAIL}</a>
          <a href="https://github.com/realcut-studio" target="_blank" rel="noopener">GitHub</a>
        </span>
      </div>
    </div>`;
}

/* ---------- reveal on scroll ----------
   One observer for the whole page, elements unobserved once shown so nothing
   keeps recomputing after it has done its job. */
let revealObserver = null;

function observeReveals() {
  const items = document.querySelectorAll(".reveal:not(.shown)");
  if (!items.length) return;

  if (REDUCED) {
    items.forEach((el) => el.classList.add("shown"));
    return;
  }

  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("shown");
          revealObserver.unobserve(e.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
  }
  items.forEach((el) => revealObserver.observe(el));
}

/* Counts that tick up once, when they scroll into view. A number that animates
   every time it passes is a gimmick; once is a detail. */
function observeCounters() {
  const nums = document.querySelectorAll("[data-count]");
  if (!nums.length) return;

  if (REDUCED) {
    nums.forEach((el) => (el.textContent = el.dataset.count));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        io.unobserve(el);
        const target = parseInt(el.dataset.count, 10);
        const started = performance.now();
        const dur = 900;
        const step = (now) => {
          const t = Math.min(1, (now - started) / dur);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = Math.round(target * eased).toLocaleString("en-US");
          if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    },
    { threshold: 0.5 }
  );
  nums.forEach((el) => io.observe(el));
}

window.RealCut = { observeReveals, observeCounters, PUBLISHER };

document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.classList.toggle("reduced-motion", REDUCED);
  renderHeader();
  renderFooter();
  observeReveals();
  observeCounters();
});
