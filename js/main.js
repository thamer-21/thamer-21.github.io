/* RealCut — shared layout (header / footer) + small UI helpers */

const LOGO_SVG = `
<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="rc-g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#22d3ee"/>
      <stop offset="1" stop-color="#818cf8"/>
    </linearGradient>
  </defs>
  <rect x="4" y="4" width="56" height="56" rx="14" fill="#10161d" stroke="url(#rc-g)" stroke-width="2.5"/>
  <path d="M20 16h14c7 0 12 4.5 12 11 0 5-3 8.6-7.6 10.2L48 48h-9l-8-9.5h-3V48h-8V16z
           M28 23v9h5.4c3.4 0 5.6-1.8 5.6-4.5S36.8 23 33.4 23H28z" fill="url(#rc-g)"/>
  <path d="M12 50 L52 12" stroke="#22d3ee" stroke-width="2.5" stroke-linecap="round" opacity="0.85"/>
</svg>`;

function renderHeader() {
  const page = document.body.dataset.page || "";
  const links = [
    ["index.html", "Home", "home"],
    ["products.html", "Products", "products"],
    ["docs.html", "Documentation", "docs"],
    ["support.html", "Support", "support"],
    ["about.html", "About", "about"],
    ["contact.html", "Contact", "contact"],
  ];

  const nav = links
    .map(([href, label, key]) =>
      `<a href="${href}" class="${key === page ? "active" : ""}">${label}</a>`)
    .join("");

  document.getElementById("site-header").innerHTML = `
    <div class="container nav-wrap">
      <a href="index.html" class="brand">${LOGO_SVG}<span>Real<span class="cut">Cut</span></span></a>
      <button class="nav-toggle" aria-label="Toggle menu" onclick="document.querySelector('.main-nav').classList.toggle('open')">☰</button>
      <nav class="main-nav">${nav}</nav>
    </div>`;
}

function renderFooter() {
  document.getElementById("site-footer").innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="index.html" class="brand">${LOGO_SVG}<span>Real<span class="cut">Cut</span></span></a>
          <p>Professional tools &amp; extensions for the Unity engine — built to help developers ship faster with higher quality.</p>
        </div>
        <div>
          <h4>Products</h4>
          <ul>
            <li><a href="products.html">All Assets</a></li>
            <li><a href="product.html?id=smart-save">Smart Save System</a></li>
            <li><a href="product.html?id=smart-inventory">Smart Inventory System</a></li>
          </ul>
        </div>
        <div>
          <h4>Resources</h4>
          <ul>
            <li><a href="docs.html">Documentation</a></li>
            <li><a href="support.html">Support</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4>Legal</h4>
          <ul>
            <li><a href="privacy.html">Privacy Policy</a></li>
            <li><a href="terms.html">Terms &amp; Conditions</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} RealCut. All rights reserved.</span>
        <span>
          <a href="mailto:amm540198@gmail.com">amm540198@gmail.com</a> ·
          <a href="https://github.com/thamer-21" target="_blank" rel="noopener">GitHub</a>
        </span>
      </div>
    </div>`;
}

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
});
