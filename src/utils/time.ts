import { ONE_SECOND } from "@/constants";

export function msToHhMmSs(ms: number) {
  const totalSeconds = Math.floor(ms / ONE_SECOND);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
    2,
    "0",
  );
  const seconds = String(totalSeconds % 60).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}

export function hhMmSsToMs(hhmmss: string) {
  const [seconds = 0, mins = 0, hours = 0] = hhmmss.split(":").reverse();
  return ((+hours * 60 + +mins) * 60 + +seconds) * ONE_SECOND;
}
