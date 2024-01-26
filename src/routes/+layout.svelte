<script>
	import '../app.pcss';
	import { navigating } from '$app/stores';
	export let data;

	import './styles.css';
	import { Spinner } from 'flowbite-svelte';
</script>

<div class="app">
	<main>
		<pre>{JSON.stringify(data, undefined, 4)}</pre>
		{#if $navigating}
			<Spinner />
		{:else}
			<slot />
		{/if}
	</main>
</div>
