type Deadline = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
};

const DEFAULT_DEADLINE: Deadline = {
  year: new Date().getFullYear(),
  month: 12,
  day: 31,
  hour: 24,
  minute: 0,
  second: 0,
};

export class Clock {
  selector: string;
  deadline: Deadline;
  dateString: string;
  DOM: Element;
  DOMdays: Element;
  DOMhours: Element;
  DOMminutes: Element;
  DOMseconds: Element;

  constructor(selector: string, deadline: Deadline = DEFAULT_DEADLINE) {
    this.selector = selector;
    this.deadline = deadline;
    this.dateString = this.generateDateString();
  }

  generateDateString() {
    const { year, month, day, hour, minute, second } = this.deadline;
    return `${year}-${this.formatNumber(month)}-${this.formatNumber(
      day
    )} ${this.formatNumber(hour)}:${this.formatNumber(
      minute
    )}:${this.formatNumber(second)}`;
  }

  isValidDOMselector() {
    const DOM = document.querySelector(this.selector);
    if (!DOM) {
      console.log("Invalid clock DOM element selector!");
      return false;
    }
    this.DOM = DOM;
    return true;
  }

  checkYear() {
    if (new Date(this.dateString).getTime() < Date.now()) {
      this.resetYear();
    }
  }

  resetYear() {
    this.deadline.year++;
    this.dateString = this.generateDateString();
  }

  findClockElements() {
    const clockElements = this.DOM.querySelectorAll(".value");
    this.DOMdays = clockElements[0];
    this.DOMhours = clockElements[1];
    this.DOMminutes = clockElements[2];
    this.DOMseconds = clockElements[3];
  }

  formatNumber(num: number) {
    return num < 10 ? `0${num}` : num.toString();
  }

  private startCountdown() {
    setInterval(() => {
      this.checkYear();
      const deadlineDateMs = new Date(this.dateString).getTime();
      let secondsLeft = Math.floor((deadlineDateMs - Date.now()) / 1000);
      const daysLeft = Math.floor(secondsLeft / 60 / 60 / 24);
      secondsLeft -= daysLeft * 60 * 60 * 24;
      const hoursLeft = Math.floor(secondsLeft / 60 / 60);
      secondsLeft -= hoursLeft * 60 * 60;
      const minutesLeft = Math.floor(secondsLeft / 60);
      secondsLeft -= minutesLeft * 60;
      this.setClockValues(daysLeft, hoursLeft, minutesLeft, secondsLeft);
    }, 1000);
  }

  private setClockValues(
    days: number,
    hours: number,
    minutes: number,
    seconds: number
  ) {
    this.DOMdays.textContent = this.formatNumber(days);
    this.DOMhours.textContent = this.formatNumber(hours);
    this.DOMminutes.textContent = this.formatNumber(minutes);
    this.DOMseconds.textContent = this.formatNumber(seconds);
  }

  init() {
    if (!this.isValidDOMselector()) {
      throw new Error("No valid selector!");
    }
    this.findClockElements();
    if (
      !this.DOMhours ||
      !this.DOMdays ||
      !this.DOMminutes ||
      !this.DOMseconds
    ) {
      throw new Error(
        "Cound not find all clock value elements! Days Hours Minutes Seconds are required!"
      );
    }
    this.checkYear();
    this.startCountdown();
  }
}
