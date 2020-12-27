var bodyDOM = document.querySelector("body");
export var ToastType;
(function (ToastType) {
    ToastType["success"] = "success";
    ToastType["error"] = "error";
})(ToastType || (ToastType = {}));
export function renderToast(message, toastType, multiple) {
    var toastElement = document.createElement("div");
    toastElement.classList.add("toast", "open", toastType);
    var toastMessage = document.createElement("p");
    toastMessage.innerText = message;
    var toastProgress = document.createElement("div");
    toastProgress.classList.add("toast-progress");
    toastElement.appendChild(toastMessage);
    toastElement.appendChild(toastProgress);
    var openTimeRemaining = 5500;
    var timerStart = Date.now();
    var closeTimer = setTimeout(function () {
        closeToast(toastElement);
    }, openTimeRemaining);
    toastElement.addEventListener("click", function () {
        clearTimeout(closeTimer);
        closeToast(toastElement);
    });
    toastElement.addEventListener("mouseenter", function () {
        openTimeRemaining -= Date.now() - timerStart;
        clearTimeout(closeTimer);
    });
    toastElement.addEventListener("mouseleave", function () {
        timerStart = Date.now();
        closeTimer = setTimeout(function () {
            closeToast(toastElement);
        }, openTimeRemaining);
    });
    if (multiple) {
        setTimeout(function () {
            toastElement.style.bottom = 40 * multiple + "px";
        }, 500);
    }
    bodyDOM.appendChild(toastElement);
    setTimeout(function () {
        bodyDOM.removeChild(toastElement);
    }, 10000);
    return function () { return closeToast(toastElement); };
}
function closeToast(element) {
    element.classList.remove("open");
    element.classList.add("close");
}
