const ONE_SECOND = 1000;
const INITIAL_TIME = "00:00:00";
const MODE = {
  WATCH: "WATCH",
  TIMER: "TIMER",
}

let State = {
  mode: MODE.WATCH,
  initialTime: 0,
  startTime: 0,
  elapsedTime: 0,
  callbackId: 0,
  isActive: false,
}

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div id="time">${INITIAL_TIME}</div>
  <footer>
    W - watch mode. T - timer mode. Space - pause/play. X - reset. P - picture in picture.
  </footer>
`;

const timeEl = document.querySelector("#time") as HTMLDivElement;

function ms2HhMmSs(ms: number) {
  const totalSeconds = Math.floor(ms / ONE_SECOND);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
    2,
    "0",
  );
  const seconds = String(totalSeconds % 60).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}

function hhMmSs2Ms(hhmmss: string) {
  const [seconds = 0, mins = 0, hours = 0] = hhmmss.split(":").reverse();
  return ((+hours * 60 + +mins) * 60 + +seconds) * ONE_SECOND;
}

function hhMmSs2Arr(hhmmss: string) {
  return hhmmss.split("").filter((e) => e !== ":")
}

function arr2HhMmSs(a: string[]) {
  return `${a[0]}${a[1]}:${a[2]}${a[3]}:${a[4]}${a[5]}`;
}

function allowEdit(element: HTMLDivElement) {
  element.contentEditable = "true";
  element.style.cursor = "pointer";
  element.focus();
}

function preventEdit(element: HTMLDivElement) {
  element.contentEditable = "false";
  element.style.cursor = "default";
}

function reset() {
  timeEl.textContent = INITIAL_TIME;
  document.title = INITIAL_TIME;
  State.startTime = 0;
  State.elapsedTime = 0;
  State.isActive = false;
  cancelAnimationFrame(State.callbackId);
}

async function openPipWindow() {
  if (!("documentPictureInPicture" in window)) {
    alert("Picture in Picture mode is not supported in your browser.");
  }

  const pipWindow = await window.documentPictureInPicture.requestWindow() as Window;
  const style = document.createElement("style");

  style.textContent = `
    #time { 
      font-family: brixel_acme_7_wide_xtnd, system-ui; 
      color: rgb(12, 10, 9); 
      font-size: 3rem; 
      font-weight: bold; 
      position: absolute; 
      top: 50%; 
      left: 50%; 
      transform: translate(-50%, -50%); 
      font-variant-numeric: tabular-nums; 
    }

    #time:focus {
      border: none;
      outline: none;
    }
  `;
  pipWindow.document.head.appendChild(style);
  pipWindow.document.body.append(timeEl);

  pipWindow.addEventListener("pagehide", (e: PageTransitionEvent) => {
    const target = e.target as Document;
    const container = document.querySelector("#app") as HTMLDivElement;
    const pipTime = target.querySelector("#time") as Element;
    container.append(pipTime);
  });
}

timeEl.addEventListener("beforeinput", (e) => {
  const isInsert = e.inputType.startsWith("insert");
  const isDelete = e.inputType.startsWith("delete");
  const isNumber = /^\d*$/.test(e.data as string);
  let content = hhMmSs2Arr(timeEl.textContent)

  if (!isNumber && isInsert) {
    e.preventDefault();
    return;
  }

  if (isDelete) {
    e.preventDefault();

    content.pop();
    content.unshift("0");
  }

  if (isInsert && e.data) {
    e.preventDefault();

    content.shift();
    content.push(e.data);
  }

  timeEl.textContent = arr2HhMmSs(content);
});

window.addEventListener("keypress", (e) => {
  switch (e.code) {
    case "Space":
      if (State.isActive) {
        cancelAnimationFrame(State.callbackId);
        State.isActive = false;
        if (State.mode === MODE.WATCH) {
          State.elapsedTime += Date.now() - State.startTime;
        }
      } else {
        if (State.mode === MODE.TIMER) {
          const update = () => {
            const now = Date.now();
            const delta = now - State.startTime;
            const remaining = State.initialTime - delta;

            if (remaining <= 0) {
              reset();
              allowEdit(timeEl);
              return;
            }

            const hhmmss = ms2HhMmSs(remaining);
            timeEl.textContent = hhmmss;
            document.title = hhmmss;
            State.callbackId = requestAnimationFrame(update);
          }

          preventEdit(timeEl);
          State.startTime = Date.now();
          State.initialTime = hhMmSs2Ms(timeEl.textContent as string);
          State.isActive = true;
          State.callbackId = requestAnimationFrame(update);
        }
        if (State.mode === MODE.WATCH) {
          const update = () => {
            const now = Date.now();
            const delta = now - State.startTime;
            const hhmmss = ms2HhMmSs(State.elapsedTime + delta);
            timeEl.textContent = hhmmss;
            document.title = hhmmss;
            State.callbackId = requestAnimationFrame(update);
          }

          State.startTime = Date.now();
          State.isActive = true;
          State.callbackId = requestAnimationFrame(update);
        }
      }
      break;

    case "KeyW":
      e.preventDefault();
      reset();
      State.mode = MODE.WATCH;
      preventEdit(timeEl);
      break;

    case "KeyT":
      e.preventDefault();
      reset();
      State.mode = MODE.TIMER;
      allowEdit(timeEl);
      break;

    case "KeyX":
      e.preventDefault();
      reset();
      if (State.mode === MODE.TIMER) {
        allowEdit(timeEl)
      }
      break;

    case "KeyP":
      e.preventDefault();
      openPipWindow();
      break;

    default:
      break;
  }
});
