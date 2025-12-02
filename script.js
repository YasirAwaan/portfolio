console.log("hi");
document.addEventListener("DOMContentLoaded", () => {
  const img = document.querySelector(".pfp-img");

  const load = () => img.classList.add("pfp-img-loaded");

  img.complete ? load() : (img.onload = load);
});

const pills = document.querySelectorAll(".skill-pill");

// time slow aur smooth rakho
const upTime = 300;  
const downTime = 300;
const delayBetween = 900;  // wave spacing

function wave(index = 0) {
  const pill = pills[index];

  // smooth upar
  pill.classList.add("up");

  // smooth niche
  setTimeout(() => {
    pill.classList.remove("up");
  }, upTime);

  // next pill start
  setTimeout(() => {
    wave((index + 1) % pills.length);
  }, delayBetween);
}

wave();
