<script lang="ts">
	import { formatDistance } from 'date-fns';
	import { readingTime } from 'reading-time-estimator';

	//@ts-ignore
	import { ptBR } from 'date-fns/locale/index.js';
	import { LazyImage } from 'svelte-lazy-image';

	export let title: string;
	export let slug: string;
	export let published_at: string;

	export let html = '';
	export let feature_image: string;

	let readTime = readingTime(html, 100);

	$: formatedDate = formatDistance(new Date(published_at), new Date(), {
		addSuffix: true,
		locale: ptBR
	});

	$: contentParsed = removeHTMLTags(html).replace('&quot;', ' ');

	function removeHTMLTags(str: string) {
		if (str === null || str === '') return '';

		return str.replace(/(<([^>]+)>)/gi, '');
	}
</script>

<div class="item mb-5">
	<div class="media">
		<LazyImage
			class="mr-3 post-thumb d-none d-md-flex"
			src={feature_image}
			placeholder="https://via.placeholder.com/250?text=TulioCalil"
			alt="image {title}"
		/>

		<div class="media-body">
			<h3 class="title mb-1">
				<a href="/post/{slug}">{title}</a>
			</h3>
			<div class="meta mb-1">
				<span class="date">Publicado {formatedDate}</span><span class="time"
					>{readTime.minutes} min de leitura</span
				><span class="comment"
					><a href="/post/{slug}#comments">
						<span data-cusdis-count-page-id={slug}>0</span> comentarios</a
					></span
				>
			</div>
			<div class="intro">
				{contentParsed.slice(0, 200)}...
			</div>
			<a class="more-link" href="/post/{slug}">Continue lendo &rarr;</a>
		</div>
	</div>
</div>
