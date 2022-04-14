/**
 * Code Generator
 *
 * @returns {*} generator helper
 */
export const codeGenerator = () => {
	let url = '';
	let method: string = '';
	let data: Record<string, string>[] = [];
	let headers: Record<string, string>[] = [];

	const codeElement = document.getElementById('code');

	// ace editor
	const editor = ace.edit(codeElement, {
		mode: 'ace/mode/javascript',
		selectionStyle: 'text',
	});

	// editor.setOptions({
	// 	autoScrollEditorIntoView: true,
	// 	copyWithEmptySelection: true,
	// });

	// update code
	function update() {
		let fetchCode = '';

		// set url
		if (data.length && method === 'GET') {
			const queryString = Object.keys(data)
				// eslint-disable-next-line no-loop-func
				.map((key) => `${data[key].key}=${data[key].value}`)
				.join('&');
			url += `?${queryString}`;
		}

		fetchCode = `const data = await fetch('${url}', {\n`;

		if (method && method !== '-1') {
			fetchCode += `  method: ${method},\n`;
		}

		// data
		if (data.length && method !== 'GET') {
			const toStringify = {};
			data.forEach((dat) => {
				toStringify[dat.key] = dat.value;
			});
			fetchCode += `  body: '${JSON.stringify(toStringify)}'\n`;
		}

		// headers
		if (headers.length) {
			console.log(headers);
		}

		fetchCode += '});';
		editor.setValue(fetchCode);
	}

	// headers

	return {
		updateUrl: (newUrl: string) => {
			url = newUrl;
			console.log(`updating url to ${url}`);
			update();
		},
		updateMethod: (newMethod: string) => {
			method = newMethod;
			console.log(`updating method to ${method}`);
			update();
		},
		updateData: (newData: Record<string, string>[]) => {
			data = newData;
			console.log(`updating data`);
			update();
		},
		updateHeaders: (newHeaders: Record<string, string>[]) => {
			headers = newHeaders;
			console.log(`updating headers`);
			update();
		},
	};
};
