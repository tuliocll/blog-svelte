<script lang="ts">
	import { formatDistance } from 'date-fns';
	import { readingTime } from 'reading-time-estimator';

	//@ts-ignore
	import { ptBR } from 'date-fns/locale/index.js';
	import { marked } from 'marked';
	import { LazyImage } from 'svelte-lazy-image';

	export let title;
	export let slug;
	export let publishedAt;

	export let content = '';
	export let cover;

	let API_URL = import.meta.env ? import.meta.env.VITE_API_URL : '';

	$: readTime = readingTime(content, 100);

	$: thumb = cover.data.attributes.formats.thumbnail.url as string;
	const api_url = API_URL;
	$: thumbnailUrl = thumb.startsWith('https') ? thumb : `${api_url}${thumb}`;

	$: formatedDate = formatDistance(new Date(publishedAt), new Date(), {
		addSuffix: true,
		locale: ptBR
	});

	$: html = marked.parse(content);
	$: contentParsed = removeTags(html.replace('&nbsp;', ' '));

	function removeTags(str) {
		if (str === null || str === '') return false;
		else str = str.toString();

		// Regular expression to identify HTML tags in
		// the input string. Replacing the identified
		// HTML tag with a null string.
		return str.replace(/(<([^>]+)>)/gi, '');
	}
</script>

<div class="item mb-5">
	<div class="media">
		<LazyImage
			class="mr-3 post-thumb d-none d-md-flex"
			src={thumbnailUrl}
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
