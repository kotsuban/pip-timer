import { Watch } from "../store";
import { clearStopwatch } from "./clear-button";

export function setupSwitchButton(watch: HTMLDivElement) {
  const { switchButtons, watchButton, timerButton } = getSwitchButtons();

  switchButtons.forEach((switchButton) => {
    switchButton.addEventListener("click", (e) => {
      if (!(e.target instanceof HTMLButtonElement)) return;

      watchButton.classList.remove("switch-active");
      timerButton.classList.remove("switch-active");

      e.target.classList.add("switch-active");
      Watch.mode = e.target.innerText;

      if (Watch.mode === "WATCH") {
        watch.contentEditable = "false";
        watch.style.cursor = "default";
      }

      if (Watch.mode === "TIMER") {
        clearStopwatch(watch);
        watch.contentEditable = "true";
        watch.style.cursor = "pointer";
      }
    });
  });

  function getSwitchButtons() {
    const switchButtons =
      document.querySelectorAll<HTMLButtonElement>(".switch-item");

    const [watchButton, timerButton] = switchButtons;

    return { switchButtons, watchButton, timerButton };
  }
}
