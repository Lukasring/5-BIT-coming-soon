class Clock {
	constructor(selector) {
		this.selector = selector; 
		this.deadline = {
			year: (new Date()).getFullYear(),
			month: 11,
			day: 16,
			hour: 10,
			minutes: 0,
			seconds: 0
		}
		this.dateString = this.createDateString();
		this.DOM = null;
		this.DOMdays = null;
		this.DOMhours = null;
		this.DOMminutes = null;
		this.DOMseconds = null;
	}

	init() {
		if (this.isValidSelector()) {
			this.findClockValueElements();
			if (!this.isAnniversary()) {
				this.renewInfo();
			}
			this.start();
		}
	}

	createDateString() {
		const {year, month, day, hour, minutes, seconds} = this.deadline;
		return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;	
	}

	isAnniversary() {
		const anniversaryMs = (new Date(this.dateString)).getTime();
		return Date.now() < anniversaryMs;
	}

	renewInfo() {
		this.deadline.year++;
		this.dateString = this.createDateString();
	}

	isValidSelector() {
		const DOM = document.querySelector(this.selector);
		if (!DOM) {
			console.log('ERROR: false selector')
			return false;
		}
		this.DOM = DOM;
		return true;
	}

	findClockValueElements() {
		const values = this.DOM.querySelectorAll('.value');
		this.DOMdays = values[0];
		this.DOMhours = values[1];
		this.DOMminutes = values[2];
		this.DOMseconds = values[3];		
	}

	start() {
		let anniversaryMs = (new Date(this.dateString)).getTime();
		setInterval(() => {
			const now = Date.now();
			let diff = anniversaryMs - now;
			if (diff < 0) {
				this.renewInfo();
				anniversaryMs = (new Date(this.dateString)).getTime();
				diff = anniversaryMs - now;

			}

			let secondsLeft = Math.floor(diff / 1000);
			const days = Math.floor(secondsLeft / 60 / 60 / 24);

			secondsLeft -= days * 60 * 60 * 24;
			const hours = Math.floor(secondsLeft / 60 / 60);

			secondsLeft -= hours * 60 * 60;
			const minutes = Math.floor(secondsLeft / 60);

			const seconds = secondsLeft - minutes * 60;

			this.DOMdays.innerText = days;
			this.DOMhours.innerText = this.formatNumber(hours);
			this.DOMminutes.innerText = this.formatNumber(minutes);
			this.DOMseconds.innerText = this.formatNumber(seconds);

		}, 1000);
	}

	formatNumber(number) {
		return number < 10 ? '0' + number : number;
	}
}

export { Clock }