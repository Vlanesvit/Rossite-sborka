/* ====================================
Инициализация слайдера в блоке rs-slider-block
==================================== */
function initSliderBlockSliders() {
	// Перечень слайдеров
	if (document.querySelector('.rs-slider-block__slider')) {
		const sliderBlocks = document.querySelectorAll('.rs-slider-block');

		sliderBlocks.forEach(sliderBlock => {
			const sliders = sliderBlock.querySelectorAll('.rs-slider-block__slider');

			sliders.forEach(slider => {
				const arrowPrev = slider.querySelector('.rs-slider-block__button-prev');
				const arrowNext = slider.querySelector('.rs-slider-block__button-next');
				const pagination = slider.querySelector('.rs-slider-block__pagination');

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

					slidesPerView: 4,
					spaceBetween: 30,

					// Брекпоинты (адаптив)
					breakpoints: {
						320: {
							slidesPerView: 1.22,
							spaceBetween: 24,
						},
						767.98: {
							slidesPerView: 2.4,
							spaceBetween: 24,
						},
						991.98: {
							slidesPerView: 3,
							spaceBetween: 24,
						},
						1439.98: {
							slidesPerView: 4,
							spaceBetween: 30,
						}
					},

					// on: {
					// 	init: function () {
					// 		addAnimText(); // Запускаем расчет высоты после инициализации слайдера
					// 	},
					// 	resize: function () {
					// 		addAnimText(); // Пересчитываем высоту при изменении размера окна
					// 	}
					// }
				});
			});

		});
	}
}
window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliderBlockSliders();
});