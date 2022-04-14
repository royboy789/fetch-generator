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
			fetchCode += `  method: '${method}',\n`;
		}

		// headers
		if (headers.length) {
			fetchCode += `  headers: {\n`;
			headers.forEach((header) => {
				fetchCode += `    '${header.key}': '${header.value}',\n`;
			});
			fetchCode += `  },\n`;
		}

		// data - NOT GET
		if (data.length && method !== 'GET') {
			const toStringify = {};
			data.forEach((dat) => {
				toStringify[dat.key] = dat.value;
			});
			fetchCode += `  body: '${JSON.stringify(toStringify)}',\n`;
		}

		// END
		fetchCode += '});\n';
		fetchCode += 'console.log(data.json());';
		editor.setValue(fetchCode);
	}

	// headers

	return {
		updateUrl: (newUrl: string) => {
			url = newUrl;
			update();
		},
		updateMethod: (newMethod: string) => {
			method = newMethod;
			update();
		},
		updateData: (newData: Record<string, string>[]) => {
			data = newData;
			update();
		},
		updateHeaders: (newHeaders: Record<string, string>[]) => {
			headers = newHeaders;
			update();
		},
	};
};
