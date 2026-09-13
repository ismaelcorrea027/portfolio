'use strict';

// Small inline SVG icon vocabulary: no icon fonts or external library.
const iconPaths = {
  leaf:'<path d="M12 21V9m0 7C3 16 3 7 3 7s9 0 9 9Zm0-3c0-8 7-11 7-11s4 11-7 11Zm0 7c0-7 9-8 9-8s1 9-9 8Z"/>',
  person:'<circle cx="12" cy="7" r="4"/><path d="M3 22v-3a9 9 0 0 1 18 0v3Z"/>',
  star:'<path d="m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1Z"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 3"/>',
  target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  heart:'<path d="M20.5 4.6a5 5 0 0 0-7.1 0L12 6l-1.4-1.4a5 5 0 0 0-7.1 7.1L12 20l8.5-8.3a5 5 0 0 0 0-7.1Z"/><path d="M3 12h4l2-4 4 8 2-4h6"/>',
  clipboard:'<rect x="5" y="4" width="14" height="18" rx="2"/><rect x="9" y="2" width="6" height="4" rx="1"/><path d="m8 12 2 2 5-5M8 18h8"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 2v6m10-6v6M3 10h18m-14 4h2m4 0h2m-8 4h2m4 0h2"/>',
  dumbbell:'<path d="M6 9v6m12-6v6M3 8v8m18-8v8M6 12h12M3 6h3v12H3zm15 0h3v12h-3z"/>',
  run:'<circle cx="15" cy="4" r="2"/><path d="m8 8 4-1 4 5 4 1M12 7l-2 7 5 3-1 5M10 14l-4 5H2M6 10l2-2"/>',
  bike:'<circle cx="5" cy="16" r="4"/><circle cx="19" cy="16" r="4"/><path d="m5 16 5-9 5 9H5m10 0 3-12h3M8 7h5m5 2 1 7"/>',
  water:'<path d="M2 16q2-3 5 0t5 0 5 0 5 0M2 21q2-3 5 0t5 0 5 0 5 0M5 12l5-5-4-3m4 3 5 5"/><circle cx="17" cy="8" r="2"/>',
  bolt:'<path d="m13 2-9 12h7l-1 8 10-13h-8z"/>',
  stretch:'<circle cx="12" cy="4" r="2"/><path d="m3 8 9 2 9-2M12 10v5m0 0-6 7m6-7 6 7"/>',
  chart:'<path d="M3 3v18h19M7 16v-4m5 4V8m5 8V5M5 7l5-3 5 1 6-3"/>',
  phone:'<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M10 5h4m-3 14h2m-4-8 2 2 4-4"/>',
  pin:'<path d="M19 10c0 6-7 12-7 12S5 16 5 10a7 7 0 0 1 14 0Z"/><circle cx="12" cy="9" r="2.5"/>'
};
document.querySelectorAll('[data-icon]').forEach(el => {
  el.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${iconPaths[el.dataset.icon] || iconPaths.target}</svg>`;
});

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const header = document.querySelector('#header');
const navigation = document.querySelector('#navigation');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = [...navigation.querySelectorAll('a')];
const topLink = document.querySelector('.back-to-top');
function closeMenu(returnFocus = false) {
  navigation.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menu');
  if (returnFocus) menuToggle.focus();
}
menuToggle.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});
navLinks.forEach(a => a.addEventListener('click', () => closeMenu()));
document.addEventListener('keydown', e => { if (e.key === 'Escape' && navigation.classList.contains('open')) closeMenu(true); });
document.addEventListener('click', e => { if (!header.contains(e.target)) closeMenu(); });
header.addEventListener('focusout', () => { setTimeout(() => { if (!header.contains(document.activeElement)) closeMenu(); }, 0); });
window.matchMedia('(min-width: 992px)').addEventListener('change', e => { if (e.matches) closeMenu(); });
const sections = [...document.querySelectorAll('main > section[id]')];
let scrollQueued = false;
function updateScroll() {
  header.classList.toggle('scrolled', window.scrollY > 100);
  topLink.classList.toggle('visible', window.scrollY > 100);
  const current = sections.filter(s => s.getBoundingClientRect().top <= 200).at(-1);
  navLinks.forEach(a => {
    const active = a.getAttribute('href') === `#${current?.id}`;
    a.classList.toggle('active', active);
    if (active) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
  });
  scrollQueued = false;
}
window.addEventListener('scroll', () => { if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateScroll); } }, {passive:true});
updateScroll();

