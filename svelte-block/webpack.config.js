const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const { resolve } = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const tsChecker = new ForkTsCheckerWebpackPlugin({
	typescript: {
		diagnosticOptions: {
			semantic: true,
			syntactic: true,
		},
	},
});

module.exports = [
	{
		...defaultConfig,
		entry: { hydration: "./src/hydration" },
		plugins: [...defaultConfig.plugins, tsChecker],
		module: {
			...defaultConfig.module,
			rules: [
				...defaultConfig.module.rules,
				{
					test: /\.svelte$/,
					use: {
						loader: "svelte-loader",
						options: {
							compilerOptions: {
								generate: "dom",
								hydratable: true,
							},
						},
					},
				},
			],
		},
		resolve: {
			...defaultConfig.resolve,
			extensions: [".mjs", ".svelte", ...defaultConfig.resolve.extensions],
		},
	},
	{
		...defaultConfig,
		entry: { index: "./src/index" },
		plugins: [...defaultConfig.plugins, tsChecker],
		module: {
			...defaultConfig.module,
			rules: [
				...defaultConfig.module.rules,
				{
					test: /\.svelte$/,
					use: {
						loader: "svelte-loader",
						options: {
							compilerOptions: {
								generate: "ssr",
							},
						},
					},
				},
			],
		},
		resolve: {
			...defaultConfig.resolve,
			extensions: [".mjs", ".svelte", ...defaultConfig.resolve.extensions],
		},
	},
];
