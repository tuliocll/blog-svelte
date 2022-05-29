<script>
  import SvelteMarkdown from "svelte-markdown";
  import ImageComponent from "./renderers/img.svelte";
  export let content;
</script>

<SvelteMarkdown source={content ?? ""} renderers={{ image: ImageComponent }} />
