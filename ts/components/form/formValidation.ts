import { Validator, ValidationResult } from "./Validator.js";

export function formValidation() {
  const forms = Array.from(document.querySelectorAll("form.form"));

  for (let form of forms) {
    const validationInputs = Array.from(
      form.querySelectorAll("[data-validation")
    ) as HTMLInputElement[];
    const submitBtn = form.querySelector('button[type="submit"]');

    submitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const validationResult: ValidationResult[] = validateInputs(
        validationInputs
      );
      console.log(validationResult);

      if (allInputsValid(validationResult)) {
        console.log("All inputs valid!");
      } else {
        console.error("Form contains invalid inputs!");
      }
    });
  }
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