// Content remains readable if JavaScript or IntersectionObserver is unavailable.
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  document.body.classList.add('motion-ready');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); }
  }), {threshold:.08});
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// Main carousel: manual navigation, swipe, pause, focus pause, and background pause.
const hero = document.querySelector('.hero');
const slides = [...document.querySelectorAll('.hero-slide')];
const heroDots = document.querySelector('.hero-dots');
const autoplay = document.querySelector('.autoplay');
let slideIndex = 0;
let heroPaused = reducedMotion.matches;
let heroTimer;
slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.type = 'button';
  dot.setAttribute('aria-label', `Mostrar slide ${i + 1}`);
  dot.addEventListener('click', () => { showSlide(i); startHeroTimer(); });
  heroDots.append(dot);
});
function showSlide(index) {
  slideIndex = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => {
    const active = i === slideIndex;
    slide.classList.toggle('active', active);
    slide.setAttribute('aria-hidden', String(!active));
    slide.inert = !active;
    heroDots.children[i].classList.toggle('active', active);
    heroDots.children[i].setAttribute('aria-pressed', String(active));
  });
}
function startHeroTimer() {
  clearInterval(heroTimer);
  if (!heroPaused && !document.hidden && !hero.contains(document.activeElement) && !hero.matches(':hover')) heroTimer = setInterval(() => showSlide(slideIndex + 1), 5500);
}
function renderHeroPause() {
  autoplay.textContent = heroPaused ? '▶' : 'Ⅱ';
  autoplay.setAttribute('aria-label', heroPaused ? 'Iniciar apresentação automática' : 'Pausar apresentação automática');
}
autoplay.addEventListener('click', () => { heroPaused = !heroPaused; renderHeroPause(); startHeroTimer(); });
document.querySelector('.hero-arrow.prev').addEventListener('click', () => { showSlide(slideIndex - 1); startHeroTimer(); });
document.querySelector('.hero-arrow.next').addEventListener('click', () => { showSlide(slideIndex + 1); startHeroTimer(); });
hero.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); showSlide(slideIndex + (e.key === 'ArrowRight' ? 1 : -1)); startHeroTimer(); }
});
hero.addEventListener('pointerenter', () => clearInterval(heroTimer));
hero.addEventListener('pointerleave', startHeroTimer);
hero.addEventListener('focusin', () => clearInterval(heroTimer));
hero.addEventListener('focusout', () => setTimeout(startHeroTimer, 0));
function bindSwipe(element, callback) {
  let startX = 0, startY = 0;
  element.addEventListener('touchstart', e => { startX = e.changedTouches[0].clientX; startY = e.changedTouches[0].clientY; }, {passive:true});
  element.addEventListener('touchend', e => {
    const x = e.changedTouches[0].clientX - startX, y = e.changedTouches[0].clientY - startY;
    if (Math.abs(x) > 55 && Math.abs(x) > Math.abs(y) * 1.5) callback(x < 0 ? 1 : -1);
  }, {passive:true});
}
bindSwipe(hero, direction => { showSlide(slideIndex + direction); startHeroTimer(); });
showSlide(0); renderHeroPause(); startHeroTimer();

