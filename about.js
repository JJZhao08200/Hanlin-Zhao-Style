// Mobile-friendly: tap to toggle keywords in timeline
(function () {
  const items = document.querySelectorAll(".timeline-item");

  if (!items.length) return;

  items.forEach((item) => {
    // click/tap toggle
    item.addEventListener("click", () => {
      item.classList.toggle("is-open");
    });

    // keyboard accessibility (Enter/Space)
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        item.classList.toggle("is-open");
      }
    });
  });
})();
