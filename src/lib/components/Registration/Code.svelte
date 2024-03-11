<script>
  import { writable } from "svelte/store";
  import ErrorText from "$lib/components/Registration/User/ErrorText.svelte";
  import Alert from "$lib/components/Alert.svelte";

  export let form;

  const fields = writable({ email: form?.email });
  const errors = writable(form?.errors?.fieldErrors);
</script>

<header>
  <h1>Enter verification code</h1>
</header>

<Alert messages={form?.errors?.messages} />
{#if form?.resend}
  <p role="alert" class="banner">A new confirmation code has been sent.</p>
{/if}

<form class="subject" method="post" action="?/code">
  <p>
    Please enter the six-digit confirmation code we just sent you via the
    following email:
  </p>
  <strong style="font-size: 2rem">{$fields.email}</strong>
  <small><a target="_self" href="/register">Use different email</a></small>
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
    <ErrorText of="code" {errors} />
    <input type="hidden" name="email" value={$fields.email} />
  </div>
  <button type="submit" class="btn">Continue</button>

  <form method="post" action="?/email">
    <input type="hidden" name="email" value={$fields.email} />
    <input type="hidden" name="resend" value="true" />
    <button class="btn secondary muted" formaction="?/email">
      Resend confirmation code
    </button>
  </form>
</form>
