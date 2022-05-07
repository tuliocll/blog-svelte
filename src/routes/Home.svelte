<script>
  import Newsletter from "../components/newsletter/Newsletter.svelte";
  import Post from "../components/post/Post.svelte";
  import Pagination from "../components/pagination/Pagination.svelte";
  
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
      {#each posts as post}
        <Post {...post} />
      {/each}
    </div>

    <Pagination
      page="{currentPage}"
      on:next-page="{handleNextPage}"
      on:previus-page="{handlePreviusPage}"
    />
  </section>
  

