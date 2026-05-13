import { INITIAL_TIME } from "@/constants";
import { resetTimeContent } from "@/actions/validation";

export function clearContent(timeEl: HTMLDivElement) {
  timeEl.textContent = INITIAL_TIME;
  resetTimeContent();
  document.title = INITIAL_TIME;
}
