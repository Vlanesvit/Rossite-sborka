
/* ====================================
Меню
==================================== */
function menuFunction() {
	const menus = document.querySelectorAll('.rs-header__menu');

	// Бургер-кнопка
	function menuBurger() {
		menus.forEach(menu => {
			const menuBurgerBtns = menu.querySelectorAll('.menu__icon');

			if (menuBurgerBtns) {
				menuBurgerBtns.forEach(btn => {
					// Открываем меню
					btn.addEventListener("click", function (e) {
						if (document.documentElement.classList.contains("menu-open")) {
							menuClose();
						} else {
							menuOpen()
						}
					});
				});
			}
		});
	};
	if (document.querySelector(".menu__icon")) {
		menuBurger()
	}

	// Меню
	function menuInit() {
		menus.forEach(menu => {
			// Все пункты
			const menuItem = menu.querySelectorAll('.menu__list li');

			// Все пункты с выпадающим меню
			const menuItemDropdowns = menu.querySelectorAll('.menu__list .dropdown');
			const menuItemDropdownsMenu = menu.querySelectorAll('.menu__list .dropdown__menu');

			// 0-ой уровень
			const menuItemDropdownsNull = menu.querySelectorAll('.menu__list > .dropdown');
			const menuItemDropdownsMenuNull = menu.querySelectorAll('.menu__list > .dropdown > .dropdown__menu');

			// 1-ый уровень
			const menuItemDropdownsFirst = menu.querySelectorAll('.menu__list > .dropdown > .dropdown__menu > .dropdown');
			const menuItemDropdownsMenuFirst = menu.querySelectorAll('.menu__list > .dropdown > .dropdown__menu > .dropdown > .dropdown__menu');

			// 2-ой уровень
			const menuItemDropdownsTwo = menu.querySelectorAll('.menu__list > .dropdown > .dropdown__menu > .dropdown > .dropdown__menu > .dropdown');
			const menuItemDropdownsMenuTwo = menu.querySelectorAll('.menu__list > .dropdown > .dropdown__menu > .dropdown > .dropdown__menu > .dropdown > .dropdown__menu');

			// 3-ий уровень
			const menuItemDropdownsThree = menu.querySelectorAll('.menu__list > .dropdown > .dropdown__menu > .dropdown > .dropdown__menu > .dropdown  > .dropdown__menu > .dropdown');
			const menuItemDropdownsMenuThree = menu.querySelectorAll('.menu__list > .dropdown > .dropdown__menu > .dropdown > .dropdown__menu > .dropdown > .dropdown__menu > .dropdown > .dropdown__menu');

			// Добавляем иконки в пункты с выпадающим меню
			menuItemDropdowns.forEach(item => {
				const menuLink = item.querySelector('a');
				let icon = document.createElement('i');
				menuLink.append(icon);
			});

			// Функция для отдельных уровней меню, чтобы открывался только один пункт, а открытые закрывались, кроме тех, кто выше уровнем
			function openLvlMenu(li, ul) {
				li.forEach(item => {
					const menuItemList = item.querySelector('ul');
					const menuItemIcons = item.querySelector('a > i');

					// Раскрываем меню при клике на иконку
					menuItemIcons.addEventListener('click', (e) => {
						e.preventDefault();
						_slideToggle(menuItemList, 500);
						ul.forEach(menu => {
							if (!menu.hasAttribute('hidden')) {
								_slideUp(menu, 500);
							}
						});

						// Проходимся по всем пунктам и ищем активные классы, убираем их и добавляем активный класс кликнутому пункту
						if (!menuItemIcons.closest('.dropdown').classList.contains('_open-menu')) {
							li.forEach(itemDrop => {
								if (itemDrop.classList.contains('_open-menu')) {
									itemDrop.classList.remove('_open-menu')
								}
							});
							menuItemIcons.closest('.dropdown').classList.add('_open-menu');
						} else if (menuItemIcons.closest('.dropdown').classList.contains('_open-menu')) {
							menuItemIcons.closest('.dropdown').classList.remove('_open-menu');
						}
					});
				});
			}

			// Пункты 0-го уровня меню
			openLvlMenu(menuItemDropdownsNull, menuItemDropdownsMenuNull)
			// Пункты 1-го уровня меню
			openLvlMenu(menuItemDropdownsFirst, menuItemDropdownsMenuFirst)
			// Пункты 2-го уровня меню
			openLvlMenu(menuItemDropdownsTwo, menuItemDropdownsMenuThree)
			// Пункты 3-го уровня меню
			openLvlMenu(menuItemDropdownsThree, menuItemDropdownsMenuTwo)

			// При клике на бургер убираем открые меню и активные класс
			document.addEventListener("click", function (e) {
				if (e.target.closest('.menu__icon')) {
					menuItemDropdownsMenu.forEach(menu => {
						_slideUp(menu, 500);
					});
					menuItemDropdowns.forEach(item => {
						item.classList.remove('_open-menu');
					});
				}
			});
		});
	}
	menuInit()

	// Функции открытия бургер-меню с блокировкой скролла
	function menuOpen() {
		bodyLock();
		document.documentElement.classList.add("menu-open");
	}
	function menuClose() {
		bodyUnlock();
		document.documentElement.classList.remove("menu-open");
	}
	function menuToggle() {
		bodyLockToggle();
		document.documentElement.classList.toggle("menu-open");
	}
}
menuFunction()

