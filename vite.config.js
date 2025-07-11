import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
	plugins: [
		laravel({
			input: ["resources/css/app.css", "resources/ts/index.tsx"],
			refresh: true,
		}),
		react({
	        jsxRuntime: 'automatic',
	    }),
		tailwindcss(),
	],
	resolve: {
		alias: {
			'@': resolve(__dirname, 'resources/ts'),
			'@/components': resolve(__dirname, 'resources/ts/components'),
			'@/pages': resolve(__dirname, 'resources/ts/pages'),
			'@/services': resolve(__dirname, 'resources/ts/services'),
			'@/context': resolve(__dirname, 'resources/ts/context'),
			'@/utils': resolve(__dirname, 'resources/ts/utils'),
			'@/types': resolve(__dirname, 'resources/ts/types'),
		},
	},
});
