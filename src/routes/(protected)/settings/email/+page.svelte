<script>
  import { Mail16 } from "svelte-octicons";
  import { page } from "$app/stores";
  import { writable } from "svelte/store";
  import ErrorText from "$lib/components/Registration/User/ErrorText.svelte";
  import { propagateFieldErrors } from "$lib/forms.js";
  import Alert from "$lib/components/Alert.svelte";
  import { enhance } from "$app/forms";
  import Spinner from "$lib/components/Spinner.svelte";

  let loading = false;

  $: step = $page.form?.step || "send";
  $: fields = writable({ email: $page.form?.email });
  $: errors = writable($page.form?.errors?.fieldErrors);
  $: propagateFieldErrors(errors, fields);
</script>

<form
  method="post"
  action="?/{step}"
  class="flex-col gap-175"
  use:enhance={() => {
    loading = true;
    return async ({ update }) => {
      await update({ reset: false });
      loading = false;
    };
  }}
>
  <h1 class="title flex-row items-center gap-75">
    <Mail16 />
    Change Your Email
  </h1>

  <Alert messages={$page.form?.errors?.messages} />

  {#if step === "send"}
    <div class="banner flex-col gap-125">
      <p>
        You can change your email using this form; enter your new email below to
        receive a confirmation code. Once you enter the code, your email will be
        changed.
      </p>
      <p>Your current email: <strong>{$page.data.user.email}</strong></p>
    </div>

    <div class="input-group">
      <label for="new-email">Email</label>
      <input
        bind:value={$fields.email}
        id="new-email"
        type="email"
        name="email"
        autocapitalize="none"
        autocomplete="email"
        maxlength="254"
        required
      />
      <ErrorText of="email" {errors} />
    </div>
  {:else if step === "confirm"}
    <div class="banner flex-col gap-125">
      Please enter the six-digit confirmation code we just sent to your new
      email. Once you enter the code, your email will be changed to:
      <strong>{$fields.email}</strong>
    </div>

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
      <input type="hidden" name="email" value={$fields.email} />
      <ErrorText of="code" {errors} />
    </div>
  {:else if step === "success"}
    <div class="banner flex-col gap-125">
      Your email has been changed. Your new email is:
      <strong>{$fields.email}</strong>
    </div>
  {/if}

  {#if step !== "success"}
    <button class="btn primary" class:secondary={loading} disabled={loading}>
      {#if loading}<Spinner />{:else}Continue{/if}
    </button>
  {/if}
</form>
