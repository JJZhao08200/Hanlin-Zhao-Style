// Highlight hero jump buttons based on current section (scroll spy)
(function () {
  const links = Array.from(document.querySelectorAll(".program-jump .jump-link"));
  if (!links.length) return;

  const sections = links
    .map(a => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  // Mark active helper
  function setActive(id) {
    links.forEach(a => {
      const target = a.getAttribute("href") || "";
      a.classList.toggle("is-active", target === "#" + id);
    });
  }

  // Use IntersectionObserver for smooth & performant tracking
  const io = new IntersectionObserver((entries) => {
    // pick the entry most visible
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible && visible.target && visible.target.id) {
      setActive(visible.target.id);
    }
  }, {
    root: null,
    threshold: [0.25, 0.35, 0.5, 0.6],
    rootMargin: "-35% 0px -55% 0px" // tune where "active" switches
  });

  sections.forEach(s => io.observe(s));

  // Default active on load (first section)
  if (sections[0] && sections[0].id) setActive(sections[0].id);
})();
