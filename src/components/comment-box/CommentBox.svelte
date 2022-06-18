<script>
	import { page } from '$app/stores';
	export let slug;
	export let title;
</script>

<section id="comments" class="blog-comments-section">
	<div
		id="cusdis_thread"
		data-host="https://cusdis.com"
		data-app-id={''}
		data-page-id={slug}
		data-page-url={$page.url}
		data-page-title={title}
	/>
</section>
