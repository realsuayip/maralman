<script>
  import Email from "$lib/components/Registration/Email.svelte";
  import Code from "$lib/components/Registration/Code.svelte";
  import User from "$lib/components/Registration/User/User.svelte";

  export let form;
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

{#if form && form.step}
  {#if form.step === "code"}
    <Code {form} />
  {:else if form.step === "user"}
    <User email={form.email} consent={form.consent} {form} />
  {/if}
{:else}
  <Email {form} />
{/if}
