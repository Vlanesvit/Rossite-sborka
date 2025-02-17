/* ====================================
Проверка поддержки webp, добавление класса webp или no-webp для HTML
==================================== */
function isWebp() {
	// Проверка поддержки webp
	function testWebP(callback) {
		let webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}
	// Добавление класса _webp или _no-webp для HTML
	testWebP(function (support) {
		let className = support === true ? 'webp' : 'no-webp';
		document.documentElement.classList.add(className);
	});
}
isWebp()

/* ====================================
Проверка мобильного браузера
==================================== */
let isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
/* Добавление класса touch для HTML если браузер мобильный */
function addTouchClass() {
	// Добавление класса _touch для HTML если браузер мобильный
	if (isMobile.any()) document.documentElement.classList.add('touch');
}
addTouchClass()

/* ====================================
Добавление loaded для HTML после полной загрузки страницы
==================================== */
function addLoadedClass() {
	window.addEventListener("load", function () {
		setTimeout(function () {
			document.documentElement.classList.add('loaded');
		}, 0);
	});
}
addLoadedClass()

/* ====================================
Работа с полями формы
==================================== */
// Работа с полями формы. Добавление классов, работа с placeholder
function formFieldsInit(options = { viewPass: false, autoHeight: false }) {
	// Если включено, добавляем функционал "скрыть плейсходлер при фокусе"
	const formFields = document.querySelectorAll('input[placeholder],textarea[placeholder]');
	if (formFields.length) {
		formFields.forEach(formField => {
			if (!formField.hasAttribute('data-placeholder-nohide')) {
				formField.dataset.placeholder = formField.placeholder;
			}
		});
	}
	document.body.addEventListener("focusin", function (e) {
		const targetElement = e.target;
		if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
			if (targetElement.dataset.placeholder) {
				targetElement.placeholder = '';
			}
			if (!targetElement.hasAttribute('data-no-focus-classes')) {
				targetElement.classList.add('_form-focus');
				targetElement.parentElement.classList.add('_form-focus');
			}
			formValidate.removeError(targetElement);
		}
	});
	document.body.addEventListener("focusout", function (e) {
		const targetElement = e.target;
		if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
			if (targetElement.dataset.placeholder) {
				targetElement.placeholder = targetElement.dataset.placeholder;
			}
			if (!targetElement.hasAttribute('data-no-focus-classes')) {
				targetElement.classList.remove('_form-focus');
				targetElement.parentElement.classList.remove('_form-focus');
			}
			// Моментальная валидация
			if (targetElement.hasAttribute('data-validate')) {
				formValidate.validateInput(targetElement);
			}
		}
	});
	// Если включено, добавляем функционал "Показать пароль"
	if (options.viewPass) {
		document.addEventListener("click", function (e) {
			let targetElement = e.target;
			if (targetElement.closest('[class*="__viewpass"]')) {
				let inputType = targetElement.classList.contains('_viewpass-active') ? "password" : "text";
				targetElement.parentElement.querySelector('input').setAttribute("type", inputType);
				targetElement.classList.toggle('_viewpass-active');
			}
		});
	}
	// Если включено, добавляем функционал "Автовысота"
	if (options.autoHeight) {
		const textareas = document.querySelectorAll('textarea[data-autoheight]');
		if (textareas.length) {
			textareas.forEach(textarea => {
				const startHeight = textarea.hasAttribute('data-autoheight-min') ?
					Number(textarea.dataset.autoheightMin) : Number(textarea.offsetHeight);
				const maxHeight = textarea.hasAttribute('data-autoheight-max') ?
					Number(textarea.dataset.autoheightMax) : Infinity;
				setHeight(textarea, Math.min(startHeight, maxHeight))
				textarea.addEventListener('input', () => {
					if (textarea.scrollHeight > startHeight) {
						textarea.style.height = `auto`;
						setHeight(textarea, Math.min(Math.max(textarea.scrollHeight, startHeight), maxHeight));
					}
				});
			});
			function setHeight(textarea, height) {
				textarea.style.height = `${height}px`;
			}
		}
	}

	const formLines = document.querySelectorAll('.form__line');
	formLines.forEach(formLine => {
		const formInput = formLine.querySelector('.rs-input')
		const formClear = formLine.querySelector('.rs-input-clear')
		if (formInput) {
			formInput.addEventListener('input', function () {
				if (formInput.value != '') {
					formClear.classList.add('_clear-active');
					formInput.parentElement.classList.add('_form-valid')
				} else {
					formClear.classList.remove('_clear-active');
					formInput.parentElement.classList.remove('_form-valid')
				}
			})
		}
		if (formClear) {
			formClear.addEventListener('click', function () {
				formInput.value = '';
				formClear.classList.remove('_clear-active');
				formInput.parentElement.classList.remove('_form-valid')
				formInput.focus()
			})
		}
	});
}
// Валидация форм
let formValidate = {
	getErrors(form) {
		let error = 0;
		let formRequiredItems = form.querySelectorAll('*[data-required]');
		if (formRequiredItems.length) {
			formRequiredItems.forEach(formRequiredItem => {
				if ((formRequiredItem.offsetParent !== null || formRequiredItem.tagName === "SELECT") && !formRequiredItem.disabled) {
					error += this.validateInput(formRequiredItem);
				}
			});
		}
		return error;
	},
	validateInput(formRequiredItem) {
		let error = 0;
		if (formRequiredItem.dataset.required === "email") {
			formRequiredItem.value = formRequiredItem.value.replace(" ", "");
			if (this.emailTest(formRequiredItem)) {
				this.addError(formRequiredItem);
				this.removeRight(formRequiredItem);
				error++;
			} else {
				this.removeError(formRequiredItem);
				this.addRight(formRequiredItem);
			}
		} else if (formRequiredItem.type === "checkbox" && !formRequiredItem.checked) {
			this.addError(formRequiredItem);
			this.removeRight(formRequiredItem);
			error++;
		} else {
			if (!formRequiredItem.value.trim()) {
				this.addError(formRequiredItem);
				this.removeRight(formRequiredItem);
				error++;
			} else {
				this.removeError(formRequiredItem);
				this.addRight(formRequiredItem);
			}
		}
		return error;
	},
	addError(formRequiredItem) {
		formRequiredItem.classList.add('_form-error');
		formRequiredItem.parentElement.classList.add('_form-error');
		let inputError = formRequiredItem.parentElement.querySelector('.form__error');
		if (inputError) formRequiredItem.parentElement.removeChild(inputError);
		if (formRequiredItem.dataset.error) {
			formRequiredItem.parentElement.insertAdjacentHTML('beforeend', `<div class="form__error">${formRequiredItem.dataset.error}</div>`);
		}
	},
	removeError(formRequiredItem) {
		formRequiredItem.classList.remove('_form-error');
		formRequiredItem.parentElement.classList.remove('_form-error');
		if (formRequiredItem.parentElement.querySelector('.form__error')) {
			formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector('.form__error'));
		}
	},
	addRight(formRequiredItem) {
		formRequiredItem.classList.add('_form-right');
		formRequiredItem.parentElement.classList.add('_form-right');
		let inputRight = formRequiredItem.parentElement.querySelector('.form__right');
		if (inputRight) formRequiredItem.parentElement.removeChild(inputRight);
		formRequiredItem.parentElement.insertAdjacentHTML('beforeend', `<div class="form__right"></div>`);
	},
	removeRight(formRequiredItem) {
		formRequiredItem.classList.remove('_form-right');
		formRequiredItem.parentElement.classList.remove('_form-right');
		if (formRequiredItem.parentElement.querySelector('.form__right')) {
			formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector('.form__right'));
		}
	},
	formClean(form) {
		form.reset();
		setTimeout(() => {
			let inputs = form.querySelectorAll('input,textarea');
			for (let index = 0; index < inputs.length; index++) {
				const el = inputs[index];
				el.parentElement.classList.remove('_form-focus');
				el.classList.remove('_form-focus');
				formValidate.removeError(el);
			}
			let checkboxes = form.querySelectorAll('.checkbox__input');
			if (checkboxes.length > 0) {
				for (let index = 0; index < checkboxes.length; index++) {
					const checkbox = checkboxes[index];
					checkbox.checked = false;
				}
			}
			if (flsModules.select) {
				let selects = form.querySelectorAll('.select');
				if (selects.length) {
					for (let index = 0; index < selects.length; index++) {
						const select = selects[index].querySelector('select');
						flsModules.select.selectBuild(select);
					}
				}
			}
		}, 0);
	},
	emailTest(formRequiredItem) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
	}
}
function formSubmit() {
	const forms = document.forms;
	console.log(forms.length);
	if (forms.length) {
		for (const form of forms) {
			form.addEventListener('submit', function (e) {
				const form = e.target;
				formSubmitAction(form, e);
			});
			form.addEventListener('reset', function (e) {
				const form = e.target;
				formValidate.formClean(form);
			});
		}
	}
	async function formSubmitAction(form, e) {
		const error = !form.hasAttribute('data-no-validate') ? formValidate.getErrors(form) : 0;
		if (error === 0) {
			const ajax = form.hasAttribute('data-ajax');
			if (ajax) { // Если режим ajax
				e.preventDefault();
				const formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : '#';
				const formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET';
				const formData = new FormData(form);

				form.classList.add('_sending');
				const response = await fetch(formAction, {
					method: formMethod,
					body: formData
				});
				if (response.ok) {
					let responseResult = await response.json();
					form.classList.remove('_sending');
					formSent(form, responseResult);
				} else {
					alert("Ошибка");
					form.classList.remove('_sending');
				}
			} else if (form.hasAttribute('data-dev')) {	// Если режим разработки
				e.preventDefault();
				formSent(form);
			}
		} else {
			e.preventDefault();
			if (form.querySelector('._form-error') && form.hasAttribute('data-goto-error')) {
				const formGoToErrorClass = form.dataset.gotoError ? form.dataset.gotoError : '._form-error';
				gotoBlock(formGoToErrorClass, true, 1000);
			}
		}
	}
	// Действия после отправки формы
	function formSent(form, responseResult = ``) {
		// Создаем событие отправки формы
		document.dispatchEvent(new CustomEvent("formSent", {
			detail: {
				form: form
			}
		}));
		// Показываем попап, если подключен модуль попапов
		// и для формы указана настройка
		setTimeout(() => {
			if (flsModules.popup) {
				const popup = form.dataset.popupMessage;
				popup ? flsModules.popup.open(popup) : null;
			}
		}, 0);
		// Очищаем форму
		formValidate.formClean(form);
	}
}
formFieldsInit({
	viewPass: false,
	autoHeight: false
});

