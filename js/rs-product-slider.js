/* ====================================
Инициализация слайдера в блоке rs-product-slider
==================================== */
function initProductSliderSliders() {
	// Перечень слайдеров
	if (document.querySelector('.rs-product-slider__slider')) {
		const sliderBlocks = document.querySelectorAll('.rs-product-slider');

		sliderBlocks.forEach(sliderBlock => {
			const sliders = sliderBlock.querySelectorAll('.rs-product-slider__slider');


			sliders.forEach(slider => {
				const arrowPrev = sliderBlock.querySelector('.rs-product-slider__button-prev');
				const arrowNext = sliderBlock.querySelector('.rs-product-slider__button-next');
				const pagination = sliderBlock.querySelector('.rs-product-slider__pagination');

				// Получаем значение data-slidesPerView
				const slidesPerView = slider.hasAttribute('data-slidesperview')
					? parseFloat(slider.getAttribute('data-slidesperview'))
					: null;

				// Определяем breakpoints
				const breakpoints = {
					320: {
						slidesPerView: 1.57,
						spaceBetween: 7,
					},
					539.98: slidesPerView ? {
						slidesPerView: 2.565,
						spaceBetween: 12,
					} : {
						slidesPerView: 2.5,
						spaceBetween: 25,
					},
					767.98: {
						slidesPerView: 3,
						spaceBetween: 12,
					},
					991.98: slidesPerView ? {
						slidesPerView: 3,
						spaceBetween: 24,
					} : {
						slidesPerView: 4,
						spaceBetween: 24,
					},
					1439.98: slidesPerView ? {
						slidesPerView: slidesPerView,
						spaceBetween: 25,
					} : {
						slidesPerView: 5,
						spaceBetween: 25,
					}
				};

				const swiperMain = new Swiper(slider, {
					// // Автопрокрутка
					// autoplay: {
					// 	// Пауза между прокруткой
					// 	delay: 10000,
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

					// Цикличность слайдера
					// loop: true,

					// Анимация переключения
					// effect: 'fade',

					// Курсор перетаскивания
					grabCursor: true,

					// Стрелки
					navigation: {
						prevEl: arrowPrev,
						nextEl: arrowNext,
					},

					// Пагинация
					pagination: {
						el: pagination,
						clickable: true,
					},

					breakpoints: breakpoints
				});
			});

		});
	}

	if (document.querySelector('.rs-product__img_slider')) {
		const sliderBlocks = document.querySelectorAll('.rs-product__img');

		sliderBlocks.forEach(sliderBlock => {
			const sliders = sliderBlock.querySelectorAll('.rs-product__img_slider');

			sliders.forEach(slider => {
				const arrowPrev = sliderBlock.querySelector('.rs-product__img_button-prev');
				const arrowNext = sliderBlock.querySelector('.rs-product__img_button-next');
				const pagination = sliderBlock.querySelector('.rs-product__img_pagination');

				const swiperMain = new Swiper(slider, {
					// // Автопрокрутка
					// autoplay: {
					// 	// Пауза между прокруткой
					// 	delay: 10000,
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

					// Цикличность слайдера
					// loop: true,

					// Анимация переключения
					// effect: 'fade',

					// Курсор перетаскивания
					grabCursor: true,

					// Стрелки
					navigation: {
						prevEl: arrowPrev,
						nextEl: arrowNext,
					},

					// Пагинация
					pagination: {
						el: pagination,
						clickable: true,
					},

					slidesPerView: 1,
					spaceBetween: 0,

					nested: true
				});
			});

		});
	}
}
window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initProductSliderSliders();
});