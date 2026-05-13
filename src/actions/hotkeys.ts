import { setMode, time } from "@/store";
import { openPipWindow } from "@/actions/pip-button";

export function setupHotkeys(timeEl: HTMLDivElement) {
  window.addEventListener("keypress", (e) => {
    switch (e.code) {
      case "Space":
        if (time.isActive) {
          time.pause();
        } else {
          time.play(timeEl);
        }
        break;

      case "KeyW":
        e.preventDefault();
        time.clear(timeEl);
        setMode("WATCH", timeEl);
        break;

      case "KeyT":
        e.preventDefault();
        time.clear(timeEl);
        setMode("TIMER", timeEl);
        break;

      case "KeyX":
        e.preventDefault();
        time.clear(timeEl);
        break;

      case "KeyP":
        e.preventDefault();
        openPipWindow(timeEl);
        break;

      default:
        break;
    }
  });
}
