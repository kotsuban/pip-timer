import { validateNumbers, preventRemoveElement } from "@/utils/common";

export function setupValidation(timeEl: HTMLDivElement) {
  timeEl.addEventListener("beforeinput", (e) => {
    preventRemoveElement(e, ":");
    validateNumbers(e, timeEl.textContent);
  });
}