/* ====================================
Спойлеры/аккордионы
==================================== */
/*
Для родителя слойлеров пишем атрибут data-spollers
Для заголовков слойлеров пишем атрибут data-spoller

Если нужно включать\выключать работу спойлеров на разных размерах экранов
пишем параметры ширины и типа брейкпоинта.
Например: 
data-spollers="992,max" - спойлеры будут работать только на экранах меньше или равно 992px
data-spollers="768,min" - спойлеры будут работать только на экранах больше или равно 768px

Если нужно что бы в блоке открывался болько один слойлер добавляем атрибут data-one-spoller
*/
function spollers() {
	const spollersArray = document.querySelectorAll('[data-spollers]');

	function spollerClassInit() {
		spollersArray.forEach(spoller => {
			if (spoller) {
				const spollersItem = spoller.querySelectorAll('[class*="_item"]')

				spoller.classList.add('spollers')

				spollersItem.forEach(item => {
					if (item) {
						const spollerTitle = item.querySelector('[class*="_title"]')
						const spollerBody = item.querySelector('[class*="_body"]')

						item.classList.add('spollers__item')
						if (spollerTitle) {
							spollerTitle.classList.add('spollers__title')
						}
						if (spollerBody) {
							spollerBody.classList.add('spollers__body')
						}
					}
				});
			}
		});
	}
	spollerClassInit()

	if (spollersArray.length > 0) {
		// Получение обычных слойлеров
		const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
			return !item.dataset.spollers.split(",")[0];
		});
		// Инициализация обычных слойлеров
		if (spollersRegular.length) {
			initSpollers(spollersRegular);
		}
		// Получение слойлеров с медиа запросами
		let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
		if (mdQueriesArray && mdQueriesArray.length) {
			mdQueriesArray.forEach(mdQueriesItem => {
				// Событие
				mdQueriesItem.matchMedia.addEventListener("change", function () {
					initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
				});
				initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
			});
		}
		// Инициализация
		function initSpollers(spollersArray, matchMedia = false) {
			spollersArray.forEach(spollersBlock => {
				spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
				if (matchMedia.matches || !matchMedia) {
					spollersBlock.classList.add('_spoller-init');
					initSpollerBody(spollersBlock);
					spollersBlock.addEventListener("click", setSpollerAction);
				} else {
					spollersBlock.classList.remove('_spoller-init');
					initSpollerBody(spollersBlock, false);
					spollersBlock.removeEventListener("click", setSpollerAction);
				}
			});
		}
		// Работа с контентом
		function initSpollerBody(spollersBlock, hideSpollerBody = true) {
			let spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
			if (spollerTitles.length) {
				spollerTitles = Array.from(spollerTitles).filter(item => item.closest('[data-spollers]') === spollersBlock);
				spollerTitles.forEach(spollerTitle => {
					if (hideSpollerBody) {
						spollerTitle.removeAttribute('tabindex');
						if (!spollerTitle.classList.contains('_spoller-active')) {
							spollerTitle.closest('.spollers__item').querySelector('.spollers__body').hidden = true;
						}
					} else {
						spollerTitle.setAttribute('tabindex', '-1');
						spollerTitle.closest('.spollers__item').querySelector('.spollers__body').hidden = false;
					}
				});
			}
		}
		function setSpollerAction(e) {
			const el = e.target;
			if (el.closest('[data-spoller]')) {
				const spollerTitle = el.closest('[data-spoller]');
				const spollersBlock = spollerTitle.closest('[data-spollers]');
				const oneSpoller = spollersBlock.hasAttribute('data-one-spoller');
				const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
				if (!spollersBlock.querySelectorAll('._slide').length) {
					if (oneSpoller && !spollerTitle.classList.contains('_spoller-active')) {
						hideSpollersBody(spollersBlock);
					}
					spollerTitle.classList.toggle('_spoller-active');
					_slideToggle(spollerTitle.closest('.spollers__item').querySelector('.spollers__body'), spollerSpeed);
				}
				e.preventDefault();
			}
		}
		function hideSpollersBody(spollersBlock) {
			const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._spoller-active');
			const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
			if (spollerActiveTitle && !spollersBlock.querySelectorAll('._slide').length) {
				spollerActiveTitle.classList.remove('_spoller-active');
				_slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
			}
		}
		// Закрытие при клике вне спойлера
		const spollersClose = document.querySelectorAll('[data-spoller-close]');
		if (spollersClose.length) {
			document.addEventListener("click", function (e) {
				const el = e.target;
				if (!el.closest('[data-spollers]')) {
					spollersClose.forEach(spollerClose => {
						const spollersBlock = spollerClose.closest('[data-spollers]');
						if (spollersBlock.classList.contains('_spoller-init')) {
							const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
							spollerClose.classList.remove('_spoller-active');
							_slideUp(spollerClose.nextElementSibling, spollerSpeed);
						}
					});
				}
			});
		}
	}
}
if (document.querySelector('[data-spollers]')) {
	spollers()
}