/* ====================================
Якорные ссылки
==================================== */
// data-goto - указать ID блока
// data-goto-header - учитывать header
// data-goto-top - недокрутить на указанный размер
// data-goto-speed - скорость (только если используется доп плагин)
let gotoblock_gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
	const targetBlockElement = document.querySelector(targetBlock);
	if (targetBlockElement) {
		let headerItem = "";
		let headerItemHeight = 0;
		if (noHeader) {
			headerItem = ".header";
			const headerElement = document.querySelector(headerItem);
			if (!headerElement.classList.contains("_header-scroll")) {
				headerElement.style.cssText = `transition-duration: 0s;`;
				headerElement.classList.add("_header-scroll");
				headerItemHeight = headerElement.offsetHeight;
				headerElement.classList.remove("_header-scroll");
				setTimeout((() => {
					headerElement.style.cssText = ``;
				}), 0);
			} else headerItemHeight = headerElement.offsetHeight;
		}
		let options = {
			speedAsDuration: true,
			speed,
			header: headerItem,
			offset: offsetTop,
			easing: "linear"
		};
		document.documentElement.classList.contains("menu-open") ? menuClose() : null;
		if ("undefined" !== typeof SmoothScroll) (new SmoothScroll).animateScroll(targetBlockElement, "", options); else {
			let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY;
			targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition;
			targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition;
			window.scrollTo({
				top: targetBlockElementPosition,
				behavior: "smooth"
			});
		};
	};
}
function pageNavigation() {
	document.addEventListener("click", pageNavigationAction);
	document.addEventListener("watcherCallback", pageNavigationAction);
	function pageNavigationAction(e) {
		if ("click" === e.type) {
			const targetElement = e.target;
			if (targetElement.closest("[data-goto]")) {
				const gotoLink = targetElement.closest("[data-goto]");
				const gotoLinkSelector = gotoLink.dataset.goto ? gotoLink.dataset.goto : "";
				const noHeader = gotoLink.hasAttribute("data-goto-header") ? true : false;
				const gotoSpeed = gotoLink.dataset.gotoSpeed ? gotoLink.dataset.gotoSpeed : 500;
				const offsetTop = gotoLink.dataset.gotoTop ? parseInt(gotoLink.dataset.gotoTop) : 0;
				gotoblock_gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop);
				e.preventDefault();
			}
		} else if ("watcherCallback" === e.type && e.detail) {
			const entry = e.detail.entry;
			const targetElement = entry.target;
			if ("navigator" === targetElement.dataset.watch) {
				document.querySelector(`[data-goto]._navigator-active`);
				let navigatorCurrentItem;
				if (targetElement.id && document.querySelector(`[data-goto="#${targetElement.id}"]`)) navigatorCurrentItem = document.querySelector(`[data-goto="#${targetElement.id}"]`); else if (targetElement.classList.length) for (let index = 0; index < targetElement.classList.length; index++) {
					const element = targetElement.classList[index];
					if (document.querySelector(`[data-goto=".${element}"]`)) {
						navigatorCurrentItem = document.querySelector(`[data-goto=".${element}"]`);
						break;
					}
				}
				if (entry.isIntersecting) navigatorCurrentItem ? navigatorCurrentItem.classList.add("_navigator-active") : null; else navigatorCurrentItem ? navigatorCurrentItem.classList.remove("_navigator-active") : null;
			}
		}
	}
}
pageNavigation();

/* ====================================
Header при скролле
==================================== */
function headerFixed() {
	const header = document.querySelector('.rs-header');

	function headerClassAdd() {
		// 0 - на сколько скролим, чтобы дался класс
		header.classList.toggle('_header-fixed', window.scrollY > 0);
	}

	window.addEventListener('scroll', function () {
		headerClassAdd()
	})
	window.addEventListener('load', function () {
		headerClassAdd()
	})
}
headerFixed()

/* ====================================
Мини-модальное для адреса 
(если оно слишком большое)
==================================== */
const modalAddress = () => {
	const locationBlock = document.querySelector('.rs-header__location');
	if (locationBlock) {
		const locationBlockText = locationBlock.querySelector('.rs-header__location_text');

		if (locationBlock.offsetWidth >= 410) {
			// Если блок превыщает допустимую ширину, то даем ему класс скрытия текста с добавлением многоточия
			locationBlockText.classList.add('_hide-text');

			// Создаем модальное окно и копируем полностью текст
			const locationBlockModal = document.createElement('div');
			locationBlockModal.classList.add('rs-header__location_modal')
			locationBlockModal.textContent = locationBlockText.textContent;
			locationBlock.append(locationBlockModal);
		}
	}
}
window.addEventListener('load', modalAddress())
window.addEventListener('resize', function () {
	if (window.innerWidth > 1169.98) {
		modalAddress()
	}
})

