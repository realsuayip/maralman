<script>
	import { navigating } from '$app/stores';
	import './styles.css';
	import Footer from '$lib/components/Footer.svelte';
</script>

<div class="app">
	<main class="center">
		{#if $navigating}
			<div class="subject">
				<strong>Just a minute...</strong>
			</div>
		{:else}
			<slot />
		{/if}
	</main>
	<Footer />
</div>
