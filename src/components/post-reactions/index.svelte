<script lang="ts">
	import { getReactionClick, reactionClick } from '$lib/services/reactions';

	import type { ReactionType } from '$lib/types/reactions.types';
	import Reaction from './reaction/index.svelte';
	import './style.css';
	export let reactions: ReactionType[] = [];

	let checkedReactions = reactions.map((reaction) => ({
		...reaction,
		reacted: getReactionClick(reaction.reactionName)
	}));

	function handleReactionClick(reactionName: string) {
		reactionClick(reactionName);
	}
</script>

<div class="reactions">
	{#each checkedReactions as reaction}
		<Reaction {reaction} />
	{/each}
</div>
