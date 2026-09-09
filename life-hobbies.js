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

  // Only reference photographs that exist in the repository.
  GALLERIES.hiking.photos = GALLERIES.hiking.photos.slice(0, 6);
  const coverPhotos = {roadtrip: 'R.png', music: 'M.png', poem: 'wirte.png', sports: 'shoot.png', offroad: 'offroad.png'};
  Object.entries(GALLERIES).forEach(([key, gallery]) => {
    gallery.images = key === 'hiking'
      ? gallery.photos.map((caption, i) => ({src: gallery.path + (i < 4 ? 'web-' : '') + String(i + 1).padStart(2, '0') + '.jpg', caption: 'Hiking journal — ' + String(i + 1).padStart(2, '0')}))
      : [{src: coverPhotos[key], caption: gallery.title}];
  });
  const modal = document.getElementById('galleryModal');
  const panel = modal.querySelector('.gallery-panel');
  const grid = document.getElementById('galleryGrid');
  const viewer = document.getElementById('galleryViewer');
  const viewerImg = document.getElementById('viewerImg');
  const viewerCap = document.getElementById('viewerCap');
  const closeButton = modal.querySelector('.gallery-close');
  const prev = modal.querySelector('.prev');
  const next = modal.querySelector('.next');
  const background = [document.querySelector('main'), document.querySelector('header')];
  let active, index = 0, trigger, previousOverflow = '';
  function openViewer(i) {
    index = i;
    const photo = active.images[i];
    viewerImg.src = photo.src;
    viewerImg.alt = photo.caption;
    viewerCap.textContent = photo.caption;
    viewer.classList.add('is-open');
    viewer.setAttribute('aria-hidden', 'false');
  }
  function closeModal() {
    modal.classList.remove('is-open');
    background.forEach(el => { el.inert = false; });
    document.body.style.overflow = previousOverflow;
    trigger?.focus();
    modal.setAttribute('aria-hidden', 'true');
  }
  function openModal(key, source) {
    active = GALLERIES[key];
    if (!active) return;
    trigger = source;
    index = 0;
    document.getElementById('galleryTitle').textContent = active.title;
    document.getElementById('gallerySub').textContent = active.sub;
    grid.replaceChildren();
    active.images.forEach((photo, i) => {
      const tile = document.createElement('button');
      tile.type = 'button'; tile.className = 'gallery-tile';
      const img = document.createElement('img'); img.src = photo.src; img.alt = photo.caption; img.loading = 'lazy';
      const cap = document.createElement('span'); cap.className = 'cap'; cap.textContent = photo.caption;
      tile.append(img, cap); tile.addEventListener('click', () => openViewer(i)); grid.append(tile);
    });
    viewer.classList.remove('is-open'); viewer.setAttribute('aria-hidden', 'true');
    prev.disabled = next.disabled = active.images.length < 2;
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    modal.classList.add('is-open'); modal.setAttribute('aria-hidden', 'false');
    closeButton.focus();
    background.forEach(el => { el.inert = true; });
  }
  document.querySelectorAll('[data-gallery]').forEach(img => {
    img.tabIndex = 0; img.setAttribute('role', 'button'); img.setAttribute('aria-haspopup', 'dialog');
    img.setAttribute('aria-label', 'Open ' + GALLERIES[img.dataset.gallery].title + ' gallery');
    img.addEventListener('click', () => openModal(img.dataset.gallery, img));
    img.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(img.dataset.gallery, img); } });
  });
  modal.addEventListener('click', e => { if (e.target.dataset.close) closeModal(); });
  function step(dir) { if (active) openViewer((index + dir + active.images.length) % active.images.length); }
  prev.addEventListener('click', () => step(-1)); next.addEventListener('click', () => step(1));
  document.addEventListener('keydown', e => {
    if (!modal.classList.contains('is-open')) return;
    if (e.key === 'Escape') { e.preventDefault(); closeModal(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
    if (e.key === 'Tab') {
      const focusable = [...panel.querySelectorAll('button:not([disabled])')].filter(el => el.getClientRects().length);
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
})();
