<script>
  import { Router, Route } from "svelte-navigator";
  import { GoogleAnalytics } from "@beyonk/svelte-google-analytics";
  import { QueryClient, QueryClientProvider } from "@sveltestack/svelte-query";

  import getAllAbout from "./http/services/about/getAll";

  import Sidebar from "./components/sidebar/Sidebar.svelte";
  import Footer from "./components/footer/Footer.svelte";
  import Home from "./routes/Home.svelte";
  import Post from "./routes/Post.svelte";

  import { blogInfoStore } from "./stores/blogInfo.js";

  let blogInfo = {};
  const queryClient = new QueryClient();

  blogInfoStore.subscribe((value) => {
    blogInfo = value;
  });

  getAllAbout().then((response) => {
    blogInfoStore.set(response.attributes);
  });

  console.log("carrega");
</script>

<GoogleAnalytics properties={[GOOGLE_ANALYTICS]} />

<Router>
  <nav>
    <Sidebar />
  </nav>

  <div class="main-wrapper">
    <QueryClientProvider client={queryClient}>
      <Route path="post/:id" component={Post} />
      <Route path="about" component={Post} />
      <Route component={Home} />
    </QueryClientProvider>
  </div>
</Router>

<Footer />
