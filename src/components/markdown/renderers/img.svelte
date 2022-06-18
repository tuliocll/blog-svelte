<script>
	import { LazyImage } from 'svelte-lazy-image';

	export let href = '';
	export let title = undefined;
	export let text = '';

	let url = '';

	let API_URL = import.meta.env ? import.meta.env.VITE_API_URL : '';

	const check = checkUrl(href);

	if (check) {
		url = href;
	} else {
		url = `${API_URL}${href}`;
	}

	function checkUrl(url) {
		try {
			new URL(url);
			return true;
		} catch (_) {
			return false;
		}
	}
</script>

<LazyImage
	src={url}
	placeholder="https://via.placeholder.com/250?text=TulioCalil"
	alt={text}
	{title}
/>