/* ====================================
Табы
==================================== */
/*
Для родителя табов пишем атрибут data-tabs
Для родителя заголовков табов пишем атрибут data-tabs-titles
Для родителя блоков табов пишем атрибут data-tabs-body
Для родителя блоков табов можно указать data-tabs-hash, это втключит добавление хеша

Если нужно чтобы табы открывались с анимацией 
добавляем к data-tabs data-tabs-animate
По умолчанию, скорость анимации 500ms, 
указать свою скорость можно так: data-tabs-animate="1000"

Если нужно чтобы табы превращались в "спойлеры", на неком размере экранов, пишем параметры ширины.
Например: data-tabs="992" - табы будут превращаться в спойлеры на экранах меньше или равно 992px
*/
function tabs() {
	const tabs = document.querySelectorAll('[data-tabs]');
	let tabsActiveHash = [];

	// Получаем хэш из URL
	const hash = getHash();
	if (hash && hash.startsWith('tab-')) {
		tabsActiveHash = hash.replace('tab-', '').split('-');
	}

	if (tabs.length > 0) {
		resetTabs();
		handleHashChange();

		// Отслеживание изменения хэша
		window.addEventListener('hashchange', handleHashChange);

		tabs.forEach((tabsBlock, index) => {
			tabsBlock.classList.add('_tab-init');
			tabsBlock.setAttribute('data-tabs-index', index);
			tabsBlock.addEventListener("click", setTabsAction);
			initTabs(tabsBlock);
		});
	}

	// Инициализация медиа-запросов
	let mdQueriesArray = dataMediaQueries(tabs, "tabs");
	if (mdQueriesArray && mdQueriesArray.length) {
		mdQueriesArray.forEach(mdQueriesItem => {
			mdQueriesItem.matchMedia.addEventListener("change", () => {
				setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
			});
			setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
		});
	}

	// Сброс вкладок
	function resetTabs() {
		document.querySelectorAll('._tab-active').forEach(el => el.classList.remove('_tab-active'));
	}

	// Функция обработки изменения хэша
	function handleHashChange() {
		const hash = getHash();
		if (hash && hash.startsWith('tab-')) {
			tabsActiveHash = hash.replace('tab-', '').split('-');
			const tabsBlockIndex = tabsActiveHash[0];
			const tabsTabIndex = tabsActiveHash[1];

			const tabsBlock = document.querySelector(`[data-tabs-index="${tabsBlockIndex}"]`);
			if (tabsBlock) {
				const tabTitles = tabsBlock.querySelectorAll('[data-tabs-title]');
				const tabItems = tabsBlock.querySelectorAll('[data-tabs-item]');

				if (tabTitles[tabsTabIndex] && tabItems[tabsTabIndex]) {
					tabsBlock.querySelectorAll('._tab-active').forEach(el => el.classList.remove('_tab-active'));
					tabItems[tabsTabIndex].querySelectorAll('._tab-active').forEach(el => el.classList.remove('_tab-active'));
					tabTitles[tabsTabIndex].classList.add('_tab-active');
					tabItems[tabsTabIndex].classList.add('_tab-active');
					// Плавный скролл к верху блока табов
					tabsBlock.scrollIntoView({ behavior: "smooth", block: "start" });
				}
			}
		}
	}

	// Инициализация табов
	function initTabs(tabsBlock) {
		const tabsTitles = tabsBlock.querySelectorAll('[data-tabs-titles] button');
		const tabsContent = tabsBlock.querySelectorAll('[data-tabs-body]>*');
		const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
		const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;

		if (tabsTitles.length > 0 && tabsContent.length > 0) {
			tabsContent.forEach((content, index) => {
				if (tabsTitles[index]) {
					tabsTitles[index].setAttribute('data-tabs-title', '');
					content.setAttribute('data-tabs-item', '');

					// Если хэш блока не совпадает, добавляем активный класс
					if (!tabsActiveHashBlock && index === 0) {
						tabsTitles[index].classList.add('_tab-active');
						content.classList.add('_tab-active');
					}

					if (tabsActiveHashBlock && index == tabsActiveHash[1]) {
						tabsTitles[index].classList.add('_tab-active');
						content.classList.add('_tab-active');
					}
				}
			});
		}
	}

	// Расстановка заголовков по медиа-запросам
	function setTitlePosition(tabsMediaArray, matchMedia) {
		tabsMediaArray.forEach(tabsMediaItem => {
			const tabsTitles = tabsMediaItem.item.querySelector('[data-tabs-titles]');
			const tabsContent = tabsMediaItem.item.querySelector('[data-tabs-body]');
			const tabTitles = Array.from(tabsMediaItem.item.querySelectorAll('[data-tabs-title]'));
			const tabItems = Array.from(tabsMediaItem.item.querySelectorAll('[data-tabs-item]'));

			if (matchMedia.matches) {
				tabItems.forEach((content, index) => {
					tabsContent.append(tabTitles[index]);
					tabsContent.append(content);
					tabsMediaItem.item.classList.add('_tab-spoller');
				});
			} else {
				tabTitles.forEach((title, index) => {
					tabsTitles.append(title);
					tabsMediaItem.item.classList.remove('_tab-spoller');
				});
			}
		});
	}

	// Обновление состояния табов
	function setTabsStatus(tabsBlock) {
		const tabsTitles = tabsBlock.querySelectorAll('[data-tabs-title]');
		const tabsContent = tabsBlock.querySelectorAll('[data-tabs-item]');
		const tabsBlockIndex = tabsBlock.dataset.tabsIndex;

		tabsContent.forEach((content, index) => {
			if (tabsTitles[index].classList.contains('_tab-active')) {
				content.classList.add('_tab-active');
				setHash(`tab-${tabsBlockIndex}-${index}`);
			} else {
				tabsTitles[index].classList.remove('_tab-active')
				content.classList.remove('_tab-active');
			}
		});
	}

	// Обработка кликов по заголовкам табов
	function setTabsAction(e) {
		const tabTitle = e.target.closest('[data-tabs-title]');
		if (tabTitle) {
			const tabsBlock = tabTitle.closest('[data-tabs]');
			if (!tabTitle.classList.contains('_tab-active') && !tabsBlock.querySelector('._slide')) {
				tabsBlock.querySelectorAll('[data-tabs-title]._tab-active').forEach(item => item.classList.remove('_tab-active'));
				tabTitle.classList.add('_tab-active');
				setTabsStatus(tabsBlock);
			}
			e.preventDefault();
			AOS.refresh()
		}
	}
}
if (document.querySelector('[data-tabs]')) {
	tabs()
}

