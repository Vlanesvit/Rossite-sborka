/* ====================================
Инициализация слайдера в блоке rs-catalog
==================================== */
function initCatalogSliders() {
	// Перечень слайдеров
	if (document.querySelector('.rs-catalog__slider')) {
		// До этой ширины слайдер будет неактивным
		const breakpoint = window.matchMedia('(min-width: 991.98px)');

		let sliderSwiper;

		const breakpointChecker = function () {
			if (breakpoint.matches === true) {
				// Выключаем слайдер
				if (sliderSwiper !== undefined) sliderSwiper.destroy(true, true);
				return;
			} else if (breakpoint.matches === false) {
				// Включаем слайдер
				return enableSwiper();
			}
		};

		// Инициализация слайдера
		const enableSwiper = function () {
			const sliderBlocks = document.querySelectorAll('.rs-catalog');

			sliderBlocks.forEach(sliderBlock => {
				const sliders = sliderBlock.querySelectorAll('.rs-catalog__slider');

				sliders.forEach(slider => {
					const arrowPrev = sliderBlock.querySelector('.rs-catalog__button-prev');
					const arrowNext = sliderBlock.querySelector('.rs-catalog__button-next');
					const pagination = sliderBlock.querySelector('.rs-catalog__pagination');

					sliderSwiper = new Swiper(slider, {
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
						speed: 500,

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
								slidesPerView: 1.22,
								spaceBetween: 24,
							},
							767.98: {
								slidesPerView: 2.4,
								spaceBetween: 24,
							},
						},
					});
				});

			});
		}

		breakpoint.addListener(breakpointChecker);
		breakpointChecker();
	}
}
window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initCatalogSliders();
});

/* ====================================
Инициализация range-input в сайдбаре
==================================== */
function rangePrice() {
	const rangePriceSlider = document.querySelector('#range-price-slider');

	if (rangePriceSlider) {
		noUiSlider.create(rangePriceSlider, {
			start: [1000, 100000],
			step: 1000,
			behaviour: 'drag-tap',
			connect: [false, true, false],
			range: {
				'min': [1000],
				'max': [100000]
			}
		});

		const inputPriceMin = document.querySelector('#input-price-min');
		const inputPriceMax = document.querySelector('#input-price-max');

		const inputsPrice = [inputPriceMin, inputPriceMax]

		rangePriceSlider.noUiSlider.on('update', function (values, handle) {
			inputsPrice[handle].value = Math.round(values[handle])
		});

		inputsPrice.forEach(input => {
			input.addEventListener('change', function () {
				rangePriceSlider.noUiSlider.set([this.value]);
			});
		});
	}
}
rangePrice()

/* ====================================
Меню категорий
==================================== */
function categorySlideMenu() {
	const menuWrapper = document.querySelector(".category__wrapper");
	const menuBlocks = document.querySelectorAll(".category__block");

	if (!menuWrapper || menuBlocks.length === 0) return;

	// Функция для показа нужного меню
	function showMenu(targetMenu) {
		menuBlocks.forEach(block => block.classList.remove("_show"));
		targetMenu.classList.add("_show");
	}

	// Обработчик кликов по ссылкам с вложенным меню
	menuWrapper.addEventListener("click", function (event) {
		const link = event.target.closest("[data-submenu]");
		if (link) {
			event.preventDefault();
			const submenuName = link.getAttribute("data-submenu");
			const submenu = document.querySelector(`.category__block[data-submenu="${submenuName}"]`);
			if (submenu) {
				showMenu(submenu);
			}
		}
	});

	// Обработчик кликов по кнопкам возврата
	menuWrapper.addEventListener("click", function (event) {
		const backBtn = event.target.closest(".category-back");
		if (backBtn) {
			event.preventDefault();
			const parentMenuName = backBtn.getAttribute("data-submenu");
			const parentMenu = document.querySelector(`.category__block[data-submenu="${parentMenuName}"]`);
			if (parentMenu) {
				showMenu(parentMenu);
			}
		}
	});

	// Обработчик кликов по кнопке "Все категории"
	menuWrapper.addEventListener("click", function (event) {
		const closeAllBtn = event.target.closest(".category-close-all");
		if (closeAllBtn) {
			event.preventDefault();
			showMenu(menuBlocks[0]); // Возвращаемся в начальное меню
		}
	});

	// Инициализация: показать первое меню
	showMenu(menuBlocks[0]);
}
categorySlideMenu()

/* ====================================
Открыть/закрыть доп.меню (в моб.версии)
==================================== */
function openSort() {
	const btnShow = document.getElementById('sort-show');
	const BtnClose = document.getElementById('sort-close');

	if (btnShow) {
		btnShow.addEventListener('click', function () {
			if (document.documentElement.classList.contains('sort-open')) {
				document.documentElement.classList.remove('sort-open');
				bodyUnlock();
			} else {
				// Убираем все другие классы перед добавлением нового
				document.documentElement.classList.add('sort-open');
				bodyLock();
			}
		})
	}

	if (BtnClose) {
		BtnClose.addEventListener('click', function () {
			if (document.documentElement.classList.contains('sort-open')) {
				document.documentElement.classList.remove('sort-open');
				bodyUnlock();
			}
		})
	}
}
openSort();

