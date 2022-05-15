<script>
  import { onDestroy } from "svelte";

  import Newsletter from "../components/newsletter/Newsletter.svelte";
  import Post from "../components/post/Post.svelte";
  import Pagination from "../components/pagination/Pagination.svelte";
  import PostShimmer from "../components/post-shimmer/PostShimmer.svelte";

  import { blogInfoStore } from "../stores/blogInfo.js";

  import getAllPosts from "../http/services/posts/getAll";

  let blogInfo;

  let currentPage = 1;

  function handleNextPage() {
    currentPage += 1;
  }

  function handlePreviusPage() {
    currentPage -= 1;
  }

  const unsubscribe = blogInfoStore.subscribe((value) => {
    blogInfo = value;
  });

  onDestroy(unsubscribe);
</script>

<svelte:head>
  <title>{blogInfo.blogName}</title>
</svelte:head>

<Newsletter
  blogName={blogInfo.blogName}
  blogSubtitle={blogInfo.blogSubtitle}
  newsletterText={blogInfo.newsletterText}
/>
<section class="blog-list px-3 py-5 p-md-5">
  <div class="container">
    {#await getAllPosts(currentPage)}
      <PostShimmer />
      <PostShimmer />
      <PostShimmer />
      <PostShimmer />
    {:then posts}
      {#each posts.data as post}
        <Post {...post.attributes} id={post.id} />
      {/each}
    {:catch err}
      <h2>Error while loading the data</h2>
    {/await}
  </div>

  <Pagination
    page={currentPage}
    on:next-page={handleNextPage}
    on:previus-page={handlePreviusPage}
  />
</section>