/*
// Настройки
Для селекта (select):
class="имя класса" - модификатор к конкретному селекту
multiple - мультивыбор
data-class-modif= "имя модификатора"
data-tags - режим тегов, только для (только для multiple)
data-scroll - включит прокрутку для выпадающего списка, дополнительно можно подключить кастомный скролл simplebar в app.js. Указанное число для атрибута ограничит высоту
data-checkbox - стилизация элементов по checkbox (только для multiple)
data-show-selected - отключает скрытие выбранного элемента
data-search - позволяет искать по выпадающему списку
data-open - селект открыт сразу
data-submit - отправляет форму при изменении селекта
	
data-one-select - селекты внутри оболочки с атрибутом будут показываться только по одному
data-pseudo-label - добавляет псевдоэлемент к заголовку селекта с указанным текстом
	
Для плейсхолдера (Плейсхолдер - это option с value=""):
data-label для плейсхолдера, добавляет label к селекту
data-show для плейсхолдера, показывает его в списке (только для единичного выбора)
	
Для элемента (option):
data-class="имя класса" - добавляет класс
data-asset="путь к картинке или текст" - добавляет структуру 2х колонок и данными
data-href="адрес ссылки" - добавляет ссылку в элемент списка
data-href-blank - откроет ссылку в новом окне
*/

