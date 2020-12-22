import { ProgressBarDataType } from "../../data/progressBarData.js";

export function isValidBarData(data: ProgressBarDataType) {
  if (data.value < 0 || data.value > 100) {
    return false;
  }
  if (data.title.trim().length <= 0) {
    return false;
  }
  return true;
}
