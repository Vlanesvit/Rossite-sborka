/* ====================================
Инициализация слайдера в блоке rs-reviews
==================================== */
function initReviewsSliders() {
	// Перечень слайдеров
	if (document.querySelector('.rs-reviews__slider')) {
		const sliderBlocks = document.querySelectorAll('.rs-reviews');

		sliderBlocks.forEach(sliderBlock => {
			const sliders = sliderBlock.querySelectorAll('.rs-reviews__slider');

			sliders.forEach(slider => {
				const arrowPrev = sliderBlock.querySelector('.rs-reviews__button-prev');
				const arrowNext = sliderBlock.querySelector('.rs-reviews__button-next');
				const pagination = sliderBlock.querySelector('.rs-reviews__pagination');

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



					// Брекпоинты (адаптив)
					breakpoints: {
						320: {
							slidesPerView: 1.207,
							spaceBetween: 24,
						},
						767.98: {
							slidesPerView: 1.331,
							spaceBetween: 24,
						},
						991.98: {
							slidesPerView: 2,
							spaceBetween: 30,
						},
					},
				});
			});

		});
	}
}
window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initReviewsSliders();
});