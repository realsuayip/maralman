<script>
  import Alert from "$lib/components/Alert.svelte";
  import ErrorText from "$lib/components/ErrorText.svelte";

  const { form } = $props();
</script>

<header>
  <h1>Enter verification code</h1>
</header>

<Alert messages={form?.errors?.messages} />
{#if form?.resend}
  <p role="alert" class="banner">A new confirmation code has been sent.</p>
{/if}

<div class="subject">
  <p>
    Please enter the six-digit confirmation code we just sent you via the
    following email:
  </p>
  <strong style="font-size: 2rem">{form?.email}</strong>
  <small><a target="_self" href="/register">Use different email</a></small>

  <form method="post" action="?/code" class="flex-col gap-200">
    <div class="input-group">
      <label for="code">Code</label>
      <input
        id="code"
        type="number"
        name="code"
        min="9999"
        max="999999"
        required
      />
      <ErrorText of="code" errors={form?.errors?.fieldErrors} />
    </div>
    <input type="hidden" name="email" value={form?.email} />
    <button class="btn" formaction="?/code">Continue</button>
  </form>

  <form method="post" action="?/email">
    <input type="hidden" name="email" value={form?.email} />
    <input type="hidden" name="resend" value="true" />
    <button class="btn secondary muted" formaction="?/email">
      Resend confirmation code
    </button>
  </form>
</div>
