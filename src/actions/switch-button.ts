import { INITIAL_TIME, Watch } from "@/store";
import { clearWatch } from "@/actions/clear-button";

export function setupSwitchButton(watch: HTMLDivElement) {
  const { switchButtons, watchButton, timerButton } = getSwitchButtons();

  switchButtons.forEach((switchButton) => {
    switchButton.addEventListener("click", (e) => {
      if (!(e.target instanceof HTMLButtonElement)) return;

      watchButton.classList.remove("switch-active");
      timerButton.classList.remove("switch-active");

      e.target.classList.add("switch-active");
      Watch.mode = e.target.innerText;

      clearWatch(watch);

      if (Watch.mode === "WATCH") handleStopwatch();
      if (Watch.mode === "TIMER") handleTimer();
    });
  });

  function handleStopwatch() {
    watch.removeEventListener("beforeinput", validateWatch);
    watch.removeEventListener("keydown", preventRemoveElement);
  }

  function handleTimer() {
    watch.addEventListener("beforeinput", validateWatch);
    watch.addEventListener("keydown", preventRemoveElement);
  }

  function preventRemoveElement(e: KeyboardEvent) {
    if (e.key !== "Backspace") return;
    const sel = window.getSelection() as Selection;
    if ((sel && sel.rangeCount <= 0) || !sel) return;
    const range = sel.getRangeAt(0);
    if (!range.collapsed) e.preventDefault();
    const node = range.startContainer;
    const pos = range.startOffset;
    const text = node.nodeValue as string;
    if (text[pos - 1] === ":") e.preventDefault();
  }

  function validateWatch(e: InputEvent) {
    if (!e.data) return;
    if (
      (watch.textContent as string).trim().length >= INITIAL_TIME.length &&
      e.inputType.startsWith("insert")
    )
      e.preventDefault();
    if (!/^\d*$/.test(e.data) && e.inputType.startsWith("insert")) {
      e.preventDefault();
    }
  }

  function getSwitchButtons() {
    const switchButtons =
      document.querySelectorAll<HTMLButtonElement>("#switch-item");

    const [watchButton, timerButton] = switchButtons;

    return { switchButtons, watchButton, timerButton };
  }
}
