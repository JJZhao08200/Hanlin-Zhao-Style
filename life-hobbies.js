(function () {
  // 1) Gallery data: 每个 hobby 对应一组照片 + 描述
  // 你把 src 换成你自己的图片文件名，并把 caption 改成你想写的描述
  const GALLERIES = {
    hiking: {
      title: "Hiking & Exploring",
      sub: "My high-altitude treks and mountain days.",
      photos: [
        { src: "hiking-1.jpg", caption: "Abuji Tso, Yunnan — 4,400m. A quiet moment before the wind picked up." },
        { src: "hiking-2.jpg", caption: "Trail view — clouds rolling over the ridge." },
        { src: "hiking-3.jpg", caption: "Camp scene — cold air, warm tea." }
      ]
    },
    roadtrip: {
      title: "Road Trip",
      sub: "Miles, playlists, and unexpected detours.",
      photos: [
        { src: "road-1.jpg", caption: "West Coast drive — golden hour on the highway." },
        { src: "road-2.jpg", caption: "National park stop — the kind of silence you can hear." }
      ]
    },
    music: {
      title: "Writing Music",
      sub: "Guitar, songwriting, and small recordings.",
      photos: [
        { src: "music-1.jpg", caption: "My guitar setup — simple, but enough to write." }
      ]
    },
    poem: {
      title: "Writing Poem",
      sub: "Words as a way to stay awake and honest.",
      photos: [
        { src: "poem-1.jpg", caption: "Notebook page — first draft lines." }
      ]
    },
    sports: {
      title: "Sports",
      sub: "10m air rifle, recurve bow, and tennis.",
      photos: [
        { src: "sports-1.jpg", caption: "Range day — steady breath, steady sight." }
      ]
    },
    offroad: {
      title: "Off-Road",
      sub: "Stave Lake routes and mountain gravel.",
      photos: [
        { src: "offroad-1.jpg", caption: "Stave Lake — a muddy climb with a perfect view." }
      ]
    }
  };

  // 2) Modal elements
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

    // build grid
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

    // show modal
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    // hide viewer until a photo clicked
    viewer.classList.remove("is-open");
    viewer.setAttribute("aria-hidden", "true");
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
    if (!g) return;
    if (!g.photos.length) return;

    activeIndex = (activeIndex + dir + g.photos.length) % g.photos.length;
    openViewer(activeIndex);
  }

  // 3) Click cover images to open modal
  document.querySelectorAll("[data-gallery]").forEach((img) => {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => openModal(img.dataset.gallery));
    img.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(img.dataset.gallery);
      }
    });
    // make focusable for accessibility
    if (!img.hasAttribute("tabindex")) img.setAttribute("tabindex", "0");
  });

  // 4) Close handlers
  modal.addEventListener("click", (e) => {
    const t = e.target;
    if (t && t.dataset && t.dataset.close === "true") closeModal();
  });

  // 5) Viewer nav
  prevBtn.addEventListener("click", () => step(-1));
  nextBtn.addEventListener("click", () => step(1));

  // 6) ESC / Arrow keys
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("is-open")) return;

    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
})();
