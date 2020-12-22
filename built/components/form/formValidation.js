import { Validator } from "./Validator.js";
export function formValidation() {
    var forms = Array.from(document.querySelectorAll("form.form"));
    var _loop_1 = function (form) {
        var validationInputs = Array.from(form.querySelectorAll("[data-validation"));
        var submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.addEventListener("click", function (e) {
            e.preventDefault();
            var validationResult = validateInputs(validationInputs);
            console.log(validationResult);
            if (allInputsValid(validationResult)) {
                console.log("All inputs valid!");
            }
            else {
                console.error("Form contains invalid inputs!");
            }
        });
    };
    for (var _i = 0, forms_1 = forms; _i < forms_1.length; _i++) {
        var form = forms_1[_i];
        _loop_1(form);
    }
}
function allInputsValid(validationResults) {
    for (var _i = 0, validationResults_1 = validationResults; _i < validationResults_1.length; _i++) {
        var result = validationResults_1[_i];
        if (!result.isValid) {
            return false;
        }
    }
    return true;
}
function validateInputs(inputs) {
    var results = [];
    for (var _i = 0, inputs_1 = inputs; _i < inputs_1.length; _i++) {
        var input = inputs_1[_i];
        var rule = input.dataset.validation;
        var text = input.value;
        var result = null;
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
