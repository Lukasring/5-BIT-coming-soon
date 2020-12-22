export function isValidBarData(data) {
    if (data.value < 0 || data.value > 100) {
        return false;
    }
    if (data.title.trim().length <= 0) {
        return false;
    }
    return true;
}
