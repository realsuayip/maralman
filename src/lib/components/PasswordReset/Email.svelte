<script>
  import Alert from "$lib/components/Alert.svelte";
  import ErrorText from "$lib/components/Registration/User/ErrorText.svelte";

  const { form } = $props();
</script>

<header>
  <h1>Reset your password</h1>
</header>

<Alert messages={form?.errors?.messages} />
<form class="subject" method="post" action="?/email">
  <div class="input-group">
    <label for="password-reset-email">Email address</label>
    <!-- svelte-ignore a11y_autofocus -->
    <input
      value={form?.email}
      id="password-reset-email"
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
      Enter the email address associated with your account. A confirmation code
      will be sent to this email.
    </small>
  </div>
  <button type="submit" class="btn">Continue</button>
</form>
