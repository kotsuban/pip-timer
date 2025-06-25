let timeContent = ["0", "0", "0", "0", "0", "0"];

export function resetTimeContent() {
  timeContent = ["0", "0", "0", "0", "0", "0"];
}

export function setupValidation(timeEl: HTMLDivElement) {
  timeEl.addEventListener("beforeinput", (e) => {
    const isInsert = e.inputType.startsWith("insert");
    const isDelete = e.inputType.startsWith("delete");
    const isNumber = /^\d*$/.test(e.data as string);

    if (!isNumber && isInsert) {
      e.preventDefault();
      return;
    }

    if (isDelete) {
      e.preventDefault();

      timeContent.pop();
      timeContent.unshift("0");
    }

    if (isInsert && e.data) {
      e.preventDefault();

      timeContent.shift();
      timeContent.push(e.data);
    }

    timeEl.textContent = `${timeContent[0]}${timeContent[1]}:${timeContent[2]}${timeContent[3]}:${timeContent[4]}${timeContent[5]}`;
  });
}
