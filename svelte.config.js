<<<<<<< HEAD
// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-netlify';
=======
import adapter from '@sveltejs/adapter-netlify';

>>>>>>> safe
/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	}
};

export default config;
