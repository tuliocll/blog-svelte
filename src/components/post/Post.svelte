<script>
  import { formatDistance } from "date-fns";
  import { readingTime } from "reading-time-estimator";
  import { Link } from "svelte-navigator";
  import pt_br from "date-fns/locale/pt-BR";
  import { marked } from "marked";
  import DOMPurify from "dompurify";
  import { LazyImage } from "svelte-lazy-image";

  export let title;
  export let slug;
  export let publishedAt;

  export let content = "";
  export let cover;

  $: readTime = readingTime(content, 100);

  $: thumb = cover.data.attributes.formats.thumbnail.url;
  const api_url = API_URL;
  $: thumbnailUrl = `${api_url}${thumb}`;

  $: formatedDate = formatDistance(new Date(publishedAt), new Date(), {
    addSuffix: true,
    locale: pt_br,
  });

  $: html = marked.parse(content);
  $: contentParsed = DOMPurify.sanitize(html, {
    USE_PROFILES: { html: false },
  }).replace("&nbsp;", " ");
</script>

<div class="item mb-5">
  <div class="media">
    <LazyImage
      class="mr-3 post-thumb d-none d-md-flex"
      src={thumbnailUrl}
      placeholder="https://via.placeholder.com/250?text=TulioCalil"
      alt="image {title}"
    />

    <div class="media-body">
      <h3 class="title mb-1">
        <Link to="/post/{slug}">{title}</Link>
      </h3>
      <div class="meta mb-1">
        <span class="date">Publicado {formatedDate}</span><span class="time"
          >{readTime.minutes} min de leitura</span
        ><span class="comment"
          ><Link to="/post/{slug}#comments">
            <span data-cusdis-count-page-id={slug}>0</span> comentarios</Link
          ></span
        >
      </div>
      <div class="intro">
        {contentParsed.slice(0, 200)}...
      </div>
      <a class="more-link" href="/post/{slug}">Continue lendo &rarr;</a>
    </div>
  </div>
</div>
