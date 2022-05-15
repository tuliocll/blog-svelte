<script>
  import { Link } from "svelte-navigator";
  import { onDestroy } from "svelte";
  import { blogInfoStore } from "../../stores/blogInfo.js";

  const api_url = API_URL;
  $: profileImage = `${api_url}${blogInfo?.photo?.data?.attributes.url}`;

  let blogInfo;

  const unsubscribe = blogInfoStore.subscribe((value) => {
    blogInfo = value;
    blogInfo.pages = value.pages.map((page) => page);
    blogInfo.socialLinks = value.socialLinks.map((social) => social);
  });

  onDestroy(unsubscribe);
</script>

<header class="header text-center">
  <h1 class="blog-name pt-lg-4 mb-0">
    <Link to="/">{blogInfo.blogName}</Link>
  </h1>

  <nav class="navbar navbar-expand-lg navbar-dark">
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navigation"
      aria-controls="navigation"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>

    <div id="navigation" class="collapse navbar-collapse flex-column">
      <div class="profile-section pt-3 pt-lg-0">
        <img
          class="profile-image mb-3 rounded-circle mx-auto"
          src={profileImage}
          alt="image {blogInfo.blogName}"
          loading="lazy"
        />

        <div class="bio mb-3">
          {blogInfo.aboutMe}<br /><Link to="/about">Veja mais sobre mim.</Link>
        </div>

        <ul class="social-list list-inline py-3 mx-auto">
          {#each blogInfo.socialLinks as social}
            <li class="list-inline-item">
              <Link to={social.link}><i class="fab {social.icon} fa-fw" /></Link
              >
            </li>
          {/each}
        </ul>
        <hr />
      </div>

      <ul class="navbar-nav flex-column text-left">
        {#each blogInfo.pages as page}
          <li class="nav-item active">
            <Link class="nav-link" to={page.link}
              ><i class="fas {page.icon} fa-fw mr-2" />{page.name}
              <span class="sr-only">(current)</span></Link
            >
          </li>
        {/each}
      </ul>
    </div>
  </nav>
</header>
