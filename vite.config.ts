import { defineConfig } from "vite";
// import build from "@hono/vite-build/bun";
// import build from '@hono/vite-build/cloudflare-pages'
// import build from '@hono/vite-build/cloudflare-workers'
import build from "@hono/vite-build/node";
import nodeAdapter from "@hono/vite-dev-server/node";

import devServer from "@hono/vite-dev-server";

const minify = false;

export default defineConfig(({ mode }) => {
	if (mode === "client")
		return {
			esbuild: {
				jsxImportSource: "hono/jsx/dom", // Optimized for hono/jsx/dom
			},
			build: {
				minify,
				rollupOptions: {
					input: "./src/client.tsx",
					output: {
						entryFileNames: "static/client.js",
					},
				},
			},
		};
	return {
		esbuild: {
			minify: false,
		},
		plugins: [
			devServer({
				adapter: nodeAdapter,
				entry: "src/index.tsx", // The file path of your application.
			}),
			build({
				minify,
				// Defaults are `src/index.ts`,`./src/index.tsx`,`./app/server.ts`
				entry: "./src/index.tsx",
			}),
		],
	};
});
