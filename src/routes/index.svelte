<script context="module">
	export async function load({ url, fetch }) {
		const [{ articles, pagination }] = await Promise.all([
			fetch(`/posts.json${url.search}`, { credentials: 'include' }).then((response) =>
				response.json()
			)
		]);

		return {
			props: {
				articles,
				pagination
			}
		};
	}
</script>

<script lang="ts">
	import { navigating, page } from '$app/stores';
	import { goto } from '$app/navigation';
	import CusdisService from '$lib/cusdis';
	import { onMount } from 'svelte';
	import { GoogleAnalytics } from '@beyonk/svelte-google-analytics';

	import featuredImageSrc from '$lib/assets/home/logo.jpg';
	import website from '$lib/config/website';

	import Post from '../components/post/Post.svelte';
	import SEO from '../components/SEO/SEO.svelte';
	import Pagination from '../components/pagination/Pagination.svelte';
	import PostShimmer from '../components/post-shimmer/PostShimmer.svelte';
	import CarrouselBanner from '../components/carrousel-banner/CarrouselBanner.svelte';
	import { browser } from '$app/env';

	export let articles: PostType[] = [];
	export let pagination: PaginationType;

	let loading = articles.length === 0;
	$: currentPage = getPageFromURL();

	let destination = '';

	navigating.subscribe((value) => {
		destination = value?.to.pathname.split('/')[1] || '';
	});

	$: if (articles.length === 0 && browser) {
		goto('/');
	}

	function getPageFromURL() {
		try {
			const queryPage = new URL(window.location.href).searchParams;

			return Number(queryPage.get('page')) || 1;
		} catch (e) {
			return 1;
		}
	}

	async function handleNextPage() {
		const currentPage = getPageFromURL() + 1;

		let query = new URLSearchParams($page.url.search.toString());
		query.set('page', currentPage.toString());

		await goto(`?${query.toString()}`);
	}

	async function handlePreviusPage() {
		const currentPage = getPageFromURL() - 1;

		let query = new URLSearchParams($page.url.search.toString());
		query.set('page', currentPage.toString());

		await goto(`?${query.toString()}`);
	}

	const { author, siteUrl, siteDescription } = website;
	let title = 'React, React Native, Linux, Elixir e muito mais!';
	const breadcrumbs = [
		{
			name: 'Home',
			slug: ''
		}
	];

	const featuredImageAlt = 'Blog Tulio Calil';
	const featuredImage = {
		url: featuredImageSrc,
		alt: featuredImageAlt,
		width: 672,
		height: 448,
		caption: 'Home'
	};
	const ogImage = {
		url: featuredImageSrc,
		alt: featuredImageAlt
	};
	const ogSquareImage = {
		url: featuredImageSrc,
		alt: featuredImageAlt
	};
	const twitterImage = {
		url: featuredImageSrc,
		alt: featuredImageAlt
	};
	const entityMeta = {
		url: `${siteUrl}/`,
		faviconWidth: 512,
		faviconHeight: 512,
		caption: author
	};

	const seoProps = {
		title,
		slug: '',
		entityMeta,
		datePublished: new Date().toISOString(),
		lastUpdated: new Date().toISOString(),
		breadcrumbs,
		metadescription: siteDescription,
		featuredImage,
		ogImage,
		ogSquareImage,
		twitterImage
	};

	onMount(async () => {
		CusdisService();
	});

	let GOOGLE_ANALYTICS = import.meta.env ? import.meta.env.VITE_GOOGLE_ANALYTICS : '';
</script>

<SEO {...seoProps} />
<GoogleAnalytics properties={[GOOGLE_ANALYTICS]} />

<section class="blog-list px-3 py-5 p-md-5">
	<div class="container">
		{#if ($navigating && destination !== 'post') || loading}
			<PostShimmer />
			<PostShimmer />
			<PostShimmer />
			<PostShimmer />
			<PostShimmer />
			<PostShimmer />
		{:else}
			{#each articles as post, index}
				<Post {...post} />

				{#if index === articles.length / 2 - 1}
					<CarrouselBanner />
				{/if}
			{/each}
		{/if}
	</div>

	<Pagination
		hasNext={pagination.next > 0}
		hasPrevius={pagination.page > 1}
		on:next-page={handleNextPage}
		on:previus-page={handlePreviusPage}
	/>
</section>
