<script lang="ts">
	import { page } from '$app/stores';
	import CusdisService from '$lib/cusdis';
	import { onMount } from 'svelte';

	export let slug: string;
	export let title: string;

	let VITE_CUSDIS_APP_ID = import.meta.env ? import.meta.env.VITE_CUSDIS_APP_ID : '';

	onMount(async () => {
		CusdisService();
	});
</script>

<section id="comments" class="blog-comments-section">
	<div
		id="cusdis_thread"
		data-host="https://cusdis.com"
		data-app-id={VITE_CUSDIS_APP_ID}
		data-page-id={slug}
		data-page-url={$page.url}
		data-page-title={title}
	/>
</section>
