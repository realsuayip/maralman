<script>
  import Spinner from "$lib/components/Spinner.svelte";

  const { loading, children, class: className = "btn" } = $props();
</script>

<button
  class={className}
  class:secondary={loading || className.includes("secondary")}
  disabled={loading}
>
  {#if loading}<Spinner />{:else}{@render children()}{/if}
</button>
