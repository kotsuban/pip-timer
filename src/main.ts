import "./style.css";
import clearIcon from "./icons/clear.svg";
import pipIcon from "./icons/pip.svg";
import startIcon from "./icons/start.svg";
import blackThemeIcon from "./icons/black-theme.svg";

import { setupOpenWatchInPipModeButton } from "./actions/pip-button";
import { setupClearWatchButton } from "./actions/clear-button";
import { setupPlayWatchButton } from "./actions/play-button";
import { setupSwitchButton } from "./actions/switch-button";

import { INITIAL_TIME } from "./store";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <header>
    <div class="btn-group">
      <button class="btn-clear" title="Reset current time">
        <img alt="stop" src=${clearIcon} width=20 height=20 />
      </button>
      <button class="btn-play" title="Play/Pause current time">
        <img class="img-play" alt="stop" src=${startIcon} width=20 height=20 />
      </button>
    </div>
    <div class="switch">
      <button class="switch-item switch-active">WATCH</button>
      <button class="switch-item">TIMER</button>
    </div>
    <div class="btn-group">
      <button class="btn-pip" title="Picture in Picture mode">
        <img alt="stop" src=${pipIcon} width=20 height=20 />
      </button>
      <button class="btn-theme" title="Toggle theme">
        <img alt="stop" src=${blackThemeIcon} width=20 height=20 />
      </button>
    </div>
  </header>
  <div class="time watch">${INITIAL_TIME}</div>
`;

const watch = document.querySelector(".watch") as HTMLDivElement;

setupClearWatchButton(watch);
setupPlayWatchButton(watch);
setupSwitchButton(watch);
setupOpenWatchInPipModeButton(watch);
