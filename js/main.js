/* ============================================================
   OUTSIDE AGENCY — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ── Nav scroll effect ──────────────────────────────────────
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  // ── Mobile nav ─────────────────────────────────────────────
  const burger = document.querySelector('.nav-burger');
  const mobileMenu = document.querySelector('.nav-mobile-menu');
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      burger.querySelectorAll('span')[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
      burger.querySelectorAll('span')[1].style.opacity  = isOpen ? '0' : '1';
      burger.querySelectorAll('span')[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  // ── FAQ accordion ──────────────────────────────────────────
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ── Scroll fade-in ─────────────────────────────────────────
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // ── Contact form ───────────────────────────────────────────
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      this.style.display = 'none';
      const success = document.getElementById('formSuccess');
      if (success) success.style.display = 'block';
    });
  }

  // ── Smart Lead Capture Popup ───────────────────────────────
  const popup = document.getElementById('leadPopup');
  const popupClose = document.querySelector('.popup-close');
  const popupDismiss = document.querySelector('.popup-dismiss');
  const popupForm = document.getElementById('popupForm');

  let popupShown = false;
  let popupTimer = null;

  function showPopup() {
    if (popupShown || !popup) return;
    // Don't show on schedule or contact pages
    if (window.location.pathname.includes('schedule') ||
        window.location.pathname.includes('contact')) return;
    popupShown = true;
    popup.classList.add('active');
    clearTimeout(popupTimer);
  }

  function hidePopup() {
    if (!popup) return;
    popup.classList.remove('active');
    // Re-engage after 20 seconds if dismissed
    if (!popupShown) {
      popupTimer = setTimeout(showPopup, 20000);
    }
  }

  if (popup) {
    // Trigger on scroll depth (40%)
    window.addEventListener('scroll', function onScroll() {
      const scrollPct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrollPct > 0.4) {
        showPopup();
        window.removeEventListener('scroll', onScroll);
      }
    });

    // Exit intent on desktop
    document.addEventListener('mouseleave', function onLeave(e) {
      if (e.clientY < 20) {
        showPopup();
        document.removeEventListener('mouseleave', onLeave);
      }
    });

    // Fallback timer
    setTimeout(showPopup, 45000);

    if (popupClose) popupClose.addEventListener('click', () => {
      popup.classList.remove('active');
      popupShown = false;
      popupTimer = setTimeout(showPopup, 20000);
    });

    if (popupDismiss) popupDismiss.addEventListener('click', () => {
      popup.classList.remove('active');
      popupShown = false;
      popupTimer = setTimeout(showPopup, 20000);
    });

    if (popupForm) {
      popupForm.addEventListener('submit', function (e) {
        e.preventDefault();
        popupShown = true;
        popup.classList.remove('active');
        // Redirect to schedule page
        window.location.href = '/schedule.html';
      });
    }

    // Close on backdrop click
    popup.addEventListener('click', function (e) {
      if (e.target === popup) {
        popup.classList.remove('active');
        popupShown = false;
        popupTimer = setTimeout(showPopup, 20000);
      }
    });
  }

  // ── Counter animation for proof bar ───────────────────────
  function animateCounter(el, target, suffix = '', prefix = '') {
    const duration = 1500;
    const start = performance.now();
    const startVal = 0;

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startVal + (target - startVal) * eased);
      el.textContent = prefix + current + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const proofObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const items = e.target.querySelectorAll('.proof-number');
        items.forEach(item => {
          const text = item.dataset.value || item.textContent;
          const num  = parseInt(text.replace(/[^0-9]/g, ''));
          const prefix = text.includes('$') ? '$' : '';
          const suffix = text.includes('%') ? '%' : text.includes('+') ? '+' : '';
          if (!isNaN(num)) animateCounter(item, num, suffix, prefix);
        });
        proofObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  const proofBar = document.querySelector('.proof-bar-grid');
  if (proofBar) proofObserver.observe(proofBar);

});
