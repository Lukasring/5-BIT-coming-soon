import { isValidSelector } from "../../util/isValidSelector.js";
import { isValidBarData } from "./isValidBarData.js";
export function renderProgressBar(selector, data) {
    if (!isValidSelector(selector)) {
        throw new Error("Selector " + selector + " is not valid!");
    }
    var BarLocationInDOM = document.querySelector(selector);
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var barData = data_1[_i];
        if (!isValidBarData(barData)) {
            console.error("invalid bar data: " + barData);
            console.error("Value must be 0..100, Title can't be empty!");
            continue;
        }
        BarLocationInDOM.appendChild(createProgressBarElement(barData.title, barData.value));
    }
}
function createProgressBarElement(title, value) {
    var barElement = document.createElement("div");
    var barTop = document.createElement("div");
    var barTopLabel = document.createElement("div");
    var barTopValue = document.createElement("div");
    barElement.classList.add("progress-bar");
    barTop.classList.add("top");
    barTopLabel.classList.add("label");
    barTopLabel.textContent = title;
    barTopValue.classList.add("value");
    barTopValue.textContent = value.toString();
    var barBottom = document.createElement("div");
    var barBottomProgress = document.createElement("div");
    barBottom.classList.add("bottom");
    barBottomProgress.classList.add("progress");
    barBottomProgress.style.width = value + "%";
    barTop.appendChild(barTopLabel);
    barTop.appendChild(barTopValue);
    barBottom.appendChild(barBottomProgress);
    barElement.appendChild(barTop);
    barElement.appendChild(barBottom);
    return barElement;
}
