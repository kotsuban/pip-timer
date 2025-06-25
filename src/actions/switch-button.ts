import { setMode, time } from "@/store";
import type { Mode } from "@/store";

export function setupSwitchButton(timeEl: HTMLDivElement) {
  const { switchButtons, watchButton, timerButton } = getSwitchButtons();

  switchButtons.forEach((switchButton) => {
    switchButton.addEventListener("click", (e) => {
      if (!(e.target instanceof HTMLButtonElement)) return;

      watchButton.classList.remove("switch-active");
      timerButton.classList.remove("switch-active");

      e.target.classList.add("switch-active");

      time.clear(timeEl);

      setMode(e.target.innerText as Mode, timeEl);
    });
  });
}

export function getSwitchButtons() {
  const switchButtons =
    document.querySelectorAll<HTMLButtonElement>("#switch-item");

  const [watchButton, timerButton] = switchButtons;

  return { switchButtons, watchButton, timerButton };
}
