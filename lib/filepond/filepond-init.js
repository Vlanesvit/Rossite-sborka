
/* ====================================
Инициализация библиотеки для input file
==================================== */
function initFilepond() {
	// Регаем плагины
	FilePond.registerPlugin(
		FilePondPluginFileEncode,
		FilePondPluginFileValidateSize,
		FilePondPluginFileValidateType,
		FilePondPluginImageExifOrientation,
		FilePondPluginImageCrop,
		FilePondPluginImageResize,
	);

	const inputs = document.querySelectorAll('input.filepond')
	inputs.forEach(input => {
		// Инициализация
		FilePond.create(
			input,
			{
				acceptedFileTypes: ['image/jpeg', 'image/png', 'image/svg'],
				labelIdle: `
				<span class="upload-icon">
					<img src="./img/icons/upload.svg" alt="">
				</span>
				<h5>Загрузить проект</h5>
				<span>Общий вес файлов не более 14 Мб Форматы файлов: jpeg, png, svg</span>`,
			}
		);
	});
}
initFilepond()