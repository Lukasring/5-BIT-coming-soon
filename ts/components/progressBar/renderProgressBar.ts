import { ProgressBarDataType } from "../../data/progressBarData.js";
import { isValidSelector } from "../../util/isValidSelector.js";
import { isValidBarData } from "./isValidBarData.js";

export function renderProgressBar(
  selector: string,
  data: ProgressBarDataType[]
) {
  if (!isValidSelector(selector)) {
    throw new Error(`Selector ${selector} is not valid!`);
  }

  const BarLocationInDOM = document.querySelector(selector);

  for (const barData of data) {
    if (!isValidBarData(barData)) {
      console.error("invalid bar data: " + barData);
      console.error("Value must be 0..100, Title can't be empty!");
      continue;
    }
    BarLocationInDOM.appendChild(
      createProgressBarElement(barData.title, barData.value)
    );
  }
}

function createProgressBarElement(title: string, value: number) {
  const barElement = document.createElement("div");
  const barTop = document.createElement("div");
  const barTopLabel = document.createElement("div");
  const barTopValue = document.createElement("div");

  barElement.classList.add("progress-bar");
  barTop.classList.add("top");
  barTopLabel.classList.add("label");
  barTopLabel.textContent = title;
  barTopValue.classList.add("value");
  barTopValue.textContent = value.toString();

  const barBottom = document.createElement("div");
  const barBottomProgress = document.createElement("div");
  barBottom.classList.add("bottom");
  barBottomProgress.classList.add("progress");
  barBottomProgress.style.width = `${value}%`;

  barTop.appendChild(barTopLabel);
  barTop.appendChild(barTopValue);
  barBottom.appendChild(barBottomProgress);
  barElement.appendChild(barTop);
  barElement.appendChild(barBottom);

  return barElement;
}
