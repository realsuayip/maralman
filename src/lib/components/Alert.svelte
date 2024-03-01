<script>
  export let messages;
</script>

{#each messages || [] as message}
  <p role="alert" class="banner danger">{message}</p>
{/each}
