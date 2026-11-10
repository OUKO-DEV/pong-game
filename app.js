
/* =====================================
   SHEILA PAVANA
   ROMANTIC INTERACTIVE EXPERIENCE
===================================== */

document.addEventListener("DOMContentLoaded", () => {

  // 1. LOADING SCREEN

  const loader = document.getElementById("loader");

  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("hide");
    }, 700);
  });

  // Fallback if page load event already happened
  setTimeout(() => {
    loader?.classList.add("hide");
  }, 2500);


  // 2. BACKGROUND MUSIC

  const music = document.getElementById("backgroundMusic");
  const musicBtn = document.getElementById("musicBtn");

  let musicPlaying = false;

  musicBtn.addEventListener("click", async () => {

    if (!musicPlaying) {
      try {
        await music.play();
        musicPlaying = true;
        musicBtn.textContent = "♫ Music On";
        musicBtn.classList.add("playing");
      } catch (error) {
        musicBtn.textContent = "Add love-song.mp3";
        console.log("Music could not play:", error);
      }
    } else {
      music.pause();
      musicPlaying = false;
      musicBtn.textContent = "♫ Music";
      musicBtn.classList.remove("playing");
    }

  });


  // 3. OPEN LOVE LETTER

  const openLetter = document.getElementById("openLetter");
  const closeLetter = document.getElementById("closeLetter");
  const letterModal = document.getElementById("letterModal");

  openLetter.addEventListener("click", () => {
    letterModal.classList.add("show");
    document.body.style.overflow = "hidden";
    createHeartBurst(12);
  });

  function closeLoveLetter() {
    letterModal.classList.remove("show");
    document.body.style.overflow = "";
  }

  closeLetter.addEventListener("click", closeLoveLetter);

  letterModal.addEventListener("click", (event) => {
    if (event.target === letterModal) {
      closeLoveLetter();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLoveLetter();
    }
  });


  // 4. FORGIVENESS BUTTON

  const forgiveBtn = document.getElementById("forgiveBtn");
  const answer = document.getElementById("answer");

  forgiveBtn.addEventListener("click", () => {

    answer.innerHTML =
      "❤️ Thank you for hearing my heart, Sheila." +
      "<br>" +
      "I hope I can earn your trust through my actions.";

    forgiveBtn.textContent = "A New Chapter Together ♡";

    createHeartBurst(35);
  });


  // 5. FLOATING HEARTS

  const heartContainer = document.getElementById("heartContainer");

  function createHeart() {

    const heart = document.createElement("div");

    heart.className = "floating-heart";

    const symbols = ["❤️", "💕", "💗", "♡", "💖"];

    heart.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    heart.style.left = Math.random() * 100 + "vw";

    heart.style.fontSize =
      (15 + Math.random() * 22) + "px";

    heart.style.animationDuration =
      (5 + Math.random() * 5) + "s";

    heartContainer.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 10000);
  }

  function createHeartBurst(amount) {

    for (let i = 0; i < amount; i++) {

      setTimeout(() => {
        createHeart();
      }, i * 100);

    }

  }

  setInterval(() => {

    if (Math.random() > 0.45) {
      createHeart();
    }

  }, 1800);


  // 6. SCROLL REVEAL ANIMATIONS

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
      (entries, obs) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            obs.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12
      }
    );

    revealElements.forEach(element => {
      observer.observe(element);
    });

  } else {

    revealElements.forEach(element => {
      element.classList.add("visible");
    });

  }

});
