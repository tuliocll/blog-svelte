<script context="module" lang="ts">
	export const prerender = true;

	import ghost from '$lib/ghost';
	import { slugify } from '@tryghost/string';

	export async function load() {
		try {
			const data = await ghost.pages.read({ slug: 'contrate-me' });

			return {
				props: {
					page: data
				}
			};
		} catch (err) {
			console.log(err);
			return {
				status: 302,
				redirect: '/'
			};
		}
	}
</script>

<script lang="ts">
	import { GoogleAnalytics } from '@beyonk/svelte-google-analytics';

	import featuredImageSrc from '$lib/assets/home/logo.jpg';
	import website from '$lib/config/website';
	import SEO from '../components/SEO/SEO.svelte';

	export let page: any;

	const { author, siteUrl, siteDescription } = website;
	let title = 'Home';
	const breadcrumbs = [
		{
			name: 'Home',
			slug: ''
		}
	];

	const featuredImageAlt = 'Blog Tulio Calil';
	const featuredImage = {
		url: featuredImageSrc,
		alt: featuredImageAlt,
		width: 672,
		height: 448,
		caption: 'Home page'
	};
	const ogImage = {
		url: featuredImageSrc,
		alt: featuredImageAlt
	};
	const ogSquareImage = {
		url: featuredImageSrc,
		alt: featuredImageAlt
	};
	const twitterImage = {
		url: featuredImageSrc,
		alt: featuredImageAlt
	};
	const entityMeta = {
		url: `${siteUrl}/`,
		faviconWidth: 512,
		faviconHeight: 512,
		caption: author
	};

	const seoProps = {
		title,
		slug: '',
		entityMeta,
		datePublished: new Date().toISOString(),
		lastUpdated: new Date().toISOString(),
		breadcrumbs,
		metadescription: siteDescription,
		featuredImage,
		ogImage,
		ogSquareImage,
		twitterImage
	};

	let GOOGLE_ANALYTICS = import.meta.env ? import.meta.env.VITE_GOOGLE_ANALYTICS : '';
</script>

<SEO {...seoProps} />
<GoogleAnalytics properties={[GOOGLE_ANALYTICS]} />

<section class="blog-list px-3 py-5 p-md-5">
	<div class="container">
		<h1 class="section-title font-weight-bold mb-3">{page?.title || ''}</h1>
		<br />
		{@html page.html}

		<form name="contact-me" method="POST" netlify-honeypot="bot-field" data-netlify="true">
			<input type="hidden" name="form-name" value="contact-me" />
			<input type="text" name="bot-field" />
			<div class="row g-3">
				<div class="col-12 col-md-6">
					<label class="sr-only" for="cname">Name</label>
					<input
						type="text"
						class="form-control"
						id="cname"
						name="name"
						placeholder="Nome"
						minlength="2"
						required={true}
						aria-required="true"
					/>
				</div>
				<div class="col-12 col-md-6">
					<label class="sr-only" for="cemail">Email</label>
					<input
						type="email"
						class="form-control"
						id="cemail"
						name="email"
						placeholder="Email"
						required={true}
						aria-required="true"
					/>
				</div>

				<div class="col-12 mt-2">
					<label class="sr-only" for="cmessage">Your message</label>
					<textarea
						class="form-control"
						id="cmessage"
						name="message"
						placeholder="Digite sua mensagem"
						rows="10"
						required={true}
						aria-required="true"
						spellcheck="false"
						data-ms-editor="true"
					/>
				</div>
				<div class="form-group col-3 mt-2">
					<button type="submit" class="btn btn-block btn-primary py-2">Enviar</button>
				</div>
			</div>
			<!--//form-row-->
		</form>
	</div>
</section>
