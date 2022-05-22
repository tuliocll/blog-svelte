<script>
  import { Router, Route } from "svelte-navigator";

  import getAllAbout from "./http/services/about/getAll";

  import Sidebar from "./components/sidebar/Sidebar.svelte";
  import Footer from "./components/footer/Footer.svelte";
  import Home from "./routes/Home.svelte";
  import Post from "./routes/Post.svelte";

  import { blogInfoStore } from "./stores/blogInfo.js";

  let blogInfo = {};

  blogInfoStore.subscribe((value) => {
    blogInfo = value;
  });

  getAllAbout().then((response) => {
    blogInfoStore.set(response.attributes);
  });
</script>

<Router>
  <nav>
    <Sidebar />
  </nav>

  <div class="main-wrapper">
    <Route path="post/:id" component={Post} />
    <Route path="about" component={Post} />
    <Route component={Home} />
  </div>
  <script
    defer
    data-host="https://cusdis.com"
    data-app-id={CUSDIS_KEY}
    src="https://cusdis.com/js/cusdis-count.umd.js"></script>
</Router>

<Footer />
