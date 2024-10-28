<script>
  import Alert from "$lib/components/Alert.svelte";
  import ErrorText from "$lib/components/ErrorText.svelte";

  const { form } = $props();
</script>

<header>
  <h1>Create a new account</h1>
</header>

<Alert messages={form?.errors?.messages} />
<form class="subject" method="post" action="?/email">
  <div class="input-group">
    <label for="registration-email">Email address</label>
    <!-- svelte-ignore a11y_autofocus -->
    <input
      value={form?.email}
      id="registration-email"
      type="email"
      name="email"
      autocapitalize="none"
      autocomplete="email"
      maxlength="254"
      autofocus
      required
    />
    <ErrorText of="email" errors={form?.errors?.fieldErrors} />
    <small class="text-secondary">
      A confirmation code will be sent to this email.
    </small>
  </div>
  <button type="submit" class="btn">Continue</button>
</form>
