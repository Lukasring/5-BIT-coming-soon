// const ABC = ['a', 'ą', 'b', 'c', 'č', ]
var NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var ALLOWED_SYMBOLS = [".", "_", "-", "@"];
// * regex for letters:  ^[a-z\u00C0-\u00ff\s]+$/
var Validator = /** @class */ (function () {
    function Validator() {
    }
    Validator.isValidName = function (name) {
        if (this.isEmptyString(name)) {
            return new Result(false, "Name can't be empty!");
        }
        if (!this.areValidCharacters(name)) {
            return new Result(false, "Name must consist of valid characters a-z");
        }
        if (!this.isCapitalLetter(name.charCodeAt(0))) {
            return new Result(false, "Name must start with a capital letter!");
        }
        return new Result(true, "Sucess");
    };
    // static isValidEmail(email:string) {
    //   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    // }
    Validator.isValidEmail = function (email) {
        if (this.isEmptyString(email)) {
            return new Result(false, "E-mail can't be empty!");
        }
        var splitEmail = email.split("@");
        if (splitEmail.length !== 2) {
            return new Result(false, "E-mail is invalid!");
        }
        if (splitEmail[0].length < 1) {
            return new Result(false, "E-mail is invalid!");
        }
        if (splitEmail[1].length < 3) {
            return new Result(false, "E-mail is invalid!");
        }
        if (splitEmail[1].split(".").length < 2) {
            return new Result(false, "E-mail is invalid!");
        }
        if (this.hasTwoSymbolsInARow(email, ALLOWED_SYMBOLS)) {
            return new Result(false, "E-mail is invalid!");
        }
        if (!this.onlyAllowedCharactersInEmail(email)) {
            return new Result(false, "E-mail is invalid!");
        }
        return new Result(true, "Sucess");
    };
    Validator.isValidMessage = function (message) {
        if (this.isEmptyString(message)) {
            return new Result(false, "Message can't be empty!");
        }
        if (message.trim().length > 1000) {
            return new Result(false, "Message can't be longer than 1000 characters!");
        }
        return new Result(true, "Sucess");
    };
    Validator.isEmptyString = function (text) {
        if (text.trim().length > 0) {
            return false;
        }
        return true;
    };
    Validator.areValidCharacters = function (string) {
        for (var _i = 0, string_1 = string; _i < string_1.length; _i++) {
            var char = string_1[_i];
            if (!this.isValidCharacter(char)) {
                return false;
            }
        }
        return true;
    };
    Validator.isValidCharacter = function (char) {
        var acsiiValue = char.charCodeAt(0);
        if (this.isCapitalLetter(acsiiValue) ||
            this.isLowerCaseLetter(acsiiValue)) {
            return true;
        }
        return false;
    };
    /**
     * @param char characters ascii value;
     */
    Validator.isCapitalLetter = function (char) {
        if (char > 64 && char < 91) {
            return true;
        }
        return false;
    };
    /**
     * @param char characters ascii value;
     */
    Validator.isLowerCaseLetter = function (char) {
        if (char > 96 && char < 123) {
            return true;
        }
        return false;
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
            if (!this.isValidCharacter(char) && !ALLOWED_SYMBOLS.includes(char)) {
                return false;
            }
        }
        return true;
    };
    return Validator;
}());
export { Validator };
var Result = /** @class */ (function () {
    function Result(isValid, message, error) {
        this.isValid = isValid;
        this.message = message;
        this.error = error;
    }
    return Result;
}());
