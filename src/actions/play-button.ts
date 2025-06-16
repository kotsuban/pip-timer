import { Watch } from "../store";

import stopIcon from "../icons/stop.svg";
import startIcon from "../icons/start.svg";

export function setupPlayWatchButton(watch: HTMLDivElement) {
  const playButton = document.querySelector(".btn-play") as HTMLButtonElement;
  const playIcon = document.querySelector(".img-play") as HTMLImageElement;

  playButton.addEventListener("click", () => {
    Watch.isIntervalActive() ? stopWatch() : startWatch();
  });

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
      2,
      "0",
    );
    const seconds = String(totalSeconds % 60).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  };

  const updateWatch = () => {
    const now = Date.now();
    const diff = now - Watch.startTime + Watch.elapsedTime;
    const time = formatTime(diff);
    watch.textContent = time;
    document.title = time;
  };

  const startWatch = () => {
    Watch.startTime = Date.now();
    Watch.addInterval(updateWatch);
    playIcon.src = stopIcon;
  };

  const stopWatch = () => {
    Watch.removeInterval();
    Watch.elapsedTime += Date.now() - Watch.startTime;
    playIcon.src = startIcon;
  };
}
