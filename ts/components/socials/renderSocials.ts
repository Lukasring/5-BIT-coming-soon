import { SocialsData } from "../../data/socialsData.js";
import { isValidSelector } from "../../util/isValidSelector.js";
import { isValidSocialsData } from "./isValidSocialsData.js";

export function renderSocials(selector: string, data: SocialsData[]) {
  if (!isValidSelector(selector)) {
    throw new Error(`Selector '${selector}' is not valid!`);
  }

  const socialsDOMelement = document.querySelector(selector);

  let html = "";

  for (let social of data) {
    if (!isValidSocialsData(social)) {
      console.error("invalid social data: " + social);
      console.error("Values can't be empty!");
      continue;
    }
    html += `<a href="${social.href}" target="_blank" class="fa fa-${social.icon}"></a>`;
  }
  socialsDOMelement.innerHTML = html;
}
