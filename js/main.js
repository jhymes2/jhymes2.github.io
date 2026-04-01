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
        if (e.key === 'Escape') { closeLightbox(); closeNav(); }
        if (e.key === 'ArrowLeft')  lightboxStep(-1);
        if (e.key === 'ArrowRight') lightboxStep(1);
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
       Carousels
    ---------------------------------------------------------- */
    document.querySelectorAll('[data-carousel]').forEach(function (carousel) {
        var track    = carousel.querySelector('.carousel__track');
        var slides   = Array.from(carousel.querySelectorAll('.carousel__slide'));
        var btnPrev  = carousel.querySelector('.carousel__btn--prev');
        var btnNext  = carousel.querySelector('.carousel__btn--next');
        var capEl    = carousel.querySelector('.carousel__caption');
        var countEl  = carousel.querySelector('.carousel__counter');
        var total    = slides.length;
        var idx      = 0;

        var dots = Array.from(carousel.querySelectorAll('.carousel__dot'));

        function updateCarousel() {
            track.style.transform = 'translateX(-' + (idx * 100) + '%)';
            if (btnPrev)  btnPrev.disabled  = idx === 0;
            if (btnNext)  btnNext.disabled  = idx === total - 1;
            if (countEl)  countEl.textContent = (idx + 1) + ' / ' + total;
            if (capEl) {
                var img = slides[idx] && slides[idx].querySelector('img');
                capEl.textContent = img ? (img.dataset.caption || img.alt || '') : '';
            }
            dots.forEach(function (dot, i) {
                dot.classList.toggle('is-active', i === idx);
            });
        }

        btnPrev && btnPrev.addEventListener('click', function () { if (idx > 0) { idx--; updateCarousel(); } });
        btnNext && btnNext.addEventListener('click', function () { if (idx < total - 1) { idx++; updateCarousel(); } });

        slides.forEach(function (slide, i) {
            var img = slide.querySelector('img');
            if (!img) return;
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', function () { openLightbox(slides, i); });
        });

        updateCarousel();
    });

    /* ----------------------------------------------------------
       Lightbox
    ---------------------------------------------------------- */
    var lightbox     = document.getElementById('lightbox');
    var lbImg        = document.getElementById('lbImg');
    var lbCaption    = document.getElementById('lbCaption');
    var lbClose      = document.getElementById('lbClose');
    var lbPrev       = document.getElementById('lbPrev');
    var lbNext       = document.getElementById('lbNext');
    var lbSlides     = [];
    var lbIdx        = 0;

    function openLightbox(slides, startIdx) {
        if (!lightbox) return;
        lbSlides = slides.map(function (s) { return s.querySelector('img'); }).filter(Boolean);
        lbIdx    = startIdx;
        updateLightbox();
        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (!lightbox || !lightbox.classList.contains('is-open')) return;
        lightbox.classList.remove('is-open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function lightboxStep(dir) {
        if (!lightbox || !lightbox.classList.contains('is-open')) return;
        var next = lbIdx + dir;
        if (next >= 0 && next < lbSlides.length) { lbIdx = next; updateLightbox(); }
    }

    function updateLightbox() {
        var img = lbSlides[lbIdx];
        if (!img || !lbImg) return;
        lbImg.src = img.src;
        lbImg.alt = img.alt;
        if (lbCaption) lbCaption.textContent = img.dataset.caption || img.alt || '';
        if (lbPrev) lbPrev.disabled = lbIdx === 0;
        if (lbNext) lbNext.disabled = lbIdx === lbSlides.length - 1;
    }

    lbClose && lbClose.addEventListener('click', closeLightbox);
    lbPrev  && lbPrev.addEventListener('click',  function () { lightboxStep(-1); });
    lbNext  && lbNext.addEventListener('click',  function () { lightboxStep(1); });
    lightbox && lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });

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