// Класс построения Select
(() => {
	"use strict";
	const modules = {};
	class SelectConstructor {
		constructor(props, data = null) {
			let defaultConfig = {
				init: true,
				logging: true
			};
			this.config = Object.assign(defaultConfig, props);
			this.selectClasses = {
				classSelect: "select",
				classSelectBody: "select__body",
				classSelectTitle: "select__title",
				classSelectValue: "select__value",
				classSelectLabel: "select__label",
				classSelectInput: "select__input",
				classSelectText: "select__text",
				classSelectLink: "select__link",
				classSelectOptions: "select__options",
				classSelectOptionsScroll: "select__scroll",
				classSelectOption: "select__option",
				classSelectContent: "select__content",
				classSelectRow: "select__row",
				classSelectData: "select__asset",
				classSelectDisabled: "_select-disabled",
				classSelectTag: "_select-tag",
				classSelectOpen: "_select-open",
				classSelectActive: "_select-active",
				classSelectFocus: "_select-focus",
				classSelectMultiple: "_select-multiple",
				classSelectCheckBox: "_select-checkbox",
				classSelectOptionSelected: "_select-selected",
				classSelectPseudoLabel: "_select-pseudo-label"
			};
			this._this = this;
			if (this.config.init) {
				const selectItems = data ? document.querySelectorAll(data) : document.querySelectorAll("select.select__emulator");
				if (selectItems.length) {
					this.selectsInit(selectItems);
				}
			}
		}
		getSelectClass(className) {
			return `.${className}`;
		}
		getSelectElement(selectItem, className) {
			return {
				originalSelect: selectItem.querySelector("select.select__emulator"),
				selectElement: selectItem.querySelector(this.getSelectClass(className))
			};
		}
		selectsInit(selectItems) {
			selectItems.forEach(((originalSelect, index) => {
				this.selectInit(originalSelect, index + 1);
			}));
			document.addEventListener("click", function (e) {
				this.selectsActions(e);
			}.bind(this));
			document.addEventListener("keydown", function (e) {
				this.selectsActions(e);
			}.bind(this));
			document.addEventListener("focusin", function (e) {
				this.selectsActions(e);
			}.bind(this));
			document.addEventListener("focusout", function (e) {
				this.selectsActions(e);
			}.bind(this));
		}
		selectInit(originalSelect, index) {
			const _this = this;
			let selectItem = document.createElement("div");
			selectItem.classList.add(this.selectClasses.classSelect);
			originalSelect.parentNode.insertBefore(selectItem, originalSelect);
			selectItem.appendChild(originalSelect);
			originalSelect.hidden = true;
			index ? originalSelect.dataset.id = index : null;
			if (this.getSelectPlaceholder(originalSelect)) {
				originalSelect.dataset.placeholder = this.getSelectPlaceholder(originalSelect).value;
				if (this.getSelectPlaceholder(originalSelect).label.show) {
					const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
					selectItemTitle.insertAdjacentHTML("afterbegin", `<span class="${this.selectClasses.classSelectLabel}">${this.getSelectPlaceholder(originalSelect).label.text ? this.getSelectPlaceholder(originalSelect).label.text : this.getSelectPlaceholder(originalSelect).value}</span>`);
				}
			}
			selectItem.insertAdjacentHTML("beforeend", `<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions}"></div></div>`);
			this.selectBuild(originalSelect);
			originalSelect.dataset.speed = originalSelect.dataset.speed ? originalSelect.dataset.speed : "150";
			originalSelect.addEventListener("change", (function (e) {
				_this.selectChange(e);
			}));
		}
		selectBuild(originalSelect) {
			const selectItem = originalSelect.parentElement;
			selectItem.dataset.id = originalSelect.dataset.id;
			originalSelect.dataset.classModif ? selectItem.classList.add(`select_${originalSelect.dataset.classModif}`) : null;
			originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectMultiple) : selectItem.classList.remove(this.selectClasses.classSelectMultiple);
			originalSelect.hasAttribute("data-checkbox") && originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectCheckBox) : selectItem.classList.remove(this.selectClasses.classSelectCheckBox);
			this.setSelectTitleValue(selectItem, originalSelect);
			this.setOptions(selectItem, originalSelect);
			originalSelect.hasAttribute("data-search") ? this.searchActions(selectItem) : null;
			originalSelect.hasAttribute("data-open") ? this.selectAction(selectItem) : null;
			this.selectDisabled(selectItem, originalSelect);
		}
		selectsActions(e) {
			const targetElement = e.target;
			const targetType = e.type;
			if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect)) || targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
				const selectItem = targetElement.closest(".select") ? targetElement.closest(".select") : document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag)).dataset.selectId}"]`);
				const originalSelect = this.getSelectElement(selectItem).originalSelect;
				if ("click" === targetType) {
					if (!originalSelect.disabled) if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
						const targetTag = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag));
						const optionItem = document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetTag.dataset.selectId}"] .select__option[data-value="${targetTag.dataset.value}"]`);
						this.optionAction(selectItem, originalSelect, optionItem);
					} else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTitle))) this.selectAction(selectItem); else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption))) {
						const optionItem = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption));
						this.optionAction(selectItem, originalSelect, optionItem);
					}
				} else if ("focusin" === targetType || "focusout" === targetType) {
					if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect))) "focusin" === targetType ? selectItem.classList.add(this.selectClasses.classSelectFocus) : selectItem.classList.remove(this.selectClasses.classSelectFocus);
				} else if ("keydown" === targetType && "Escape" === e.code) this.selectsСlose();
			} else this.selectsСlose();
		}
		selectsСlose(selectOneGroup) {
			const selectsGroup = selectOneGroup ? selectOneGroup : document;
			const selectActiveItems = selectsGroup.querySelectorAll(`${this.getSelectClass(this.selectClasses.classSelect)}${this.getSelectClass(this.selectClasses.classSelectOpen)}`);
			if (selectActiveItems.length) selectActiveItems.forEach((selectActiveItem => {
				this.selectСlose(selectActiveItem);
			}));
		}
		selectСlose(selectItem) {
			const originalSelect = this.getSelectElement(selectItem).originalSelect;
			const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
			if (!selectOptions.classList.contains("_slide")) {
				selectItem.classList.remove(this.selectClasses.classSelectOpen);
				_slideUp(selectOptions, originalSelect.dataset.speed);
			}
		}
		selectAction(selectItem) {
			const originalSelect = this.getSelectElement(selectItem).originalSelect;
			const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
			if (originalSelect.closest("[data-one-select]")) {
				const selectOneGroup = originalSelect.closest("[data-one-select]");
				this.selectsСlose(selectOneGroup);
			}
			if (!selectOptions.classList.contains("_slide")) {
				selectItem.classList.toggle(this.selectClasses.classSelectOpen);
				_slideToggle(selectOptions, originalSelect.dataset.speed);
			}
		}
		setSelectTitleValue(selectItem, originalSelect) {
			const selectItemBody = this.getSelectElement(selectItem, this.selectClasses.classSelectBody).selectElement;
			const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
			if (selectItemTitle) selectItemTitle.remove();
			selectItemBody.insertAdjacentHTML("afterbegin", this.getSelectTitleValue(selectItem, originalSelect));
		}
		getSelectTitleValue(selectItem, originalSelect) {
			let selectTitleValue = this.getSelectedOptionsData(originalSelect, 2).html;
			if (originalSelect.multiple && originalSelect.hasAttribute("data-tags")) {
				selectTitleValue = this.getSelectedOptionsData(originalSelect).elements.map((option => `<span role="button" data-select-id="${selectItem.dataset.id}" data-value="${option.value}" class="_select-tag">${this.getSelectElementContent(option)}</span>`)).join("");
				if (originalSelect.dataset.tags && document.querySelector(originalSelect.dataset.tags)) {
					document.querySelector(originalSelect.dataset.tags).innerHTML = selectTitleValue;
					if (originalSelect.hasAttribute("data-search")) selectTitleValue = false;
				}
			}
			selectTitleValue = selectTitleValue.length ? selectTitleValue : originalSelect.dataset.placeholder ? originalSelect.dataset.placeholder : "";
			let pseudoAttribute = "";
			let pseudoAttributeClass = "";
			if (originalSelect.hasAttribute("data-pseudo-label")) {
				pseudoAttribute = originalSelect.dataset.pseudoLabel ? ` data-pseudo-label="${originalSelect.dataset.pseudoLabel}"` : ` data-pseudo-label="Заполните атрибут"`;
				pseudoAttributeClass = ` ${this.selectClasses.classSelectPseudoLabel}`;
			}
			this.getSelectedOptionsData(originalSelect).values.length ? selectItem.classList.add(this.selectClasses.classSelectActive) : selectItem.classList.remove(this.selectClasses.classSelectActive);
			if (originalSelect.hasAttribute("data-search")) return `<div class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}"><input autocomplete="off" type="text" placeholder="${selectTitleValue}" data-placeholder="${selectTitleValue}" class="${this.selectClasses.classSelectInput}"></span></div>`; else {
				const customClass = this.getSelectedOptionsData(originalSelect).elements.length && this.getSelectedOptionsData(originalSelect).elements[0].dataset.class ? ` ${this.getSelectedOptionsData(originalSelect).elements[0].dataset.class}` : "";
				return `<button type="button" class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}${pseudoAttributeClass}"><span class="${this.selectClasses.classSelectContent}${customClass}">${selectTitleValue}</span></span></button>`;
			}
		}
		getSelectElementContent(selectOption) {
			const selectOptionData = selectOption.dataset.asset ? `${selectOption.dataset.asset}` : "";
			const selectOptionDataHTML = selectOptionData.indexOf("img") >= 0 ? `<img src="${selectOptionData}" alt="">` : selectOptionData;
			let selectOptionContentHTML = ``;
			selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectRow}">` : "";
			selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectData}">` : "";
			selectOptionContentHTML += selectOptionData ? selectOptionDataHTML : "";
			selectOptionContentHTML += selectOptionData ? `</span>` : "";
			selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectText}">` : "";
			selectOptionContentHTML += selectOption.textContent;
			selectOptionContentHTML += selectOptionData ? `</span>` : "";
			selectOptionContentHTML += selectOptionData ? `</span>` : "";
			return selectOptionContentHTML;
		}
		getSelectPlaceholder(originalSelect) {
			const selectPlaceholder = Array.from(originalSelect.options).find((option => !option.value));
			if (selectPlaceholder) return {
				value: selectPlaceholder.textContent,
				show: selectPlaceholder.hasAttribute("data-show"),
				label: {
					show: selectPlaceholder.hasAttribute("data-label"),
					text: selectPlaceholder.dataset.label
				}
			};
		}
		getSelectedOptionsData(originalSelect, type) {
			let selectedOptions = [];
			if (originalSelect.multiple) selectedOptions = Array.from(originalSelect.options).filter((option => option.value)).filter((option => option.selected)); else selectedOptions.push(originalSelect.options[originalSelect.selectedIndex]);
			return {
				elements: selectedOptions.map((option => option)),
				values: selectedOptions.filter((option => option.value)).map((option => option.value)),
				html: selectedOptions.map((option => this.getSelectElementContent(option)))
			};
		}
		getOptions(originalSelect) {
			let selectOptionsScroll = originalSelect.hasAttribute("data-scroll") ? `data-simplebar` : "";
			let selectOptionsScrollHeight = originalSelect.dataset.scroll ? `style="max-height:${originalSelect.dataset.scroll}px"` : "";
			let selectOptions = Array.from(originalSelect.options);
			if (selectOptions.length > 0) {
				let selectOptionsHTML = ``;
				if (this.getSelectPlaceholder(originalSelect) && !this.getSelectPlaceholder(originalSelect).show || originalSelect.multiple) selectOptions = selectOptions.filter((option => option.value));
				selectOptionsHTML += selectOptionsScroll ? `<div ${selectOptionsScroll} ${selectOptionsScrollHeight} class="${this.selectClasses.classSelectOptionsScroll}">` : "";
				selectOptions.forEach((selectOption => {
					selectOptionsHTML += this.getOption(selectOption, originalSelect);
				}));
				selectOptionsHTML += selectOptionsScroll ? `</div>` : "";
				return selectOptionsHTML;
			}
		}
		getOption(selectOption, originalSelect) {
			const selectOptionSelected = selectOption.selected && originalSelect.multiple ? ` ${this.selectClasses.classSelectOptionSelected}` : "";
			const selectOptionHide = selectOption.selected && !originalSelect.hasAttribute("data-show-selected") && !originalSelect.multiple ? `hidden` : ``;
			const selectOptionClass = selectOption.dataset.class ? ` ${selectOption.dataset.class}` : "";
			const selectOptionLink = selectOption.dataset.href ? selectOption.dataset.href : false;
			const selectOptionLinkTarget = selectOption.hasAttribute("data-href-blank") ? `target="_blank"` : "";
			let selectOptionHTML = ``;
			selectOptionHTML += selectOptionLink ? `<a ${selectOptionLinkTarget} ${selectOptionHide} href="${selectOptionLink}" data-value="${selectOption.value}" class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}">` : `<button ${selectOptionHide} class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}" data-value="${selectOption.value}" type="button">`;
			selectOptionHTML += this.getSelectElementContent(selectOption);
			selectOptionHTML += selectOptionLink ? `</a>` : `</button>`;
			return selectOptionHTML;
		}
		setOptions(selectItem, originalSelect) {
			const selectItemOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
			selectItemOptions.innerHTML = this.getOptions(originalSelect);
		}
		optionAction(selectItem, originalSelect, optionItem) {
			if (originalSelect.multiple) {
				optionItem.classList.toggle(this.selectClasses.classSelectOptionSelected);
				const originalSelectSelectedItems = this.getSelectedOptionsData(originalSelect).elements;
				originalSelectSelectedItems.forEach((originalSelectSelectedItem => {
					originalSelectSelectedItem.removeAttribute("selected");
				}));
				const selectSelectedItems = selectItem.querySelectorAll(this.getSelectClass(this.selectClasses.classSelectOptionSelected));
				selectSelectedItems.forEach((selectSelectedItems => {
					originalSelect.querySelector(`option[value="${selectSelectedItems.dataset.value}"]`).setAttribute("selected", "selected");
				}));
			} else {
				if (!originalSelect.hasAttribute("data-show-selected")) {
					if (selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`)) selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`).hidden = false;
					optionItem.hidden = true;
				}
				originalSelect.value = optionItem.hasAttribute("data-value") ? optionItem.dataset.value : optionItem.textContent;
				this.selectAction(selectItem);
			}
			this.setSelectTitleValue(selectItem, originalSelect);
			this.setSelectChange(originalSelect);

			if (document.documentElement.classList.contains('sort-open')) {
				document.documentElement.classList.remove('sort-open');
			}
		}
		selectChange(e) {
			const originalSelect = e.target;
			this.selectBuild(originalSelect);
			this.setSelectChange(originalSelect);
		}
		setSelectChange(originalSelect) {
			if (originalSelect.hasAttribute("data-validate")) formValidate.validateInput(originalSelect);
			if (originalSelect.hasAttribute("data-submit") && originalSelect.value) {
				let tempButton = document.createElement("button");
				tempButton.type = "submit";
				originalSelect.closest("form").append(tempButton);
				tempButton.click();
				tempButton.remove();
			}
			const selectItem = originalSelect.parentElement;
			this.selectCallback(selectItem, originalSelect);
		}
		selectDisabled(selectItem, originalSelect) {
			if (originalSelect.disabled) {
				selectItem.classList.add(this.selectClasses.classSelectDisabled);
				this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = true;
			} else {
				selectItem.classList.remove(this.selectClasses.classSelectDisabled);
				this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = false;
			}
		}
		searchActions(selectItem) {
			this.getSelectElement(selectItem).originalSelect;
			const selectInput = this.getSelectElement(selectItem, this.selectClasses.classSelectInput).selectElement;
			const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
			const selectOptionsItems = selectOptions.querySelectorAll(`.${this.selectClasses.classSelectOption}`);
			const _this = this;
			selectInput.addEventListener("input", (function () {
				selectOptionsItems.forEach((selectOptionsItem => {
					if (selectOptionsItem.textContent.toUpperCase().indexOf(selectInput.value.toUpperCase()) >= 0) selectOptionsItem.hidden = false; else selectOptionsItem.hidden = true;
				}));
				true === selectOptions.hidden ? _this.selectAction(selectItem) : null;
			}));
		}
		selectCallback(selectItem, originalSelect) {
			document.dispatchEvent(new CustomEvent("selectCallback", {
				detail: {
					select: originalSelect
				}
			}));
		}
	}
	modules.select = new SelectConstructor({});
})();
function oneSelect() {
	const selectOneSelects = document.querySelectorAll('.select_one-select');
	selectOneSelects.forEach(select => {
		const selectOptions = select.querySelectorAll('.select__options .select__option');

		selectOptions.forEach(option => {
			option.addEventListener('click', function () {
				selectOptions.forEach(option => {
					option.classList.remove('_select-selected')
				});
				this.classList.add('_select-selected')
			})
		});
	});
}
if (document.querySelector('.select_one-select')) {
	oneSelect()
}

