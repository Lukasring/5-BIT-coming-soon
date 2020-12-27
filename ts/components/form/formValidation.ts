import { Validator, ValidationResult } from "./Validator.js";
import { renderToast, ToastType } from "../toast/toast.js";

export function formValidation() {
  const forms = Array.from(
    document.querySelectorAll("form.form")
  ) as HTMLFormElement[];

  for (let form of forms) {
    const validationInputs = Array.from(
      form.querySelectorAll("[data-validation")
    ) as HTMLInputElement[];
    const submitBtn = form.querySelector('button[type="submit"]');

    let toastCloasers: any[] = [];

    submitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      toastCloasers.forEach((callback) => callback());
      toastCloasers = [];

      const validationResult: ValidationResult[] = validateInputs(
        validationInputs
      );
      console.log(validationResult);

      if (allInputsValid(validationResult)) {
        const closeToast = renderToast("Success!", ToastType.success);
        toastCloasers.push(closeToast);
        form.reset();
      } else {
        const closeToasts = showErrorMessages(validationResult);
        toastCloasers = [...closeToasts];
      }
    });
  }
}

function showErrorMessages(validationResult: ValidationResult[]) {
  const invalidInputs = validationResult.filter(
    (result) => result.isValid === false
  );
  const toastCloasers: any = [];

  for (let i = invalidInputs.length; i > 0; i--) {
    const closeToast = renderToast(
      invalidInputs[i - 1].message,
      ToastType.error,
      i
    );
    toastCloasers.push(closeToast);
  }

  return toastCloasers;
}

function allInputsValid(validationResults: ValidationResult[]) {
  for (const result of validationResults) {
    if (!result.isValid) {
      return false;
    }
  }
  return true;
}

function validateInputs(inputs: HTMLInputElement[]) {
  const results: ValidationResult[] = [];

  for (let input of inputs) {
    const rule = input.dataset.validation;
    const text = input.value;
    let result = null;
    if (rule === "name") {
      result = Validator.isValidName(text);
    }
    if (rule === "email") {
      result = Validator.isValidEmail(text);
    }
    if (rule === "message") {
      result = Validator.isValidMessage(text);
    }
    results.push(result);
  }

  return results;
}
