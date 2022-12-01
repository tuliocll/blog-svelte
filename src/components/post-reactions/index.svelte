<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';
	import { getReaction, setReaction } from '$lib/services/reactions';
	import type { ReactionType } from '$lib/types/reactions.types';

	import Reaction from './reaction/index.svelte';
	import './style.css';

	export let reactions: ReactionType[] = [];

	let path = '';
	let pathsToNotRender = ['', '/', '/404', '/about'];
	let checkedReactions: ReactionType[] = reactions;

	const dispatch = createEventDispatcher();

	const onReacted = (id: number) => dispatch('reacted', id);

	afterNavigate(({ to }) => {
		path = to.pathname;
		// pegar reactions do post
		//localhost:1337/api/post-reactions?filters[post][id][$eq]=1&populate=Reactions
		checkReactions();
	});

	function checkReactions(id?: number) {
		checkedReactions = checkedReactions.map((reaction) => {
			return {
				...reaction,
				count: reaction.id === id ? reaction.count + 1 : reaction.count,
				reacted: getReaction(reaction.id, path) ? true : false
			};
		});
	}

	function handleReactionClick({ detail }: any) {
		onReacted(detail);
		setReaction(detail, path);
		checkReactions(detail);
	}
</script>

<div class="reactions">
	{#if !pathsToNotRender.includes(path)}
		{#each checkedReactions as reaction}
			<Reaction {reaction} on:reaction-click={handleReactionClick} />
		{/each}
	{/if}
</div>