/* ====================================
Модальное окно
==================================== */
(() => {
	"use strict";
	const modules = {};
	class Popup {
		constructor(options) {
			let config = {
				logging: true,
				init: true,
				// Для кнопок 
				attributeOpenButton: 'data-popup', // Атрибут для кнопки, которая вызывает попап
				attributeCloseButton: 'data-close', // Атрибут для кнопки, которая закрывает попап
				// Для сторонних объектов
				fixElementSelector: '[data-lp]', // Атрибут для элементов с левым паддингом (которые fixed)
				// Для объекта попапа
				youtubeAttribute: 'data-popup-youtube', // Атрибут для кода youtube
				youtubePlaceAttribute: 'data-popup-youtube-place', // Атрибут для вставки ролика youtube
				setAutoplayYoutube: true,
				// Изменение классов
				classes: {
					popup: 'popup',
					// popupWrapper: 'popup__wrapper',
					popupContent: 'popup__content',
					popupActive: 'popup_show', // Добавляется для попапа, когда он открывается
					bodyActive: 'popup-show', // Добавляется для боди, когда попап открыт
				},
				focusCatch: false, // Фокус внутри попапа зациклен
				closeEsc: true, // Закрытие по ESC
				bodyLock: true, // Блокировка скролла
				hashSettings: {
					location: true, // Хэш в адресной строке
					goHash: true, // Переход по наличию в адресной строке
				},
				on: { // События
					beforeOpen: function () { },
					afterOpen: function () { },
					beforeClose: function () { },
					afterClose: function () { },
				},
			}
			this.youTubeCode;
			this.isOpen = false;
			// Текущее окно
			this.targetOpen = {
				selector: false,
				element: false,
			}
			// Предыдущее открытое
			this.previousOpen = {
				selector: false,
				element: false,
			}
			// Последнее закрытое
			this.lastClosed = {
				selector: false,
				element: false,
			}
			this._dataValue = false;
			this.hash = false;

			this._reopen = false;
			this._selectorOpen = false;

			this.lastFocusEl = false;
			this._focusEl = [
				'a[href]',
				'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
				'button:not([disabled]):not([aria-hidden])',
				'select:not([disabled]):not([aria-hidden])',
				'textarea:not([disabled]):not([aria-hidden])',
				'area[href]',
				'iframe',
				'object',
				'embed',
				'[contenteditable]',
				'[tabindex]:not([tabindex^="-"])'
			];
			//this.options = Object.assign(config, options);
			this.options = {
				...config,
				...options,
				classes: {
					...config.classes,
					...options?.classes,
				},
				hashSettings: {
					...config.hashSettings,
					...options?.hashSettings,
				},
				on: {
					...config.on,
					...options?.on,
				}
			}
			this.bodyLock = false;
			this.options.init ? this.initPopups() : null
		}
		initPopups() {
			this.eventsPopup();
		}
		eventsPopup() {
			// Клик на всем документе
			document.addEventListener("click", function (e) {
				// Клик по кнопке "открыть"
				const buttonOpen = e.target.closest(`[${this.options.attributeOpenButton}]`);
				if (buttonOpen) {
					e.preventDefault();
					this._dataValue = buttonOpen.getAttribute(this.options.attributeOpenButton) ?
						buttonOpen.getAttribute(this.options.attributeOpenButton) :
						'error';
					this.youTubeCode = buttonOpen.getAttribute(this.options.youtubeAttribute) ?
						buttonOpen.getAttribute(this.options.youtubeAttribute) :
						null;
					if (this._dataValue !== 'error') {
						if (!this.isOpen) this.lastFocusEl = buttonOpen;
						this.targetOpen.selector = `${this._dataValue}`;
						this._selectorOpen = true;
						this.open();
						return;

					}

					return;
				}
				// Закрытие на пустом месте (popup__wrapper) и кнопки закрытия (popup__close) для закрытия
				const buttonClose = e.target.closest(`[${this.options.attributeCloseButton}]`);
				if (buttonClose || !e.target.closest(`.${this.options.classes.popupContent}`) && this.isOpen) {
					e.preventDefault();
					this.close();
					return;
				}
			}.bind(this));
			// Закрытие по ESC
			document.addEventListener("keydown", function (e) {
				if (this.options.closeEsc && e.which == 27 && e.code === 'Escape' && this.isOpen) {
					e.preventDefault();
					this.close();
					return;
				}
				if (this.options.focusCatch && e.which == 9 && this.isOpen) {
					this._focusCatch(e);
					return;
				}
			}.bind(this))

			// Открытие по хешу
			if (this.options.hashSettings.goHash) {
				// Проверка изменения адресной строки
				window.addEventListener('hashchange', function () {
					if (window.location.hash) {
						this._openToHash();

					} else {
						this.close(this.targetOpen.selector);

					}
				}.bind(this))

				window.addEventListener('load', function () {
					if (window.location.hash) {
						this._openToHash();
					}
				}.bind(this))
			}
		}
		open(selectorValue) {
			if (bodyLockStatus) {
				// Если перед открытием попапа был режим lock
				this.bodyLock = document.documentElement.classList.contains('lock') && !this.isOpen ? true : false;

				// Если ввести значение селектора (селектор настраивается в options)
				if (selectorValue && typeof (selectorValue) === "string" && selectorValue.trim() !== "") {
					this.targetOpen.selector = selectorValue;
					this._selectorOpen = true;
				}
				if (this.isOpen) {
					this._reopen = true;
					this.close();
				}
				if (!this._selectorOpen) this.targetOpen.selector = this.lastClosed.selector;
				if (!this._reopen) this.previousActiveElement = document.activeElement;

				this.targetOpen.element = document.querySelector(this.targetOpen.selector);

				if (this.targetOpen.element) {
					// YouTube
					if (this.youTubeCode) {
						const codeVideo = this.youTubeCode;
						const urlVideo = `https://www.youtube.com/embed/${codeVideo}?rel=0&showinfo=0&autoplay=1`
						const iframe = document.createElement('iframe');
						iframe.setAttribute('allowfullscreen', '');

						const autoplay = this.options.setAutoplayYoutube ? 'autoplay;' : '';
						iframe.setAttribute('allow', `${autoplay}; encrypted-media`);

						iframe.setAttribute('src', urlVideo);

						if (!this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) {
							const youtubePlace = this.targetOpen.element.querySelector('.popup__text').setAttribute(`${this.options.youtubePlaceAttribute}`, '');
						}
						this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).appendChild(iframe);
					}
					if (this.options.hashSettings.location) {
						// Получение хэша и его выставление 
						this._getHash();
						this._setHash();
					}

					// До открытия
					this.options.on.beforeOpen(this);
					// Создаем свое событие после открытия попапа
					document.dispatchEvent(new CustomEvent("beforePopupOpen", {
						detail: {
							popup: this
						}
					}));

					this.targetOpen.element.classList.add(this.options.classes.popupActive);
					document.documentElement.classList.add(this.options.classes.bodyActive);

					if (!this._reopen) {
						!this.bodyLock ? bodyLock() : null;
					}
					else this._reopen = false;

					this.targetOpen.element.setAttribute('aria-hidden', 'false');

					// Запоминаю это открытое окно. Оно будет последним открытым
					this.previousOpen.selector = this.targetOpen.selector;
					this.previousOpen.element = this.targetOpen.element;

					this._selectorOpen = false;

					this.isOpen = true;

					setTimeout(() => {
						this._focusTrap();
					}, 50);

					// После открытия
					this.options.on.afterOpen(this);
					// Создаем свое событие после открытия попапа
					document.dispatchEvent(new CustomEvent("afterPopupOpen", {
						detail: {
							popup: this
						}
					}));
				}
			}
		}
		close(selectorValue) {
			if (selectorValue && typeof (selectorValue) === "string" && selectorValue.trim() !== "") {
				this.previousOpen.selector = selectorValue;
			}
			if (!this.isOpen || !bodyLockStatus) {
				return;
			}
			// До закрытия
			this.options.on.beforeClose(this);
			// Создаем свое событие перед закрытием попапа
			document.dispatchEvent(new CustomEvent("beforePopupClose", {
				detail: {
					popup: this
				}
			}));

			// YouTube
			if (this.youTubeCode) {
				if (this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`))
					this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).innerHTML = '';
			}
			this.previousOpen.element.classList.remove(this.options.classes.popupActive);
			// aria-hidden
			this.previousOpen.element.setAttribute('aria-hidden', 'true');
			if (!this._reopen) {
				document.documentElement.classList.remove(this.options.classes.bodyActive);
				!this.bodyLock ? bodyUnlock() : null;
				this.isOpen = false;
			}
			// Очищение адресной строки
			this._removeHash();
			if (this._selectorOpen) {
				this.lastClosed.selector = this.previousOpen.selector;
				this.lastClosed.element = this.previousOpen.element;

			}
			// После закрытия
			this.options.on.afterClose(this);
			// Создаем свое событие после закрытия попапа
			document.dispatchEvent(new CustomEvent("afterPopupClose", {
				detail: {
					popup: this
				}
			}));

			setTimeout(() => {
				this._focusTrap();
			}, 50);
		}
		// Получение хэша 
		_getHash() {
			if (this.options.hashSettings.location) {
				this.hash = this.targetOpen.selector.includes('#') ?
					this.targetOpen.selector : this.targetOpen.selector.replace('.', '#')
			}
		}
		_openToHash() {
			let classInHash = document.querySelector(`.${window.location.hash.replace('#', '')}`) ? `.${window.location.hash.replace('#', '')}` :
				document.querySelector(`${window.location.hash}`) ? `${window.location.hash}` :
					null;

			// const buttons = document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) ? document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) : document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash.replace('.', "#")}"]`);
			if (classInHash) this.open(classInHash);
		}
		// Утсановка хэша
		_setHash() {
			history.pushState('', '', this.hash);
		}
		_removeHash() {
			history.pushState('', '', window.location.href.split('#')[0])
		}
		_focusCatch(e) {
			const focusable = this.targetOpen.element.querySelectorAll(this._focusEl);
			const focusArray = Array.prototype.slice.call(focusable);
			const focusedIndex = focusArray.indexOf(document.activeElement);

			if (e.shiftKey && focusedIndex === 0) {
				focusArray[focusArray.length - 1].focus();
				e.preventDefault();
			}
			if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
				focusArray[0].focus();
				e.preventDefault();
			}
		}
		_focusTrap() {
			const focusable = this.previousOpen.element.querySelectorAll(this._focusEl);
			if (!this.isOpen && this.lastFocusEl) {
				this.lastFocusEl.focus();
			} else {
				focusable[0].focus();
			}
		}
	}
	modules.popup = new Popup({});
})();

