/* ============================================================
   OUTSIDE AGENCY — COMPONENTS (Nav + Footer + Popup)
   Injects shared HTML into every page
   ============================================================ */

(function() {
  const path = window.location.pathname;
  const inSubfolder = path.includes('/services/') || path.includes('/case-studies/');
  const root = inSubfolder ? '../' : '';

  // ── NAV ───────────────────────────────────────────────────
  const navHTML = `
<nav id="nav">
  <div class="container">
    <a href="${root}index.html" class="nav-logo">
      <div class="nav-logo-mark">OA</div>
      <span class="nav-logo-text">Outside Agency</span>
    </a>
    <div class="nav-links">
      <div class="nav-dropdown">
        <a href="${root}services.html">Services</a>
        <div class="dropdown-menu">
          <a href="${root}services/paid-search-management.html">Paid Search</a>
          <a href="${root}services/social-media-marketing.html">Social Media Marketing</a>
          <a href="${root}services/creative-design-agency.html">Creative Design</a>
          <a href="${root}services/content-creation-services.html">Content Creation</a>
          <a href="${root}services/programmatic-advertising.html">Programmatic Advertising</a>
          <a href="${root}services/digital-out-of-home-advertising.html">Digital Out of Home</a>
        </div>
      </div>
      <a href="${root}case-studies.html">Case Studies</a>
      <a href="${root}about.html">About</a>
      <a href="${root}blog.html">Blog</a>
    </div>
    <div class="nav-actions">
      <a href="${root}contact.html" class="btn btn-outline btn-sm">Request a Callback</a>
      <a href="${root}schedule.html" class="btn btn-primary btn-sm">Schedule a Call</a>
    </div>
    <button class="hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>
<nav class="mobile-nav">
  <a href="${root}index.html">Home</a>
  <div class="mobile-nav-group-label">Services</div>
  <div class="mobile-nav-sub">
    <a href="${root}services/paid-search-management.html">Paid Search</a>
    <a href="${root}services/social-media-marketing.html">Social Media Marketing</a>
    <a href="${root}services/creative-design-agency.html">Creative Design</a>
    <a href="${root}services/content-creation-services.html">Content Creation</a>
    <a href="${root}services/programmatic-advertising.html">Programmatic</a>
    <a href="${root}services/digital-out-of-home-advertising.html">DOOH</a>
  </div>
  <a href="${root}case-studies.html">Case Studies</a>
  <a href="${root}about.html">About</a>
  <a href="${root}blog.html">Blog</a>
  <a href="${root}smart-lead-capture.html">Smart Lead Capture</a>
  <div class="mobile-cta" style="display:flex;flex-direction:column;gap:10px;margin-top:8px;">
    <a href="${root}schedule.html" class="btn btn-primary btn-lg" style="justify-content:center;">Schedule a Call</a>
    <a href="${root}contact.html" class="btn btn-outline btn-lg" style="justify-content:center;">Request a Callback</a>
  </div>
</nav>`;

  // ── POPUP ─────────────────────────────────────────────────
  const popupHTML = `
<div id="popup-overlay">
  <div class="popup-card">
    <button class="popup-close">✕</button>
    <span class="popup-tag">Free Offer</span>
    <h3>Before You Go —<br>Get a Free Audit.</h3>
    <p>We'll review your campaigns, identify what's wasting budget, and show you what's possible. No commitment.</p>
    <form id="popup-form" action="https://formspree.io/f/xeelbrlr" method="POST">
      <input type="hidden" name="_subject" value="Free audit request — Outside Agency popup">
      <div class="form-group" style="margin-bottom:12px;">
        <input type="text" name="name" placeholder="Your name" required style="width:100%;padding:11px 14px;border:1.5px solid var(--gray-light);border-radius:4px;font-family:var(--font-body);font-size:0.9rem;outline:none;">
      </div>
      <div class="form-group" style="margin-bottom:16px;">
        <input type="email" name="email" placeholder="Business email" required style="width:100%;padding:11px 14px;border:1.5px solid var(--gray-light);border-radius:4px;font-family:var(--font-body);font-size:0.9rem;outline:none;">
      </div>
      <button type="submit" class="btn btn-primary btn-lg popup-cta" style="width:100%;justify-content:center;">Claim My Free Audit</button>
    </form>
    <div id="popup-success" style="display:none;text-align:center;padding:20px 0 8px;">
      <div style="font-size:2rem;margin-bottom:8px;">✓</div>
      <p style="font-size:0.92rem;color:var(--gray-dark);">Got it! We'll reach out within one business day.</p>
    </div>
    <button class="btn-skip">No thanks, I'll pass on free money</button>
  </div>
</div>`;

  // ── FOOTER ────────────────────────────────────────────────
  const footerHTML = `
<footer>
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="${root}index.html" class="nav-logo" style="margin-bottom:4px;">
          <div class="nav-logo-mark">OA</div>
          <span class="nav-logo-text">Outside Agency</span>
        </a>
        <p>Performance marketing for SMBs and eCommerce brands. Paid search, social, programmatic, DOOH, and content — built to drive revenue.</p>
        <a href="${root}schedule.html" class="btn btn-primary btn-sm">Schedule a Free Call →</a>
      </div>
      <div class="footer-col">
        <h5>Services</h5>
        <a href="${root}services/paid-search-management.html">Paid Search</a>
        <a href="${root}services/social-media-marketing.html">Social Media Marketing</a>
        <a href="${root}services/creative-design-agency.html">Creative Design</a>
        <a href="${root}services/content-creation-services.html">Content Creation</a>
        <a href="${root}services/programmatic-advertising.html">Programmatic Advertising</a>
        <a href="${root}services/digital-out-of-home-advertising.html">Digital Out of Home</a>
        <a href="${root}smart-lead-capture.html">Smart Lead Capture</a>
      </div>
      <div class="footer-col">
        <h5>Company</h5>
        <a href="${root}about.html">About</a>
        <a href="${root}case-studies.html">Case Studies</a>
        <a href="${root}blog.html">Blog</a>
        <a href="${root}contact.html">Contact</a>
        <a href="${root}schedule.html">Schedule a Call</a>
      </div>
      <div class="footer-col">
        <h5>Contact</h5>
        <a href="mailto:gladyn@outsideagency.net">gladyn@outsideagency.net</a>
        <a href="${root}schedule.html">Book a Free Audit</a>
        <div style="margin-top:20px;">
          <p style="font-size:0.78rem;color:#333;margin-bottom:8px;font-family:var(--font-body);">No contracts. No commitment.<br>Free audit included.</p>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© ${new Date().getFullYear()} Outside Agency. All rights reserved.</p>
      <div class="footer-bottom-links">
        <a href="${root}privacy-policy.html">Privacy Policy</a>
        <a href="${root}terms.html">Terms of Service</a>
      </div>
    </div>
  </div>
</footer>`;

  // Inject into page
  const navTarget = document.getElementById('nav-placeholder');
  if (navTarget) navTarget.outerHTML = navHTML;

  const popupTarget = document.getElementById('popup-placeholder');
  if (popupTarget) popupTarget.outerHTML = popupHTML;

  const footerTarget = document.getElementById('footer-placeholder');
  if (footerTarget) footerTarget.outerHTML = footerHTML;

})();
