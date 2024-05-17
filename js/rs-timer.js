
document.addEventListener('DOMContentLoaded', function () {
	const timers = document.querySelectorAll('.timer');

	timers.forEach(timer => {
		// получаем значение даты из атрибута
		const dateStr = timer.dataset.timer
		// парсируем строковое значение в объект даты
		const parseDate = dateStr => {
			const [date, time] = dateStr.split(' ');
			const [day, month, year] = date.split('.').map(Number);
			const [hours, minutes] = time.split(':').map(Number);
			return new Date(year, month - 1, day, hours, minutes);
		}
		// конечная дата
		const deadline = parseDate(dateStr);
		// id таймера
		let timerId = null;
		// склонение числительных
		function declensionNum(num, words) {
			return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
		}

		// вычисляем разницу дат и устанавливаем оставшееся время в качестве содержимого элементов
		function countdownTimer() {
			const diff = deadline - new Date();
			if (diff <= 0) {
				clearInterval(timerId);
			}
			const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
			const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
			const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
			const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
			$days.textContent = days < 10 ? '0' + days : days;
			$hours.textContent = hours < 10 ? '0' + hours : hours;
			$minutes.textContent = minutes < 10 ? '0' + minutes : minutes;
			$seconds.textContent = seconds < 10 ? '0' + seconds : seconds;
			$seconds.textContent = seconds < 10 ? '0' + seconds : seconds;

			$days.dataset.title = declensionNum(days, ['день', 'дня', 'дней']);
			$hours.dataset.title = declensionNum(hours, ['час', 'часа', 'часов']);
			$minutes.dataset.title = declensionNum(minutes, ['минута', 'минуты', 'минут']);
			$seconds.dataset.title = declensionNum(seconds, ['секунда', 'секунды', 'секунд']);

			// если осталось 0 дней, то блок скрывается
			if ($days.textContent === '0') {
				$days.style.display = 'none'
			}
			if ($hours.textContent === '0') {
				$hours.style.display = 'none'
			}
			if ($minutes.textContent === '0') {
				$minutes.style.display = 'none'
			}
		}
		// получаем элементы, содержащие компоненты даты
		const $days = timer.querySelector('.timer__days');
		const $hours = timer.querySelector('.timer__hours');
		const $minutes = timer.querySelector('.timer__minutes');
		const $seconds = document.querySelector('.timer__seconds');

		// вызываем функцию countdownTimer
		countdownTimer();
		// вызываем функцию countdownTimer каждую секунду
		timerId = setInterval(countdownTimer, 1000);
	});
});