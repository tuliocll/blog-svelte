<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	const nextPage = () => dispatch('next-page');
	const previusPage = () => dispatch('previus-page');

	export let hasNext = false;
	export let hasPrevius = false;

	$: hasMorePosts = hasNext ? '' : 'd-none';
	$: hasPreviusPosts = hasPrevius ? '' : 'd-none';
</script>

<nav class="blog-nav nav nav-justified my-5">
	<button
		class="nav-link-prev nav-item nav-link rounded-left border-0 {hasPreviusPosts}"
		on:click={previusPage}
		>Anteriores<i class="arrow-prev fas fa-long-arrow-alt-left" />
	</button>
	<button
		class="nav-link-next nav-item nav-link rounded-right border-0 {hasMorePosts}"
		on:click={nextPage}
		>Proximos<i class="arrow-next fas fa-long-arrow-alt-right" />
	</button>
</nav>
