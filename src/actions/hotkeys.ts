import { setMode, time } from "@/store";

import stopIcon from "@/icons/stop.svg";
import startIcon from "@/icons/start.svg";
import { getSwitchButtons } from "./switch-button";

export function setupHotkeys(timeEl: HTMLDivElement) {
  const playIcon = document.querySelector("#img-play") as HTMLImageElement;

  window.addEventListener("keypress", (e) => {
    const { watchButton, timerButton } = getSwitchButtons();

    switch (e.code) {
      case "Space":
        if (time.isActive) {
          time.pause();
          playIcon.src = startIcon;
        } else {
          time.play(timeEl);
          playIcon.src = stopIcon;
        }
        break;

      case "KeyW":
        e.preventDefault();
        watchButton.classList.add("switch-active");
        timerButton.classList.remove("switch-active");
        time.clear(timeEl);
        setMode("WATCH", timeEl);
        break;

      case "KeyT":
        e.preventDefault();
        watchButton.classList.remove("switch-active");
        timerButton.classList.add("switch-active");
        time.clear(timeEl);
        setMode("TIMER", timeEl);
        break;

      case "KeyX":
        e.preventDefault();
        time.clear(timeEl);
        break;

      default:
        break;
    }
  });
}
