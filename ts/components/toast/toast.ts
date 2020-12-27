const bodyDOM = document.querySelector("body");

export enum ToastType {
  success = "success",
  error = "error",
}

export function renderToast(
  message: string,
  toastType: ToastType,
  multiple?: number
) {
  const toastElement = document.createElement("div");
  toastElement.classList.add("toast", "open", toastType);

  const toastMessage = document.createElement("p");
  toastMessage.innerText = message;

  const toastProgress = document.createElement("div");
  toastProgress.classList.add("toast-progress");

  toastElement.appendChild(toastMessage);
  toastElement.appendChild(toastProgress);

  let openTimeRemaining = 5500;
  let timerStart = Date.now();

  let closeTimer = setTimeout(() => {
    closeToast(toastElement);
  }, openTimeRemaining);

  toastElement.addEventListener("click", () => {
    clearTimeout(closeTimer);
    closeToast(toastElement);
  });
  toastElement.addEventListener("mouseenter", () => {
    openTimeRemaining -= Date.now() - timerStart;
    clearTimeout(closeTimer);
  });
  toastElement.addEventListener("mouseleave", () => {
    timerStart = Date.now();
    closeTimer = setTimeout(() => {
      closeToast(toastElement);
    }, openTimeRemaining);
  });

  if (multiple) {
    setTimeout(() => {
      toastElement.style.bottom = `${40 * multiple}px`;
    }, 500);
  }

  bodyDOM.appendChild(toastElement);

  setTimeout(() => {
    bodyDOM.removeChild(toastElement);
  }, 10000);

  return () => closeToast(toastElement);
}

function closeToast(element: HTMLDivElement) {
  element.classList.remove("open");
  element.classList.add("close");
}
