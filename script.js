const img = document.querySelector(".pfp-img");
img.onload = () => img.classList.add("pfp-img-loaded");
if (img.complete) img.onload();

const pills = document.querySelectorAll(".skill-pill");
let waveActive = false;
let waveTimeout = null;

// --- WAVE ANIMATION ---
function startWave(index = 0) {
  if (!waveActive) return;

  const pill = pills[index];
  pill.classList.add("up");

  setTimeout(() => pill.classList.remove("up"), 650);

  waveTimeout = setTimeout(() => {
    startWave((index + 1) % pills.length);
  }, 350);
}

function activateWave() {
  if (waveActive) return; // already running
  waveActive = true;

  // small delay to avoid clash with stopWave clearing timeouts
  setTimeout(() => startWave(), 50);
}

function stopWave() {
  waveActive = false;
  clearTimeout(waveTimeout);

  // remove all active classes for clean reset
  pills.forEach((p) => p.classList.remove("up"));
}

// --- IMPROVED VISIBILITY-BASED WAVE CONTROL ---
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // skills visible -> wave start fresh
        activateWave();
      } else {
        // skills gone -> reset wave
        stopWave();
      }
    });
  },
  {
    threshold: 0.4, // 40% visible required
  }
);

// observe skills container
const skillsSection = document.querySelector(".skills-row");
if (skillsSection) observer.observe(skillsSection);

// start wave on page load if already visible
window.addEventListener("load", () => {
  const rect = skillsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    activateWave();
  } else {
    stopWave();
  }
});

const sr = ScrollReveal({
  distance: "60px",
  duration: 1500,
  delay: 200,
  opacity: 0,
  scale: 0.94,
  easing: "cubic-bezier(0.25, 1, 0.5, 1)",
  reset: true,
});

sr.reveal(".hero", { origin: "bottom" });
sr.reveal(".project-card", { origin: "bottom", interval: 160, scale: 0.96 });
sr.reveal(".about-section", { origin: "right", delay: 300, scale: 0.95 });
sr.reveal(".contact", { origin: "bottom", delay: 300 }); // class fixed

document.querySelectorAll(".reveal-fade").forEach((el) => {
  sr.reveal(el, {
    afterReveal: () => el.classList.add("revealed"),
  });
});

// Page load fade
(function () {
  document.documentElement.classList.add("page-fade");
  window.addEventListener("load", () => {
    requestAnimationFrame(() => {
      document.documentElement.classList.add("ready");
      document.body.classList.add("page-fade", "ready");
    });
  });
})();
// Mask Reveal
(function () {
  const masks = document.querySelectorAll(".mask-text");

  function splitChars(node) {
    const text = node.innerText.trim();
    node.innerHTML = "";
    const frag = document.createDocumentFragment();
    for (let i = 0; i < text.length; i++) {
      const span = document.createElement("span");
      span.className = "mask-char";
      span.textContent = text[i];
      frag.appendChild(span);
    }
    node.appendChild(frag);
  }

  masks.forEach((m) => {
    if (!m.dataset.split) {
      splitChars(m);
      m.dataset.split = "1";
    }
  });

  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.classList.add("revealed");
          Array.from(el.children).forEach((ch, i) => {
            ch.style.transition = `transform 700ms cubic-bezier(.22,.9,.2,1) ${
              i * 25
            }ms, opacity 500ms ease ${i * 25}ms`;
          });
          obs.unobserve(el);
        }
      });
    },
    { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
  );

  masks.forEach((m) => io.observe(m));
})();

const menuToggle = document.querySelector("#menu-toggle");
const mobileMenu = document.querySelector("#mobile-menu");

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
});

if (window.innerWidth <= 768) {
  // small devices pe wave ko disable
  waveActive = false;
  clearTimeout(waveTimeout);
  pills.forEach((p) => p.classList.remove("up"));
} else {
  // normal devices pe wave
  activateWave();
}

const navLinks = document.querySelectorAll("nav ul li a");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
  });
});

const mobileLinks = document.querySelectorAll("#mobile-menu a");

mobileLinks.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.forEach(l => l.classList.remove("active"));
    mobileLinks.forEach(l => l.classList.remove("active"));

    link.classList.add("active");

    // mobile menu band
    document.getElementById("mobile-menu").classList.remove("active");
  });
});
