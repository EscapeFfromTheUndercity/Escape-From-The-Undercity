
const smokeContainer = document.getElementById("smoke-container");
const pipePositions = [10, 60, 130, 220, 300];
const pipeColors = ["#7d6f78", "#c98b9c", "#cdb6ac", "#ea9eae", "#b6b3b9"];

function createSmoke(x, color) {
  const smoke = document.createElement("div");
  smoke.classList.add("smoke");
  smoke.style.left = `${x}px`;
  smoke.style.background = color;
  smokeContainer.appendChild(smoke);
  setTimeout(() => smoke.remove(), 8000);
}

setInterval(() => {
  pipePositions.forEach((x, i) => {
    createSmoke(x, pipeColors[i]);
  });
}, 800);