/* ====================================
Поиск
==================================== */
function search() {
	const searchs = document.querySelectorAll('.rs-search');
	const searchModal = document.querySelector('.search-modal');
	const searchShows = document.querySelectorAll('.search-show');

	searchs.forEach(search => {
		const searchSubmit = search.querySelector('.rs-search__submit')
		const searchClear = search.querySelector('.rs-search__clear');
		const searchInput = search.querySelector('.rs-search__input')
		const searchForm = search.querySelector('.rs-search__form');

		searchShows.forEach(searchShow => {
			// Показать поиск
			searchShow.addEventListener('click', function (e) {
				e.preventDefault();
				e.stopPropagation();
				searchOpen()
				putСursorInInput(searchInput);
			})
		});

		// Закрываем поиск по оверлею
		searchModal.addEventListener('click', function (e) {
			const target = e.target;
			// Делегируем событие
			if (target.classList.contains('rs-search__close')) {
				searchClose()
			}
		});
		searchModal.addEventListener('click', function (e) {
			e.stopPropagation();
		});
		document.addEventListener('click', function (e) {
			searchClose()
		});

		// Отправка формы
		searchSubmit.addEventListener('click', function (e) {
			e.preventDefault();
			if (searchInput.value != '') {
				searchForm.submit();
			}
		})

		// При вводе появляется кнопка отчистки
		searchInput.addEventListener('input', function (e) {
			searchClear.style.display = "block";
		})

		// Очистить инпут
		searchClear.addEventListener('click', function (e) {
			searchInput.value = '';
			searchClear.style.display = "none";
			putСursorInInput(searchInput);
		})
	});

	// Вспомогательные функции ========================================================================================================================================================
	// Поставить курсор в инпут после клика
	function putСursorInInput(input) {
		setTimeout(function () {
			input.focus()
		}, 0);
	}
	// Функции открытия/закрытия поиска с блокировкой скролла
	function searchOpen() {
		bodyLock();
		document.documentElement.classList.add("search-open");
	}
	function searchClose() {
		bodyUnlock();
		document.documentElement.classList.remove("search-open");
	}
	function searchToggle() {
		bodyLockToggle();
		document.documentElement.classList.toggle("search-open");
	}
}
if (document.querySelector('.rs-search')) {
	search()
}

/* ====================================
Выбор языка
==================================== */
function addMenuInit(block, button) {
	const parrents = document.querySelectorAll(block);
	if (parrents) {
		parrents.forEach(parrent => {
			const menuOpenBtn = parrent.querySelector(button)

			// Даем активный класс
			menuOpenBtn.addEventListener('click', function () {
				parrent.classList.toggle('_add-menu-open')
			})

			// Убираем активный класс при клике вне окна
			parrent.addEventListener('click', function (e) {
				e.stopPropagation();
			});
			document.addEventListener('click', function (e) {
				parrent.classList.remove('_add-menu-open')
			});
		});
	}
}
addMenuInit('.rs-header__language', '.rs-header__language_current')

/* ====================================
Создаем мини-модальное для пунктов основного меню 
(если пунктов много и они не влазят)
==================================== */
const modalMainMenu = () => {
	const headerMenu = document.querySelector('.rs-header__menu');
	const headerMenuBody = headerMenu.querySelector('.menu__body');
	const headerMenuList = headerMenu.querySelector('.menu__list')
	const menuItem = [...headerMenu.querySelectorAll('.menu__list > li')];

	// Если элементов больше 8 и декстопная ширина экрана
	if (menuItem.length > 8 && window.innerWidth > 1169.98) {

		// Создаем доп. пункт с многоточием
		const menuMore = document.createElement('li');
		const menuMoreLink = document.createElement('a');
		menuMore.classList.add('menu__more')
		headerMenuList.append(menuMore);
		menuMore.append(menuMoreLink);

		// Создаем модальное окно и внутри него блок списка
		const menuModal = document.createElement('div');
		menuModal.classList.add('menu__modal');
		headerMenuBody.append(menuModal);

		const menuModalList = document.createElement('ul');
		menuModalList.classList.add('menu__list')
		menuModal.append(menuModalList);

		// Берем все не влезающие пункты, кроме первых 8-ми, переносим их в список
		menuItem.slice(8).forEach(item => {
			menuModalList.append(item);
		});

		// Показываем доп.меню после клика на многоточие
		menuMore.addEventListener('click', function () {
			menuModal.classList.toggle('show-add-menu');
		})

		// Убираем активный класс при клике вне окна
		menuModal.addEventListener('click', function (e) {
			e.stopPropagation();
		});
		headerMenu.addEventListener('click', function (e) {
			e.stopPropagation();
		});
		document.addEventListener('click', function (e) {
			menuModal.classList.remove('show-add-menu')
		});
	}
}
window.addEventListener('load', modalMainMenu())
window.addEventListener('resize', function () {
	if (window.innerWidth > 1169.98) {
		modalMainMenu()
	}
})