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
          src={profileImage || ""}
          alt="image {blogInfo.blogName}"
          loading="lazy"
          decoding="async"
          style="
      background-size: cover;
      background-image: 
        url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http%3A//www.w3.org/2000/svg\'
        xmlns%3Axlink=\'http%3A//www.w3.org/1999/xlink\' viewBox=\'0 0 1280 853\'%3E%3Cfilter id=\'b\' color-interpolation-filters=\'sRGB\'%3E%3CfeGaussianBlur stdDeviation=\'.5\'%3E%3C/feGaussianBlur%3E%3CfeComponentTransfer%3E%3CfeFuncA type=\'discrete\' tableValues=\'1 1\'%3E%3C/feFuncA%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Cimage filter=\'url(%23b)\' x=\'0\' y=\'0\' height=\'100%25\' width=\'100%25\' 
        xlink%3Ahref=\'data%3Aimage/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAGCAIAAACepSOSAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAs0lEQVQI1wGoAFf/AImSoJSer5yjs52ktp2luJuluKOpuJefsoCNowB+kKaOm66grL+krsCnsMGrt8m1u8mzt8OVoLIAhJqzjZ2tnLLLnLHJp7fNmpyjqbPCqLrRjqO7AIeUn5ultaWtt56msaSnroZyY4mBgLq7wY6TmwCRfk2Pf1uzm2WulV+xmV6rmGyQfFm3nWSBcEIAfm46jX1FkH5Djn5AmodGo49MopBLlIRBfG8yj/dfjF5frTUAAAAASUVORK5CYII=\'%3E%3C/image%3E%3C/svg%3E');
    "
        />

        <div class="bio mb-3">
          {blogInfo.aboutMe}<br /><Link to="/about">Veja mais sobre mim.</Link>
        </div>

        <ul class="social-list list-inline py-3 mx-auto">
          {#each blogInfo.socialLinks as social}
            <li class="list-inline-item">
              <a href={social.link} target="_blank" rel="noreferrer"
                ><i class="fab {social.icon} fa-fw" /></a
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
