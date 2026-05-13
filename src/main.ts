import { setupValidation } from "@/actions/validation";
import { setupHotkeys } from "@/actions/hotkeys";

import styles from "@/main.module.css";

import "@/style.css";

import { INITIAL_TIME } from "./constants";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="${styles.time}" id="time">${INITIAL_TIME}</div>
  <footer>
    W - watch mode. T - timer mode. Space - pause/play. X - reset. P - picture in picture.
  </footer>
`;

const timeEl = document.querySelector("#time") as HTMLDivElement;

setupHotkeys(timeEl);
setupValidation(timeEl);
