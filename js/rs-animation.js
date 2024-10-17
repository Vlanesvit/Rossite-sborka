/*
Документация: 
https://gsap.com/
https://gsap.com/docs/v3/Plugins/ScrollTrigger/
https://gsap.com/docs/v3/Plugins/ScrollToPlugin
*/

gsap.registerPlugin(
	ScrollTrigger,
);
// console.clear();

// Обработка изменений на странице динамически
const handleResize = () => {
	requestAnimationFrame(() => {
		ScrollTrigger.refresh();
	});
};

const handleReveal = () => {
	initAnimationsBasedOnWidth();
	if (typeof refreshScrollTrigger === 'function') {
		refreshScrollTrigger();
	}
};

let currentWidthAnimation = null;

// ScrollTrigger.addEventListener('refresh', () => console.log('refresh'))

//========================================================================================================================================================
// Анимация появления контента при скролле
function revealOnScroll({ elements, duration = 0.5, delay = 0.1, direction = 'bottom-up' }) {
	const items = gsap.utils.toArray(elements);

	// Функция для определения начальных значений и конечной анимации в зависимости от направления
	const getAnimationProps = (direction, index) => {
		const baseProps = {
			autoAlpha: 0,
			duration,
			delay: direction.includes('--every') ? delay * (index + 1) : delay,
		};

		switch (direction.replace('--every', '')) {
			case 'bottom-up':
				return { ...baseProps, from: { autoAlpha: 0, y: 50 }, to: { autoAlpha: 1, y: 0 } };
			case 'up-bottom':
				return { ...baseProps, from: { autoAlpha: 0, y: -50 }, to: { autoAlpha: 1, y: 0 } };
			case 'left-right':
				return { ...baseProps, from: { autoAlpha: 0, x: -50 }, to: { autoAlpha: 1, x: 0 } };
			case 'right-left':
				return { ...baseProps, from: { autoAlpha: 0, x: 50 }, to: { autoAlpha: 1, x: 0 } };
			case 'fade':
				return { ...baseProps, from: { autoAlpha: 0 }, to: { autoAlpha: 1 } };
			case 'scale':
				return { ...baseProps, from: { scale: 0, autoAlpha: 0 }, to: { scale: 1, autoAlpha: 1 } };
			case 'width-100':
				return { from: { width: '0%' }, to: { width: '100%', ease: 'cubic-bezier(0.4, 0, 0.2, 1)' } };
			default:
				return {};
		}
	};

	items.forEach((item, index) => {
		// Проверяем, есть ли у элемента класс 'animated', чтобы избежать повторной анимации
		if (!item.classList.contains('animated')) {
			const { from, to, duration, delay } = getAnimationProps(direction, index);

			// Создание анимации
			const anim = gsap.fromTo(item, from, { ...to, duration, delay });

			ScrollTrigger.create({
				trigger: item,
				animation: anim,
				once: true, // Анимация выполняется только один раз
				onEnter: () => item.classList.add('animated') // Добавляем класс 'animated' при анимации
			});
		}
	});
}

//========================================================================================================================================================
// Дебаунсинг функции
function debounce(func, wait) {
	let timeout;
	return function () {
		const context = this, args = arguments;
		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(context, args), wait);
	};
}

// Дебаунсинг события ресайза
const debouncedInitAnimations = debounce(initAnimationsBasedOnWidth, 100);

// Функция для удаления анимаций
function clearAnimations() {
	// Удаление всех активных ScrollTrigger
	ScrollTrigger.getAll().forEach(trigger => {
		trigger.kill();
	});

	// Удаление всех pin-spacer, созданных ScrollTrigger
	document.querySelectorAll('.pin-spacer, .gsap-pin-spacer').forEach(spacer => {
		spacer.replaceWith(...spacer.childNodes);

	});

	// console.log("Все анимации и pin-spacer удалены");
}