/* ====================================
Заполнение блока
==================================== */
const addAnimFillHover = (hoveredElement) => {
	const animItems = document.querySelectorAll(hoveredElement);
	if (animItems.length > 0) {
		animItems.forEach((item) => {
			item.style.position = "relative";
			item.style.overflow = "hidden";

			const ripple = document.createElement("span");
			ripple.classList.add('_fill-point')
			item.appendChild(ripple);
			item.addEventListener("mouseenter", (e) => {
				let targetCoords = e.currentTarget.getBoundingClientRect();
				let yCoord = e.clientY - targetCoords.top;
				let xCoord = e.clientX - targetCoords.left;
				ripple.style.top = `${yCoord}px`;
				ripple.style.left = `${xCoord}px`;
				ripple.classList.add('_fill-active');
			});

			item.addEventListener('mouseleave', function (e) {
				let targetCoords = e.currentTarget.getBoundingClientRect();
				let yCoord = e.clientY - targetCoords.top;
				let xCoord = e.clientX - targetCoords.left;
				ripple.style.top = `${yCoord}px`;
				ripple.style.left = `${xCoord}px`;
				ripple.classList.remove('_fill-active');
			})
		});
	}
}
addAnimFillHover('.rs-features-img__item')
addAnimFillHover('.rs-slider-block__item.rs-albom')

