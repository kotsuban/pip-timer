import { msToHhMmSs, hhMmSsToMs } from "@/utils/time";
import { clearContent } from "./utils/common";

export type Mode = "WATCH" | "TIMER";

abstract class Time {
  protected startTime = 0;
  protected elapsedTime = 0;
  protected id = 0;
  isActive = false;

  abstract clear(watch: HTMLDivElement): void;
  abstract play(time: HTMLDivElement): void;
  abstract pause(): void;
  protected abstract update(time: HTMLDivElement): void;

  protected allowEdit(time: HTMLDivElement) {
    time.contentEditable = "true";
    time.style.cursor = "pointer";
    time.focus();
  }
  protected preventEdit(time: HTMLDivElement) {
    time.contentEditable = "false";
    time.style.cursor = "default";
  }
}

export class Watch extends Time {
  constructor(timeEl?: HTMLDivElement) {
    super();

    if (timeEl) {
      this.preventEdit(timeEl);
    }
  }

  update(timeEl: HTMLDivElement) {
    const now = Date.now();
    const delta = now - this.startTime;
    const hhmmss = msToHhMmSs(this.elapsedTime + delta);
    timeEl.textContent = hhmmss;
    document.title = hhmmss;
    this.id = requestAnimationFrame(this.update.bind(this, timeEl));
  }

  play(timeEl: HTMLDivElement) {
    this.startTime = Date.now();
    this.isActive = true;
    this.id = requestAnimationFrame(this.update.bind(this, timeEl));
  }

  pause() {
    cancelAnimationFrame(this.id);
    this.isActive = false;
    this.elapsedTime += Date.now() - this.startTime;
  }

  clear(timeEl: HTMLDivElement): void {
    clearContent(timeEl);
    cancelAnimationFrame(this.id);
    this.startTime = 0;
    this.elapsedTime = 0;
    this.isActive = false;
    this.preventEdit(timeEl);
  }
}

class Timer extends Time {
  private initialTime = 0;

  constructor(timeEl: HTMLDivElement) {
    super();

    this.allowEdit(timeEl);
  }

  update(timeEl: HTMLDivElement) {
    const now = Date.now();
    const delta = now - this.startTime;
    const remaining = this.initialTime - delta;

    if (remaining <= 0) {
      this.clear(timeEl);
      return;
    }

    const hhmmss = msToHhMmSs(remaining);
    timeEl.textContent = hhmmss;
    document.title = hhmmss;
    this.id = requestAnimationFrame(this.update.bind(this, timeEl));
  }

  play(timeEl: HTMLDivElement) {
    this.preventEdit(timeEl);
    this.startTime = Date.now();
    this.initialTime = hhMmSsToMs(timeEl.textContent as string);
    this.isActive = true;
    this.id = requestAnimationFrame(this.update.bind(this, timeEl));
  }

  pause() {
    cancelAnimationFrame(this.id);
    this.isActive = false;
  }

  clear(timeEl: HTMLDivElement): void {
    clearContent(timeEl);
    cancelAnimationFrame(this.id);
    this.startTime = 0;
    this.elapsedTime = 0;
    this.isActive = false;
    this.allowEdit(timeEl);
  }
}

export let time = new Watch();

export function setMode(mode: Mode, timeEl: HTMLDivElement) {
  time = mode === "WATCH" ? new Watch(timeEl) : new Timer(timeEl);
}
