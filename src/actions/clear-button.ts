import { time } from "@/store";

export function setupClearTimeButton(timeEl: HTMLDivElement) {
  const clearButton = document.querySelector("#btn-clear") as HTMLButtonElement;

  clearButton.addEventListener("click", () => {
    time.clear(timeEl);
  });
}
