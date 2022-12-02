<script context="module" lang="ts">
	import ghost from '$lib/ghost';
	export async function load({ params }: { params: any }) {
		try {
			const { slug } = params;
			const data = await ghost.pages.read({ slug });

			return {
				props: {
					page: data
				}
			};
		} catch (err) {
			console.error('Erro');
			return {
				status: 302,
				redirect: '/'
			};
		}
	}
</script>

<script lang="ts">
	import { GoogleAnalytics } from '@beyonk/svelte-google-analytics';

	import featuredImageSrc from '$lib/assets/home/logo.jpg';
	import website from '$lib/config/website';
	import SEO from '../components/SEO/SEO.svelte';

	export let page: any;

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

	let GOOGLE_ANALYTICS = import.meta.env ? import.meta.env.VITE_GOOGLE_ANALYTICS : '';
</script>

<SEO {...seoProps} />
<GoogleAnalytics properties={[GOOGLE_ANALYTICS]} />

<section class="blog-list px-3 py-5 p-md-5">
	<div class="container">
		<h1 class="section-title font-weight-bold mb-3">{page?.title || ''}</h1>
		<br />
		{@html page.html}
	</div>
</section>
