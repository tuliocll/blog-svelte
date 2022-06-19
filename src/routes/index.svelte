<script context="module">
	export async function load({ url, fetch }) {
		const [{ articles, pagination }] = await Promise.all([
			fetch(`/posts.json${url.search}`, { credentials: 'include' }).then((r) => r.json())
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
	import { onDestroy } from 'svelte';
	import { navigating } from '$app/stores';
	import { goto } from '$app/navigation';
	import CusdisService from '$lib/cusdis';
	import { onMount } from 'svelte';

	import featuredImageSrc from '$lib/assets/home/logo.jpg';
	import website from '$lib/config/website';

	import Post from '../components/post/Post.svelte';
	import SEO from '../components/SEO/SEO.svelte';
	import Pagination from '../components/pagination/Pagination.svelte';
	import PostShimmer from '../components/post-shimmer/PostShimmer.svelte';

	import { blogInfoStore } from '../stores/blogInfo.js';

	export let articles;
	export let pagination;

	let blogInfo;
	let currentPage = 1;
	let totalPages = pagination.pageCount;

	let destination = '';

	navigating.subscribe((value) => {
		destination = value?.to.pathname.split('/')[1] || '';
	});

	if (getPageFromURL()) {
		currentPage = Number(getPageFromURL());
	}

	function getPageFromURL() {
		try {
			const queryPage = new URL(window.location.href).searchParams;

			return queryPage.get('page') || false;
		} catch (e) {
			return false;
		}
	}

	function handleNextPage() {
		currentPage += 1;
		goto(`/?page=${currentPage}`);
	}

	function handlePreviusPage() {
		currentPage -= 1;
		goto(`/?page=${currentPage}`);
	}

	const unsubscribe = blogInfoStore.subscribe((value) => {
		blogInfo = value;
	});

	onDestroy(unsubscribe);

	const { author, siteUrl, siteDescription } = website;
	let title = 'Home';
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
		caption: 'Home page'
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
</script>

<SEO {...seoProps} />

<section class="blog-list px-3 py-5 p-md-5">
	<div class="container">
		{#if $navigating && destination !== 'post'}
			<PostShimmer />
			<PostShimmer />
			<PostShimmer />
			<PostShimmer />
			<PostShimmer />
			<PostShimmer />
		{:else}
			{#each articles as post}
				<Post {...post.attributes} id={post.id} />
			{/each}
		{/if}
	</div>

	<Pagination
		page={currentPage}
		{totalPages}
		on:next-page={handleNextPage}
		on:previus-page={handlePreviusPage}
	/>
</section>
