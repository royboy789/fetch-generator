const baseConfig = require('10up-toolkit/config/postcss.config.js');

module.exports = () => {
	return {
		...baseConfig,
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	};
};
