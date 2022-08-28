<script context="module" lang="ts">
	type fetchAPI = typeof fetch;
	export async function load({ fetch }: { params: any; fetch: fetchAPI }) {
		const [about] = await Promise.all([fetch(`/about.json`).then((r: any) => r.json())]);

		return {
			props: { about: about.data.attributes }
		};
	}
</script>

<script lang="ts">
	import type { ReactionType } from '$lib/types/reactions.types';
	import Sidebar from '../components/sidebar/Sidebar.svelte';
	import Footer from '../components/footer/Footer.svelte';
	import PostReactions from '../components/post-reactions/index.svelte';

	export let about;

	const reactions: ReactionType[] = [
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

	import { blogInfoStore } from '../stores/blogInfo.js';

	blogInfoStore.set(about);
</script>

<nav>
	<Sidebar />
</nav>

<div class="main-wrapper">
	<slot />
</div>

<div class="sidebar">
	<PostReactions {reactions} />
</div>

<Footer />
