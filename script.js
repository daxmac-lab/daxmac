/* ==========================================================================
   DaxMac — script.js
   1. Builds the header navigation
   2. Marks the active page
   3. Mobile nav toggle
   4. Header scroll state
   5. Scroll reveals
   ========================================================================== */

(function () {
  'use strict';

  /* ========================================================================
     1. NAVIGATION
     Single source of truth for the header links.
     To add a page later, add one line here — every page updates.
     ======================================================================== */

  var NAV_LINKS = [
    { label: 'Home',        href: 'index.html' },
    { label: 'Audit',       href: 'audits.html' },
    { label: 'Field Notes', href: 'field-notes.html' },
    { label: 'Contact',     href: 'mailto:info@daxmac.cc' }
  ];

  /* Returns the filename of the current page, e.g. "audits.html".
     Falls back to "index.html" when the path ends in "/". */
  function currentPage() {
    var path = window.location.pathname;
    var file = path.substring(path.lastIndexOf('/') + 1);
    return file === '' ? 'index.html' : file;
  }

  function buildNav() {
    var nav = document.getElementById('site-nav');
    if (!nav) return;

    var here = currentPage();
    var fragment = document.createDocumentFragment();

    NAV_LINKS.forEach(function (link) {
      var a = document.createElement('a');
      a.textContent = link.label;
      a.href = link.href;

      /* Mark the current page. External links (mailto:, http) never match. */
      if (link.href === here) {
        a.classList.add('is-active');
        a.setAttribute('aria-current', 'page');
      }

      fragment.appendChild(a);
    });

    nav.appendChild(fragment);
  }


  /* ========================================================================
     2. MOBILE NAV TOGGLE
     ======================================================================== */

  function initNavToggle() {
    var toggle = document.getElementById('nav-toggle');
    var nav    = document.getElementById('site-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    /* Close the menu after tapping a link on mobile */
    nav.addEventListener('click', function (event) {
      if (event.target.tagName === 'A' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    /* Close on Escape */
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }


  /* ========================================================================
     3. HEADER SCROLL STATE
     Adds .is-scrolled once the page moves past a small threshold,
     which fades in the hairline border under the header.
     ======================================================================== */

  function initHeaderScroll() {
    var header = document.querySelector('.site-header');
    if (!header) return;

    var ticking = false;

    function update() {
      header.classList.toggle('is-scrolled', window.scrollY > 40);
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    update();
  }


  /* ========================================================================
     4. SCROLL REVEALS
     Adds .reveal to the elements that should animate in, then observes
     them. Each element reveals once and is unobserved.
     ======================================================================== */

  var REVEAL_TARGETS = [
    '.section__title',
    '.lede',
    '.note',
    '.eyebrow',
    '.chain__item',
    '.step',
    '.plan',
    '.case',
    '.panel__title',
    '.panel__lede',
    '.panel__note',
    '.custom__card',
    '.audience__list',
    '.about__more',
    '.work__more',
    '.cta__title',
    '.cta .btn',
    '.cta__email'
  ];

  function initReveals() {
    /* Respect the user's motion preference — skip entirely. */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    /* No IntersectionObserver? Show everything, move on. */
    if (!('IntersectionObserver' in window)) return;

    var elements = document.querySelectorAll(REVEAL_TARGETS.join(','));
    if (!elements.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, {
      rootMargin: '0px 0px -8% 0px',
      threshold: 0.08
    });

    elements.forEach(function (el) {
      el.classList.add('reveal');
      observer.observe(el);
    });
  }


  /* ========================================================================
     5. INIT
     ======================================================================== */

  function init() {
    buildNav();
    initNavToggle();
    initHeaderScroll();
    initReveals();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

'.page-intro__title',
'.page-intro__lede',
'.note-card',
