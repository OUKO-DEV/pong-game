
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const yesBtn = document.getElementById("yesBtn");
const thinkBtn = document.getElementById("thinkBtn");
const responseMessage = document.getElementById("responseMessage");
const heartsBg = document.getElementById("heartsBg");

// Mobile navigation
menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuToggle.textContent = isOpen ? "✕" : "☰";
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Her answer is celebrated without pressuring her.
yesBtn.addEventListener("click", () => {
  responseMessage.textContent =
    "Awww! ❤️ Thank you for giving us a chance, Aggy! " +
    "Let's take things one step at a time and make beautiful memories together. " +
    "Love, Emmanuel 💗";

  createHeartBurst();
  responseMessage.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
});

thinkBtn.addEventListener("click", () => {
  responseMessage.textContent =
    "That's completely okay, Aggy. 🌷 Take all the time you need. " +
    "Your feelings matter, and I respect your decision. — Emmanuel ❤️";
});

// Floating hearts
function createHeart() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const heart = document.createElement("span");
  heart.className = "heart";
  heart.textContent = Math.random() > 0.5 ? "♥" : "♡";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (14 + Math.random() * 20) + "px";
  heart.style.animationDuration = (6 + Math.random() * 5) + "s";

  heartsBg.appendChild(heart);

  heart.addEventListener("animationend", () => heart.remove());
}

function createHeartBurst() {
  for (let i = 0; i < 16; i++) {
    setTimeout(createHeart, i * 100);
  }
}

// Keep the animation lightweight.
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  setInterval(createHeart, 1000);
}
