<script>
  export let slug;
  export let title;
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
  <script async src="https://cusdis.com/js/cusdis.es.js"></script>
</section>
