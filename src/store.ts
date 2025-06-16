export const INITIAL_TIME = "00:00:00";

export let Watch = {
  mode: "WATCH",
  playing: false,
  startTime: 0,
  elapsedTime: 0,
  intervalId: 0,
  intervalMs: 1000,

  addInterval(callback: () => void) {
    this.intervalId = setInterval(callback, this.intervalMs);
  },
  removeInterval() {
    clearInterval(this.intervalId);
    this.intervalId = 0;
  },
  isIntervalActive() {
    return this.intervalId > 0;
  },
  resetWatch() {
    this.startTime = 0;
    this.elapsedTime = 0;
  },
};
