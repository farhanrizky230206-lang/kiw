const envelope = document.getElementById("envelope");
const sealButton = document.getElementById("sealButton");
const envelopeHint = document.getElementById("envelopeHint");
const continueButton = document.getElementById("continueButton");
const answerSection = document.getElementById("answerSection");

const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");
const musicLabel = document.getElementById("musicLabel");

const yesButton = document.getElementById("yesButton");
const thinkButton = document.getElementById("thinkButton");
const answerMessage = document.getElementById("answerMessage");
const celebration = document.getElementById("celebration");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("closeLightbox");

let envelopeOpened = false;
let musicStarted = false;

function openEnvelope() {
  if (envelopeOpened) return;

  envelopeOpened = true;
  envelope.classList.add("open");
  envelopeHint.style.opacity = "0";

  setTimeout(() => {
    envelope.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }, 500);
}

function toggleMusic() {
  if (music.paused) {
    music.play()
      .then(() => {
        musicStarted = true;
        musicButton.classList.add("playing");
        musicLabel.textContent = "Musik menyala";
      })
      .catch(() => {
        musicLabel.textContent = "Sentuh lagi";
      });
  } else {
    music.pause();
    musicButton.classList.remove("playing");
    musicLabel.textContent = "Putar musik";
  }
}

/*
  Browser modern biasanya memblokir autoplay bersuara.
  Karena itu musik mulai pada interaksi pertama pengguna.
*/
function startMusicOnFirstInteraction() {
  if (musicStarted) return;

  music.volume = 0.45;
  music.play()
    .then(() => {
      musicStarted = true;
      musicButton.classList.add("playing");
      musicLabel.textContent = "Musik menyala";
    })
    .catch(() => {
      // Musik tetap bisa diputar lewat tombol.
    });
}

document.addEventListener("pointerdown", startMusicOnFirstInteraction, { once: true });
document.addEventListener("keydown", startMusicOnFirstInteraction, { once: true });

sealButton.addEventListener("click", (event) => {
  event.stopPropagation();
  openEnvelope();
});

envelope.addEventListener("click", openEnvelope);

envelope.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openEnvelope();
  }
});

musicButton.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleMusic();
});

continueButton.addEventListener("click", (event) => {
  event.stopPropagation();

  answerSection.classList.remove("hidden-section");

  requestAnimationFrame(() => {
    answerSection.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  });
});

yesButton.addEventListener("click", () => {
  answerMessage.textContent =
    "Terima kasih sudah memilih untuk memulai cerita ini bersamaku. 🤍";

  createCelebration();

  yesButton.textContent = "Kita mulai cerita kita 🤍";
  thinkButton.style.opacity = "0.35";
  thinkButton.disabled = true;
});

thinkButton.addEventListener("click", () => {
  answerMessage.textContent =
    "Tidak apa-apa. Aku menghargai waktu dan perasaanmu. Jawablah saat kamu benar-benar siap.";
});

function createCelebration() {
  celebration.innerHTML = "";

  const symbols = ["♥", "♡", "✦", "♥", "✧"];

  for (let i = 0; i < 42; i += 1) {
    const particle = document.createElement("span");

    particle.className = "heart-particle";
    particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    particle.style.left = `${Math.random() * 100}%`;
    particle.style.fontSize = `${16 + Math.random() * 24}px`;
    particle.style.animationDuration = `${3.2 + Math.random() * 3.6}s`;
    particle.style.animationDelay = `${Math.random() * 1.2}s`;
    particle.style.color =
      Math.random() > 0.5 ? "#f0a8b8" : "#f9e8dc";

    celebration.appendChild(particle);
  }

  setTimeout(() => {
    celebration.innerHTML = "";
  }, 8500);
}

document.querySelectorAll(".photo-card").forEach((card) => {
  card.addEventListener("click", () => {
    lightboxImage.src = card.dataset.image;
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

function closePhoto() {
  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

closeLightbox.addEventListener("click", closePhoto);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closePhoto();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closePhoto();
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15
  }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});


/* =========================================================
   HEART RAIN + SPARKLE + BLUE CINEMATIC FOG
   ========================================================= */

const heartRain = document.getElementById("heartRain");
const sparkleField = document.getElementById("sparkleField");

function createRainHeart() {
  if (!heartRain) return;

  const heart = document.createElement("span");
  const symbols = ["♥", "♡", "❤"];

  heart.className = "rain-heart";
  heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];

  const size = 12 + Math.random() * 24;
  const duration = 7 + Math.random() * 7;
  const opacity = 0.35 + Math.random() * 0.55;
  const driftMid = -50 + Math.random() * 100;
  const driftEnd = -70 + Math.random() * 140;

  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${size}px`;
  heart.style.animationDuration = `${duration}s`;
  heart.style.animationDelay = `${Math.random() * 0.8}s`;
  heart.style.setProperty("--heart-opacity", opacity.toFixed(2));
  heart.style.setProperty("--heart-drift-mid", `${driftMid}px`);
  heart.style.setProperty("--heart-drift-end", `${driftEnd}px`);

  heartRain.appendChild(heart);

  window.setTimeout(() => {
    heart.remove();
  }, (duration + 1.5) * 1000);
}

function createSparkles() {
  if (!sparkleField) return;

  const sparkleCount = window.innerWidth < 640 ? 28 : 52;

  for (let i = 0; i < sparkleCount; i += 1) {
    const sparkle = document.createElement("span");
    const size = 2 + Math.random() * 3;

    sparkle.className = "sparkle";
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.top = `${Math.random() * 100}%`;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    sparkle.style.animationDuration = `${2.2 + Math.random() * 4}s`;
    sparkle.style.animationDelay = `${Math.random() * 5}s`;
    sparkle.style.opacity = `${0.25 + Math.random() * 0.75}`;

    sparkleField.appendChild(sparkle);
  }
}

createSparkles();

const heartRainInterval = window.setInterval(
  createRainHeart,
  window.innerWidth < 640 ? 360 : 220
);

for (let i = 0; i < 14; i += 1) {
  window.setTimeout(createRainHeart, i * 140);
}
