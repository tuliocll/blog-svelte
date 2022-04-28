<script>
  import { Link } from "svelte-navigator";


  export let blogName;
  export let bio;
  export let aboutMeText;
  export let socialNetworks = [];
  export let profilePicture;
  export let pages = [];
</script>

<header class="header text-center">
  <h1 class="blog-name pt-lg-4 mb-0"><Link to="/">{blogName}</Link></h1>

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
          src={profilePicture}
          alt="image {blogName}"
        />

        <div class="bio mb-3">
          {bio}<br /><Link to="/about">{aboutMeText}</Link>
        </div>

        <ul class="social-list list-inline py-3 mx-auto">
          {#each socialNetworks as social}
            <li class="list-inline-item">
              <a href={social.link}><i class="fab {social.icon} fa-fw" /></a>
            </li>
          {/each}
        </ul>
        <hr />
      </div>

      <ul class="navbar-nav flex-column text-left">
        {#each pages as page}
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
