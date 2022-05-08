<script>
  import { Router, Route } from "svelte-navigator";

  import getAllAbout from "./http/services/about/getAll";

  import Sidebar from "./components/sidebar/Sidebar.svelte";
  import Footer from "./components/footer/Footer.svelte";
  import Home from "./routes/Home.svelte";
  import Post from "./routes/Post.svelte";

  export let blogName;
  export let bio;
  export let profilePicture;
  export let socialNetworks = [];
  export let pages = [];
  export let aboutMeText;
  export let blogSubtitle;
  export let newsletterText;
  export let posts = [];

  let blogInfo = {};

  getAllAbout().then((response) => {
    blogInfo = response.attributes;
    console.log(response.attributes);
  });
</script>

<Router>
  <nav>
    <Sidebar
      blogName={blogInfo?.blogName ?? ""}
      bio={blogInfo?.aboutMe ?? ""}
      profilePicture={blogInfo?.photo?.data?.attributes?.url}
      {socialNetworks}
      {aboutMeText}
      {pages}
    />
  </nav>

  <div class="main-wrapper">
    <Route path="post/:id" component={Post} />
    <Route path="about" component={Post} />
    <Route
      path="/"
      {blogName}
      {blogSubtitle}
      {newsletterText}
      component={Home}
    />
  </div>
</Router>

<Footer />
