const CONFIG = {
  magicWord: "princess",
  title: "For My Baby ❤️",
  subtitle: "A special place just for you",
};

const MAGIC_WORD = CONFIG.magicWord;

const SONGS = [
  { title: "I Found You", artist: "Stephen Sanchez", src: "" },
  { title: "Those Eyes", artist: "New West", src: "" },
  { title: "Until I Found You", artist: "Stephen Sanchez", src: "" },
  { title: "Best Part", artist: "Daniel Caesar", src: "" },
  { title: "Sweet", artist: "Cigarettes After Sex", src: "" },
];

const GALLERY_IMAGES = [
  {
    src: "image/photo 1.jpg",
    caption: "My favorite smile ❤️",
  },
  {
    src: "image/Photo 2.jpg",
    caption: "Our happy day 🥰",
  },
  {
    src: "image/Photo 3.jpg",
    caption: "That cute face 😊",
  },
  {
    src: "image/Photo 4.jpg",
    caption: "My favorite person 💗",
  },
  {
    src: "image/Photo 5.jpg",
    caption: "Memories with you 📸",
  },
  {
    src: "image/Photo 6.jpg",
    caption: "Just us ❤️",
  },
  {
    src: "image/Photo 7.jpg",
    caption: "My happiness 🥹",
  },
  {
    src: "image/Photo 8.jpg",
    caption: "Forever my favorite",
  },
  {
    src: "image/Photo 9.jpg",
    caption: "Always with you 💞",
  },
];

const NOTES = [
  "❤️ Don't forget to drink water, my love! 💧",
  "❤️ Smile today, you're the prettiest person I know 😊",
  "❤️ Take a deep breath — everything will be okay 🌿",
  "❤️ I'm proud of you, always 🌸",
  "❤️ You make my days better just by being here 🥰",
  "❤️ Remember that someone loves you very much ❤️",
];

const LOVE_MESSAGES = [
  "I love you ❤️",
  "I love you even more ❤️",
  "You mean everything to me 💖",
  "Forever and always, baby 💗",
];

const passwordScreen = document.getElementById("password-screen");
const app = document.getElementById("app");
const enterButton = document.getElementById("enter-button");
const magicWordInput = document.getElementById("magic-word-input");
const headerTitle = document.getElementById("header-title");
const headerSubtitle = document.getElementById("header-subtitle");
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");
const loveMessage = document.getElementById("love-message");
const loveButton = document.getElementById("love-button");
const musicList = document.getElementById("music-list");
const galleryGrid = document.getElementById("gallery-grid");
const notesList = document.getElementById("notes-list");
const galleryModal = document.getElementById("gallery-modal");
const modalImage = document.getElementById("modal-image");
const modalCaption = document.getElementById("modal-caption");
const closeModalButton = document.getElementById("close-modal");

function setHeaderText() {
  headerTitle.textContent = CONFIG.title;
  headerSubtitle.textContent = CONFIG.subtitle;
}

function revealApp() {
  passwordScreen.classList.add("hidden");
  app.classList.remove("hidden");
  app.classList.add("visible");
}

function validatePassword() {
  const value = magicWordInput.value.trim();

  if (value === MAGIC_WORD) {
    revealApp();
    magicWordInput.value = "";
    return;
  }

  alert("Oops! Wrong magic word, princess ❤️");
  magicWordInput.value = "";
  magicWordInput.focus();
}

enterButton.addEventListener("click", validatePassword);
magicWordInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    validatePassword();
  }
});

function renderGallery() {
  galleryGrid.innerHTML = GALLERY_IMAGES.map(
    (image, index) => `
      <article class="gallery-card" data-index="${index}" tabindex="0" aria-label="Open ${image.caption}">
        <img src="${image.src}" alt="${image.caption}" loading="lazy" />
        <div class="gallery-caption">${image.caption}</div>
      </article>
    `
  ).join("");

  galleryGrid.querySelectorAll(".gallery-card").forEach((card) => {
    card.addEventListener("click", () => {
      const index = Number(card.dataset.index);
      openGalleryModal(GALLERY_IMAGES[index]);
    });

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        const index = Number(card.dataset.index);
        openGalleryModal(GALLERY_IMAGES[index]);
      }
    });
  });
}

function openGalleryModal(imageData) {
  modalImage.src = imageData.src;
  modalImage.alt = imageData.caption;
  modalCaption.textContent = imageData.caption;
  galleryModal.classList.remove("hidden");
}

function closeGalleryModal() {
  galleryModal.classList.add("hidden");
}

closeModalButton.addEventListener("click", closeGalleryModal);
galleryModal.addEventListener("click", (event) => {
  if (event.target.dataset.close === "true") {
    closeGalleryModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !galleryModal.classList.contains("hidden")) {
    closeGalleryModal();
  }
});

