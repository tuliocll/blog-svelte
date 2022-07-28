<script lang="ts">
	import type { ReactionType } from '$lib/types/reactions.types';

	export let reaction: ReactionType;
</script>

<button class={`reaction ${reaction.reacted ? 'reacted' : ''}`} disabled={reaction.reacted}>
	<span>{reaction.reactionName}</span>
	<span>{reaction.count}</span>
</button>
