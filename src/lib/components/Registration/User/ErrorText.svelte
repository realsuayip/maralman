<script>
  export let of, errors;
</script>

{#if $errors && Object.prototype.hasOwnProperty.call($errors, of) && Array.isArray($errors[of])}
  {#each $errors[of] as message}
    <small class="text-danger">{message}</small>
  {/each}
{/if}
