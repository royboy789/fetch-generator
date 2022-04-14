import { codeGenerator } from './codeGenerator';

/**
 * Form Init
 *
 * @param form form element
 */
const formLoader = (form: HTMLElement) => {
	const generator = codeGenerator();

	// on change
	function formChange(e: Event) {
		// change url
		if (e.target.matches('input.url')) {
			generator.updateUrl(e.target.value);
			return true;
		}

		// change method
		if (e.target.matches('select.method')) {
			generator.updateMethod(e.target.value);
			return true;
		}

		// change data
		if (e.target.matches('input.data-key') || e.target.matches('input.data-value')) {
			const dataKeys = document.getElementsByName('data_keys[]');
			const dataValues = document.getElementsByName('data_values[]');
			const newData = [];
			dataKeys.forEach((dataKey, i) => {
				if (!dataKey.value) {
					return;
				}
				newData.push({
					key: dataKey.value,
					value: dataValues[i].value ? dataValues[i].value : 'N/A',
				});
			});
			generator.updateData(newData);
			return true;
		}

		// change headers
		if (e.target.matches('input.header-key') || e.target.matches('input.header-value')) {
			const headerKeys = document.getElementsByName('header_keys[]');
			const headerValues = document.getElementsByName('header_values[]');
			const newData = [];
			headerKeys.forEach((headerKey, i) => {
				if (!headerKey.value) {
					return;
				}
				newData.push({
					key: headerKey.value,
					value: headerValues[i].value ? headerValues[i].value : 'N/A',
				});
			});

			generator.updateHeaders(newData);
			return true;
		}

		return false;
	}

	// add change event listener
	form.addEventListener('change', formChange);
	form.addEventListener('submit', (e) => {
		e.preventDefault();
	});
};

// window load
const load = () => {
	return formLoader(document.getElementById('fetch-generator-form'));
};
window.onload = load;
