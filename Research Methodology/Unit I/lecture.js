/* Shared behaviour for Unit I interactive lectures */
(function () {
  // Reading progress bar
  const progress = document.getElementById('progress');
  const toTop = document.getElementById('toTop');

  function onScroll() {
    const h = document.documentElement;
    const scrolled = h.scrollTop;
    const height = h.scrollHeight - h.clientHeight;
    const pct = height > 0 ? (scrolled / height) * 100 : 0;
    if (progress) progress.style.width = pct + '%';
    if (toTop) toTop.classList.toggle('show', scrolled > 500);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Back to top
  if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Click-to-reveal self-check answers
  document.querySelectorAll('.qa .q').forEach((q) => {
    q.addEventListener('click', () => q.parentElement.classList.toggle('open'));
  });
})();
