<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	const onClose = () => dispatch('close-modal');

	export let image: string;
	export let caption: string;
</script>

<div class="image-modal" on:click={onClose}>
	<span class="close-modal" on:click={onClose}>&times;</span>

	<img class="image-modal-content" src={image} alt={caption} />

	<div class="caption">{caption}</div>
</div>
