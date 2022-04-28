<script>
  import { formatDistance } from "date-fns";
  import pt_br from "date-fns/locale/pt-BR";

  export let title;
  export let slug;
  export let date;
  export let readTime;
  export let comments;
  export let preview;
  export let thumb;

  const formatedDate = formatDistance(new Date(date), new Date(), {
    addSuffix: true,
    locale: pt_br,
  });
</script>

<div class="item mb-5">
  <div class="media">
    <img
      class="mr-3 img-fluid post-thumb d-none d-md-flex"
      src={thumb}
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
          ><a href="/post/{slug}#comments">{comments} comentarios</a></span
        >
      </div>
      <div class="intro">
        {preview}
      </div>
      <a class="more-link" href="/post/{slug}">Continue lendo &rarr;</a>
    </div>
  </div>
</div>
