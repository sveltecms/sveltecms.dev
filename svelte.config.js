import adapter from '@sveltejs/adapter-auto';
// import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
        alias:{
            $comps:"src/components",
            $lib:"src/lib",
            $src:"src/",
            $icons:"src/icons",
            $types:"src/types.ts",
        }
	}
};

//<svelteCMS>
config['onwarn'] = (warning, handler)=>{ if(warning.code.startsWith('a11y-')) return ; handler(warning); }
config['kit']['alias'] = {
    $StaticFiles:"src/routes/admin/_core/static",
    $svelteCMS:"src/routes/admin/_core/svelteCMS.ts",
    $Cms:"src/routes/admin/_core/cms/cms.server.ts",
    $Utilities:"src/routes/admin/_core/utilities",
    $Stores:"src/routes/admin/_core/stores.ts",
    $Database:"src/routes/admin/_core/db.server.ts",
    $Types:"src/routes/admin/_core/types",
    $Comps:"src/routes/admin/_core/components/",
    $Elements:"src/routes/admin/_core/elements/",
    $Icons:"src/routes/admin/_core/icons/",
    $Packages:"src/routes/admin/_core/packages/",
    ...config['kit']['alias']
}
//</svelteCMS>
export default config;