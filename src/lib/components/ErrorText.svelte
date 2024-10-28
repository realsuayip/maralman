<script>
  const { of, errors } = $props();
</script>

{#if errors && Object.prototype.hasOwnProperty.call(errors, of) && Array.isArray(errors[of])}
  {#each errors[of] as error}
    <small class="text-danger">{error.message}</small>
  {/each}
{/if}
