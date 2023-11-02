/* ====================================
Инициализация слайдера в блоке rs-slider
==================================== */
function initMainSliders() {
	// Перечень слайдеров
	if (document.querySelector('.rs-slider__slider')) {
		const swiperMain = new Swiper('.rs-slider__slider', {
			// // Автопрокрутка
			// autoplay: {
			// 	// Пауза между прокруткой
			// 	delay: 10000,
			// 	// Закончить на последнем слайде
			// 	stopOnLastSlide: false,
			// 	// Отключить после ручного переключения
			// 	disableOnInteraction: false,
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

			// Цикличность слайдера
			loop: true,

			// Анимация переключения
			effect: 'fade',

			// Пагинация
			pagination: {
				el: '.rs-slider__pagination',
				clickable: true,
			},

			// // Стрелки
			// navigation: {
			// 	nextEl: '.rs-slider__button-next',
			// 	prevEl: '.rs-slider__button-prev',
			// },
		});
	}

}
window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initMainSliders();
});