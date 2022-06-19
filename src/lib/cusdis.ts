import { browser } from '$app/env';

export default () => {
	if (!browser) {
		return;
	}

	let VITE_CUSDIS_APP_ID = import.meta.env ? import.meta.env.VITE_CUSDIS_APP_ID : '';

	// Cusdis commentbox
	let url = 'https://cusdis.com/js/cusdis.es.js';
	let script = document.querySelector(`script[src="${url}"]`) as HTMLScriptElement;

	if (script) {
		//@ts-ignore
		window.CUSDIS.initial();
	} else {
		script = document.createElement('script');
		script.src = url;
		script.defer = true;
		script.async = true;

		//@ts-ignore
		document.querySelector('body').appendChild(script);
	}

	// Cusdis comments count
	let urlCounts = 'https://cusdis.com/js/cusdis-count.umd.js';
	let scriptCounts = document.querySelector(`script[src="${urlCounts}"]`) as HTMLScriptElement;

	if (scriptCounts) {
		scriptCounts.remove();
	}

	scriptCounts = document.createElement('script');
	scriptCounts.src = urlCounts;
	scriptCounts.defer = true;
	scriptCounts.async = true;
	scriptCounts.setAttribute('data-host', 'https://cusdis.com');
	scriptCounts.setAttribute('data-app-id', VITE_CUSDIS_APP_ID);

	//@ts-ignore
	document.querySelector('body').appendChild(scriptCounts);
};
