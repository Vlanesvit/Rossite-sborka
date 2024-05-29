import { CountUp } from '../lib/countUp/countUp.min.js';
window.onload = function () {
	let digitsCounters = document.querySelectorAll("[data-digits-counter]")
	if (digitsCounters.length > 0) {
		const options = {
			// Скорость
			duration: 2,
			// Пробел для тысячных
			separator: ' ',
			// Прокрутка во вьюпорте
			enableScrollSpy: true
		};

		if (digitsCounters.length) {
			digitsCounters.forEach(digitsCounter => {
				let demo = new CountUp(digitsCounter, digitsCounter.dataset.digitsCounter, options);
				if (!demo.error) {
					demo.start();
				} else {
					console.error(demo.error);
				}
			});
		}
	}
}