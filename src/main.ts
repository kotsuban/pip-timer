import clearIcon from "@/icons/clear.svg";
import pipIcon from "@/icons/pip.svg";
import startIcon from "@/icons/start.svg";
import blackThemeIcon from "@/icons/black-theme.svg";

import { setupOpenTimeInPipModeButton } from "@/actions/pip-button";
import { setupClearTimeButton } from "@/actions/clear-button";
import { setupPlayTimeButton } from "@/actions/play-button";
import { setupSwitchButton } from "@/actions/switch-button";
import { setupValidation } from "@/actions/validation";
import { setupHotkeys } from "@/actions/hotkeys";

import styles from "@/main.module.css";

import "@/style.css";

import { INITIAL_TIME } from "./constants";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <header>
    <div class="${styles.btnGroup}">
      <button id="btn-clear" aria-label="Reset current time">
        <img alt="reset" src=${clearIcon} width=20 height=20 />
      </button>
      <button id="btn-play" aria-label="Play/Pause current time">
        <img id="img-play" alt="play/pause" src=${startIcon} width=20 height=20 />
      </button>
    </div>
    <div class="${styles.switch}">
      <button class="${styles.switchItem} switch-active" id="switch-item">WATCH</button>
      <button class="${styles.switchItem}" id="switch-item">TIMER</button>
    </div>
    <div class="${styles.btnGroup}">
      <button id="btn-pip" aria-label="Picture in Picture mode">
        <img alt="pip mode" src=${pipIcon} width=20 height=20 />
      </button>
      <button id="btn-theme" aria-label="Toggle theme">
        <img alt="toggle theme" src=${blackThemeIcon} width=20 height=20 />
      </button>
    </div>
  </header>
  <div class="${styles.time}" id="time">${INITIAL_TIME}</div>
  <footer>
    W - watch mode. T - timer mode. Space - pause/play. X - reset.
  </footer>
`;

const timeEl = document.querySelector("#time") as HTMLDivElement;

setupHotkeys(timeEl);
setupValidation(timeEl);
setupClearTimeButton(timeEl);
setupPlayTimeButton(timeEl);
setupSwitchButton(timeEl);
setupOpenTimeInPipModeButton(timeEl);
