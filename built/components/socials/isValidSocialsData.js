export function isValidSocialsData(data) {
    if (data.href.trim().length < 0 || data.icon.trim().length < 0) {
        return false;
    }
    return true;
}
