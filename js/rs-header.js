
/* ====================================
Меню
==================================== */
function menuFunction() {
	const menus = document.querySelectorAll('.rs-header__menu');

	// Бургер-кнопка
	function menuBurger() {
		menus.forEach(menu => {
			const menuBurgerBtns = document.querySelectorAll('.icon-menu');

			if (menuBurgerBtns) {
				menuBurgerBtns.forEach(btn => {
					// Открываем меню
					btn.addEventListener("click", function (e) {
						if (document.documentElement.classList.contains("menu-open")) {
							menuClose("menu-open");
						} else {
							menuOpen("menu-open")
						}
					});
				});
			}
		});
	};
	menuBurger()

	// Меню
	function menuInit() {
		const menuBlock = document.querySelector('.menu__block');
		const menuItem = document.querySelectorAll('.menu__block .menu__wrap ul > li');

		// Добавляем иконки в пункты с выпадающим меню
		menuItem.forEach(item => {
			const menuLink = item.querySelector('a');
			let icon = document.createElement('i');
			icon.classList.add('menu__dropdown-arrow')
			menuLink.append(icon);
		});

		menus.forEach(menu => {
			// Все пункты с выпадающим меню
			const menuItemDropdowns = menuBlock.querySelectorAll('.menu__list .menu__dropdown');
			const menuItemDropdownsMenu = menuBlock.querySelectorAll('.menu__list .menu__dropdown_block');

			// 1-ый уровень
			const menuItemDropdownsFirst = menuBlock.querySelectorAll('.menu__list > .menu__dropdown');
			const menuItemDropdownsMenuFirst = menuBlock.querySelectorAll('.menu__list > .menu__dropdown > .menu__dropdown_block');

			// 2-ой уровень
			const menuItemDropdownsTwo = menuBlock.querySelectorAll('.menu__list > .menu__dropdown > .menu__dropdown_block > .menu__dropdown_body > .menu__wrap > .menu__dropdown_list > .menu__dropdown');
			const menuItemDropdownsMenuTwo = menuBlock.querySelectorAll('.menu__list > .menu__dropdown > .menu__dropdown_block > .menu__dropdown_body > .menu__wrap > .menu__dropdown_list > .menu__dropdown > .menu__dropdown_block');

			// 3-ий уровень
			const menuItemDropdownsThree = menuBlock.querySelectorAll('.menu__list > .menu__dropdown > .menu__dropdown_block > .menu__dropdown_body > .menu__wrap > .menu__dropdown_list > .menu__dropdown > .menu__dropdown_block > .menu__dropdown_body > .menu__wrap > .menu__dropdown_list > .menu__dropdown');
			const menuItemDropdownsMenuThree = menuBlock.querySelectorAll('.menu__list > .menu__dropdown > .menu__dropdown_block > .menu__dropdown_body > .menu__wrap > .menu__dropdown_list > .menu__dropdown > .menu__dropdown_block > .menu__dropdown_body > .menu__wrap > .menu__dropdown_list > .menu__dropdown > .menu__dropdown_block');

			/* Один и тот же код для отдельных уровней меню, 
			чтобы открывался только один пункт, а открытые - закрывались, кроме тех, кто выше уровнем */
			function openLvlMenu(li, ul) {
				li.forEach(item => {
					const menuItemIcons = item.querySelector('a > i');
					const menuItemBack = item.querySelector('.menu__dropdown_back');

					// Кнопка "Назад" во вкладке отдельного пункта меню
					if (menuItemBack) {
						menuItemBack.addEventListener('click', (e) => {
							e.preventDefault();
							if (menuItemBack.closest('.menu__dropdown .menu__dropdown')) {
								menuItemBack.closest('.menu__dropdown .menu__dropdown').classList.remove('_lock-scroll-menu');
								if (!menuItemBack.closest('.menu__dropdown .menu__dropdown').classList.contains('_open-menu')) {
									console.log(menuItemBack.closest('.menu__dropdown .menu__dropdown'));
									menuClose('drop-menu-open')
								}
							} else {
								menuClose('drop-menu-open')
							}
							if (menuItemBack.closest('.menu__dropdown').classList.contains('_open-menu')) {
								menuItemBack.closest('.menu__dropdown').classList.remove('_open-menu');
							}
						})
					}

					// Открытие меню при клике на иконку
					menuItemIcons.addEventListener('click', (e) => {
						e.preventDefault();
						// Проходимся по всем пунктам и ищем активные классы, убираем их и добавляем активный класс кликнутому пункту
						if (!menuItemIcons.closest('.menu__dropdown').classList.contains('_open-menu')) {
							li.forEach(itemDrop => {
								if (itemDrop.classList.contains('_open-menu')) {
									itemDrop.classList.remove('_open-menu')
								}
							});
							menuItemIcons.closest('.menu__dropdown').classList.add('_open-menu');
							if (menuItemIcons.closest('.menu__dropdown .menu__dropdown')) {
								menuItemIcons.closest('.menu__dropdown .menu__dropdown').classList.add('_lock-scroll-menu');
							}
							menuOpen('drop-menu-open')
						} else if (menuItemIcons.closest('.menu__dropdown').classList.contains('_open-menu')) {
							menuItemIcons.closest('.menu__dropdown').classList.remove('_open-menu');
							if (menuItemIcons.closest('.menu__dropdown .menu__dropdown')) {
								menuItemIcons.closest('.menu__dropdown .menu__dropdown').classList.remove('_lock-scroll-menu');
							}
						}
					});
				});
			}
			openLvlMenu(menuItemDropdownsFirst, menuItemDropdownsMenuFirst)
			openLvlMenu(menuItemDropdownsTwo, menuItemDropdownsMenuTwo)
			openLvlMenu(menuItemDropdownsThree, menuItemDropdownsMenuThree)

			// При клике на бургер убираем открые меню и активные класс
			document.addEventListener("click", function (e) {
				if (e.target.closest('.menu__icon')) {
					menuItemDropdowns.forEach(item => {
						item.classList.remove('_open-menu');
					});
					menuClose('drop-menu-open')
				}
			});
		});
	}
	menuInit()

	//========================================================================================================================================================
	// Дополнительные меню
	function addMenuInit(block, trigger, classesOpen, blockItems, classesItems) {
		// Получаем элементы при вызове
		const addMenuBtns = document.querySelectorAll(trigger);
		const addMenuBlocks = document.querySelectorAll(block);

		if (addMenuBtns.length > 0) {
			addMenuBtns.forEach(addMenuBtn => {
				addMenuBtn.addEventListener('click', function (e) {
					// Открытие или закрытие меню
					e.preventDefault();
					e.stopPropagation();

					// Даем классы с открытым меню
					if (document.documentElement.classList.contains(classesOpen)) {
						document.documentElement.classList.remove(classesOpen);
					} else {
						document.documentElement.classList.add(classesOpen);
					}
				});
			});
		}

		// Скрывает блок при клике вне его
		if (addMenuBlocks.length > 0) {
			addMenuBlocks.forEach(addMenuBlock => {
				addMenuBlock.addEventListener('click', function (e) {
					e.stopPropagation();
				});
			});
			document.addEventListener('click', function (e) {
				menuClose(classesOpen);
			});
		}

		// Функицонал для меню языков
		function funcLanguage() {
			const languageItems = document.querySelectorAll('.rs-header__language_body > ul > li');
			const languageCurrent = document.querySelector('.rs-header__language_current');
			if (languageItems.length > 0) {
				languageItems.forEach(item => {
					item.addEventListener('click', function () {
						// Убираем активные классы у пунктов внутри модального и выдаем активный класс выбранному пункту
						languageItems.forEach(itemActive => {
							itemActive.classList.remove('current_menu_item');
						})
						item.classList.add('current_menu_item');
						// Переносим текст из активного пункта меню
						languageCurrent.textContent = item.textContent;
						// Закрываем меню
						document.documentElement.classList.remove(classesOpen);
					})
				})
			}
		}
		funcLanguage()

		// Функционал для поиска
		function funcSearch() {
			const searchs = document.querySelectorAll('.rs-header .rs-search');
			if (searchs.length > 0) {
				searchs.forEach(search => {
					const searchInput = search.querySelector('.rs-search__line input');
					const searchResult = search.querySelector('.rs-search__result');
					const searchForm = search.querySelector('.rs-search__form');
					const searchSubmit = search.querySelector('.rs-search__submit');
					const searchClear = search.querySelector('.rs-search__clear');

					// При фокусе показать блок с результатами поиска
					searchInput.addEventListener('focus', function () {
						_slideDown(searchResult, 500);
					})
					searchInput.addEventListener('blur', function () {
						_slideUp(searchResult, 500);
					})

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

					// Вспомогательные функции ========================================================================================================================================================
					// Поставить курсор в инпут после клика
					function putСursorInInput(input) {
						setTimeout(function () {
							input.focus()
						}, 0);
					}
				})
			}
		}
		funcSearch()

	}
	/* Вызов меню, первые три обязательные: 
	1) блок, которому нужно дать класс + при клике на который не будет убираться класс
	2) кнопка, при клике на который будет дан класс
	3) сам класс для изменения стилей (открытие блока, активное состояние для кнопки) */
	addMenuInit(
		'.rs-header__language',
		'.rs-header__language_current',
		'language-menu-open')
	addMenuInit(
		'.rs-search',
		'.rs-header__search',
		'search-open')

	// Функции открытия меню с блокировкой скролла
	function menuOpen(classes) {
		bodyLock();
		document.documentElement.classList.add(classes);
	}
	function menuClose(classes) {
		bodyUnlock();
		document.documentElement.classList.remove(classes);
	}
	function menuToggle(classes) {
		bodyLockToggle();
		document.documentElement.classList.toggle(classes);
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
		header.classList.toggle('_header-scroll', window.scrollY > 0);
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
		const locationBlockTextContent = locationBlockText.textContent.length;
		const locationBlockTextQuantity = locationBlockText.dataset.quantitySymbol;

		if (locationBlockTextContent >= locationBlockTextQuantity) {
			// Если блок превыщает допустимую ширину, то даем ему класс скрытия текста с добавлением многоточия
			locationBlockText.classList.add('_hide-text');

			// Создаем модальное окно и копируем текст
			const locationBlockModal = document.createElement('div');
			locationBlockModal.classList.add('rs-header__location_modal')
			locationBlockModal.textContent = locationBlockText.textContent;
			locationBlock.append(locationBlockModal);
		}
	}
}
modalAddress()

