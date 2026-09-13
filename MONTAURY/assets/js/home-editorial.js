(() => {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  if (motion.matches || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('reveal-pending');
    entry.target.classList.add('reveal-visible');
    observer.unobserve(entry.target);
  }), {threshold: .08});
  document.querySelectorAll('.quick-card, .feature-box, .stat-tile').forEach((card, index) => {
    const wrapper = card.parentElement;
    wrapper.style.setProperty('--delay', `${index % 4 * 90}ms`);
    wrapper.classList.add('reveal-pending');
    observer.observe(wrapper);
  });
  motion.addEventListener('change', () => {
    if (motion.matches) {
      observer.disconnect();
      document.querySelectorAll('.reveal-pending').forEach(el => el.classList.remove('reveal-pending'));
    }
  });
})();
