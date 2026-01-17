(function () {
  // ====== CONFIG ======
  const GALLERIES = {
    hiking: {
      title: "Hiking & Exploring",
      sub: "High-altitude treks and mountain solitude.",
      path: "hobbies/hiking/",
      photos: [
        "Abuji Tso, Yunnan — 4,400m. Thin air, clear mind.",
        "On the trail — clouds rolling over the ridge.",
        "Summit moment — quiet, wind, and breath.",
        "Morning light in the mountains.",
        "Rest stop — water tastes different at altitude.",
        "Camp before sunset.",
        "Trail disappearing into fog.",
        "Cold night, warm tea.",
        "Boots covered in dust and snow.",
        "A ridge I won’t forget."
      ]
    },

    roadtrip: {
      title: "Road Trip",
      sub: "Miles, playlists, and detours.",
      path: "hobbies/roadtrip/",
      photos: [
        "West Coast highway — golden hour.",
        "Crossing state lines.",
        "Desert road toward Las Vegas.",
        "Yellowstone — steam and silence.",
        "Salt Lake City skyline.",
        "Long straight road, short thoughts.",
        "Car and sky.",
        "National park pull-off.",
        "Endless horizon.",
        "Night drive with music."
      ]
    },

    music: {
      title: "Writing Music",
      sub: "Guitar, songwriting, and late nights.",
      path: "hobbies/music/",
      photos: [
        "My guitar setup.",
        "Song draft notes.",
        "Recording late at night.",
        "Strings and calluses.",
        "Practice corner."
      ]
    },

    poem: {
      title: "Writing Poem",
      sub: "Words as footprints.",
      path: "hobbies/poem/",
      photos: [
        "Notebook — first draft.",
        "Rewriting a line.",
        "Final version.",
        "Poem written on the road."
      ]
    },

    sports: {
      title: "Sports",
      sub: "Precision, focus, repetition.",
      path: "hobbies/sports/",
      photos: [
        "10m air rifle range.",
        "Recurve bow practice.",
        "Tennis session — 3.0–3.5.",
        "Quiet before the shot."
      ]
    },

    offroad: {
      title: "Off-Road",
      sub: "Stave Lake and mountain gravel.",
      path: "hobbies/offroad/",
      photos: [
        "Stave Lake trail.",
        "Mud and grip.",
        "Forest road.",
        "Last off-road trip before selling the car."
      ]
    }
  };

  // ====== MODAL ELEMENTS ======
  const modal = document.getElementById("galleryModal");
  const titleEl = document.getElementById("galleryTitle");
  const subEl = document.getElementById("gallerySub");
  const gridEl = document.getElementById("galleryGrid");
  const viewer = document.getElementById("galleryViewer");
  const viewerImg = document.getElementById("viewerImg");
  const viewerCap = document.getElementById("viewerCap");
  const prevBtn = modal.querySelector(".viewer-btn.prev");
  const nextBtn = modal.querySelector(".viewer-btn.next");

  let active = null;
  let index = 0;

  function openModal(key) {
    const g = GALLERIES[key];
    if (!g) return;

    active = g;
    index = 0;

    titleEl.textContent = g.title;
    subEl.textContent = g.sub;

    gridEl.innerHTML = "";
    g.photos.forEach((cap, i) => {
      const tile = document.createElement("div");
      tile.className = "gallery-tile";
      tile.innerHTML = `
        <img src="${g.path}${String(i + 1).padStart(2, "0")}.jpg" />
        <div class="cap">${cap}</div>
      `;
      tile.onclick = () => openViewer(i);
      gridEl.appendChild(tile);
    });

    viewer.classList.remove("is-open");
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  function openViewer(i) {
    index = i;
    viewerImg.src = `${active.path}${String(i + 1).padStart(2, "0")}.jpg`;
    viewerCap.textContent = active.photos[i];
    viewer.classList.add("is-open");
  }

  function step(dir) {
    index = (index + dir + active.photos.length) % active.photos.length;
    openViewer(index);
  }

  document.querySelectorAll("[data-gallery]").forEach(img => {
    img.onclick = () => openModal(img.dataset.gallery);
  });

  modal.onclick = e => {
    if (e.target.dataset.close) closeModal();
  };

  prevBtn.onclick = () => step(-1);
  nextBtn.onclick = () => step(1);

  document.addEventListener("keydown", e => {
    if (!modal.classList.contains("is-open")) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
})();
