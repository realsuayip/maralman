<script>
  import ErrorText from "$lib/components/ErrorText.svelte";
  import Button from "$lib/components/Button.svelte";
  import Alert from "$lib/components/Alert.svelte";

  const { form } = $props();
  const errors = $derived(form?.errors?.fieldErrors);
</script>

<svelte:head>
  <title>Deactivate your account</title>
</svelte:head>

<form method="post" class="flex-col gap-175">
  <h1 class="title">Deactivate your account</h1>

  <Alert messages={form?.errors?.messages} />

  <p class="banner muted">
    Enter your password to deactivate your account. You may reactivate it at any
    time by signing in again. If you choose to permanently delete your account,
    it will be scheduled for deletion after 30 days. During this time, you may
    sign in to cancel the deletion request.
  </p>

  <div class="input-group">
    <label for="password">Password</label>
    <input
      name="password"
      type="password"
      id="password"
      autocomplete="current-password"
      required
    />
    <ErrorText of="password" {errors} />
  </div>

  <Button class="btn primary">Deactivate your account</Button>
  <Button name="for_deletion" value="true" class="btn secondary">
    Permanently delete your account
  </Button>
</form>
