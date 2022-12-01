<script context="module" lang="ts">
	type fetchAPI = typeof fetch;
	export async function load({ params, fetch }: { params: any; fetch: fetchAPI }) {
		const { slug } = params;
		const [article] = await Promise.all([fetch(`/post/${slug}.json`).then((r: any) => r.json())]);

		return {
			props: { article: article.data[0], slug }
		};
	}
</script>

<script lang="ts">
	import { readingTime } from 'reading-time-estimator';
	import { formatDistance } from 'date-fns';
	import { onMount } from 'svelte';
	import PostReactions from '../../../components/post-reactions/index.svelte';

	import { GoogleAnalytics } from '@beyonk/svelte-google-analytics';

	//@ts-ignore
	import { ptBR } from 'date-fns/locale/index.js';
	import SEO from '../../../components/SEO/SEO.svelte';

	import ModalImage from '../../../components/modal-image/ModalImage.svelte';
	import Markdown from '../../../components/markdown/Markdown.svelte';
	import CommentBox from '../../../components/comment-box/CommentBox.svelte';

	type imageType = {
		name: string;
		hash: string;
		url: string;
	};

	type articleType = {
		attributes: {
			title: string;
			content: string;
			coverLegend: string;
			cover: {
				data: {
					attributes: {
						url: string;
						formats: {
							large: imageType;
							medium: imageType;
							small: imageType;
							thumbnail: imageType;
						};
					};
				};
			};
			publishedAt: string;
		};
	};

	export let article: articleType;
	export let slug: string;

	let showModalImage = false;
	let modalImageCaption = '';
	let modalImageSrc = '';

	const api_url = import.meta.env ? import.meta.env.VITE_API_URL : '';

	const readTime = readingTime(article.attributes.content, 100);
	const thumb = article.attributes.cover.data.attributes.url;
	const thumbnailUrl = thumb.startsWith('https') ? thumb : `${api_url}${thumb}`;
	const formatedDate = article.attributes.publishedAt
		? formatDistance(new Date(article.attributes.publishedAt), new Date(), {
				addSuffix: true,
				locale: ptBR
		  })
		: '';

	function toggleModalImage(element: any) {
		if (element && element.target) {
			modalImageCaption = element.target.alt;
			modalImageSrc = element.target.src;
		}
		showModalImage = !showModalImage;
	}

	function setImagesClick() {
		if (document) {
			//@ts-ignore
			const images = document.getElementById('content-body').querySelectorAll('img');

			images.forEach((image) => {
				image.onclick = toggleModalImage;
			});
		}
	}

	let reactions: ReactionType[] = [
		{
			id: 1,
			reactionName: '🧡',
			count: 2
		},
		{
			id: 2,
			reactionName: '😍',
			count: 2
		},
		{
			id: 3,
			reactionName: '🤘',
			count: 2
		},
		{
			id: 4,
			reactionName: '👍',
			count: 22
		},
		{
			id: 5,
			reactionName: '🚀',
			count: 222
		},
		{
			id: 6,
			reactionName: '🍺',
			count: 222
		},
		{
			id: 7,
			reactionName: '🎉',
			count: 222
		},
		{
			id: 8,
			reactionName: '🏆',
			count: 222
		}
	];
	const { small, thumbnail, medium } = article.attributes.cover.data.attributes.formats;

	const smallestImageSize = thumbnail?.url || small?.url || medium?.url || thumb;

	const socialTagImageUrl = smallestImageSize.startsWith('https')
		? smallestImageSize
		: `${api_url}${smallestImageSize}`;

	const featuredImageObject = {
		url: socialTagImageUrl,
		alt: article.attributes?.title,
		width: 672,
		height: 448,
		caption: article.attributes?.title
	};
	const ogImageObject = {
		url: socialTagImageUrl,
		alt: article.attributes?.title
	};

	const ogSquareImageObject = {
		url: socialTagImageUrl,
		alt: article.attributes?.title
	};

	const twitterImageObject = {
		url: socialTagImageUrl,
		alt: article.attributes?.title
	};

	const breadcrumbs = [
		{
			name: 'Home',
			slug: ''
		},
		{
			name: article.attributes?.title,
			slug
		}
	];

	function handleReaction({ detail }: any) {
		// reactions = [
		// 	...reactions.map((reaction) => ({
		// 		...reaction,
		// 		count: reaction.id === detail ? reaction.count + 1 : reaction.count
		// 	}))
		// ];
	}

	onMount(() => {
		document.querySelectorAll('pre code').forEach((el) => {
			hljs.highlightElement(el);
		});
	});

	let GOOGLE_ANALYTICS = import.meta.env ? import.meta.env.VITE_GOOGLE_ANALYTICS : '';
</script>

<SEO
	article
	{breadcrumbs}
	{slug}
	title={article.attributes?.title}
	datePublished={article.attributes?.publishedAt}
	lastUpdated={article.attributes?.publishedAt}
	metadescription={article.attributes?.content.slice(0, 150)}
	timeToRead={readTime.minutes}
	featuredImage={featuredImageObject}
	ogImage={ogImageObject}
	ogSquareImage={ogSquareImageObject}
	twitterImage={twitterImageObject}
/>

<GoogleAnalytics properties={[GOOGLE_ANALYTICS]} />

<article class="blog-post px-3 py-5 p-md-5">
	{#if showModalImage}
		<ModalImage
			on:close-modal={toggleModalImage}
			image={modalImageSrc}
			caption={modalImageCaption}
		/>
	{/if}

	<div class="container">
		<header class="blog-post-header">
			<h2 class="title mb-2">{article.attributes?.title || ''}</h2>
			<div class="meta mb-3">
				<span class="date">Publicado {formatedDate}</span><span class="time"
					>{readTime.minutes} min de leitura</span
				><span class="comment"
					><a href="/post/{slug}#comments">
						<span data-cusdis-count-page-id={slug}>0</span> comentarios</a
					></span
				>
			</div>
		</header>

		<div>
			<div class="blog-post-body">
				<figure class="blog-banner">
					<a href="#"
						><img
							class="img-fluid"
							src={thumbnailUrl}
							alt="image {article.attributes?.title || ''}"
						/></a
					>
					<figcaption class="mt-2 text-center image-caption">
						<Markdown content={article.attributes?.coverLegend} />
					</figcaption>
				</figure>
				<div id="content-body">
					<Markdown content={article.attributes?.content} />
				</div>
			</div>
			<PostReactions {reactions} on:reacted={handleReaction} />
		</div>

		<div class="mt-5">
			<div data-lyket-type="clap" data-lyket-namespace="blog" data-lyket-id={slug} />
		</div>

		<CommentBox {slug} title={article.attributes?.title || ''} />
	</div>
</article>
