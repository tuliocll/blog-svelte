<script lang="ts">
	import { browser } from '$app/env';
	import { analytics, db, remoteConfig } from '$lib/firebase';
	import { getDocument } from '$lib/services/firestore';
	import { logEvent } from 'firebase/analytics';
	import { fetchAndActivate, getBoolean } from 'firebase/remote-config';
	import { onMount } from 'svelte';
	import Carousel from 'svelte-carousel';
	import CarrouselItem from './CarrouselItem.svelte';

	let carrouselSize = 3;

	type CarrouselItem = {
		name: string;
		link: string;
		image: string;
		price: string;
		oldPrice: string;
		id: string;
		rate: string;
	};

	let products: Array<CarrouselItem> = [];
	let featureToggleBanner = false;

	async function getPromoItens() {
		const data = await getDocument(db(), 'promotions', 'products');

		if (data) {
			products = data.data;
		}
	}

	function changePageEvent() {
		if (browser) {
			logEvent(analytics(), 'view_item_list');
		}
	}

	async function getBanners() {
		fetchAndActivate(remoteConfig()).then(async () => {
			const bannerConfig = await getBoolean(remoteConfig(), 'carrousel_banner');
			featureToggleBanner = bannerConfig;
		});
	}

	onMount(() => {
		if (browser) {
			getPromoItens();

			const isMobile = window.matchMedia('only screen and (max-width: 760px)').matches;
			const isMobileSmall = window.matchMedia('only screen and (max-width: 320px)').matches;

			if (isMobile) {
				carrouselSize = 2;
			}

			if (isMobileSmall) {
				carrouselSize = 1;
			}

			getBanners();
		}
	});
</script>

<section id="promo" class="">
	{#if browser && featureToggleBanner && products.length > 0}
		<Carousel particlesToShow={carrouselSize} on:pageChange={changePageEvent}>
			{#each products as product}
				<CarrouselItem
					name={product.name}
					id={product.id}
					image={product.image}
					link={product.link}
					oldPrice={product.oldPrice}
					price={product.price}
					rate={product.rate}
				/>
			{/each}
		</Carousel>
	{/if}
</section>
