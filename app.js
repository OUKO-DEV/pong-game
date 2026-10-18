
// Celine's special website — interactive features

const letterBtn = document.getElementById("letterBtn");
const letter = document.getElementById("letter");
const closeLetter = document.getElementById("closeLetter");
const surpriseBtn = document.getElementById("surpriseBtn");
const surprise = document.getElementById("surprise");

// Open and close the personal letter
letterBtn.addEventListener("click", () => {
  letter.classList.remove("hidden");
  letterBtn.classList.add("hidden");
  letter.scrollIntoView({ behavior: "smooth", block: "center" });
});

closeLetter.addEventListener("click", () => {
  letter.classList.add("hidden");
  letterBtn.classList.remove("hidden");
  letterBtn.scrollIntoView({ behavior: "smooth", block: "center" });
});

// Surprise button works on every click
surpriseBtn.addEventListener("click", () => {
  const isHidden = surprise.classList.contains("hidden");

  if (isHidden) {
    surprise.classList.remove("hidden");
    surpriseBtn.textContent = "Hide my surprise 💗";
    surprise.scrollIntoView({ behavior: "smooth", block: "center" });
    burstHearts(14);
  } else {
    surprise.classList.add("hidden");
    surpriseBtn.textContent = "Open my surprise ✨";
  }
});

// Friendship quiz
const quizOptions = document.querySelectorAll(".quiz-option");
const quizResult = document.getElementById("quizResult");

quizOptions.forEach((option) => {
  option.addEventListener("click", () => {
    quizOptions.forEach((item) => {
      item.classList.remove("correct", "incorrect");
    });

    if (option.dataset.answer === "right") {
      option.classList.add("correct");
      quizResult.textContent =
        "Exactly! Real friendship grows through trust, honesty, respect and care. 💗";
      burstHearts(5);
    } else {
      option.classList.add("incorrect");
      quizResult.textContent =
        "Not quite! The best friendships are built on trust, honesty and care. 🌷";
    }
  });
});

// Continuously create floating hearts and love emojis
const heartsContainer = document.getElementById("hearts");
const heartEmojis = ["💗", "💕", "💖", "💘", "💞", "❤️", "🌸", "✨", "💓"];

function createFloatingHeart() {
  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent = heartEmojis[
    Math.floor(Math.random() * heartEmojis.length)
  ];

  heart.style.setProperty("--left", `${Math.random() * 100}%`);
  heart.style.setProperty("--size", `${14 + Math.random() * 22}px`);
  heart.style.setProperty("--duration", `${7 + Math.random() * 7}s`);
  heart.style.setProperty("--delay", "0s");
  heart.style.setProperty("--drift", `${Math.random() * 120 - 60}px`);

  heartsContainer.appendChild(heart);

  heart.addEventListener("animationend", () => heart.remove(), { once: true });
}

// Keep hearts rising throughout the visit
for (let i = 0; i < 18; i++) {
  setTimeout(createFloatingHeart, i * 220);
}

setInterval(createFloatingHeart, 650);

// Extra hearts when Celine opens the surprise or gets the quiz right
function burstHearts(amount = 10) {
  for (let i = 0; i < amount; i++) {
    setTimeout(createFloatingHeart, i * 90);
  }
}