// Category filter and lightweight FLIP reflow replace Isotope.
const filters = [...document.querySelectorAll('[data-filter]')];
const methodCards = [...document.querySelectorAll('[data-category]')];
function filterCards(category) {
  const before = new Map(methodCards.filter(c => !c.hidden).map(c => [c, c.getBoundingClientRect()]));
  filters.forEach(button => { const active = button.dataset.filter === category; button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active)); });
  let count = 0;
  methodCards.forEach(card => {
    const visible = category === 'all' || card.dataset.category.split(' ').includes(category);
    card.hidden = !visible;
    card.classList.remove('filter-enter');
    if (visible) {
      count++;
      card.classList.add('in-view');
      const old = before.get(card), rect = card.getBoundingClientRect();
      if (!reducedMotion.matches && old && card.animate) card.animate([{transform:`translate(${old.left - rect.left}px, ${old.top - rect.top}px)`},{transform:'translate(0, 0)'}], {duration:380,easing:'ease-out'});
      else if (!reducedMotion.matches) card.classList.add('filter-enter');
    }
  });
  document.querySelector('#filter-status').textContent = `${count} recursos exibidos.`;
}
filters.forEach(button => button.addEventListener('click', () => filterCards(button.dataset.filter)));
document.querySelectorAll('[data-sport-filter]').forEach(link => link.addEventListener('click', () => filterCards(link.dataset.sportFilter)));

// Testimonials: 3 / 2 / 1 visible cards, matching the original responsive behavior.
const testimonialWindow = document.querySelector('.testimonial-window');
const testimonialTrack = document.querySelector('.testimonial-track');
const testimonials = [...testimonialTrack.children];
const testimonialDots = document.querySelector('.testimonial-dots');
const testimonialPause = document.querySelector('.testimonial-pause');
let testimonialIndex = 0, testimonialTimer, testimonialPaused = reducedMotion.matches;
function visibleTestimonials() { return window.innerWidth < 768 ? 1 : window.innerWidth < 992 ? 2 : 3; }
function showTestimonials(index) {
  const visible = visibleTestimonials();
  const pages = testimonials.length - visible + 1;
  testimonialIndex = (index + pages) % pages;
  testimonialTrack.style.transform = `translateX(-${testimonialIndex * 100 / visible}%)`;
  testimonials.forEach((item, i) => item.setAttribute('aria-hidden', String(i < testimonialIndex || i >= testimonialIndex + visible)));
  testimonialDots.replaceChildren();
  for (let i = 0; i < pages; i++) {
    const button = document.createElement('button');
    button.setAttribute('aria-label', `Mostrar grupo ${i + 1} de depoimentos`);
    button.setAttribute('aria-pressed', String(i === testimonialIndex));
    button.classList.toggle('active', i === testimonialIndex);
    button.addEventListener('click', () => { showTestimonials(i); testimonialDots.children[i].focus(); startTestimonialTimer(); });
    testimonialDots.append(button);
  }
}
function startTestimonialTimer() {
  clearInterval(testimonialTimer);
  const section = document.querySelector('#testimonials');
  if (!testimonialPaused && !document.hidden && !section.contains(document.activeElement) && !section.matches(':hover')) testimonialTimer = setInterval(() => showTestimonials(testimonialIndex + 1), 5500);
}
function renderTestimonialPause() { testimonialPause.textContent = testimonialPaused ? '▶' : 'Ⅱ'; testimonialPause.setAttribute('aria-label', testimonialPaused ? 'Iniciar depoimentos automáticos' : 'Pausar depoimentos automáticos'); }
document.querySelector('.testimonial-prev').addEventListener('click', () => { showTestimonials(testimonialIndex - 1); startTestimonialTimer(); });
document.querySelector('.testimonial-next').addEventListener('click', () => { showTestimonials(testimonialIndex + 1); startTestimonialTimer(); });
testimonialPause.addEventListener('click', () => { testimonialPaused = !testimonialPaused; renderTestimonialPause(); startTestimonialTimer(); });
testimonialWindow.addEventListener('keydown', e => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); showTestimonials(testimonialIndex + (e.key === 'ArrowRight' ? 1 : -1)); startTestimonialTimer(); } });
const testimonialSection = document.querySelector('#testimonials');
testimonialSection.addEventListener('pointerenter', () => clearInterval(testimonialTimer));
testimonialSection.addEventListener('pointerleave', startTestimonialTimer);
testimonialSection.addEventListener('focusin', () => clearInterval(testimonialTimer));
testimonialSection.addEventListener('focusout', () => setTimeout(startTestimonialTimer, 0));
bindSwipe(testimonialWindow, direction => { showTestimonials(testimonialIndex + direction); startTestimonialTimer(); });
window.addEventListener('resize', () => showTestimonials(Math.min(testimonialIndex, testimonials.length - visibleTestimonials())));
document.addEventListener('visibilitychange', () => { startHeroTimer(); startTestimonialTimer(); });
reducedMotion.addEventListener('change', e => {
  if (e.matches) { heroPaused = true; testimonialPaused = true; renderHeroPause(); renderTestimonialPause(); startHeroTimer(); startTestimonialTimer(); }
});
showTestimonials(0); renderTestimonialPause(); startTestimonialTimer();

