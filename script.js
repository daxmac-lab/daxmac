/* ==========================================================================
   DaxMac — script.js
   1. Mobile nav toggle
   2. Header scroll state
   3. Scroll reveals
   ========================================================================== */

(function () {
  'use strict';

  /* ========================================================================
     1. MOBILE NAV TOGGLE
     Targets the hardcoded navigation in the HTML.
     ======================================================================== */

  function initNavToggle() {
    var toggle = document.querySelector('.nav-toggle');
    var nav    = document.querySelector('.site-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.addEventListener('click', function (event) {
      if (event.target.tagName === 'A' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }


  /* ========================================================================
     2. HEADER SCROLL STATE
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
     3. SCROLL REVEALS
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
    '.audience__list',
    '.about__more',
    '.work__more',
    '.cta__title',
    '.cta .btn',
    '.cta__email',
    '.page-intro__title',
    '.page-intro__lede',
    '.note-card',
    '.article__title',
    '.article__meta',
    '.article__back',
    '.article__finding',
    '.article__statement',
    '.audit-risk',
    '.about-body',
    '.about-founder',
    '.about-links',
    '.impl-item',
    '.impl-practice'
  ];

  function initReveals() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
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
     4. INIT
     ======================================================================== */

  function init() {
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
