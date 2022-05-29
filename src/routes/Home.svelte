<script>
  import { onDestroy } from "svelte";
  import { useQuery } from "@sveltestack/svelte-query";

  import Newsletter from "../components/newsletter/Newsletter.svelte";
  import Post from "../components/post/Post.svelte";
  import Pagination from "../components/pagination/Pagination.svelte";
  import PostShimmer from "../components/post-shimmer/PostShimmer.svelte";

  import { blogInfoStore } from "../stores/blogInfo.js";

  import getAllPosts from "../http/services/posts/getAll";

  let blogInfo;

  let currentPage = 1;
  let totalPages = 1;

  const posts = useQuery(["all.posts", currentPage], () =>
    getAllPosts(currentPage)
  );

  if (getPageFromURL()) {
    currentPage = Number(getPageFromURL());
  }

  function getPageFromURL() {
    try {
      const queryPage = new URL(window.location.href).searchParams;

      return queryPage.get("page") || false;
    } catch (e) {
      return false;
    }
  }

  function handleNextPage() {
    currentPage += 1;
    window.history.pushState("", "", `?page=${currentPage}`);
  }

  function handlePreviusPage() {
    currentPage -= 1;
    window.history.pushState("", "", `?page=${currentPage}`);
  }

  const unsubscribe = blogInfoStore.subscribe((value) => {
    blogInfo = value;
  });

  onDestroy(unsubscribe);
</script>

<svelte:head>
  <title>{blogInfo.blogName}</title>
</svelte:head>

<!-- <Newsletter
  blogName={blogInfo.blogName}
  blogSubtitle={blogInfo.blogSubtitle}
  newsletterText={blogInfo.newsletterText}
/> -->
<section class="blog-list px-3 py-5 p-md-5">
  <div class="container">
    {#if $posts.isLoading}
      <PostShimmer />
      <PostShimmer />
      <PostShimmer />
      <PostShimmer />
    {:else if $posts.error}
      <h2>Algo deu errado ao buscar os dados</h2>
    {:else if $posts.data}
      {#each $posts.data.data as post}
        <Post {...post.attributes} id={post.id} />
      {/each}
    {/if}
  </div>

  <Pagination
    page={currentPage}
    {totalPages}
    on:next-page={handleNextPage}
    on:previus-page={handlePreviusPage}
  />
</section>
