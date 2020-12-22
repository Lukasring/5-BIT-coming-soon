var DEFAULT_DEADLINE = {
    year: new Date().getFullYear(),
    month: 12,
    day: 31,
    hour: 24,
    minute: 0,
    second: 0,
};
var Clock = /** @class */ (function () {
    function Clock(selector, deadline) {
        if (deadline === void 0) { deadline = DEFAULT_DEADLINE; }
        this.selector = selector;
        this.deadline = deadline;
        this.dateString = this.generateDateString();
    }
    Clock.prototype.generateDateString = function () {
        var _a = this.deadline, year = _a.year, month = _a.month, day = _a.day, hour = _a.hour, minute = _a.minute, second = _a.second;
        return year + "-" + this.formatNumber(month) + "-" + this.formatNumber(day) + " " + this.formatNumber(hour) + ":" + this.formatNumber(minute) + ":" + this.formatNumber(second);
    };
    Clock.prototype.isValidDOMselector = function () {
        var DOM = document.querySelector(this.selector);
        if (!DOM) {
            console.log("Invalid clock DOM element selector!");
            return false;
        }
        this.DOM = DOM;
        return true;
    };
    Clock.prototype.checkYear = function () {
        if (new Date(this.dateString).getTime() < Date.now()) {
            this.resetYear();
        }
    };
    Clock.prototype.resetYear = function () {
        this.deadline.year++;
        this.dateString = this.generateDateString();
    };
    Clock.prototype.findClockElements = function () {
        var clockElements = this.DOM.querySelectorAll(".value");
        this.DOMdays = clockElements[0];
        this.DOMhours = clockElements[1];
        this.DOMminutes = clockElements[2];
        this.DOMseconds = clockElements[3];
    };
    Clock.prototype.formatNumber = function (num) {
        return num < 10 ? "0" + num : num.toString();
    };
    Clock.prototype.startCountdown = function () {
        var _this = this;
        setInterval(function () {
            _this.checkYear();
            var deadlineDateMs = new Date(_this.dateString).getTime();
            var secondsLeft = Math.floor((deadlineDateMs - Date.now()) / 1000);
            var daysLeft = Math.floor(secondsLeft / 60 / 60 / 24);
            secondsLeft -= daysLeft * 60 * 60 * 24;
            var hoursLeft = Math.floor(secondsLeft / 60 / 60);
            secondsLeft -= hoursLeft * 60 * 60;
            var minutesLeft = Math.floor(secondsLeft / 60);
            secondsLeft -= minutesLeft * 60;
            _this.setClockValues(daysLeft, hoursLeft, minutesLeft, secondsLeft);
        }, 1000);
    };
    Clock.prototype.setClockValues = function (days, hours, minutes, seconds) {
        this.DOMdays.textContent = this.formatNumber(days);
        this.DOMhours.textContent = this.formatNumber(hours);
        this.DOMminutes.textContent = this.formatNumber(minutes);
        this.DOMseconds.textContent = this.formatNumber(seconds);
    };
    Clock.prototype.init = function () {
        if (!this.isValidDOMselector()) {
            throw new Error("No valid selector!");
        }
        this.findClockElements();
        if (!this.DOMhours ||
            !this.DOMdays ||
            !this.DOMminutes ||
            !this.DOMseconds) {
            throw new Error("Cound not find all clock value elements! Days Hours Minutes Seconds are required!");
        }
        this.checkYear();
        this.startCountdown();
    };
    return Clock;
}());
export { Clock };