function openFilter() {
	const btnShow = document.getElementById('filter-show');

	const spollers = document.querySelectorAll('.rs-catalog__spollers');

	spollers.forEach(spoller => {
		const spollerItems = spoller.querySelectorAll('.rs-catalog__spollers_item');

		const spollerLinks = spoller.querySelectorAll('.rs-catalog__spollers_link ul li a');

		spollerItems.forEach(spollerItem => {
			const spollerClose = spollerItem.querySelector('.rs-catalog__spollers_title');

			btnShow.addEventListener('click', function () {
				Array.from(spollerItems).slice(0, 1).forEach(item => item.classList.add('filter-open'));
				bodyLock();
			})

			spollerClose.addEventListener('click', function () {
				spollerClose.closest('.rs-catalog__spollers_item').classList.remove('filter-open')

				if (document.querySelectorAll('filter-open').length === 0) {
					bodyUnlock();
				}
			})

			spollerLinks.forEach(spollerLink => {
				spollerLink.addEventListener("click", function (event) {
					const link = event.target.closest("[data-filtermenu]");
					if (link) {
						event.preventDefault();
						const filterName = link.getAttribute("data-filtermenu");
						const filter = document.querySelector(`.rs-catalog__spollers_item[data-filtermenu="${filterName}"]`);
						if (filter) {
							filter.classList.add('filter-open')
						}
					}
				});
			});
		});
	});
}
openFilter();

function initCatalogFilters() {
	document.querySelectorAll('.rs-catalog__showmore').forEach(showMoreButton => {
		const filterItem = showMoreButton.closest('.category__block') || showMoreButton.closest('.rs-catalog__spollers_item');
		const showMoreBadge = showMoreButton.querySelector('.rs-catalog__showmore-badge');
		const clearButton = filterItem?.querySelector('.rs-catalog__spollers_clear');

		let сategoryList = [...filterItem?.querySelectorAll('.category__list')].find(list => !list.closest('.category__nav'));
		let checkboxList = filterItem?.querySelector('.checkbox__list');

		const filterList = сategoryList || checkboxList;

		if (filterList) {
			const filterItems = [...filterList.children];
			const hiddenItems = filterItems.slice(6);

			// Если скрываемых элементов нет, убираем кнопку
			if (hiddenItems.length === 0) {
				showMoreButton.style.display = 'none';
				return;
			}

			// Функция управления скрытыми элементами
			function updateHiddenItems() {
				if (window.innerWidth > 991.98) {
					hiddenItems.forEach(item => item.classList.add('hidden'));
					showMoreButton.classList.remove('hidden');
					if (showMoreBadge) showMoreBadge.textContent = hiddenItems.length;
				} else {
					if (checkboxList) {
						// Только в checkboxList убираем hidden на узком экране
						hiddenItems.forEach(item => item.classList.remove('hidden'));
					}
				}
			}

			updateHiddenItems(); // Вызываем при загрузке
			window.addEventListener("resize", updateHiddenItems); // Вызываем при изменении ширины

			function toggleShowMore() {
				const isExpanded = showMoreButton.classList.toggle('_showmore-active');
				hiddenItems.forEach(item => item.classList.toggle('hidden', !isExpanded));
			}

			showMoreButton.addEventListener('click', toggleShowMore);
		}

		clearButton?.addEventListener('click', () => {
			filterItem.querySelectorAll('input[type=checkbox]').forEach(input => input.checked = false);
		});
	});

	document.querySelector('.rs-catalog__filter-clear')?.addEventListener('click', (e) => {
		e.preventDefault();
		document.querySelectorAll('input[type=checkbox]').forEach(input => input.checked = false);
	});
}
initCatalogFilters();

document.addEventListener("DOMContentLoaded", function () {
	const searchInput = document.querySelector(".checkbox__filter--search .checkbox__search input");
	const listItems = document.querySelectorAll(".checkbox__list li");

	if (searchInput) {
		searchInput.addEventListener("input", function () {
			const filterText = searchInput.value.trim().toLowerCase();
			listItems.forEach(item => {
				const labelText = item.querySelector(".checkbox__label")?.textContent.toLowerCase() || "";
				if (window.innerWidth <= 991.98) {
					// На маленьких экранах скрываем только несоответствующие запросу элементы
					item.classList.toggle('hidden', !labelText.includes(filterText));
				} else {
					// На больших экранах применяем обычную логику
					item.classList.toggle('hidden', !labelText.includes(filterText));
				}
			});
		});
	}
});
