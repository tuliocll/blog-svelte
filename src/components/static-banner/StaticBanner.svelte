<script lang="ts">
	import { browser } from '$app/env';
	import { analytics, db, remoteConfig } from '$lib/firebase';
	import { getDocument } from '$lib/services/firestore';
	import { logEvent } from 'firebase/analytics';
	import { fetchAndActivate, getBoolean } from 'firebase/remote-config';
	import { onMount } from 'svelte';
	import StaticBannerItem from './StaticBannerItem.svelte';

	type StaticBannerItem = {
		link: string;
		image: string;
	};

	const REFRESH_RATE = 50000;

	let banners: Array<StaticBannerItem> = [];
	let featureToggleBanner = false;
	let index = 0;

	async function getPromoItens() {
		const data = await getDocument(db(), 'promotions', 'banners');

		if (data) {
			banners = data.data;
		}
	}

	async function getBanners() {
		fetchAndActivate(remoteConfig()).then(async () => {
			const bannerConfig = await getBoolean(remoteConfig(), 'static_banners');
			featureToggleBanner = bannerConfig;
		});
	}

	onMount(() => {
		if (browser) {
			getPromoItens();
			getBanners();

			setInterval(() => {
				if (banners.length - 1 <= index) {
					index = 0;
				} else {
					index += 1;
				}
			}, REFRESH_RATE);
		}
	});
</script>

<section id="promo" class="">
	{#if browser && featureToggleBanner && banners.length > 0}
		<StaticBannerItem image={banners[index].image} link={banners[index].link} />
	{/if}
</section>
