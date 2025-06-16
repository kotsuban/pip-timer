import startIcon from "../icons/start.svg";

import { Watch, INITIAL_TIME } from "../store";

export function clearStopwatch(watch: HTMLDivElement) {
  Watch.removeInterval();
  Watch.resetWatch();

  watch.textContent = INITIAL_TIME;
  document.title = INITIAL_TIME;
}

export function setupClearWatchButton(watch: HTMLDivElement) {
  const clearButton = document.querySelector(".btn-clear") as HTMLButtonElement;
  const playIcon = document.querySelector(".img-play") as HTMLImageElement;

  clearButton.addEventListener("click", () => {
    clearStopwatch(watch);
    playIcon.src = startIcon;
  });
}