// Инициализация анимаций для разных разрешений
function initAnimationsBasedOnWidth() {
	const width = window.innerWidth;
	// Сохраняем текущую позицию скролла
	const scrollPos = window.scrollY || window.pageYOffse;

	clearAnimations();

	// Восстанавливаем позицию скролла после обновления
	window.scrollTo(0, scrollPos);

	if (width >= 991.98) {
		// Если переключаемся с мобильной версии, очищаем мобильные анимации
		if (currentWidthAnimation === 'mobile') {
			clearAnimations();
		}
		initializeDesktopAnimations();
		currentWidthAnimation = 'desktop';
	} else {
		// Если переключаемся с десктопной версии, очищаем десктопные анимации
		if (currentWidthAnimation === 'desktop') {
			clearAnimations();
		}
		initializeMobileAnimations();
		currentWidthAnimation = 'mobile';
	}

	// Инициализация общих анимаций
	initializeCommonAnimations();

	// Обновляем точки старта/окончания для всех ScrollTrigger
	ScrollTrigger.refresh();
}

//========================================================================================================================================================

// Обработка изменения размера окна с дебаунсом
window.addEventListener('resize', debouncedInitAnimations);

// Обработка смены ориентации экрана
window.addEventListener('orientationchange', () => {
	setTimeout(() => {
		initAnimationsBasedOnWidth();
	}, 500);
});

// Обработка при загрузке страницы
window.addEventListener('load', () => {
	initAnimationsBasedOnWidth();
	handleResize();
	setTimeout(() => {
		window.scrollTo(0, 0);
	}, 300);
});

//========================================================================================================================================================
// Общие анимации
function initializeCommonAnimations() {
	// console.log("Инициализация общих анимаций");

	/* REVEAL ANIMATION */
	revealOnScroll({ elements: 'section .section-header', });
	revealOnScroll({ elements: '.rs-slider__slider', direction: 'fade' });
	revealOnScroll({ elements: '.rs-catalog__item', direction: 'bottom-up--every' });
	revealOnScroll({ elements: '.rs-text-block__item', direction: 'bottom-up--every' });
	revealOnScroll({ elements: '.rs-features__item', direction: 'bottom-up--every' });
	revealOnScroll({ elements: '.rs-news__item', direction: 'bottom-up--every' });
	revealOnScroll({ elements: '.rs-reviews__item', direction: 'bottom-up--every' });
	revealOnScroll({ elements: '.form__row > *', direction: 'bottom-up--every' });
	revealOnScroll({ elements: '.form__agreement', duration: 0.3, delay: 0.5, direction: 'bottom-up--every' });
	revealOnScroll({ elements: '.rs-footer__spollers_item', direction: 'bottom-up--every' });
	revealOnScroll({ elements: '.rs-features-row__item', direction: 'bottom-up--every' });
	revealOnScroll({ elements: '.rs-features-img__wrapper > *', direction: 'fade--every' });
	revealOnScroll({ elements: '.rs-parallax', direction: 'fade' });
	revealOnScroll({ elements: '.rs-steps__item', direction: 'bottom-up--every' });
	revealOnScroll({ elements: '.rs-gallery__item', direction: 'bottom-up--every' });
	revealOnScroll({ elements: '.rs-slider-block__item', direction: 'bottom-up--every' });
	revealOnScroll({ elements: '.rs-partners__slide', direction: 'bottom-up--every' });
	revealOnScroll({ elements: '.rs-timer', direction: 'fade' });
	revealOnScroll({ elements: '.rs-tabs', direction: 'fade' });
	revealOnScroll({ elements: '.rs-quote', direction: 'fade' });
	revealOnScroll({ elements: '.rs-feedback', direction: 'fade' });
	revealOnScroll({ elements: '.rs-subscribe', direction: 'fade' });
	revealOnScroll({ elements: '.rs-tariff', direction: 'fade' });
	revealOnScroll({ elements: '.rs-contacts', direction: 'fade' });
	revealOnScroll({ elements: '.rs-accordion', direction: 'fade' });
	revealOnScroll({ elements: '.rs-documents', direction: 'fade' });
	revealOnScroll({ elements: '.rs-table', direction: 'fade' });
}

// Десктопные анимаций
function initializeDesktopAnimations() {
	// console.log("Инициализация десктопных анимаций");
}

// Мобильные анимаций
function initializeMobileAnimations() {
	// console.log("Инициализация мобильных анимаций");
}