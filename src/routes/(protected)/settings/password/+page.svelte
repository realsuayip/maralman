<script>
  import ErrorText from "$lib/components/ErrorText.svelte";
  import Alert from "$lib/components/Alert.svelte";
  import { enhance } from "$app/forms";
  import { formHandler } from "$lib/forms.svelte.js";
  import Button from "$lib/components/Button.svelte";

  const handler = formHandler();
  const { form } = $props();
  const errors = $derived(form?.errors?.fieldErrors);

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

<form method="post" class="flex-col gap-175" use:enhance={handler.enhance}>
  <h1 class="title flex-row items-center gap-75">Change Your Password</h1>

  <Alert messages={form?.errors?.messages} />

  {#if form?.step === "success"}
    <div class="banner">Your password has been changed.</div>
  {/if}

  <div class="input-cluster">
    <div class="input-group">
      <label for="password">Old password</label>
      <input
        name="password"
        type="password"
        id="password"
        autocomplete="current-password"
        required
      />
      <ErrorText of="password" {errors} />
    </div>

    <div class="input-group">
      <label for="new_password">New password</label>
      <input
        bind:value={password}
        name="new_password"
        type="password"
        id="new_password"
        minlength="8"
        autocomplete="new-password"
        required
      />
      <ErrorText of="new_password" {errors} />
    </div>

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

    <div class="input-group">
      <label for="password1">New password (again)</label>
      <input
        bind:value={password_confirmation}
        bind:this={confirmation}
        type="password"
        id="password1"
        minlength="8"
        autocomplete="new-password"
        required
      />
    </div>
  </div>

  <Button class="btn primary" loading={handler.loading}>
    Reset your password
  </Button>
</form>