function renderSongs() {
  musicList.innerHTML = SONGS.map((song, index) => `
    <div class="music-item ${index === 0 ? "active" : ""}" data-index="${index}">
      <div class="music-icon">🎵</div>
      <div class="music-details">
        <p class="music-title">${song.title}</p>
        <p class="music-artist">${song.artist}</p>
      </div>
      <button class="music-play" type="button" aria-label="Play ${song.title}">
        ${index === 0 ? "❚❚" : "▶"}
      </button>
    </div>
  `).join("");

  musicList.querySelectorAll(".music-item").forEach((item) => {
    const index = Number(item.dataset.index);
    const playButton = item.querySelector(".music-play");

    playButton.addEventListener("click", () => {
      const isSelected = item.classList.contains("active");

      musicList.querySelectorAll(".music-item").forEach((entry) => {
        entry.classList.remove("active");
        const button = entry.querySelector(".music-play");
        button.textContent = "▶";
      });

      if (!isSelected) {
        item.classList.add("active");
        playButton.textContent = "❚❚";
      }

      if (SONGS[index].src) {
        const audio = new Audio(SONGS[index].src);
        if (!isSelected) {
          audio.play().catch(() => {});
        }
      }
    });
  });
}

function renderNotes() {
  notesList.innerHTML = NOTES.map((note) => `
    <div class="note-item">
      <div class="note-icon">💗</div>
      <p class="note-text">${note}</p>
    </div>
  `).join("");
}

function setActiveTab(tabName) {
  tabs.forEach((tab) => {
    const isActive = tab.dataset.tab === tabName;
    tab.classList.toggle("active", isActive);
  });

  panels.forEach((panel) => {
    panel.classList.toggle("active", panel.id === tabName);
  });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => setActiveTab(tab.dataset.tab));
});

function createFloatingHeart(container) {
  const heart = document.createElement("span");
  const emoji = ["❤️", "💗", "💕", "💖", "💘"][Math.floor(Math.random() * 5)];
  const size = Math.random() * 18 + 18;
  const left = Math.random() * 100;
  const duration = Math.random() * 10 + 8;
  const drift = (Math.random() - 0.5) * 120;

  heart.className = "float-heart";
  heart.textContent = emoji;
  heart.style.left = `${left}%`;
  heart.style.fontSize = `${size}px`;
  heart.style.setProperty("--drift-x", `${drift}px`);
  heart.style.animationDuration = `${duration}s`;
  heart.style.animationDelay = `${Math.random() * 2}s`;

  container.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, duration * 1000 + 200);
}

function startFloatingHearts() {
  const heartContainers = [document.getElementById("password-hearts")];
  heartContainers.forEach((container) => {
    if (!container) return;
    setInterval(() => {
      if (document.body.contains(container)) {
        createFloatingHeart(container);
      }
    }, 1400);
  });

  const mainSiteHearts = document.createElement("div");
  mainSiteHearts.className = "floating-layer";
  mainSiteHearts.id = "main-hearts";
  mainSiteHearts.setAttribute("aria-hidden", "true");
  document.body.appendChild(mainSiteHearts);

  setInterval(() => {
    if (app.classList.contains("hidden")) return;
    createFloatingHeart(mainSiteHearts);
  }, 1500);
}

function createLoveBurst(button) {
  const burstColors = ["❤️", "💗", "💕", "💖", "💘"];

  for (let i = 0; i < 12; i += 1) {
    const heart = document.createElement("span");
    heart.className = "heart-burst";
    heart.textContent = burstColors[i % burstColors.length];
    heart.style.left = `${50 + (Math.random() - 0.5) * 130}px`;
    heart.style.top = `${50 + (Math.random() - 0.5) * 130}px`;
    heart.style.setProperty("--move-x", `${(Math.random() - 0.5) * 120}px`);
    heart.style.setProperty("--move-y", `${-60 - Math.random() * 80}px`);
    button.appendChild(heart);

    setTimeout(() => heart.remove(), 1100);
  }
}

loveButton.addEventListener("click", () => {
  createLoveBurst(loveButton);
  loveButton.classList.remove("loved");
  void loveButton.offsetWidth;
  loveButton.classList.add("loved");

  const nextMessage = LOVE_MESSAGES[Math.floor(Math.random() * LOVE_MESSAGES.length)];
  loveMessage.textContent = nextMessage;
});

function initialize() {
  setHeaderText();
  renderGallery();
  renderSongs();
  renderNotes();
  setActiveTab("love");
  startFloatingHearts();
}

initialize();
