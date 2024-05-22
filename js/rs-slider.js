/* ====================================
Инициализация слайдера в блоке rs-slider
==================================== */
function initMainSliders() {
	// Перечень слайдеров
	if (document.querySelector('.rs-slider__slider')) {
		const sliderBlocks = document.querySelectorAll('.rs-slider');

		sliderBlocks.forEach(sliderBlock => {
			const sliders = sliderBlock.querySelectorAll('.rs-slider__slider');

			sliders.forEach(slider => {
				const arrowPrev = sliderBlock.querySelector('.rs-slider__button-prev');
				const arrowNext = sliderBlock.querySelector('.rs-slider__button-next');
				const pagination = sliderBlock.querySelector('.rs-slider__pagination');

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
				});

				// Нужно повесить класс rs-slider__dark-theme на слайд, чтобы поменять цвета на темные (если фон картинка светлая)
				swiperMain.on('slideChangeTransitionStart', function () {
					const activeSlide = slider.querySelector('.swiper-slide-active');
					if (activeSlide.classList.contains('rs-slider__dark-theme')) {
						document.documentElement.classList.add("_dark-theme");
					} else {
						document.documentElement.classList.remove("_dark-theme");
					}
				});
			});

		});
	}
}
window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initMainSliders();
});