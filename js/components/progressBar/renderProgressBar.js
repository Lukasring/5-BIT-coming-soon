import { isValidInput } from './isValidInput.js';
import { isValidProgressBar } from './isValidProgressBar.js';

function renderProgressBar(selector, data) {
	//input validation
	if (!isValidInput(selector, data)) {
		return false;
	}
	
	//randame vieta, kur reikes padeti turini
	const DOM = document.querySelector(selector);
	if (!DOM) {
		console.log('nerasta vieta, kur reikia iterpti koda');
		return false;
	}
	
	// generuojame turini
	let html = '';

	for (let i = 0; i < data.length; i++) {
		const bar = data[i];
		if (!isValidProgressBar(bar)) {
			continue;
		}

		html += `<div class="progress-bar">
					<div class="top">
						<div class="label">${bar.title}</div>
						<div class="value">${bar.value}%</div>
					</div>
					<div class="bottom">
						<div class="progress" style="width: ${bar.value}%"></div>
					</div>
				</div> `;
	}

	// post logic validation
	if (html === '') {
		console.log('nerasta tinkamu duomenu');
		return false;
	}

	DOM.innerHTML += html;
	return true;
}

export { renderProgressBar }