async function getPipWindow() {
  return (await (
    window as any
  ).documentPictureInPicture.requestWindow()) as Window;
};

function getWatchStyle() {
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

  return style;
};

function returnWatchToDOM(pipWindow: Window) {
  pipWindow.addEventListener("pagehide", (e: PageTransitionEvent) => {
    const target = e.target as Document;
    const container = document.querySelector("#app") as HTMLDivElement;
    const pipTime = target.querySelector("#time") as Element;
    container.append(pipTime);
  });
};

export async function openPipWindow(timeEl) {
  if (!("documentPictureInPicture" in window)) {
    alert("Picture in Picture mode is not supported in your browser.");
  }

  const pipWindow = await getPipWindow();

  pipWindow.document.head.appendChild(getWatchStyle());
  pipWindow.document.body.append(timeEl);

  returnWatchToDOM(pipWindow);
}
