<script lang="ts">
	import {
		LinkedIn,
		Pinterest,
		Telegram,
		WhatsApp,
		Facebook,
		Twitter
	} from 'svelte-share-buttons-component';
	import website from '$lib/config/website';

	export let title: string;
	export let desc: string;
	export let url: string;
	export let image: string;
	export let tags: string[];
</script>

<div>
	<!-- <Email subject={title} body="{desc} {url}" /> -->
	<!-- <HackerNews class="share-button" {title} {url} /> -->
	<!-- <Line class="share-button" {url} /> -->
	<!-- <Vk class="share-button" {title} {url} /> -->
	<!-- <Tumblr class="share-button" {title} {url} caption={title} /> -->
	<!-- <Xing class="share-button" {title} {url} /> -->
	<!-- <Reddit class="share-button" {title} {url} /> -->
	<Twitter
		class="share-button"
		text={title}
		{url}
		hashtags={tags}
		via={website.twitterUsername}
		related={tags}
	/>
	<LinkedIn class="share-button" {url} />
	<Facebook class="share-button" quote={title} {url} />
	<WhatsApp class="share-button" text="{title} {url}" />
	<Telegram class="share-button" text={title} {url} />
	<Pinterest class="share-button" {url} media={image} description={title} />
</div>