function addAnimText() {
	const sliderBlocks = document.querySelectorAll(".rs-slider-block__item");
	if (sliderBlocks.length > 0) {
		sliderBlocks.forEach(sliderBlock => {
			const textBlock = sliderBlock.querySelector(".rs-slider-block__desc-text");
			if (textBlock) {
				const textHeight = textBlock.scrollHeight;

				sliderBlock.style.cssText = `--h: -${textHeight + "px"}`;
			}
		});
	}
}
/* ====================================
Кастомный курсор
==================================== */
const addCursorHover = (hoveredElement, selectedElement, newClass) => {
	if (document.querySelector(hoveredElement) && document.querySelector(selectedElement)) {
		document.querySelectorAll(hoveredElement).forEach(hover => {
			hover.addEventListener('mouseenter', function () {
				document.querySelector(selectedElement).classList.add(newClass)
				hover.classList.add('_mouse-event')
			})

			hover.addEventListener('mouseleave', function () {
				document.querySelector(selectedElement).classList.remove(newClass)
				hover.classList.remove('_mouse-event')
			})

			hover.addEventListener('mousemove', function () {
				document.querySelector(selectedElement).classList.add(newClass)
			})
		});
	}
}
const addCursorDrag = (hoveredElement, selectedElement, newClass) => {
	if (document.querySelector(hoveredElement) && document.querySelector(selectedElement)) {
		document.querySelectorAll(hoveredElement).forEach(hover => {
			hover.addEventListener('mousedown', function () {
				document.querySelector(selectedElement).classList.add(newClass)
			})
		});
		document.body.addEventListener('mouseup', function () {
			document.querySelector(selectedElement).classList.remove(newClass)
		})
	}
}
const addCursorMove = (hoveredElement, selectedElement) => {
	document.body.addEventListener('mousemove', function (e) {
		if (document.querySelector(hoveredElement) && document.querySelector(selectedElement)) {
			document.querySelector(selectedElement).style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
		}
	});
}

addCursorHover(".rs-gallery.rs-photo .rs-gallery__item", ".rs-gallery.rs-photo .cursor", "cursor__active");
addCursorDrag(".rs-gallery.rs-photo .rs-gallery__item", ".rs-gallery.rs-photo .cursor__circle", "cursor__circle__drag");
addCursorMove(".rs-gallery.rs-photo .rs-gallery__item", ".rs-gallery.rs-photo .cursor__circle")

addCursorHover(".rs-gallery.rs-video .rs-gallery__item", ".rs-gallery.rs-video .cursor", "cursor__active");
addCursorDrag(".rs-gallery.rs-video .rs-gallery__item", ".rs-gallery.rs-video .cursor__circle", "cursor__circle__drag");
addCursorMove(".rs-gallery.rs-video .rs-gallery__item", ".rs-gallery.rs-video .cursor__circle")

addCursorHover(".rs-tabs .tabs__body .tabs__gallery_item", ".rs-tabs .cursor", "cursor__active");
addCursorDrag(".rs-tabs .tabs__body .tabs__gallery_item", ".rs-tabs .cursor__circle", "cursor__circle__drag");
addCursorMove(".rs-tabs .tabs__body .tabs__gallery_item", ".rs-tabs .cursor__circle")

addCursorHover(".rs-news .rs-news__item", ".rs-news .cursor", "cursor__active");
addCursorDrag(".rs-news .rs-news__item", ".rs-news .cursor__circle", "cursor__circle__drag");
addCursorMove(".rs-news .rs-news__item", ".rs-news .cursor__circle")

/* ====================================
Инициализация галереи
==================================== */
Fancybox.bind("[data-fancybox]", {
	// Your custom options
	// compact: false,
	// idle: false,

	// animated: false,
	// showClass: false,
	// hideClass: false,

	// dragToClose: false,
	// contentClick: false,

	// Images: {
	// 	// Disable animation from/to thumbnail on start/close
	// 	zoom: false,
	// },

	Thumbs: {
		type: 'classic',
	},

	// Toolbar: {
	// 	display: {
	// 		left: [],
	// 		middle: ['infobar'],
	// 		right: ['close'],
	// 	},
	// },
});

/* ====================================
Добавить картинкам draggable="false"
==================================== */
const imgs = document.getElementsByTagName('img');
for (let i = 0; i < imgs.length; i++) {
	imgs[i].setAttribute('draggable', false);
}

// Обработа медиа запросов из атрибутов 
function dataMediaQueries(array, dataSetValue) {
	// Получение объектов с медиа запросами
	const media = Array.from(array).filter(function (item, index, self) {
		if (item.dataset[dataSetValue]) {
			return item.dataset[dataSetValue].split(",")[0];
		}
	});
	// Инициализация объектов с медиа запросами
	if (media.length) {
		const breakpointsArray = [];
		media.forEach(item => {
			const params = item.dataset[dataSetValue];
			const breakpoint = {};
			const paramsArray = params.split(",");
			breakpoint.value = paramsArray[0];
			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
			breakpoint.item = item;
			breakpointsArray.push(breakpoint);
		});
		// Получаем уникальные брейкпоинты
		let mdQueries = breakpointsArray.map(function (item) {
			return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
		});
		mdQueries = uniqArray(mdQueries);
		const mdQueriesArray = [];

		if (mdQueries.length) {
			// Работаем с каждым брейкпоинтом
			mdQueries.forEach(breakpoint => {
				const paramsArray = breakpoint.split(",");
				const mediaBreakpoint = paramsArray[1];
				const mediaType = paramsArray[2];
				const matchMedia = window.matchMedia(paramsArray[0]);
				// Объекты с нужными условиями
				const itemsArray = breakpointsArray.filter(function (item) {
					if (item.value === mediaBreakpoint && item.type === mediaType) {
						return true;
					}
				});
				mdQueriesArray.push({
					itemsArray,
					matchMedia
				})
			});
			return mdQueriesArray;
		}
	}
}

// Уникализация массива
function uniqArray(array) {
	return array.filter(function (item, index, self) {
		return self.indexOf(item) === index;
	});
}

// Получение хеша в адресе сайта
function getHash() {
	if (location.hash) { return location.hash.replace('#', ''); }
}

// Указание хеша в адресе сайта
function setHash(hash) {
	hash = hash ? `#${hash}` : window.location.href.split('#')[0];
	history.pushState('', '', hash);
}

//========================================================================================================================================================
// Вспомогательные модули блокировки прокрутки
let bodyLockStatus = true;
let bodyLockToggle = (delay = 300) => {
	if (document.documentElement.classList.contains('lock')) {
		bodyUnlock(delay);
	} else {
		bodyLock(delay);
	}
}
let bodyUnlock = (delay = 300) => {
	let body = document.querySelector("body");
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll("[data-lp]");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			document.documentElement.classList.remove("lock");
		}, delay);
		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
}
let bodyLock = (delay = 300) => {
	let body = document.querySelector("body");
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll("[data-lp]");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		document.documentElement.classList.add("lock");

		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
}

//========================================================================================================================================================
// Вспомогательные модули плавного раскрытия и закрытия объекта
let _slideUp = (target, duration = 500, showmore = 0) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = `${target.offsetHeight}px`;
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = showmore ? `${showmore}px` : `0px`;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.hidden = !showmore ? true : false;
			!showmore ? target.style.removeProperty('height') : null;
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			!showmore ? target.style.removeProperty('overflow') : null;
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideDown = (target, duration = 500, showmore = 0) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.hidden = target.hidden ? false : null;
		showmore ? target.style.removeProperty('height') : null;
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = showmore ? `${showmore}px` : `0px`;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideToggle = (target, duration = 500) => {
	if (target.hidden) {
		return _slideDown(target, duration);
	} else {
		return _slideUp(target, duration);
	}
}
