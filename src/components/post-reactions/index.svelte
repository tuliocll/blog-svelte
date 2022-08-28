<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { getReaction, setReaction } from '$lib/services/reactions';
	import type { ReactionType } from '$lib/types/reactions.types';

	import Reaction from './reaction/index.svelte';
	import './style.css';
	export let reactions: ReactionType[] = [];

	let path = '';
	let pathsToNotRender = ['', '/', '/404', '/about'];
	let checkedReactions: ReactionType[] = [];

	afterNavigate(({ to }) => {
		path = to.pathname;
		checkReactions();
	});

	function checkReactions() {
		checkedReactions = reactions.map((reaction) => ({
			...reaction,
			reacted: getReaction(reaction.id, path) ? true : false
		}));
	}

	function handleReactionClick({ detail }: any) {
		setReaction(detail, path);
		checkReactions();
	}
</script>

<div class="reactions">
	{#if !pathsToNotRender.includes(path)}
		{#each checkedReactions as reaction}
			<Reaction {reaction} on:reaction-click={handleReactionClick} />
		{/each}
	{/if}
</div>
