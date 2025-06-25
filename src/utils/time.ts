import { ONE_SECOND } from "@/constants";

export function convertMsToHHMMSS(ms: number) {
  const totalSeconds = Math.floor(ms / ONE_SECOND);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
    2,
    "0",
  );
  const seconds = String(totalSeconds % 60).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}
