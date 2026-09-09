(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('header nav');
  if (!toggle || !nav) return;
  const media = window.matchMedia('(max-width: 760px)');
  document.body.classList.add('nav-enhanced');
  const setOpen = (open, restoreFocus = false) => {
    nav.classList.toggle('nav-open', open);
    toggle.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    nav.inert = media.matches && !open;
    if (restoreFocus) toggle.focus();
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('nav-open')) setOpen(false, true);
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('header') && nav.classList.contains('nav-open')) setOpen(false);
  });
  document.querySelector('header').addEventListener('focusout', () => {
    requestAnimationFrame(() => { if (!document.activeElement.closest('header')) setOpen(false); });
  });
  media.addEventListener('change', () => setOpen(false));
  setOpen(false);
})();
