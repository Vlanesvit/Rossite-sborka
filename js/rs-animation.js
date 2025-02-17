document.addEventListener('DOMContentLoaded', function () {
	// Запуск анимаций по конфигурации
	animationConfig.forEach(config => {
		revealOnScroll({
			elements: config.elements,
			duration: config.duration || 0.5,
			delay: config.delay || 0.2,
			direction: config.direction || 'bottom-up',
		});
	});
});

const animationConfig = [
	{ elements: 'section .section-header' },
	{ elements: '.rs-slider__slider', direction: 'fade' },
	{ elements: '.rs-catalog__item', direction: 'bottom-up--every' },
	{ elements: '.rs-text-block__item', direction: 'bottom-up--every' },
	{ elements: '.rs-features__item', direction: 'bottom-up--every' },
	{ elements: '.rs-news__item', direction: 'bottom-up--every' },
	{ elements: '.rs-reviews__item', direction: 'bottom-up--every' },
	{ elements: '.form__row > *', direction: 'bottom-up--every' },
	{ elements: '.form__agreement', duration: 0.3, delay: 0.5, direction: 'bottom-up--every' },
	{ elements: '.rs-footer__spollers_item', direction: 'bottom-up--every' },
	{ elements: '.rs-features-row__item', direction: 'bottom-up--every' },
	{ elements: '.rs-features-img__wrapper > *', direction: 'fade--every' },
	{ elements: '.rs-parallax', direction: 'fade' },
	{ elements: '.rs-steps__item', direction: 'bottom-up--every' },
	{ elements: '.rs-gallery__item', direction: 'bottom-up--every' },
	{ elements: '.rs-slider-block__item', direction: 'bottom-up--every' },
	{ elements: '.rs-partners__slide', direction: 'bottom-up--every' },
	{ elements: '.rs-timer', direction: 'fade' },
	{ elements: '.rs-tabs', direction: 'fade' },
	{ elements: '.rs-quote', direction: 'fade' },
	{ elements: '.rs-feedback', direction: 'fade' },
	{ elements: '.rs-subscribe', direction: 'fade' },
	{ elements: '.rs-tariff', direction: 'fade' },
	{ elements: '.rs-contacts', direction: 'fade' },
	{ elements: '.rs-accordion', direction: 'fade' },
	{ elements: '.rs-documents', direction: 'fade' },
	{ elements: '.rs-table', direction: 'fade' }
];

// Функция для плавного появления элементов на странице
function revealOnScroll({ elements, duration, delay, direction }) {
	const items = document.querySelectorAll(elements);

	// Определяем свойства для каждой анимации
	const animationPropsMap = {
		'bottom-up': { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
		'up-bottom': { from: { opacity: 0, transform: 'translateY(-20px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
		'left-right': { from: { opacity: 0, transform: 'translateX(-20px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
		'right-left': { from: { opacity: 0, transform: 'translateX(20px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
		'fade': { from: { opacity: 0 }, to: { opacity: 1 } },
		'scale': { from: { transform: 'scale(0)', opacity: 0 }, to: { transform: 'scale(1)', opacity: 1 } },
	};

	// Настройки Intersection Observer
	const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };

	items.forEach(item => {
		// Сохраняем начальные стили элемента
		item.setAttribute('data-original-style', item.getAttribute('style') || '');
		// Применяем начальные стили для анимации
		const { from } = animationPropsMap[direction.replace('--every', '')] || { from: {} };
		Object.assign(item.style, from);
		// Добавляем плавность изменения стилей
		item.style.transition = `all ${duration}s ease`;
		// Устанавливаем атрибут, чтобы отслеживать, выполнена ли анимация
		item.setAttribute('data-animation', 'false');
	});

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry, index) => {
			if (entry.isIntersecting && entry.target.getAttribute('data-animation') === 'false') {
				// Отмечаем, что анимация для этого элемента началась
				entry.target.setAttribute('data-animation', 'true');

				const animationProps = animationPropsMap[direction.replace('--every', '')];
				if (animationProps) {
					// Рассчитываем окончательную задержку для текущего элемента
					const animationDelay = delay + (direction.includes('--every') ? delay * index : 0);

					setTimeout(() => {
						// Применяем конечные стили
						Object.assign(entry.target.style, animationProps.to);

						// Восстанавливаем начальные стили после завершения анимации
						setTimeout(() => {
							entry.target.setAttribute('style', entry.target.getAttribute('data-original-style'));
						}, duration * 1000);
					}, animationDelay * 1000);
				}

				// Перестаём наблюдать за элементом после начала анимации
				observer.unobserve(entry.target);
			}
		});
	}, observerOptions);

	// Начинаем отслеживать каждый элемент
	items.forEach(item => observer.observe(item));
}