<script>
  export let slug;
  export let title;

  // Just to fix CUDIS sync error
  setTimeout(() => {
    d();
  }, 1000);
</script>

<section id="comments" class="blog-comments-section">
  <div
    id="cusdis_thread"
    data-host="https://cusdis.com"
    data-app-id={CUSDIS_KEY}
    data-page-id={slug}
    data-page-url={location.href}
    data-page-title={title}
  />
</section>
