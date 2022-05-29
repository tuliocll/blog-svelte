<script>
  export let href = "";
  export let title = undefined;
  export let text = "";

  let url = "";

  const check = checkUrl(href);

  if (check) {
    url = href;
  } else {
    url = `${API_URL}${href}`;
  }

  function checkUrl(url) {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  }
</script>

<img src={url} {title} alt={text} />
