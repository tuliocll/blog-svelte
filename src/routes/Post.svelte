<script>
  import { onDestroy } from "svelte";
  import { formatDistance } from "date-fns";
  import pt_br from "date-fns/locale/pt-BR";
  import { readingTime } from "reading-time-estimator";
  import { Link, useNavigate } from "svelte-navigator";
  import { useQuery } from "@sveltestack/svelte-query";

  import CommentBox from "../components/comment-box/CommentBox.svelte";
  import getOnePost from "../http/services/posts/getOne";
  import ModalImage from "../components/modal-image/ModalImage.svelte";
  import Markdown from "../components/markdown/Markdown.svelte";

  import { blogInfoStore } from "../stores/blogInfo.js";

  const navigate = useNavigate();
  let blogInfo;

  const slug = window.location.pathname.split("/")[2];
  let showModalImage = false;
  let modalImageCaption = "";
  let modalImageSrc = "";

  const post = useQuery(`post-${slug}`, () => getOnePost(slug));

  $: readTime = readingTime($post?.data?.data[0].attributes?.content, 100);

  setTimeout(() => {
    hljs.highlightAll();
  }, 1500);

  $: thumb = $post?.data?.data[0].attributes?.cover?.data.attributes.url;
  const api_url = API_URL;
  $: thumbnailUrl = thumb ? `${api_url}${thumb}` : "";

  $: formatedDate = $post?.data?.data[0].attributes?.publishedAt
    ? formatDistance(
        new Date($post?.data?.data[0].attributes?.publishedAt),
        new Date(),
        {
          addSuffix: true,
          locale: pt_br,
        }
      )
    : "";

  const unsubscribe = blogInfoStore.subscribe((value) => {
    blogInfo = value;
  });

  function toggleModalImage(element) {
    if (element && element.target) {
      modalImageCaption = element.target.alt;
      modalImageSrc = element.target.src;
    }
    showModalImage = !showModalImage;
  }

  function setImagesClick() {
    const images = document
      .getElementById("content-body")
      .querySelectorAll("img");

    images.forEach((image) => {
      image.onclick = toggleModalImage;
    });
  }

  setTimeout(() => {
    setImagesClick();
  }, 900);

  onDestroy(unsubscribe);
</script>

<svelte:head>
  <title
    >{blogInfo.blogName}
    {$post?.data?.data[0].attributes?.title ? " - " : ""}
    {$post?.data?.data[0].attributes?.title || ""}</title
  >
</svelte:head>

<article class="blog-post px-3 py-5 p-md-5">
  {#if showModalImage}
    <ModalImage
      on:close-modal={toggleModalImage}
      image={modalImageSrc}
      caption={modalImageCaption}
    />
  {/if}

  <div class="container">
    <header class="blog-post-header">
      <h2 class="title mb-2">{$post?.data?.data[0].attributes?.title || ""}</h2>
      <div class="meta mb-3">
        <span class="date">Publicado {formatedDate}</span><span class="time"
          >{readTime.minutes} min de leitura</span
        ><span class="comment"
          ><Link to="/post/{slug}#comments">
            <span data-cusdis-count-page-id={slug}>0</span> comentarios</Link
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
            alt="image {$post?.data?.data[0].attributes?.title || ''}"
          /></Link
        >
        <figcaption class="mt-2 text-center image-caption">
          <Markdown content={$post?.data?.data[0].attributes?.coverLegend} />
        </figcaption>
      </figure>
      <div id="content-body">
        <Markdown content={$post?.data?.data[0].attributes?.content} />
      </div>
    </div>

    <div class="mt-5">
      <div
        data-lyket-type="clap"
        data-lyket-namespace="blog"
        data-lyket-id={slug}
      />
    </div>

    <CommentBox {slug} title={$post?.data?.data[0].attributes?.title || ""} />
  </div>
</article>

<!-- 
DESATIVADO TEMPORARIAMENTE
  <PromoSection />
 -->
