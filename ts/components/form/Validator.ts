export type ValidationResult = {
  isValid: boolean;
  message: string;
};

// const ABC = ['a', 'ą', 'b', 'c', 'č', ]
const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const ALLOWED_SYMBOLS = [".", "_", "-", "@"];

// * regex for letters:  ^[a-z\u00C0-\u00ff\s]+$/

export class Validator {
  static isValidName(name: string) {
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
  }

  // static isValidEmail(email:string) {
  //   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  // }

  static isValidEmail(email: string) {
    if (this.isEmptyString(email)) {
      return new Result(false, "E-mail can't be empty!");
    }
    const splitEmail = email.split("@");
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
  }

  static isValidMessage(message: string) {
    if (this.isEmptyString(message)) {
      return new Result(false, "Message can't be empty!");
    }
    if (message.trim().length > 1000) {
      return new Result(false, "Message can't be longer than 1000 characters!");
    }
    return new Result(true, "Sucess");
  }

  static isEmptyString(text: string) {
    if (text.trim().length > 0) {
      return false;
    }
    return true;
  }

  static areValidCharacters(string: string) {
    for (let char of string) {
      if (!this.isValidCharacter(char)) {
        return false;
      }
    }
    return true;
  }

  static isValidCharacter(char: string) {
    const acsiiValue = char.charCodeAt(0);
    if (
      this.isCapitalLetter(acsiiValue) ||
      this.isLowerCaseLetter(acsiiValue)
    ) {
      return true;
    }
    return false;
  }

  /**
   * @param char characters ascii value;
   */
  static isCapitalLetter(char: number) {
    if (char > 64 && char < 91) {
      return true;
    }
    return false;
  }

  /**
   * @param char characters ascii value;
   */
  static isLowerCaseLetter(char: number) {
    if (char > 96 && char < 123) {
      return true;
    }
    return false;
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
      if (!this.isValidCharacter(char) && !ALLOWED_SYMBOLS.includes(char)) {
        return false;
      }
    }
    return true;
  }
}

class Result {
  isValid: boolean;
  message: string;
  error?: Error | null;

  constructor(isValid, message, error?) {
    this.isValid = isValid;
    this.message = message;
    this.error = error;
  }
}
