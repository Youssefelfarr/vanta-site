const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -6% 0px",
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    const target = targetId ? document.querySelector(targetId) : null;

    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

/* Cinematic Intro Logic */
document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("vanta-intro");
  if (!intro) return;

  // We check the explicit inline class fallback to be safely redundant
  if (document.documentElement.classList.contains("intro-skipped")) {
    intro.style.display = "none";
    return;
  }

  let introCompleted = false;
  let sequencerTimeout;
  let removalTimeout;

  const dismissIntro = () => {
    if (introCompleted) return;
    introCompleted = true;
    
    clearTimeout(sequencerTimeout);
    clearTimeout(removalTimeout);

    intro.classList.add("fade-out");
    document.documentElement.classList.add("intro-finished"); // Unlocks hero animations synchronously
    
    setTimeout(() => {
      intro.style.display = "none";
      try {
        sessionStorage.setItem("vantaIntroPlayed", "true");
      } catch (e) {}
    }, 500); // 500ms matches the CSS transition window
  };

  // Instant skip logic
  intro.addEventListener("click", dismissIntro);
  intro.addEventListener("touchstart", dismissIntro, { passive: true });

  // Baseline sequencer (800ms wait + 500ms fade = 1.3s total)
  sequencerTimeout = setTimeout(dismissIntro, 800);
});
