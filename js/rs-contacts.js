
ymaps.ready(init);
function init() {
	if (document.querySelector('.map')) {
		const mapClasses = document.querySelectorAll('.map');
		mapClasses.forEach(mapClass => {
			ymaps.ready();
			let map = new ymaps.Map(mapClass, {
				controls: [],
				// Координаты центра карты
				center: branchData[0].location,
				// Уровень масштабирования
				zoom: 15,
			}, {
				suppressMapOpenBlock: true,
				balloonMaxWidth: 200,
				searchControlProvider: 'yandex#search'
			});

			let pinsCollection = new ymaps.GeoObjectCollection({}, {
				preset: 'islands#blueDotIcon', // дефолт метка
				draggable: false, // метки нельзя перемещать
				// iconLayout: 'default#imageWithContent', // указать данный тип макета.
				// iconImageHref: 'img/footer/map-pin.png', // cвоё изображение иконки метки.
				// iconImageSize: [36, 52], // размеры метки
				// iconImageOffset: [-18, -26], // смещение левого верхнего угла иконки
				// iconContentOffset: [0, 0], // cмещение слоя с содержимым относительно слоя с картинкой
			});

			for (let i = 0; i < branchData.length; i++) {
				let marks = new ymaps.Placemark(branchData[i].location, {
					// Зададим содержимое заголовка балуна.
					balloonContentHeader:
						`${branchData[i].address}`
					,

					// Зададим содержимое всплывающей подсказки.
					hintContent: `${branchData[i].address}`,
				},)
				pinsCollection.add(marks);
			}

			// Добавим метки на карту.
			map.geoObjects.add(pinsCollection);

			// Скрываем хинт при открытии балуна.
			map.events.add('balloonopen', function (e) {
				Map.hint.close();
			});

			// Закрываем балун по клику по карте
			map.events.add('click', e => e.get('target').balloon.close());
		});


	}
}