/* ====================================
Создаем мини-модальное для пунктов основного меню 
(если пунктов много и они не влазят)
==================================== */
const modalMainMenu = () => {
	const headerMenu = document.querySelector('.rs-header__menu');
	const headerMenuList = headerMenu.querySelector('.menu__body > .menu__list')
	const menuItem = [...headerMenu.querySelectorAll('.menu__body > .menu__list > li')];

	// Если элементов больше 8 и декстопная ширина экрана
	if (menuItem.length > 8 && window.innerWidth > 991.98) {
		// Создаем доп. пункт, с классами аналогичными дефолтному выпающему меню
		const menuMore = document.createElement('li');
		const menuMoreLink = document.createElement('a');

		menuMore.classList.add('menu-item', 'menu__dropdown', 'menu__more')
		headerMenuList.append(menuMore);

		menuMoreLink.innerHTML =
			`<svg width="16" height="3" viewBox="0 0 16 3" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M0 3V0H2.58947V3H0Z" fill="#0B0F19"/>
				<path d="M6.70527 3V0H9.29473V3H6.70527Z" fill="#0B0F19"/>
				<path d="M13.4105 3V0H16V3H13.4105Z" fill="#0B0F19"/>
			</svg>`;
		menuMore.append(menuMoreLink);

		// Создаем модальное окно, аналогичное как в выпадающем меню
		const menuModal = document.createElement('div');
		menuModal.classList.add('menu__dropdown_block');
		menuMore.append(menuModal);
		menuModal.innerHTML =
			`<div class="menu__dropdown_body">
				<div class="menu__wrap">
					<ul class="menu__dropdown_list">
					</ul>
				</div>
			</div>`;

		// Находим список, куда будем переносить пункты, в новом блоке
		const menuModalList = menuModal.querySelector('.menu__dropdown_list');
		// Берем все не влезающие пункты, кроме первых 8-ми, переносим их в список
		menuItem.slice(8).forEach(item => {
			menuModalList.append(item);
		});

		// Показываем доп.меню после клика на многоточие
		menuMore.addEventListener('click', function () {
			menuMore.classList.toggle('_open-menu');
		})
		// Убираем активный класс при клике вне окна
		menuModal.addEventListener('click', function (e) {
			e.stopPropagation();
		});
		headerMenu.addEventListener('click', function (e) {
			e.stopPropagation();
		});
		document.addEventListener('click', function (e) {
			menuMore.classList.remove('_open-menu');
		});
	}
}
window.addEventListener('load', modalMainMenu())