function isValidProgressBar(bar) {
    if (typeof bar !== 'object' ||
    bar === null ||
    Array.isArray(bar)) {
    return false;
    }

    if (!bar.title ||
        typeof bar.title !== 'string') {
        return false;
    }

    if (!bar.value ||
        typeof bar.value !== 'number' ||
        bar.value < 0 ||
        bar.value > 100) {
        return false;
    }

    return true;
}

export { isValidProgressBar }