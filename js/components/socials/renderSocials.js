import { isValidInput } from "./isValidInput.js";
import { isValidSocialsItem } from "./isValidSocialsItem.js";

function renderSocials(selector, data) {
    // input validation
    if (!isValidInput(selector, data)) {
        return false;
    }

    const DOM = document.querySelector(selector);
    if (!DOM) {
        return false;
    }

    // logic
    let HTML = '';

    for (let item of data) {
        if (!isValidSocialsItem(item)) {
            continue;
        }
        HTML += `<a href="${item.href}" target="_blank" class="fa fa-${item.icon}"></a>`
    }

    // post logic validation
    if (HTML === '') {
        return false;
    }

    // return result
    DOM.innerHTML = HTML;
    return true;
}

export { renderSocials }