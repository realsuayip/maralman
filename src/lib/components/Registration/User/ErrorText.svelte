<script>
  /**
   * @typedef {Object} Props
   * @property {any} of
   * @property {any} errors
   */

  /** @type {Props} */
  let { of, errors } = $props();
</script>

{#if $errors && Object.prototype.hasOwnProperty.call($errors, of) && Array.isArray($errors[of])}
  {#each $errors[of] as message}
    <small class="text-danger">{message}</small>
  {/each}
{/if}
