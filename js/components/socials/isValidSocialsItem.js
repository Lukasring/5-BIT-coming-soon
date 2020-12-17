  function isValidSocialsItem(item) {
    // item - object
    if (typeof item !== 'object') {
        return false;
    }
    // item.href - string
    // item.href - ne tuscias string
    // item.icon - string
    // item.icon - ne tuscias string
    return true;
}

export { isValidSocialsItem }