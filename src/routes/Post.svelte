<script>
  import { onDestroy } from "svelte";
  import { formatDistance } from "date-fns";
  import pt_br from "date-fns/locale/pt-BR";
  import SvelteMarkdown from "svelte-markdown";
  import { readingTime } from "reading-time-estimator";
  import { Link, useNavigate } from "svelte-navigator";

  import CommentBox from "../components/comment-box/CommentBox.svelte";
  import getOnePost from "../http/services/posts/getOne";

  import { blogInfoStore } from "../stores/blogInfo.js";

  const navigate = useNavigate();
  let blogInfo;
  let post = {};
  const slug = window.location.pathname.split("/")[2];
  $: readTime = readingTime(post?.attributes?.content, 100);

  getOnePost(slug).then((response) => {
    if (!response) {
      navigate("/");
    }
    post = response;
    setTimeout(() => {
      hljs.highlightAll();
    }, 200);
  });

  $: thumb = post?.attributes?.cover?.data.attributes.url;
  const api_url = API_URL;
  $: thumbnailUrl = `${api_url}${thumb}`;

  $: formatedDate = post?.attributes?.publishedAt
    ? formatDistance(new Date(post?.attributes?.publishedAt), new Date(), {
        addSuffix: true,
        locale: pt_br,
      })
    : "";

  const unsubscribe = blogInfoStore.subscribe((value) => {
    blogInfo = value;
  });

  onDestroy(unsubscribe);
</script>

<svelte:head>
  <title>{blogInfo.blogName} - {post?.attributes?.title || ""}</title>
</svelte:head>

<article class="blog-post px-3 py-5 p-md-5">
  <div class="container">
    <header class="blog-post-header">
      <h2 class="title mb-2">{post?.attributes?.title || ""}</h2>
      <div class="meta mb-3">
        <span class="date">Publicado {formatedDate}</span><span class="time"
          >{readTime.minutes} min de leitura</span
        ><span class="comment"
          ><Link to="/post/{slug}#comments">
            <span data-cusdis-count-page-id={slug}>{" "}</span> comentarios</Link
          ></span
        >
      </div>
    </header>

    <div class="blog-post-body">
      <figure class="blog-banner">
        <Link to="#"
          ><img
            class="img-fluid"
            src={thumbnailUrl}
            alt="image {post?.attributes?.title || ''}"
          /></Link
        >
        <figcaption class="mt-2 text-center image-caption">
          <SvelteMarkdown source={post?.attributes?.coverLegend || ""} />
        </figcaption>
      </figure>

      <SvelteMarkdown source={post?.attributes?.content ?? ""} />
    </div>

    <div class="mt-5">
      <div
        data-lyket-type="clap"
        data-lyket-namespace="blog"
        data-lyket-id={slug}
      />
    </div>

    <nav class="blog-nav nav nav-justified my-5">
      <a class="nav-link-prev nav-item nav-link rounded-left" href="index.html"
        >Próximo<i class="arrow-prev fas fa-long-arrow-alt-left" /></a
      >
      <a
        class="nav-link-next nav-item nav-link rounded-right"
        href="blog-list.html"
        >Anterior<i class="arrow-next fas fa-long-arrow-alt-right" /></a
      >
    </nav>

    <CommentBox {slug} title={post?.attributes?.title || ""} />
  </div>
</article>

<!-- 
DESATIVADO TEMPORARIAMENTE
  <PromoSection />
 -->
