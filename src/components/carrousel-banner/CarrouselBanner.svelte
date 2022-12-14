<script lang="ts">
	import { browser } from '$app/env';
	import { analytics, db } from '$lib/firebase';
	import { getDocument } from '$lib/services/firestore';
	import { logEvent } from 'firebase/analytics';
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
		}
	});
</script>

<section id="promo" class="">
	{#if browser && products.length > 0}
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
