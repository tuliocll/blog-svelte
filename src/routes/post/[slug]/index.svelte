<script context="module" lang="ts">
	type fetchAPI = typeof fetch;
	export async function load({ params, fetch }: { params: any; fetch: fetchAPI }) {
		const { slug } = params;

		const article = await fetch(`/post/${slug}.json`).then((response: any) => response.json());

		if (!article) {
			return {
				status: 302,
				redirect: '/'
			};
		}

		return {
			props: { article, slug }
		};
	}
</script>

<script lang="ts">
	import { readingTime } from 'reading-time-estimator';
	import { formatDistance } from 'date-fns';
	import { onMount } from 'svelte';
	import { GoogleAnalytics } from '@beyonk/svelte-google-analytics';

	//@ts-ignore
	import { ptBR } from 'date-fns/locale/index.js';
	import SEO from '../../../components/SEO/SEO.svelte';

	import ModalImage from '../../../components/modal-image/ModalImage.svelte';
	import Markdown from '../../../components/markdown/Markdown.svelte';
	import CommentBox from '../../../components/comment-box/CommentBox.svelte';
	import { browser } from '$app/env';

	export let article: PostType;
	export let slug: string;

	let showModalImage = false;
	let modalImageCaption = '';
	let modalImageSrc = '';

	const readTime = readingTime(article.html, 100);
	const thumb = article.feature_image;
	const formatedDate = article.published_at
		? formatDistance(new Date(article.published_at), new Date(), {
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

	const featuredImageObject = {
		url: article.feature_image,
		alt: article.feature_image_alt,
		width: 672,
		height: 448,
		caption: article.feature_image_caption
	};
	const ogImageObject = {
		url: article.og_image,
		alt: article.og_description
	};

	const ogSquareImageObject = {
		url: article.og_image,
		alt: article.og_description
	};

	const twitterImageObject = {
		url: article.twitter_image,
		alt: article.twitter_description
	};

	const breadcrumbs = [
		{
			name: 'Home',
			slug: ''
		},
		{
			name: article.title,
			slug
		}
	];

	onMount(() => {
		if (browser) {
			document.querySelectorAll('pre code').forEach((el) => {
				//@ts-ignore
				hljs.highlightElement(el);
			});
			//@ts-ignore
			initYouTubeVideos();
		}
	});

	let GOOGLE_ANALYTICS = import.meta.env ? import.meta.env.VITE_GOOGLE_ANALYTICS : '';
</script>

<SEO
	article
	{breadcrumbs}
	{slug}
	title={article?.title}
	datePublished={article?.published_at}
	lastUpdated={article?.updated_at}
	metadescription={article?.meta_description || article?.html.slice(0, 150)}
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
			<h2 class="title mb-2">{article?.title || ''}</h2>
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

		<div class="blog-post-body">
			<figure class="blog-banner">
				<a href="#"
					><img class="img-fluid" src={thumb} alt="image {article.feature_image_alt || ''}" /></a
				>
				<figcaption class="mt-2 text-center image-caption">
					<Markdown content={article.feature_image_caption} />
				</figcaption>
			</figure>
			<div id="content-body">
				<Markdown content={article.html} />
			</div>
		</div>

		<div class="mt-5">
			<div data-lyket-type="clap" data-lyket-namespace="blog" data-lyket-id={slug} />
		</div>

		<CommentBox {slug} title={article.title || ''} />
	</div>
</article>
