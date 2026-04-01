/* ================================================================
   JONAH HYMES — PORTFOLIO
   Main Script
   ================================================================ */

(function () {
    'use strict';

    /* ----------------------------------------------------------
       Nav overlay toggle
    ---------------------------------------------------------- */
    const navToggle  = document.getElementById('navToggle');
    const navClose   = document.getElementById('navClose');
    const navOverlay = document.getElementById('navOverlay');
    const nav        = document.getElementById('siteNav');

    function openNav() {
        if (!navOverlay) return;
        navOverlay.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        navOverlay.setAttribute('aria-hidden', 'false');
        navClose && navClose.focus();
    }

    function closeNav() {
        if (!navOverlay) return;
        navOverlay.classList.remove('is-open');
        document.body.style.overflow = '';
        navOverlay.setAttribute('aria-hidden', 'true');
        navToggle && navToggle.focus();
    }

    navToggle && navToggle.addEventListener('click', openNav);
    navClose  && navClose.addEventListener('click', closeNav);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeNav();
    });

    /* ----------------------------------------------------------
       Scroll-based nav shadow
    ---------------------------------------------------------- */
    function onScroll() {
        if (!nav) return;
        nav.classList.toggle('scrolled', window.scrollY > 40);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ----------------------------------------------------------
       Fade-in on scroll (lightweight intersection observer)
    ---------------------------------------------------------- */
    const fadeEls = document.querySelectorAll('.proj-card, .discipline__head, .gallery-item');

    if ('IntersectionObserver' in window && fadeEls.length) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        fadeEls.forEach(function (el) {
            el.classList.add('fade-init');
            observer.observe(el);
        });
    }

})();
