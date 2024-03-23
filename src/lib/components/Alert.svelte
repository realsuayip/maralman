<script>
  import { blur } from "svelte/transition";

  export let messages;
</script>

{#each messages || [] as message}
  <p in:blur role="alert" class="banner danger">{message}</p>
{/each}
