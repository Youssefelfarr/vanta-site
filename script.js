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

  // Sequencer
  setTimeout(() => {
    intro.classList.add("fade-out");
    document.documentElement.classList.add("intro-finished"); // Unlocks hero animations synchronously
    
    setTimeout(() => {
      intro.style.display = "none";
      try {
        sessionStorage.setItem("vantaIntroPlayed", "true");
      } catch (e) {}
    }, 600); // 600ms matches the CSS transition window
  }, 1200); // 1.2s total holding parameter
});
