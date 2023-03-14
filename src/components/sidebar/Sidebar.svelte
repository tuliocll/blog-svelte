<script lang="ts">
	import type { AboutType } from '$lib/types/about';
	import { onDestroy } from 'svelte';
	import { blogInfoStore } from '../../stores/blogInfo';

	type socialLinks = { icon?: string; label: string; url: string };

	let blogInfo: AboutType;
	let socialLinks: socialLinks[] = [];
	$: profileImage = blogInfo?.author?.profile_image;

	const unsubscribe = blogInfoStore.subscribe((value) => {
		blogInfo = value;
		filterSocialLinks();
	});

	function filterSocialLinks() {
		const socialNetworks = ['Twitter', 'Instagram', 'Github', 'Linkedin'];
		socialLinks = blogInfo.navigation.filter((item) => socialNetworks.includes(item.label));
		socialLinks = socialLinks.map((social) => ({
			...social,
			icon: `fa-${social.label.toLowerCase()}`
		}));
	}

	onDestroy(unsubscribe);
</script>

<header class="header text-center">
	<h1 class="blog-name pt-lg-4 mb-0">
		<a href="/">{blogInfo.title}</a>
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
					src={profileImage || ''}
					alt="image {blogInfo.title}"
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
					{blogInfo.meta_description}<br />
					<!-- <a href="/about">Veja mais sobre mim.</a> -->
				</div>

				<ul class="social-list list-inline py-3 mx-auto">
					{#each socialLinks as social}
						<li class="list-inline-item">
							<a href={social.url} target="_blank" rel="noreferrer"
								><i class="fab fa-twitter {social.icon} fa-fw" /></a
							>
						</li>
					{/each}
				</ul>
				<hr />
			</div>

			<ul class="navbar-nav flex-column text-left">
				<!-- {#each blogInfo.pages as page}
					<li class="nav-item active">
						<a class="nav-link" href={page.link}
							><i class="fas {page.icon} fa-fw mr-2" />{page.name}
							<span class="sr-only">(current)</span></a
						>
					</li>
				{/each} -->
			</ul>
			<a class="btn btn-primary" href="/contrate-me">
				<i class="fas fa-paper-plane me-2 mr-2" />Contrate-me</a
			>
		</div>
	</nav>
</header>
