
/* ====================================
Меню
==================================== */
function menuFunction() {
	const menus = document.querySelectorAll('.rs-header__menu');

	// Бургер-кнопка
	function burger() {
		menus.forEach(menu => {
			const menuBurgerBtns = menu.querySelectorAll('.menu__icon');

			if (menuBurgerBtns) {
				menuBurgerBtns.forEach(btn => {
					// Открываем меню
					btn.addEventListener("click", function (e) {
						e.preventDefault();
						menuToggle("menu-open");
					});
				});
			}
		});
	};
	burger()

	// Меню
	function menuInit() {
		menus.forEach(menu => {
			// Все пункты с выпадающим меню
			const menuItemDropdowns = menu.querySelectorAll('.menu__list .menu__dropdown');
			const menuItemDropdownsMenu = menu.querySelectorAll('.menu__list .menu__dropdown_list');

			// 0-ой уровень
			const menuItemDropdownsNull = menu.querySelectorAll('.menu__list > .menu__dropdown');
			const menuItemDropdownsMenuNull = menu.querySelectorAll('.menu__list > .menu__dropdown > .menu__dropdown_list');

			// 1-ый уровень
			const menuItemDropdownsFirst = menu.querySelectorAll('.menu__list > .menu__dropdown > .menu__dropdown_list > .menu__dropdown');
			const menuItemDropdownsMenuFirst = menu.querySelectorAll('.menu__list > .menu__dropdown > .menu__dropdown_list > .menu__dropdown > .menu__dropdown_list');

			// 2-ой уровень
			const menuItemDropdownsTwo = menu.querySelectorAll('.menu__list > .menu__dropdown > .menu__dropdown_list > .menu__dropdown > .menu__dropdown_list > .menu__dropdown');
			const menuItemDropdownsMenuTwo = menu.querySelectorAll('.menu__list > .menu__dropdown > .menu__dropdown_list > .menu__dropdown > .menu__dropdown_list > .menu__dropdown > .menu__dropdown_list');

			// 3-ий уровень
			const menuItemDropdownsThree = menu.querySelectorAll('.menu__list > .menu__dropdown > .menu__dropdown_list > .menu__dropdown > .menu__dropdown_list > .menu__dropdown > .menu__dropdown_list > .menu__dropdown');
			const menuItemDropdownsMenuThree = menu.querySelectorAll('.menu__list > .menu__dropdown > .menu__dropdown_list > .menu__dropdown > .menu__dropdown_list > .menu__dropdown > .menu__dropdown_list > .menu__dropdown > .menu__dropdown_list');

			// Блоки, которые копируются во вкладки
			const contactBlock = menu.querySelector('.menu__contact');
			const searchBlock = menu.querySelector('.rs-header__search');
			const socialBlock = menu.querySelector('.rs-header__social');
			menuItemDropdownsMenu.forEach(menuDropdown => {
				if (contactBlock) {
					const contactClone = contactBlock.cloneNode(true);
					menuDropdown.appendChild(contactClone);
				}

				if (searchBlock) {
					const searchClone = searchBlock.cloneNode(true);
					menuDropdown.appendChild(searchClone);
				}

				if (socialBlock) {
					const socialClone = socialBlock.cloneNode(true);
					menuDropdown.appendChild(socialClone);
				}
			});

			// Добавляем иконки в пункты с выпадающим меню
			menuItemDropdowns.forEach(item => {
				let icon = document.createElement('button');
				icon.setAttribute('type', 'button');
				icon.classList.add('menu__dropdown_arrow')
				item.append(icon);
			});

			// Добавляем иконки в пункты с выпадающим меню
			menuItemDropdownsMenu.forEach(list => {
				let back = document.createElement('li');
				back.classList.add('menu-item', 'switch-back');
				list.prepend(back);

				let btn = document.createElement('a');
				btn.setAttribute('href', '#');

				// Найдем элемент .menu__dropdown и проверим наличие <a>
				const menuLink = back.closest('.menu__dropdown')?.querySelector('a');

				if (menuLink) {
					btn.textContent = menuLink.textContent; // Добавляем текст только если <a> найден
				} else {
					btn.textContent = 'Назад'; // Запасной текст
				}

				back.prepend(btn);
			});

			// Функция для отдельных уровней меню, чтобы открывался только один пункт, а открытые закрывались, кроме тех, кто выше уровнем
			function openLvlMenu() {
				document.addEventListener('click', (e) => {
					if (e.target.classList.contains('menu__dropdown_arrow')) {
						const menuItemIcons = e.target;
						const currentDropdown = menuItemIcons.closest('.menu__dropdown');
						const parentDropdown = currentDropdown?.parentElement.closest('.menu__dropdown');
						currentDropdown.classList.add('_open-menu');

						if (parentDropdown) {
							parentDropdown.classList.add('_block-menu');
						}

						if (!document.documentElement.classList.contains('dropdown-menu-open')) {
							document.documentElement.classList.add('dropdown-menu-open');
						}
					}

					// Клик на кнопку "Назад" или её дочерние элементы
					const switchBackBtn = e.target.closest('.switch-back');
					if (switchBackBtn) {
						const currentDropdown = switchBackBtn.closest('.menu__dropdown');
						const parentDropdown = currentDropdown?.parentElement.closest('.menu__dropdown');
						currentDropdown.classList.remove('_open-menu');

						if (parentDropdown) {
							parentDropdown.classList.remove('_block-menu');
						}

						if (!document.documentElement.classList.contains('dropdown-menu-open')) {
							document.documentElement.classList.add('dropdown-menu-open');
						}

						// Получаем все элементы с классом _open-menu из массива menuItemDropdowns
						const openMenus = Array.from(menuItemDropdowns).filter(item => item.classList.contains('_open-menu'));
						// Если таких элементов 0 или меньше, убираем класс у document.documentElement
						if (openMenus.length <= 0) {
							document.documentElement.classList.remove('dropdown-menu-open');
						}
					}
				});
			}
			openLvlMenu()

			// При клике на бургер убираем открые меню и активные класс
			document.addEventListener("click", function (e) {
				if (e.target.closest('.menu__icon')) {
					menuItemDropdowns.forEach(item => {
						item.classList.remove('_open-menu');
					});
				}
			});

			//========================================================================================================================================================

			const menuList = menu.querySelector('.menu__block .menu__body > .menu__list')
			const menuItem = [...menu.querySelectorAll('.menu__block .menu__body > .menu__list > li')];
			// На случай обратной переброски пунктов при ивенте ресайза с декстопа на мобильную версию
			const breakpoint = window.matchMedia('(min-width: 991.98px)');

			const breakpointChecker = function () {
				if (breakpoint.matches === true) {
					// Если элементов больше 8
					if (menuItem.length > 8) {
						// Создаем доп. пункт, с классами аналогичными дефолтному выпадающему меню
						const menuMoreItem = document.createElement('li');
						const menuMoreLink = document.createElement('a');
						menuMoreItem.classList.add('menu-item', 'menu__dropdown', 'menu__more')
						menuList.append(menuMoreItem);
						menuMoreLink.innerHTML =
							`<svg width="16" height="3" viewBox="0 0 16 3" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M0 3V0H2.58947V3H0Z" fill="#0B0F19"/>
								<path d="M6.70527 3V0H9.29473V3H6.70527Z" fill="#0B0F19"/>
								<path d="M13.4105 3V0H16V3H13.4105Z" fill="#0B0F19"/>
							</svg>`;
						menuMoreItem.append(menuMoreLink);

						// Создаем модальное окно, аналогичное как в выпадающем меню
						const menuMoreModal = document.createElement('ul');
						menuMoreModal.classList.add('menu__dropdown_list');
						menuMoreItem.append(menuMoreModal);

						// Берем все не влезающие пункты, кроме первых 8-ми, переносим их в список
						menuItem.slice(8).forEach(item => {
							menuMoreModal.append(item);
						});

						// Показываем доп.меню после клика на многоточие
						menuMoreItem.addEventListener('click', function () {
							menuMoreItem.classList.toggle('_open-menu');
						})
						// Убираем активный класс при клике вне окна
						menuMoreModal.addEventListener('click', function (e) {
							e.stopPropagation();
						});
						menu.addEventListener('click', function (e) {
							e.stopPropagation();
						});
						document.addEventListener('click', function (e) {
							menuMoreItem.classList.remove('_open-menu');
						});
					}

					return;
				}

				else if (breakpoint.matches === false) {
					// Находим созданный пункт (если он есть), и переносим обратно все пункты
					if (document.querySelector('.menu__more')) {
						const menuMoreItem = document.querySelector('.menu__more');
						const menuMoreListItem = document.querySelectorAll('.menu__more > .menu__dropdown_list > li');
						const menuList = menu.querySelector('.menu__block .menu__body > .menu__list')

						// Берем все не влезающие пункты, кроме первых 8-ми, переносим их в список
						menuMoreListItem.forEach(item => {
							menuList.append(item);
						});
						menuMoreItem.remove();
					}

					return;
				}
			};

			breakpoint.addListener(breakpointChecker);
			breakpointChecker();

			//========================================================================================================================================================
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

					if (document.documentElement.classList.contains(classesOpen)) {
						document.documentElement.classList.remove(classesOpen);
					} else {
						// Убираем все другие классы перед добавлением нового
						document.documentElement.classList.remove('language-menu-open', 'search-open', 'menu-open');
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
			const searchs = document.querySelectorAll('.rs-header .search');
			if (searchs.length > 0) {
				searchs.forEach(search => {
					const searchInput = search.querySelector('.search__line input');
					const searchResult = search.querySelector('.search__result');
					const searchForm = search.querySelector('.search__form');
					const searchSubmit = search.querySelector('.search__submit');
					const searchClear = search.querySelector('.search__clear');
					const searchClose = search.querySelector('.search__close');

					searchInput.addEventListener('focus', function () {
						search.classList.add('_open-search');
						_slideDown(searchResult, 300);
					});

					searchInput.addEventListener('blur', function () {
						setTimeout(() => {
							if (document.activeElement !== searchInput) {
								search.classList.remove('_open-search');
								_slideUp(searchResult, 300);
							}
						}, 500);
					});


					// Отправка формы
					searchSubmit.addEventListener('click', function (e) {
						e.preventDefault();
						if (searchInput.value != '') {
							searchForm.submit();
						}
					})

					if (searchClose) {
						searchClose.addEventListener('click', function (e) {
							e.preventDefault();
							if (document.documentElement.classList.contains(classesOpen)) {
								document.documentElement.classList.remove(classesOpen)
							}
						})
					}

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
	/* Вызов меню: 
	1) блок, которому нужно дать класс + при клике на который не будет убираться класс
	2) кнопка, при клике на который будет дан класс
	3) сам класс для изменения стилей (открытие блока, активное состояние для кнопки) */
	addMenuInit(
		'.rs-header__language',
		'.rs-header__language_current',
		'language-menu-open')
	addMenuInit(
		'.search',
		'.rs-header__search-btn',
		'search-open')

	// Функции открытия меню с блокировкой скролла
	function menuOpen(classes) {
		document.documentElement.classList.add(classes);
	}
	function menuClose(classes) {
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
function headerScroll() {
	const header = document.querySelector('.rs-header');
	const headerTag = document.querySelector('header');

	function headerClassAdd() {
		// 0 - на сколько скролим, чтобы дался класс
		header.classList.toggle('_header-scroll', window.scrollY > 0);
	}

	window.addEventListener('scroll', function () {
		headerClassAdd()
	})

	window.addEventListener('load', function () {
		headerClassAdd()

		if (!header.classList.contains('_header-white')) {
			headerTag.style.height = header.clientHeight + 'px';
		}
	})

	window.addEventListener('resize', function () {
		headerClassAdd()

		if (!header.classList.contains('_header-white')) {
			headerTag.style.height = header.clientHeight + 'px';
		}
	})
}
headerScroll()

/* ====================================
Мини-модальное для адреса 
(если оно слишком большое)
==================================== */
const modalAddress = () => {
	const locationBlock = document.querySelector('.rs-header__location');
	if (locationBlock) {
		const locationBlockText = locationBlock.querySelector('.rs-header__location_text');
		const locationBlockTextContent = locationBlockText.textContent.trim().length;
		const locationBlockTextQuantity = locationBlockText.dataset.quantitySymbol;

		console.log("Текст: " + locationBlockText.textContent);
		console.log("Количество букв: " + locationBlockTextContent);
		console.log("Ограничение: " + locationBlockTextQuantity);

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