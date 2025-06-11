import "./style.css";
import clearIcon from "./icons/clear.svg";
import stopIcon from "./icons/stop.svg";
import startIcon from "./icons/start.svg";
import pipIcon from "./icons/pip.svg";
import blackThemeIcon from "./icons/black-theme.svg";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <header>
    <div class="btn-group">
      <button class="btn-clear">
        <img alt="stop" src=${clearIcon} width=20 height=20 />
      </button>
      <button class="btn-play">
        <img class="img-play" alt="stop" src=${startIcon} width=20 height=20 />
      </button>
    </div>
    <div class="switch">
      <button class="switch-item switch-active">WATCH</button>
      <button class="switch-item">TIMER</button>
    </div>
    <div class="btn-group">
      <button class="btn-pip">
        <img alt="stop" src=${pipIcon} width=20 height=20 />
      </button>
      <button class="btn-theme">
        <img alt="stop" src=${blackThemeIcon} width=20 height=20 />
      </button>
    </div>
  </header>
  <div class="time watch">00:00:00</div>
  <div class="time timer hidden" contenteditable="true" spellcheck="false">00:00:00</div>
`;

let OPTIONS = {
  MODE: "WATCH",
  IS_PLAYING: false,
  START_TIME: 0,
  ELAPSED: 0,
  INTERVAL_ID: 0,
  INTERVAL: 500,
};

const switchButtons =
  document.querySelectorAll<HTMLButtonElement>(".switch-item");
const playButton = document.querySelector(".btn-play") as HTMLButtonElement;
const playIcon = document.querySelector(".img-play") as HTMLImageElement;
const clearButton = document.querySelector(".btn-clear") as HTMLButtonElement;
const pipButton = document.querySelector(".btn-pip") as HTMLButtonElement;
const watch = document.querySelector(".watch") as HTMLDivElement;
const timer = document.querySelector(".timer") as HTMLDivElement;

const [watchButton, timerButton] = switchButtons;

switchButtons.forEach((switchButton) => {
  switchButton.addEventListener("click", (e) => {
    if (!(e.target instanceof HTMLButtonElement)) return;

    watchButton.classList.remove("switch-active");
    timerButton.classList.remove("switch-active");

    e.target.classList.add("switch-active");
    OPTIONS.MODE = e.target.innerText;

    if (OPTIONS.MODE === "WATCH") {
      watch.classList.remove("hidden");
      timer.classList.add("hidden");
    } else {
      watch.classList.add("hidden");
      timer.classList.remove("hidden");
    }
  });
});

function formatTime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
    2,
    "0",
  );
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

function updateClock() {
  const now = Date.now();
  const diff = now - OPTIONS.START_TIME + OPTIONS.ELAPSED;
  const time = formatTime(diff);
  watch.textContent = time;
  document.title = time;
}

playButton.addEventListener("click", () => {
  if (OPTIONS.INTERVAL_ID) {
    clearInterval(OPTIONS.INTERVAL_ID);
    OPTIONS.INTERVAL_ID = 0;
    OPTIONS.ELAPSED += Date.now() - OPTIONS.START_TIME;
    playIcon.src = startIcon;
  } else {
    OPTIONS.START_TIME = Date.now();
    OPTIONS.INTERVAL_ID = setInterval(updateClock, OPTIONS.INTERVAL);
    playIcon.src = stopIcon;
  }
});

clearButton.addEventListener("click", () => {
  clearInterval(OPTIONS.INTERVAL_ID);
  OPTIONS.INTERVAL_ID = 0;
  OPTIONS.START_TIME = 0;
  OPTIONS.ELAPSED = 0;
  watch.textContent = "00:00:00";
  document.title = "00:00:00";
  playIcon.src = startIcon;
});

pipButton.addEventListener("click", async () => {
  if (!("documentPictureInPicture" in window)) {
    alert("Picture in Picture mode is not supported in your browser.");
  }

  const pipWindow = await (
    window as any
  ).documentPictureInPicture.requestWindow();
  const style = document.createElement("style");
  style.textContent =
    ".time { color: rgb(12, 10, 9); font-size: 3rem; font-weight: bold; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-variant-numeric: tabular-nums; cursor: default; }";
  pipWindow.document.head.appendChild(style);
  pipWindow.document.body.append(watch);

  pipWindow.addEventListener("pagehide", (e: PageTransitionEvent) => {
    const target = e.target as Document;
    const container = document.querySelector("#app") as HTMLDivElement;
    const pipTime = target.querySelector(".time") as Element;
    container.append(pipTime);
  });
});

// TODO
// TIMER mode.
// Refactor.
// Dark mode.
// Render timer as canvas video element for pretty pip mode.
