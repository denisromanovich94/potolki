(() => {
  const burger  = document.querySelector('.nav__burger');
  const overlay = document.querySelector('.nav__overlay');
  if (!burger || !overlay) return;

  const setOpen = (open) => {
    burger.classList.toggle('is-open', open);
    overlay.classList.toggle('is-open', open);
    document.body.classList.toggle('is-nav-open', open);
    burger.setAttribute('aria-expanded', String(open));
  };

  burger.addEventListener('click', () => setOpen(!burger.classList.contains('is-open')));
  overlay.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
})();
