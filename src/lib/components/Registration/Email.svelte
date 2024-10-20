<script>
  import ErrorText from "$lib/components/Registration/User/ErrorText.svelte";
  import { writable } from "svelte/store";
  import Alert from "$lib/components/Alert.svelte";

  /**
   * @typedef {Object} Props
   * @property {any} form
   */

  /** @type {Props} */
  let { form } = $props();

  const fields = writable({ email: form?.email });
  const errors = writable(form?.errors?.fieldErrors);
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
      bind:value={$fields.email}
      id="registration-email"
      type="email"
      name="email"
      autocapitalize="none"
      autocomplete="email"
      maxlength="254"
      autofocus
      required
    />
    <ErrorText of="email" {errors} />
    <small class="text-secondary">
      A confirmation code will be sent to this email.
    </small>
  </div>
  <button type="submit" class="btn">Continue</button>
</form>
