<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import ImageComponent from './renderers/img.svelte';
	export let content: string;
</script>

<SvelteMarkdown source={content ?? ''} renderers={{ image: ImageComponent }} />
