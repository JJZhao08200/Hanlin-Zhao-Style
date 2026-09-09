(() => {
  const root = document.documentElement;
  const lab = document.querySelector('.lab');
  const modes = {
    data: ['01 / DATA', 'Finding the signal.\nMaking it meaningful.'],
    finance: ['02 / FINANCE', 'Connecting the numbers.\nSeeing the bigger picture.'],
    creative: ['03 / CREATIVE', 'Following curiosity.\nCreating new possibilities.']
  };
  document.querySelectorAll('.mode-switch button').forEach(button => {
    button.addEventListener('click', () => {
      const mode = button.dataset.mode;
      lab.dataset.mode = mode;
      document.getElementById('mode-index').textContent = modes[mode][0];
      const caption = document.getElementById('mode-copy');
      caption.replaceChildren(...modes[mode][1].split('\n').flatMap((line, i) => i ? [document.createElement('br'), document.createTextNode(line)] : [document.createTextNode(line)]));
      document.querySelectorAll('.mode-switch button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    });
  });
  const toggle = document.querySelector('.motion-toggle');
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = preference.matches;
  const updateMotion = () => {
    root.classList.toggle('motion-paused', paused);
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.textContent = preference.matches ? 'Reduced motion' : paused ? 'Resume motion ▷' : 'Pause motion Ⅱ';
    toggle.disabled = preference.matches;
  };
  toggle.addEventListener('click', () => { paused = !paused; updateMotion(); });
  preference.addEventListener('change', () => { paused = preference.matches; updateMotion(); });
  updateMotion();
  document.addEventListener('visibilitychange', () => root.classList.toggle('page-hidden', document.hidden));
  const progress = document.querySelector('.reading-progress');
  let ticking = false;
  const updateProgress = () => {
    const max = root.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0})`;
    ticking = false;
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(updateProgress); } }, {passive: true});
  window.addEventListener('resize', updateProgress);
  updateProgress();
  document.getElementById('year').textContent = new Date().getFullYear();
})();
