<script>
	import { navigating } from '$app/stores';
	export let data;

	import './styles.css';
</script>

<div class="app">
	<main>
		<pre>{JSON.stringify(data, undefined, 4)}</pre>
		{#if $navigating}
			just a minute..
		{:else}
			<slot />
		{/if}
	</main>
</div>
