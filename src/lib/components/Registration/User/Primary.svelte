<script>
  import { fly } from "svelte/transition";
  import ErrorText from "$lib/components/Registration/User/ErrorText.svelte";

  export let setStep, fields, errors;
</script>

<div class="subject" in:fly={{ x: -300 }}>
  <h3 class="m-0">Primary information</h3>

  <div class="input-group">
    <label for="username">Username</label>
    <input
      bind:value={$fields.username}
      type="text"
      id="username"
      minlength="3"
      required
    />
    <ErrorText of="username" {errors} />
    <small class="text-secondary">
      This username will be used reach your profile. You can always change your
      username later.
    </small>
  </div>

  <div class="input-group">
    <label for="display_name">Display name</label>
    <input
      bind:value={$fields.display_name}
      type="text"
      id="display_name"
      maxlength="32"
      required
    />
    <ErrorText of="display_name" {errors} />
  </div>

  <div class="input-group">
    <small class="text-secondary">
      <strong>{$fields.email}</strong> will be used as your email. If you want
      to use some other email,
      <a href="/register">please click here.</a>
    </small>
    <ErrorText of="email" {errors} />
  </div>

  <button
    type="button"
    class="btn"
    on:click={() => {
      setStep("password", true);
    }}
  >
    Next
  </button>
</div>
