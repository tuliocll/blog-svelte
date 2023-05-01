<script context="module" lang="ts">
	type fetchAPI = typeof fetch;
	export async function load({ fetch }: { params: any; fetch: fetchAPI }) {
		const response = await fetch(`/about.json`).then((r: any) => r.json());
		const { tags, about, author } = response;
		return {
			props: { about: { ...about, tags, author } }
		};
	}
</script>

<script lang="ts">
	import Sidebar from '../components/sidebar/Sidebar.svelte';
	import Footer from '../components/footer/Footer.svelte';
	import { analytics, perf } from '$lib/firebase';
	import { blogInfoStore } from '../stores/blogInfo.js';
	import { browser } from '$app/env';

	export let about;

	if (browser) {
		analytics();
		perf();
	}

	blogInfoStore.set(about);
</script>

<nav>
	<Sidebar />
</nav>

<div class="main-wrapper">
	<slot />
</div>

<Footer />
