import { isValidSelector } from "../../util/isValidSelector.js";
import { isValidSocialsData } from "./isValidSocialsData.js";
export function renderSocials(selector, data) {
    if (!isValidSelector(selector)) {
        throw new Error("Selector '" + selector + "' is not valid!");
    }
    var socialsDOMelement = document.querySelector(selector);
    var html = "";
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var social = data_1[_i];
        if (!isValidSocialsData(social)) {
            console.error("invalid social data: " + social);
            console.error("Values can't be empty!");
            continue;
        }
        html += "<a href=\"" + social.href + "\" target=\"_blank\" class=\"fa fa-" + social.icon + "\"></a>";
    }
    socialsDOMelement.innerHTML = html;
}
