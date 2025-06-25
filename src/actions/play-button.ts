import { Watch } from "@/store";

import stopIcon from "@/icons/stop.svg";
import startIcon from "@/icons/start.svg";
import { ONE_SECOND } from "@/constants";
import { convertMsToHHMMSS } from "@/utils/time";

function hhmmssToMs(hhmmss: string) {
  const [seconds = 0, mins = 0, hours = 0] = hhmmss.split(":").reverse();
  return ((+hours * 60 + +mins) * 60 + +seconds) * ONE_SECOND;
}

export function setupPlayWatchButton(watch: HTMLDivElement) {
  const playButton = document.querySelector("#btn-play") as HTMLButtonElement;
  const playIcon = document.querySelector("#img-play") as HTMLImageElement;

  playButton.addEventListener("click", () => {
    Watch.isIntervalActive() ? stopWatch() : startWatch();
  });

  const updateWatch = () => {
    const now = Date.now();
    const diff = now - Watch.startTime + Watch.elapsedTime;
    const time = convertMsToHHMMSS(diff);
    watch.textContent = time;
    document.title = time;
  };

  const updateTimer = () => {
    Watch.startTime -= ONE_SECOND;
    if (Watch.startTime <= 0) stopWatch();
    const time = convertMsToHHMMSS(Watch.startTime);
    watch.textContent = time;
    document.title = time;
  };

  const startWatch = () => {
    if (Watch.mode === "WATCH") {
      Watch.startTime = Date.now();
      Watch.addInterval(updateWatch);
    }
    if (Watch.mode === "TIMER") {
      watch.contentEditable = "false";
      watch.style.cursor = "default";
      Watch.startTime = hhmmssToMs(watch.textContent as string);
      if (Watch.startTime <= 0) return;
      Watch.addInterval(updateTimer);
    }
    playIcon.src = stopIcon;
  };

  const stopWatch = () => {
    Watch.removeInterval();
    if (Watch.mode === "WATCH") {
      Watch.elapsedTime += Date.now() - Watch.startTime;
    }
    playIcon.src = startIcon;
  };
}
