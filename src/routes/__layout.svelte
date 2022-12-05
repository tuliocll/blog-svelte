<script context="module" lang="ts">
	type fetchAPI = typeof fetch;
	export async function load({ fetch }: { params: any; fetch: fetchAPI }) {
		const [about] = await Promise.all([fetch(`/about.json`).then((r: any) => r.json())]);

		return {
			props: { about: about }
		};
	}
</script>

<script>
	import Sidebar from '../components/sidebar/Sidebar.svelte';
	import Footer from '../components/footer/Footer.svelte';
	import initializeFirebase from '$lib/firebase';

	export let about;

	import { blogInfoStore } from '../stores/blogInfo.js';
	import { browser } from '$app/env';

	blogInfoStore.set(about);

	if (browser) {
		initializeFirebase();
	}
</script>

<nav>
	<Sidebar />
</nav>

<div class="main-wrapper">
	<slot />
</div>

<Footer />
