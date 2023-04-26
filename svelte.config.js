import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
        alias:{
            "cms/*":"src/cms/*",
            "client/*":"src/client/*",
        }
	}
};

export default config;