import startIcon from "@/icons/start.svg";

import { INITIAL_TIME } from "@/constants";
import { resetTimeContent } from "@/actions/validation";

export function clearContent(timeEl: HTMLDivElement) {
  const playIcon = document.querySelector("#img-play") as HTMLImageElement;
  timeEl.textContent = INITIAL_TIME;
  resetTimeContent();
  document.title = INITIAL_TIME;
  playIcon.src = startIcon;
}
