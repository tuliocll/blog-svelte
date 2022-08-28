<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { ReactionType } from '$lib/types/reactions.types';

	export let reaction: ReactionType;

	const dispatch = createEventDispatcher();
	const reactionClick = () => dispatch('reaction-click', reaction.id);
</script>

<button class={`reaction ${reaction.reacted ? 'reacted' : ''}`} on:click={reactionClick}>
	<span>{reaction.reactionName}</span>
	<span>{reaction.count}</span>
</button>
