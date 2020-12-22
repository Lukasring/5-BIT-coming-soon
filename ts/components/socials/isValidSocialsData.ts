import { SocialsData } from "../../data/socialsData.js";

export function isValidSocialsData(data: SocialsData) {
  if (data.href.trim().length < 0 || data.icon.trim().length < 0) {
    return false;
  }

  return true;
}