// Honest static contact flow: creates a message, never pretends to send it.
const contactForm = document.querySelector('#contact-form');
document.querySelectorAll('[data-plan]').forEach(link => link.addEventListener('click', () => { contactForm.elements.plan.value = link.dataset.plan; }));
contactForm.addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(contactForm);
  const summary = `Olá, Natália!\n\nMeu nome é ${data.get('name').trim()}.\nE-mail: ${data.get('email').trim()}\nAcompanhamento: ${data.get('plan')}\n\nO que procuro no acompanhamento:\n${data.get('message').trim()}`;
  document.querySelector('#message-summary').value = summary;
  document.querySelector('#message-result').hidden = false;
  document.querySelector('#copy-status').textContent = '';
  document.querySelector('#message-summary').focus();
});
document.querySelector('#copy-message').addEventListener('click', async () => {
  const summary = document.querySelector('#message-summary');
  try {
    await navigator.clipboard.writeText(summary.value);
    document.querySelector('#copy-status').textContent = 'Mensagem copiada. Nenhum dado foi enviado.';
  } catch {
    summary.focus(); summary.select();
    document.querySelector('#copy-status').textContent = 'Texto selecionado. Use Ctrl+C (ou Copiar no celular).';
  }
});
document.querySelector('#download-message').addEventListener('click', () => {
  const url = URL.createObjectURL(new Blob([document.querySelector('#message-summary').value], {type:'text/plain;charset=utf-8'}));
  const link = document.createElement('a'); link.href = url; link.download = 'mensagem-natalia-rodrigues.txt'; document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
});
document.querySelector('#newsletter-form').addEventListener('submit', e => { e.preventDefault(); document.querySelector('#newsletter-status').textContent = 'Demonstração concluída. Seu e-mail não foi cadastrado nem armazenado.'; e.target.reset(); });
document.querySelector('#year').textContent = new Date().getFullYear();

// Native image modal: keyboard dismissal, backdrop dismissal, and focus restoration.
const photoDialog = document.querySelector('#photo-dialog');
let photoTrigger;
document.querySelectorAll('[data-photo]').forEach(button => button.addEventListener('click', () => {
  photoTrigger = button;
  document.querySelector('#photo-expanded').src = button.dataset.photo;
  document.querySelector('#photo-expanded').alt = button.querySelector('img').alt;
  document.querySelector('#photo-caption').textContent = button.dataset.caption;
  photoDialog.showModal();
  document.body.style.overflow = 'hidden';
}));
photoDialog.querySelector('.photo-close').addEventListener('click', () => photoDialog.close());
photoDialog.addEventListener('click', event => { if (event.target === photoDialog) { const bounds = photoDialog.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) photoDialog.close(); } });
photoDialog.addEventListener('close', () => { document.body.style.overflow = ''; photoTrigger?.focus(); });
