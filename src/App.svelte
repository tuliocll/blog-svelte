<script>
import { Router, Route} from "svelte-navigator";

import Sidebar from "./components/sidebar/Sidebar.svelte";
import Footer from "./components/footer/Footer.svelte";

import Home from "./routes/Home.svelte"
import Post from "./routes/Post.svelte"


export let blogName;
export let bio;
export let profilePicture;
export let socialNetworks = [];
export let pages = [];
export let aboutMeText;
export let blogSubtitle;
export let newsletterText;
export let posts = [];


</script>




<Router>
	<nav>
		<Sidebar {blogName} {bio} {profilePicture} {socialNetworks} {aboutMeText} {pages} />
	</nav>

		<div class="main-wrapper">
			<Route path="post/:id" component="{Post}" />
			<Route path="about" component="{Post}" />
			<Route path="/" {blogName} {blogSubtitle} {newsletterText} {posts} component="{Home}" />
		</div>
	  
	
  </Router>


<Footer />