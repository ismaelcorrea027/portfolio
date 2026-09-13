/* =========================================================
   Cerne Pilates Studio — JS puro (sem jQuery/Bootstrap/AOS/
   owl-carousel/isotope). Reimplementa em vanilla JS os mesmos
   comportamentos usados no projeto MAPEYATEC de referência.
   ========================================================= */
(function () {
  'use strict';

  /* ---------- Header: fundo sólido ao rolar ---------- */
  var header = document.getElementById('header');
  function onScrollHeader() {
    if (window.scrollY > 60) header.classList.add('header-scrolled');
    else header.classList.remove('header-scrolled');
  }
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader);

  /* ---------- Menu mobile ---------- */
  var navMenu = document.querySelector('.nav-menu');
  var navToggle = document.createElement('button');
  navToggle.className = 'nav-toggle';
  navToggle.setAttribute('aria-label', 'Abrir menu');
  navToggle.innerHTML = '<svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
  document.querySelector('.header-inner').appendChild(navToggle);

  navToggle.addEventListener('click', function () {
    navMenu.classList.toggle('is-open');
  });
  document.addEventListener('click', function (e) {
    if (navMenu.classList.contains('is-open') && !navMenu.contains(e.target) && e.target !== navToggle && !navToggle.contains(e.target)) {
      navMenu.classList.remove('is-open');
    }
  });
  navMenu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { navMenu.classList.remove('is-open'); });
  });

  /* ---------- Scroll suave (.scrollto) ---------- */
  document.querySelectorAll('.scrollto').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var hash = this.getAttribute('href');
      if (hash === '#header') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      var target = document.querySelector(hash);
      if (target) {
        e.preventDefault();
        var offset = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  });

  /* ---------- Intro / Hero carousel ---------- */
  (function () {
    var items = document.querySelectorAll('#introCarousel .carousel-item');
    var indicatorsWrap = document.getElementById('carouselIndicators');
    var current = 0;
    var timer;

    items.forEach(function (item, i) {
      var li = document.createElement('li');
      if (i === 0) li.classList.add('active');
      li.addEventListener('click', function () { goTo(i); resetTimer(); });
      indicatorsWrap.appendChild(li);
    });
    var dots = indicatorsWrap.querySelectorAll('li');

    function goTo(index) {
      items[current].classList.remove('is-active');
      dots[current].classList.remove('active');
      current = (index + items.length) % items.length;
      items[current].classList.add('is-active');
      dots[current].classList.add('active');
    }

    document.querySelector('.carousel-control-prev').addEventListener('click', function () { goTo(current - 1); resetTimer(); });
    document.querySelector('.carousel-control-next').addEventListener('click', function () { goTo(current + 1); resetTimer(); });

    function resetTimer() {
      clearInterval(timer);
      timer = setInterval(function () { goTo(current + 1); }, 6500);
    }
    resetTimer();
  })();

  /* ---------- Portfolio filter (substitui isotope) ---------- */
  (function () {
    var filters = document.querySelectorAll('#portfolio-flters li');
    var items = document.querySelectorAll('.portfolio-item');

    filters.forEach(function (li) {
      li.addEventListener('click', function () {
        filters.forEach(function (f) { f.classList.remove('filter-active'); });
        li.classList.add('filter-active');
        var filter = li.getAttribute('data-filter');

        items.forEach(function (item) {
          var show = filter === '*' || item.classList.contains(filter);
          item.classList.toggle('is-hidden', !show);
        });
      });
    });
  })();

  /* ---------- Testimonials carousel (substitui owl.carousel) ---------- */
  (function () {
    var track = document.getElementById('testiTrack');
    if (!track) return;
    var cards = track.children;
    var dotsWrap = document.getElementById('testiDots');
    var current = 0;
    var timer;

    for (var i = 0; i < cards.length; i++) {
      (function (index) {
        var dot = document.createElement('span');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', function () { goTo(index); resetTimer(); });
        dotsWrap.appendChild(dot);
      })(i);
    }
    var dots = dotsWrap.querySelectorAll('span');

    function goTo(index) {
      current = (index + cards.length) % cards.length;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      dots.forEach(function (d) { d.classList.remove('active'); });
      dots[current].classList.add('active');
    }

    function resetTimer() {
      clearInterval(timer);
      timer = setInterval(function () { goTo(current + 1); }, 5000);
    }
    resetTimer();
  })();

  /* ---------- Reveal on scroll (substitui AOS) ---------- */
  (function () {
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    els.forEach(function (el) { obs.observe(el); });
  })();

  /* ---------- Formulário de contato (sem backend) ---------- */
  (function () {
    var form = document.getElementById('contactForm');
    if (!form) return;
    var loading = form.querySelector('.loading');
    var sent = form.querySelector('.sent-message');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      sent.classList.remove('is-active');
      loading.classList.add('is-active');
      setTimeout(function () {
        loading.classList.remove('is-active');
        sent.classList.add('is-active');
        form.reset();
      }, 700);
    });
  })();

  /* ---------- Newsletter (sem backend) ---------- */
  (function () {
    var form = document.getElementById('newsletterForm');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('input[type="submit"]');
      var original = btn.value;
      btn.value = 'Cadastrado!';
      form.querySelector('input[type="email"]').value = '';
      setTimeout(function () { btn.value = original; }, 2500);
    });
  })();

  /* ---------- Back to top ---------- */
  (function () {
    var btn = document.querySelector('.back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', function () {
      btn.classList.toggle('is-visible', window.scrollY > 300);
    });
  })();

})();
