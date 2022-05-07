<script>
  import Newsletter from "../components/newsletter/Newsletter.svelte";
  import Post from "../components/post/Post.svelte";
  import Pagination from "../components/pagination/Pagination.svelte";

  import getAllPosts from "../http/services/posts/getAll"

  export let blogName;
  export let bio;
  export let profilePicture;
  export let socialNetworks = [];
  export let pages = [];
  export let aboutMeText;
  export let blogSubtitle;
  export let newsletterText;
  export let posts = [];

  let currentPage = 1;

  function handleNextPage() {
    currentPage += 1;
  }

  function handlePreviusPage() {
    currentPage -= 1;
  }

</script>

  <Newsletter
    blogName="{blogName}"
    blogSubtitle="{blogSubtitle}"
    newsletterText="{newsletterText}"
  />
  <section class="blog-list px-3 py-5 p-md-5">
    <div class="container">
      {#await getAllPosts()}
      <h2>Loading....</h2>
    {:then posts}
    {#each posts.data as post}
    <Post {...post.attributes} id={post.id} />
  {/each}
    {:catch err}
      <h2>Error while loading the data</h2>
    {/await}

     
    </div>

    <Pagination
      page="{currentPage}"
      on:next-page="{handleNextPage}"
      on:previus-page="{handlePreviusPage}"
    />
  </section>
  

