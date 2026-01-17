(function () {
  const GALLERIES = {
    hiking: {
      title: "Hiking & Exploring",
      sub: "Click a photo to view larger.",
      photos: [
        { src: "hiking-01.jpg", caption: "Abuji Tso, Yunnan — 4,400m." },
        { src: "hiking-02.jpg", caption: "On the ridge — wind and silence." },
        { src: "hiking-03.jpg", caption: "A moment before the clouds rolled in." }
      ]
    },
    roadtrip: {
      title: "Road Trip",
      sub: "Miles, playlists, and detours.",
      photos: [
        { src: "roadtrip-01.jpg", caption: "West Coast drive — golden hour." },
        { src: "roadtrip-02.jpg", caption: "National park stop — the kind of silence you can hear." },
        { src: "roadtrip-03.jpg", caption: "Tang Poetry Road — Hangzhou → Wenzhou." }
      ]
    },
    music: {
      title: "Writing Music",
      sub: "Guitar and songwriting.",
      photos: [
        { src: "music-01.jpg", caption: "My guitar setup — simple and enough to write." },
        { src: "music-02.jpg", caption: "A new riff, recorded late at night." }
      ]
    },
    poem: {
      title: "Writing Poem",
      sub: "Each line is a footprint.",
      photos: [
        { src: "poem-01.jpg", caption: "Notebook page — first draft lines." },
        { src: "poem-02.jpg", caption: "Final version — polished and calm." }
      ]
    },
    sports: {
      title: "Sports",
      sub: "10m air rifle · recurve bow · tennis",
      photos: [
        { src: "sports-01.jpg", caption: "Range day — steady breath, steady sight." },
        { src: "sports-02.jpg", caption: "Recurve practice — form before power." }
      ]
    },
    offroad: {
      title: "Off-Road",
      sub: "Stave Lake and mountain gravel.",
      photos: [
        { src: "offroad-01.jpg", caption: "Stave Lake — mud, grip, and a perfect view." },
        { src: "offroad-02.jpg", caption: "A route I’d drive again and again." }
      ]
    }
  };

  const modal = document.getElementById("galleryModal");
  const titleEl = document.getElementById("galleryTitle");
  const subEl = document.getElementById("gallerySub");
  const gridEl = document.getElementById("galleryGrid");

  const viewer = document.getElementById("galleryViewer");
  const viewerImg = document.getElementById("viewerImg");
  const viewerCap = document.getElementById("viewerCap");
  const prevBtn = modal.querySelector(".viewer-btn.prev");
  const nextBtn = modal.querySelector(".viewer-btn.next");

  let activeKey = null;
  let activeIndex = 0;

  function openModal(key) {
    const g = GALLERIES[key];
    if (!g) return;

    activeKey = key;
    activeIndex = 0;

    titleEl.textContent = g.title || "Gallery";
    subEl.textContent = g.sub || "Click a photo to view larger.";

    gridEl.innerHTML = "";
    g.photos.forEach((p, idx) => {
      const tile = document.createElement("div");
      tile.className = "gallery-tile";
      tile.tabIndex = 0;
      tile.innerHTML = `
        <img src="${p.src}" alt="${(p.caption || g.title || "Photo").replace(/"/g, "&quot;")}" />
        <div class="cap">${p.caption || ""}</div>
      `;
      tile.addEventListener("click", () => openViewer(idx));
      tile.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openViewer(idx);
        }
      });
      gridEl.appendChild(tile);
    });

    viewer.classList.remove("is-open");
    viewer.setAttribute("aria-hidden", "true");

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    activeKey = null;
  }

  function openViewer(idx) {
    const g = GALLERIES[activeKey];
    if (!g) return;

    activeIndex = idx;
    const p = g.photos[activeIndex];

    viewerImg.src = p.src;
    viewerImg.alt = p.caption || g.title || "Photo";
    viewerCap.textContent = p.caption || "";

    viewer.classList.add("is-open");
    viewer.setAttribute("aria-hidden", "false");
  }

  function step(dir) {
    const g = GALLERIES[activeKey];
    if (!g || !g.photos.length) return;
    activeIndex = (activeIndex + dir + g.photos.length) % g.photos.length;
    openViewer(activeIndex);
  }

  document.querySelectorAll("[data-gallery]").forEach((img) => {
    img.style.cursor = "pointer";
    img.setAttribute("tabindex", "0");

    img.addEventListener("click", () => openModal(img.dataset.gallery));
    img.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(img.dataset.gallery);
      }
    });
  });

  modal.addEventListener("click", (e) => {
    const t = e.target;
    if (t && t.dataset && t.dataset.close === "true") closeModal();
  });

  prevBtn.addEventListener("click", () => step(-1));
  nextBtn.addEventListener("click", () => step(1));

  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("is-open")) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
})();
