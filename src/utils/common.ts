import { INITIAL_TIME } from "@/constants";

export function preventRemoveElement(e: InputEvent, el: string) {
  const isDelete = e.inputType.startsWith("delete");
  if (!isDelete) return;
  const sel = window.getSelection() as Selection;
  if ((sel && sel.rangeCount <= 0) || !sel) return;
  const range = sel.getRangeAt(0);
  if (!range.collapsed) e.preventDefault();
  const node = range.startContainer;
  const pos = range.startOffset;
  const text = node.nodeValue as string;
  if (text[pos - 1] === el) e.preventDefault();
}

export function validateNumbers(e: InputEvent, content: string | null) {
  if (!e.data) return;
  if (!content) return;

  const isInsert = e.inputType.startsWith("insert");
  const isNumber = /^\d*$/.test(e.data);

  if (content.trim().length >= INITIAL_TIME.length && isInsert) {
    e.preventDefault();
  }
  if (!isNumber && isInsert) {
    e.preventDefault();
  }
}
