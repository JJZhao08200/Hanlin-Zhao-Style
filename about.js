// Mobile-friendly: tap to toggle keywords in timeline (and keep desktop click to navigate)
(function () {
  const items = document.querySelectorAll(".timeline-item");
  if (!items.length) return;

  // Match mobile breakpoint with your CSS (change if you use different breakpoint)
  const mq = window.matchMedia("(max-width: 920px)");

  function isMobile() {
    return mq.matches;
  }

  items.forEach((item) => {
    // Prefer "Read more" click to always navigate
    const more = item.querySelector(".t-more");

    if (more) {
      more.addEventListener("click", (e) => {
        // Let <a> navigate normally (do NOT preventDefault)
        // But stop bubbling so it won't toggle open/close
        e.stopPropagation();
      });
    }

    // Tap/click behavior:
    // - Mobile: first tap opens (no navigation); if already open, second tap navigates
    // - Desktop: click navigates normally (no toggle)
    item.addEventListener("click", (e) => {
      if (!isMobile()) return; // desktop: do nothing, allow navigation

      const alreadyOpen = item.classList.contains("is-open");

      if (!alreadyOpen) {
        // first tap: open only, prevent navigation
        e.preventDefault();
        item.classList.add("is-open");
      } else {
        // already open: allow navigation
        // (no preventDefault)
      }
    });

    // Keyboard accessibility:
    // - Mobile: Enter/Space toggles (no navigation)
    // - Desktop: Enter triggers normal link navigation; Space prevents scroll and navigates
    item.addEventListener("keydown", (e) => {
      const key = e.key;

      // Only handle Enter/Space
      if (key !== "Enter" && key !== " ") return;

      if (isMobile()) {
        // mobile: toggle only
        e.preventDefault();
        item.classList.toggle("is-open");
      } else {
        // desktop: keep default for Enter (navigate)
        // Space on links scrolls page; make it behave like click navigation
        if (key === " ") {
          e.preventDefault();
          item.click();
        }
      }
    });
  });
})();
