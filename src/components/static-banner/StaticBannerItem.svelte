<script lang="ts">
	export let link: string;
	export let image: string;

	import './styles.css';
</script>

<div class="banner-container">
	<a href={link} target="_blank" rel="noopener noreferrer">
		<img src={image} class="banner-image" alt="Imagem do produto" />
	</a>
</div>
