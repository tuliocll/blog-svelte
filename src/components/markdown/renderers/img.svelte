<script>
  export let href = "";
  export let title = undefined;
  export let text = "";
</script>

<img src={`${API_URL}${href}`} {title} alt={text} />
