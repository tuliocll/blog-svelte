<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';
	import { setReaction } from '$lib/services/reactions';
	import type { ReactionType } from '$lib/types/reactions.types';

	import Reaction from './reaction/index.svelte';
	import './style.css';

	export let reactions: ReactionType[] = [];

	let path = '';
	let pathsToNotRender = ['', '/', '/404', '/about'];

	const dispatch = createEventDispatcher();

	const onReacted = (id: number, path: string) => dispatch('reacted', { id, path });

	afterNavigate(({ to }) => {
		path = to.pathname.split('/')[2];
	});

	async function handleReactionClick({ detail }: any) {
		const check = await setReaction(detail, path);
		if (check) {
			onReacted(detail, path);
		}
	}
</script>

<div class="reactions">
	{#if !pathsToNotRender.includes(path)}
		{#each reactions as reaction}
			<Reaction {reaction} on:reaction-click={handleReactionClick} />
		{/each}
	{/if}
</div>
