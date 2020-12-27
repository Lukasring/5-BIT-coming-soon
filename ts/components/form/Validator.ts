export type ValidationResult = {
  isValid: boolean;
  message: string;
};

// const ABC = ['a', 'ą', 'b', 'c', 'č', ]
// const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const ALLOWED_SYMBOLS = [".", "_", "-", "@"];

// * regex for letters:  ^[a-z\u00C0-\u00ff\s]+$/

function emailIsInvalid(email: string) {
  const splitEmail = email.split("@");
  return (
    email.includes(" ") ||
    splitEmail.length !== 2 ||
    splitEmail[0].length < 1 ||
    splitEmail[1].length < 3 ||
    splitEmail[1].split(".").length < 2 ||
    splitEmail[0]
      .split(".")
      .map((part) => part.trim().length > 0)
      .includes(false) ||
    splitEmail[1]
      .split(".")
      .map((part) => part.trim().length > 0)
      .includes(false) ||
    Validator.hasTwoSymbolsInARow(email, ALLOWED_SYMBOLS) ||
    !Validator.onlyAllowedCharactersInEmail(email)
  );
}

export class Validator {
  static isValidName(name: string) {
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
  }

  // static isValidEmail(email:string) {
  //   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  // }

  static isValidEmail(email: string) {
    if (Validator.isEmptyString(email)) {
      return new Result(false, "E-mail can't be empty!");
    }
    if (emailIsInvalid(email)) {
      return new Result(false, "E-Mail is invalid!");
    }

    return new Result(true, "Sucess");
  }

  static isValidMessage(message: string) {
    if (Validator.isEmptyString(message)) {
      return new Result(false, "Message can't be empty!");
    }
    if (message.trim().length > 1000) {
      return new Result(false, "Message can't be longer than 1000 characters!");
    }
    return new Result(true, "Sucess");
  }

  static isEmptyString(text: string) {
    return text.trim().length === 0;
  }

  static areValidCharacters(string: string) {
    for (let char of string) {
      if (!Validator.isValidLetter(char)) {
        return false;
      }
    }
    return true;
  }

  static isValidLetter(char: string) {
    const acsiiValue = char.charCodeAt(0);
    return (
      Validator.isCapitalLetter(acsiiValue) ||
      Validator.isLowerCaseLetter(acsiiValue)
    );
  }

  /**
   * @param char characters ascii value;
   */
  static isCapitalLetter(char: number) {
    return char > 64 && char < 91;
  }

  /**
   * @param char characters ascii value;
   */
  static isLowerCaseLetter(char: number) {
    return char > 96 && char < 123;
  }

  static hasTwoSymbolsInARow(string: string, allowedSymbols: string[]) {
    for (let i = 1; i < string.length; i++) {
      if (
        allowedSymbols.includes(string[i - 1]) &&
        allowedSymbols.includes(string[i])
      ) {
        return true;
      }
    }
    return false;
  }

  static onlyAllowedCharactersInEmail(email: string) {
    for (let char of email) {
      if (!Validator.isValidLetter(char) && !ALLOWED_SYMBOLS.includes(char)) {
        return false;
      }
    }
    return true;
  }
}

class Result {
  isValid: boolean;
  message: string;

  constructor(isValid: boolean, message: string) {
    this.isValid = isValid;
    this.message = message;
  }
}
