<script>
	export let of, errors;
</script>

{#each $errors[of] || [] as message}
	<small class="text-danger">{message}</small>
{/each}
