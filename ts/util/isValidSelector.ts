export function isValidSelector(selector: string) {
  return document.querySelector(selector) ? true : false;
}
