<script>
  import { blur } from "svelte/transition";

  /**
   * @typedef {Object} Props
   * @property {any} messages
   */

  /** @type {Props} */
  let { messages } = $props();
</script>

{#each messages || [] as message}
  <p in:blur role="alert" class="banner danger">{message}</p>
{/each}
