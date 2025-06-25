import startIcon from "@/icons/start.svg";

import { Watch, INITIAL_TIME } from "@/store";

export function clearWatch(watch: HTMLDivElement) {
  const playIcon = document.querySelector(".img-play") as HTMLImageElement;

  Watch.removeInterval();
  Watch.resetWatch();

  watch.textContent = INITIAL_TIME;
  document.title = INITIAL_TIME;

  playIcon.src = startIcon;

  if (Watch.mode === "WATCH") {
    watch.contentEditable = "false";
    watch.style.cursor = "default";
  }
  if (Watch.mode === "TIMER") {
    watch.contentEditable = "true";
    watch.style.cursor = "pointer";
  }
}

export function setupClearWatchButton(watch: HTMLDivElement) {
  const clearButton = document.querySelector(".btn-clear") as HTMLButtonElement;

  clearButton.addEventListener("click", () => {
    clearWatch(watch);
  });
}
