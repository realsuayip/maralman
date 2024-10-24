<script>
  import Email from "$lib/components/PasswordReset/Email.svelte";
  import Code from "$lib/components/PasswordReset/Code.svelte";
  import Password from "$lib/components/PasswordReset/Password.svelte";
  import Done from "$lib/components/PasswordReset/Done.svelte";

  let { form } = $props();
</script>

<svelte:head>
  <title>Reset your password</title>
</svelte:head>

{#if form && form.step}
  {#if form.step === "code"}
    <Code {form} />
  {:else if form.step === "password"}
    <Password {form} />
  {:else if form.step === "done"}
    <Done />
  {/if}
{:else}
  <Email {form} />
{/if}
