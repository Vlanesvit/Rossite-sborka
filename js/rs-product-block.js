/* ====================================
Инициализация слайдера в блоке rs-product
==================================== */
function initProductBlockSliders() {
	if (document.querySelector('.rs-product-block')) {
		// Инициализация слайдера
		const sliders = document.querySelectorAll('.rs-product-block');

		sliders.forEach(slider => {
			const sliderMain = slider.querySelector('.rs-product-block__main_slider');
			const sliderThumbs = slider.querySelector('.rs-product-block__thumbs_slider');
			const arrowPrev = slider.querySelector('.rs-product-block__thumbs_button-prev');
			const arrowNext = slider.querySelector('.rs-product-block__thumbs_button-next');

			// Перечень слайдеров
			const sliderThumbsSwiper = new Swiper(sliderThumbs, {
				// // Предзагрузка изоражений
				preloadImages: false,

				// // Ленивая загрузка
				lazy: true,

				// // Автопрокрутка
				// autoplay: {
				// 	// Пауза между прокруткой
				// 	delay: 5000,
				// 	// Закончить на последнем слайде
				// 	stopOnLastSlide: false,
				// 	// Отключить после ручного переключения
				// 	disableOnInteraction: false,
				// },

				// Обновить свайпер
				// при изменении элементов слайдера
				observer: true,
				// при изменении родительских элементов слайдера
				observeParents: true,
				// при изменении дочерних элементов слайдера
				observeSlideChildren: true,

				// Скорость смены слайдов
				speed: 800,

				// Включение/отключение
				// перетаскивание на ПК
				simulateTouch: true,
				allowTouchMove: true,
				// Чувствительность свайпа
				touchRadio: 1,
				// Угол срабатывания свайпа/перетаскивания
				touchAngle: 45,
				touchStartPreventDefault: false,

				// Навигация
				navigation: {
					prevEl: arrowPrev,
					nextEl: arrowNext,
				},

				// Брейкпоинты(адаптив)
				// Ширина экрана
				breakpoints: {
					320: {
						slidesPerView: 3,
						spaceBetween: 20,
						direction: 'horizontal',
					},
					540: {
						slidesPerView: 4,
						spaceBetween: 12,
						direction: 'horizontal',
					},
					991.98: {
						slidesPerView: 7,
						spaceBetween: 10,
						direction: 'vertical',
					},
				},
			});

			const sliderMainSwiper = new Swiper(sliderMain, {
				// Слияние слайдеров
				thumbs: {
					swiper: sliderThumbsSwiper,
				},

				// Предзагрузка изоражений
				preloadImages: false,

				// Ленивая загрузка
				lazy: true,

				// Слежка за слайдером
				watchOverflow: true,

				// // Автопрокрутка
				// autoplay: {
				// 	// Пауза между прокруткой
				// 	delay: 5000,
				// 	// Закончить на последнем слайде
				// 	stopOnLastSlide: false,
				// 	// Отключить после ручного переключения
				// 	disableOnInteraction: false,
				// },

				// // Управлениt колесом мыши
				// mousewheel: {
				// 	// Чувствительность колеса мыши
				// 	sensitivity: 1,
				// },

				// Кол-во показываемых слайдов
				slidesPerView: 1,

				// Обновить свайпер
				// при изменении элементов слайдера
				observer: true,
				// при изменении родительских элементов слайдера
				observeParents: true,
				// при изменении дочерних элементов слайдера
				observeSlideChildren: true,

				// Скорость смены слайдов
				speed: 800,

				// Включение/отключение
				// перетаскивание на ПК
				simulateTouch: true,
				allowTouchMove: true,
				// Чувствительность свайпа
				touchRadio: 1,
				// Угол срабатывания свайпа/перетаскивания
				touchAngle: 45,
				touchStartPreventDefault: false,
			});
		});
	}

}
initProductBlockSliders();
