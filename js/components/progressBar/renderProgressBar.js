function renderProgressBar(selector, data) {
	// generuojame turini
	let html = '';

	for (let i = 0; i < data.length; i++) {
		let bar = data[i];
		html += `<div class="progress-bar">
						<div class="top">
							<div class="label">${bar.title}</div>
							<div class="value">${bar.value}%</div >
						</div>
						<div class="bottom">
							<div class="progress" style="width: ${bar.value}%"></div>
						</div>
						</div> `;
	}

	//randame vieta, kur reikes padeti turini
	const DOM = document.querySelector(selector);

	DOM.innerHTML += html;
}

export { renderProgressBar }