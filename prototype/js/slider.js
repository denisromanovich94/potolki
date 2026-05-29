(() => {
  const slider = document.querySelector('.hero__slider');
  if (!slider) return;
  const slides = slider.querySelectorAll('.slide');
  const dots   = document.querySelectorAll('.slider-dots .dot');
  if (slides.length < 2) return;

  let idx = 0;
  let timer;
  const go = (i) => {
    idx = (i + slides.length) % slides.length;
    slides.forEach((s, n) => s.classList.toggle('is-active', n === idx));
    dots.forEach((d, n) => d.classList.toggle('is-active', n === idx));
  };
  const restart = () => { clearInterval(timer); timer = setInterval(() => go(idx + 1), 6000); };

  dots.forEach((d, n) => d.addEventListener('click', () => { go(n); restart(); }));

  // пауза при наведении мыши (десктоп)
  slider.addEventListener('mouseenter', () => clearInterval(timer));
  slider.addEventListener('mouseleave', restart);

  restart();
})();
