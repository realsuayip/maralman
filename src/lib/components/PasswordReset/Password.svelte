<script>
  import ErrorText from "$lib/components/ErrorText.svelte";
  import Alert from "$lib/components/Alert.svelte";

  const { form } = $props();
  const errors = $derived(form?.errors?.fieldErrors);
  const fields = $derived(form?.data);

  let confirmation = $state();
  let password = $state();
  let password_confirmation = $state();

  $effect(() => {
    if (password !== password_confirmation) {
      confirmation.setCustomValidity("Passwords did not match.");
    } else {
      confirmation.setCustomValidity("");
    }
  });
</script>

<header>
  <h1>Enter new password</h1>
</header>

<Alert messages={form?.errors?.messages} />
<form class="subject" method="post" action="?/password">
  <p>
    Enter the new password for your account associated with this email:
    <strong>{fields.email}</strong>
    <ErrorText of="consent" {errors}></ErrorText>
    <ErrorText of="email" {errors}></ErrorText>
  </p>

  <input type="hidden" name="email" value={fields.email} />
  <input type="hidden" name="consent" value={fields.consent} />

  <div class="input-group">
    <label for="password">Password</label>
    <input
      bind:value={password}
      name="password"
      type="password"
      id="password"
      minlength="8"
      required
    />
    <ErrorText of="password" {errors} />
    <div class="password-help text-secondary">
      <ul>
        <li>
          Your password can’t be too similar to your other personal information.
        </li>
        <li>Your password must contain at least 8 characters.</li>
        <li>Your password can’t be a commonly used password.</li>
        <li>Your password can’t be entirely numeric.</li>
      </ul>
    </div>
  </div>

  <div class="input-group">
    <label for="password1">Password (again)</label>
    <input
      bind:value={password_confirmation}
      bind:this={confirmation}
      type="password"
      id="password1"
      minlength="8"
      required
    />
  </div>
  <button class="btn primary">Reset your password</button>
</form>

<style>
  .password-help ul {
    margin: 0;
    padding: 0;
    font-size: small;
    list-style-position: inside;
  }
</style>
