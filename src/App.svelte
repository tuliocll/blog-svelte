<script>
  import { Router, Route } from "svelte-navigator";

  import getAllAbout from "./http/services/about/getAll";

  import Sidebar from "./components/sidebar/Sidebar.svelte";
  import Footer from "./components/footer/Footer.svelte";
  import Home from "./routes/Home.svelte";
  import Post from "./routes/Post.svelte";

  let blogInfo = {};

  getAllAbout().then((response) => {
    blogInfo = response.attributes;
  });
</script>

<Router>
  <nav>
    <Sidebar
      blogName={blogInfo?.blogName ?? ""}
      bio={blogInfo?.aboutMe ?? ""}
      profilePicture={blogInfo?.photo?.data?.attributes?.url}
      socialNetworks={blogInfo?.socialLinks}
      pages={blogInfo?.pages}
    />
  </nav>

  <div class="main-wrapper">
    <Route path="post/:id" component={Post} />
    <Route path="about" component={Post} />
    <Route
      path="/"
      blogName={blogInfo?.blogName ?? ""}
      blogSubtitle={blogInfo?.blogSubtitle}
      newsletterText={blogInfo?.newsletterText}
      component={Home}
    />
  </div>
</Router>

<Footer />
