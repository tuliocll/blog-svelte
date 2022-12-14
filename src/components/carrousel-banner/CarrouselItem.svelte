<script lang="ts">
	export let name: string;
	export let link: string;
	export let image: string;
	export let price: string;
	export let oldPrice: string;
	export let id: string;
	export let rate: string;

	import './styles.css';
	import stars from '$lib/assets/stars.png';
	import { browser } from '$app/env';
	import { logEvent } from 'firebase/analytics';
	import { analytics } from '$lib/firebase';

	function onClick() {
		if (browser) {
			logEvent(analytics(), 'add_to_cart', {
				item: name,
				link
			});
			window.open(link);
		}
	}
</script>

<div class="product-container">
	<img src={image} class="product-image" alt="Imagem do produto" />
	<div>
		<span class="product-name">{name}</span>
		<img src={stars} class="product-rate" alt="Avaliação do produto" />
		<small>De:</small>
		<span class="product-old-price">{oldPrice}</span>
		<small>Por:</small>
		<span class="product-price">R${price}</span>
	</div>
	<button class="product-btn btn btn-primary" on:click={onClick}>Comprar</button>
</div>
