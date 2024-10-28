<script>
  import { Mail16 } from "svelte-octicons";
  import ErrorText from "$lib/components/ErrorText.svelte";
  import Alert from "$lib/components/Alert.svelte";
  import { enhance } from "$app/forms";
  import { formHandler } from "$lib/forms.svelte.js";
  import Button from "$lib/components/Button.svelte";

  const handler = formHandler(false);

  const { form, data } = $props();
  const step = $derived(form?.step || "send");
  const email = $derived(form?.email);
  const errors = $derived(form?.errors?.fieldErrors);
</script>

<form
  method="post"
  action="?/{step}"
  class="flex-col gap-175"
  use:enhance={handler.enhance}
>
  <h1 class="title flex-row items-center gap-75">
    <Mail16 />
    Change Your Email
  </h1>

  <Alert messages={form?.errors?.messages} />

  {#if step === "send"}
    <div class="banner muted flex-col gap-125">
      <p>
        You can change your email using this form; enter your new email below to
        receive a confirmation code. Once you enter the code, your email will be
        changed.
      </p>
      <p>Your current email: <strong>{data.user.email}</strong></p>
    </div>

    <div class="input-group">
      <label for="new-email">Email</label>
      <input
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
    <div class="banner muted flex-col gap-125">
      Please enter the six-digit confirmation code we just sent to your new
      email. Once you enter the code, your email will be changed to:
      <strong>{email}</strong>
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
      <input type="hidden" name="email" value={email} />
      <ErrorText of="code" {errors} />
    </div>
  {:else if step === "success"}
    <div class="banner flex-col gap-125">
      Your email has been changed. Your new email is:
      <strong>{email}</strong>
    </div>
  {/if}

  {#if step !== "success"}
    <Button class="btn primary" loading={handler.loading}>Continue</Button>
  {/if}
</form>
