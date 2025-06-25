import { time } from "@/store";

import stopIcon from "@/icons/stop.svg";
import startIcon from "@/icons/start.svg";

export function setupPlayTimeButton(timeEl: HTMLDivElement) {
  const playButton = document.querySelector("#btn-play") as HTMLButtonElement;
  const playIcon = document.querySelector("#img-play") as HTMLImageElement;

  playButton.addEventListener("click", () => {
    if (time.isActive) {
      time.pause();
      playIcon.src = startIcon;
    } else {
      time.play(timeEl);
      playIcon.src = stopIcon;
    }
  });
}
