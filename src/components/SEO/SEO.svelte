<script lang="ts">
	import OpenGraph from './OpenGraph.svelte';
	import SchemaOrg from './SchemaOrg.svelte';
	import Twitter from './Twitter.svelte';
	import website from '$lib/config/website';

	import { onDestroy } from 'svelte';
	import { blogInfoStore } from '../../stores/blogInfo';
	import type { AboutType } from '$lib/types/about';

	const {
		author,
		entity,
		facebookAuthorPage,
		facebookPage,
		ogLanguage,
		siteLanguage,
		siteShortTitle,
		siteTitle,
		siteUrl,
		githubPage,
		linkedinProfile,
		telegramUsername,
		tiktokUsername,
		twitterUsername
	} = website;

	export let article = false;
	export let breadcrumbs: any[] = [];
	export let entityMeta = '';
	export let lastUpdated;
	export let datePublished;
	export let metadescription: string;
	export let slug;
	export let timeToRead = 0;
	export let title;

	let blogInfo = <AboutType>{};

	const unsubscribe = blogInfoStore.subscribe((value) => {
		blogInfo = value;
	});

	onDestroy(unsubscribe);

	export let featuredImage = {
		url: blogInfo.og_image,
		alt: blogInfo.title,
		width: 672,
		height: 448,
		caption: 'Home page'
	};
	export let ogImage = {
		url: blogInfo.og_image,
		alt: blogInfo.og_description
	};
	export let ogSquareImage = {
		url: blogInfo.og_image,
		alt: blogInfo.og_description
	};
	export let twitterImage = {
		url: blogInfo.twitter_image,
		alt: blogInfo.twitter_description
	};

	const url = `${siteUrl}/post/${slug}`;

	const pageTitle = `${siteTitle} - ${title}`;

	const openGraphProps = {
		article,
		datePublished,
		lastUpdated,
		image: ogImage,
		squareImage: ogSquareImage,
		metadescription,
		ogLanguage,
		pageTitle,
		siteTitle,
		url,
		...(article ? { datePublished, lastUpdated, facebookPage, facebookAuthorPage } : {})
	};
	const schemaOrgProps = {
		article,
		author,
		breadcrumbs,
		datePublished,
		entity,
		lastUpdated,
		entityMeta,
		featuredImage,
		metadescription,
		siteLanguage,
		siteTitle,
		siteTitleAlt: siteShortTitle,
		siteUrl,
		title: pageTitle,
		url,
		facebookPage,
		githubPage,
		linkedinProfile,
		telegramUsername,
		tiktokUsername,
		twitterUsername
	};
	const twitterProps = {
		article,
		author,
		twitterUsername,
		image: twitterImage,
		timeToRead
	};
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={metadescription} />
	<meta
		name="robots"
		content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
	/>
	<link rel="canonical" href={url} />
</svelte:head>

<Twitter {...twitterProps} />
<OpenGraph {...openGraphProps} />
<SchemaOrg {...schemaOrgProps} />
