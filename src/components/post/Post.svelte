<script>
  import { formatDistance, parseISO } from "date-fns";
  import pt_br from "date-fns/locale/pt-BR";

  export let id;
  export let title;
  export let slug;
  export let publishedAt;
  export let readTime;
  export let content;
  export let cover;
  

  const thumb = cover.data[0].attributes.formats.large.url
  const api_url = API_URL;
  const thumbnailUrl = `${api_url}${thumb}`

  const formatedDate = formatDistance(new Date(publishedAt), new Date(), {
    addSuffix: true,
    locale: pt_br,
  });
</script>

<div class="item mb-5">
  <div class="media">
    <img
      class="mr-3 img-fluid post-thumb d-none d-md-flex"
      src={thumbnailUrl}
      alt="image {title}"
    />
    <div class="media-body">
      <h3 class="title mb-1">
        <a href="/post/{slug}">{title}</a>
      </h3>
      <div class="meta mb-1">
        <span class="date">Publicado {formatedDate}</span><span class="time"
          >{readTime} min de leitura</span
        ><span class="comment"
          ><a href="/post/{slug}#comments"> <span data-cusdis-count-page-id="PAGINAa">0</span> comentarios</a></span
        >
      </div>
      <div class="intro">
        {content}
      </div>
      <a class="more-link" href="/post/{slug}">Continue lendo &rarr;</a>
    </div>
  </div>
  <script defer data-host="https://cusdis.com" data-app-id={CUSDIS_KEY} src="https://cusdis.com/js/cusdis-count.umd.js"></script>
</div>
