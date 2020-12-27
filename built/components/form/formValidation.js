var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { Validator } from "./Validator.js";
import { renderToast, ToastType } from "../toast/toast.js";
export function formValidation() {
    var forms = Array.from(document.querySelectorAll("form.form"));
    var _loop_1 = function (form) {
        var validationInputs = Array.from(form.querySelectorAll("[data-validation"));
        var submitBtn = form.querySelector('button[type="submit"]');
        var toastCloasers = [];
        submitBtn.addEventListener("click", function (e) {
            e.preventDefault();
            toastCloasers.forEach(function (callback) { return callback(); });
            toastCloasers = [];
            var validationResult = validateInputs(validationInputs);
            console.log(validationResult);
            if (allInputsValid(validationResult)) {
                var closeToast = renderToast("Success!", ToastType.success);
                toastCloasers.push(closeToast);
                form.reset();
            }
            else {
                var closeToasts = showErrorMessages(validationResult);
                toastCloasers = __spreadArrays(closeToasts);
            }
        });
    };
    for (var _i = 0, forms_1 = forms; _i < forms_1.length; _i++) {
        var form = forms_1[_i];
        _loop_1(form);
    }
}
function showErrorMessages(validationResult) {
    var invalidInputs = validationResult.filter(function (result) { return result.isValid === false; });
    var toastCloasers = [];
    for (var i = invalidInputs.length; i > 0; i--) {
        var closeToast = renderToast(invalidInputs[i - 1].message, ToastType.error, i);
        toastCloasers.push(closeToast);
    }
    return toastCloasers;
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
