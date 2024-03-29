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
	import { increment } from 'firebase/firestore';

	import PostReactions from '../../../components/post-reactions/index.svelte';

	//@ts-ignore
	import { ptBR } from 'date-fns/locale/index.js';
	import SEO from '../../../components/SEO/SEO.svelte';

	import ModalImage from '../../../components/modal-image/ModalImage.svelte';
	import Markdown from '../../../components/markdown/Markdown.svelte';
	import CommentBox from '../../../components/comment-box/CommentBox.svelte';
	import { browser } from '$app/env';
	import type { ReactionType } from '$lib/types/reactions.types';
	import { db } from '$lib/firebase';
	import { getDocument, insertNewData } from '$lib/services/firestore';
	import { getReaction } from '$lib/services/reactions';
	import Share from '../../../components/share/Share.svelte';
	import CarrouselBanner from '../../../components/carrousel-banner/CarrouselBanner.svelte';

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
		if (browser) {
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
			count: 0
		},
		{
			id: 2,
			reactionName: '😍',
			count: 0
		},
		{
			id: 3,
			reactionName: '🤘',
			count: 0
		},
		{
			id: 4,
			reactionName: '👍',
			count: 0
		},
		{
			id: 5,
			reactionName: '🚀',
			count: 0
		},
		{
			id: 6,
			reactionName: '🍺',
			count: 0
		},
		{
			id: 7,
			reactionName: '🎉',
			count: 0
		},
		{
			id: 8,
			reactionName: '🏆',
			count: 0
		}
	];

	const featuredImageObject = {
		url: article.feature_image,
		alt: article.title,
		width: 672,
		height: 448,
		caption: article.title
	};
	const ogImageObject = {
		url: article.feature_image,
		alt: article.title
	};

	const ogSquareImageObject = {
		url: article.feature_image,
		alt: article.title
	};

	const twitterImageObject = {
		url: article.feature_image,
		alt: article.title
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

	async function handleReaction({ detail }: any) {
		const { id, path } = detail;

		//send reaction to firestore
		await insertNewData(
			db(),
			'post-reactions',
			{
				[id]: increment(1)
			},
			path.replace(/\//gm, '-')
		);

		reactions = reactions.map((reaction) => {
			if (reaction.id === id) {
				return {
					...reaction,
					count: reaction?.count + 1,
					reacted: getReaction(reaction.id, path) ? true : false
				};
			}

			return reaction;
		});
	}

	async function getServerReactions() {
		const data = await getDocument(db(), 'post-reactions', slug);

		const updateReactions = reactions.map((reaction) => {
			if (data && data[reaction.id]) {
				return {
					...reaction,
					reacted: getReaction(reaction.id, slug) ? true : false,
					count: data[reaction.id]
				};
			}

			return reaction;
		});

		reactions = [...updateReactions];
	}

	function getUrl() {
		if (browser) {
			return window.location.href;
		}
		return '';
	}
	let el;

	onMount(() => {
		if (browser) {
			// Create Offer Carrousel
			document.querySelectorAll('amazonprovider').forEach((el) => {
				new CarrouselBanner({
					target: el
				});
			});

			document.querySelectorAll('pre code').forEach((el) => {
				//@ts-ignore
				hljs.highlightElement(el);
			});
			//@ts-ignore
			initYouTubeVideos();
			getServerReactions();
			setImagesClick();
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
	metadescription={article?.excerpt || article?.html.slice(0, 150)}
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

		<Share
			title={article.title}
			desc={article.meta_description}
			url={getUrl()}
			image={thumb}
			tags={[]}
		/>

		<div class="blog-post-body">
			<figure class="blog-banner">
				<a href="#"
					><img class="img-fluid" src={thumb} alt="image {article.feature_image_alt || ''}" /></a
				>
				<figcaption class="mt-2 text-center image-caption">
					<Markdown content={article.feature_image_caption} />
				</figcaption>
			</figure>
			<div id="content-body" bind:this={el}>
				{@html article.html}
			</div>
			<PostReactions {reactions} on:reacted={handleReaction} />
		</div>

		<CommentBox {slug} title={article.title || ''} />
	</div>
</article>
