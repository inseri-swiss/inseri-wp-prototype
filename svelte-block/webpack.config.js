const { resolve } = require("path");
const defaultConfig = require("@wordpress/scripts/config/webpack.config");

const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const tsChecker = new ForkTsCheckerWebpackPlugin({
	typescript: {
		diagnosticOptions: {
			semantic: true,
			syntactic: true,
		},
	},
});

module.exports = {
	...defaultConfig,
	plugins: [...defaultConfig.plugins, tsChecker],
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
			{
				test: /\.svelte$/,
				use: {
					loader: "svelte-loader",
				},
			},
		],
	},
	resolve: {
		...defaultConfig.resolve,
		extensions: [".mjs", ".svelte", ...defaultConfig.resolve.extensions],
	},
};
