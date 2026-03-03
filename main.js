/* ============================================================
   OUTSIDE AGENCY — SHARED JAVASCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Sticky nav scroll behavior ─────────────────────────────
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // ── Mobile hamburger ───────────────────────────────────────
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
  }

  // ── Scroll fade-in animations ──────────────────────────────
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // ── Counter animation ──────────────────────────────────────
  function animateCounter(el, target, suffix = '') {
    const start = performance.now();
    const duration = 1800;
    const isDecimal = target % 1 !== 0;
    const startVal = 0;

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = startVal + (target - startVal) * eased;

      if (isDecimal) {
        el.textContent = value.toFixed(1) + suffix;
      } else {
        el.textContent = Math.floor(value) + suffix;
      }
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const raw = el.dataset.count;
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        const val = parseFloat(raw);

        if (prefix) {
          const prefixSpan = document.createElement('span');
          prefixSpan.className = 'counter-prefix';
          prefixSpan.textContent = prefix;
          el.textContent = '';
          el.appendChild(prefixSpan);
          const numSpan = document.createElement('span');
          numSpan.textContent = '0';
          el.appendChild(numSpan);
          if (suffix) el.appendChild(document.createTextNode(suffix));
          animateCounter(numSpan, val, '');
        } else {
          animateCounter(el, val, suffix);
        }
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

  // ── FAQ accordion ──────────────────────────────────────────
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ── Smart Lead Capture Popup ───────────────────────────────
  const overlay = document.getElementById('popup-overlay');
  if (overlay) {
    let converted = false;
    let reEngageTimer = null;

    // Check if converted within last 6 months (localStorage persists across sessions)
    const convertedAt = localStorage.getItem('oa-popup-converted-at');
    if (convertedAt) {
      const sixMonths = 6 * 30 * 24 * 60 * 60 * 1000;
      if (Date.now() - parseInt(convertedAt) < sixMonths) {
        converted = true;
      } else {
        // 6 months has passed — reset
        localStorage.removeItem('oa-popup-converted-at');
      }
    }

    if (converted) return; // Don't run any popup logic if converted recently

    const showPopup = () => {
      if (converted) return;
      overlay.classList.add('visible');
      document.body.style.overflow = 'hidden';
    };

    const closePopup = () => {
      overlay.classList.remove('visible');
      document.body.style.overflow = '';
      // Re-engage every 15 seconds until they convert
      reEngageTimer = setTimeout(() => {
        if (!converted) showPopup();
      }, 15000);
    };

    // First appearance after 30 seconds
    setTimeout(showPopup, 30000);

    // Close button
    const closeBtn = overlay.querySelector('.popup-close');
    const skipBtn = overlay.querySelector('.btn-skip');
    if (closeBtn) closeBtn.addEventListener('click', closePopup);
    if (skipBtn) skipBtn.addEventListener('click', closePopup);
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closePopup();
    });

    // On conversion — suppress for 6 months
    const popupForm = overlay.querySelector('#popup-form');
    if (popupForm) {
      popupForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const btn = popupForm.querySelector('button[type="submit"]');
        btn.textContent = 'Sending...';
        btn.disabled = true;
        try {
          const res = await fetch(popupForm.action, {
            method: 'POST',
            body: new FormData(popupForm),
            headers: { 'Accept': 'application/json' }
          });
          if (res.ok) {
            converted = true;
            clearTimeout(reEngageTimer);
            localStorage.setItem('oa-popup-converted-at', Date.now().toString());
            popupForm.style.display = 'none';
            const successEl = overlay.querySelector('#popup-success');
            if (successEl) successEl.style.display = 'block';
            // Close after 2.5 seconds
            setTimeout(() => {
              overlay.classList.remove('visible');
              document.body.style.overflow = '';
            }, 2500);
          } else {
            btn.textContent = 'Try again';
            btn.disabled = false;
          }
        } catch {
          btn.textContent = 'Try again';
          btn.disabled = false;
        }
      });
    }
  }

  // ── Active nav link ────────────────────────────────────────
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
    if (a.getAttribute('href') === currentPath ||
        (currentPath.includes('/services') && a.getAttribute('href') === 'services.html') ||
        (currentPath.includes('/case-studies') && a.getAttribute('href') === 'case-studies.html')) {
      a.classList.add('active');
    }
  });

  // ── Smooth scroll for anchor links ────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 90;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
