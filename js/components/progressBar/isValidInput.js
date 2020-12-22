function isValidInput(selector, data) {
    if (typeof selector !== 'string') {
        return false;
    }
    if (selector === '') {
        return false;
    }
    if (selector.length > 100) {
        return false;
    }

    if (!Array.isArray(data)) {
        return false;
    }
    if (data.length === 0) {
        return false;
    }

    return true;
}

export { isValidInput }