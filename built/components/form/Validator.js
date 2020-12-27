// const ABC = ['a', 'ą', 'b', 'c', 'č', ]
// const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var ALLOWED_SYMBOLS = [".", "_", "-", "@"];
// * regex for letters:  ^[a-z\u00C0-\u00ff\s]+$/
function emailIsInvalid(email) {
    var splitEmail = email.split("@");
    return (email.includes(" ") ||
        splitEmail.length !== 2 ||
        splitEmail[0].length < 1 ||
        splitEmail[1].length < 3 ||
        splitEmail[1].split(".").length < 2 ||
        splitEmail[0]
            .split(".")
            .map(function (part) { return part.trim().length > 0; })
            .includes(false) ||
        splitEmail[1]
            .split(".")
            .map(function (part) { return part.trim().length > 0; })
            .includes(false) ||
        Validator.hasTwoSymbolsInARow(email, ALLOWED_SYMBOLS) ||
        !Validator.onlyAllowedCharactersInEmail(email));
}
var Validator = /** @class */ (function () {
    function Validator() {
    }
    Validator.isValidName = function (name) {
        if (Validator.isEmptyString(name)) {
            return new Result(false, "Name can't be empty!");
        }
        if (!Validator.areValidCharacters(name)) {
            return new Result(false, "Name must consist of valid characters a-z");
        }
        if (!Validator.isCapitalLetter(name.charCodeAt(0))) {
            return new Result(false, "Name must start with a capital letter!");
        }
        return new Result(true, "Sucess");
    };
    // static isValidEmail(email:string) {
    //   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    // }
    Validator.isValidEmail = function (email) {
        if (Validator.isEmptyString(email)) {
            return new Result(false, "E-mail can't be empty!");
        }
        if (emailIsInvalid(email)) {
            return new Result(false, "E-Mail is invalid!");
        }
        return new Result(true, "Sucess");
    };
    Validator.isValidMessage = function (message) {
        if (Validator.isEmptyString(message)) {
            return new Result(false, "Message can't be empty!");
        }
        if (message.trim().length > 1000) {
            return new Result(false, "Message can't be longer than 1000 characters!");
        }
        return new Result(true, "Sucess");
    };
    Validator.isEmptyString = function (text) {
        return text.trim().length === 0;
    };
    Validator.areValidCharacters = function (string) {
        for (var _i = 0, string_1 = string; _i < string_1.length; _i++) {
            var char = string_1[_i];
            if (!Validator.isValidLetter(char)) {
                return false;
            }
        }
        return true;
    };
    Validator.isValidLetter = function (char) {
        var acsiiValue = char.charCodeAt(0);
        return (Validator.isCapitalLetter(acsiiValue) ||
            Validator.isLowerCaseLetter(acsiiValue));
    };
    /**
     * @param char characters ascii value;
     */
    Validator.isCapitalLetter = function (char) {
        return char > 64 && char < 91;
    };
    /**
     * @param char characters ascii value;
     */
    Validator.isLowerCaseLetter = function (char) {
        return char > 96 && char < 123;
    };
    Validator.hasTwoSymbolsInARow = function (string, allowedSymbols) {
        for (var i = 1; i < string.length; i++) {
            if (allowedSymbols.includes(string[i - 1]) &&
                allowedSymbols.includes(string[i])) {
                return true;
            }
        }
        return false;
    };
    Validator.onlyAllowedCharactersInEmail = function (email) {
        for (var _i = 0, email_1 = email; _i < email_1.length; _i++) {
            var char = email_1[_i];
            if (!Validator.isValidLetter(char) && !ALLOWED_SYMBOLS.includes(char)) {
                return false;
            }
        }
        return true;
    };
    return Validator;
}());
export { Validator };
var Result = /** @class */ (function () {
    function Result(isValid, message) {
        this.isValid = isValid;
        this.message = message;
    }
    return Result;
}());
