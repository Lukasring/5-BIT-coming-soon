export function isValidSelector(selector) {
    return document.querySelector(selector) ? true : false;
}
