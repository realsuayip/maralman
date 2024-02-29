<script>
  import { fly } from "svelte/transition";
  import ErrorText from "$lib/components/Registration/User/ErrorText.svelte";

  export let previousStep, setStep, fields, errors;
</script>

<div class="subject" in:fly={{ x: previousStep === "primary" ? 300 : -300 }}>
  <h3 class="m-0">Password</h3>
  <p>
    Please enter a strong password for your account. To ensure your safety,
    follow the guidelines.
  </p>

  <div class="input-group">
    <label for="password">Password</label>
    <input bind:value={$fields.password} type="password" id="password" />
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
    <input type="password" id="password1" />
  </div>

  <button
    type="button"
    class="btn btn-primary"
    on:click={() => {
      setStep("personal");
    }}
  >
    Next
  </button>
  <button
    type="button"
    class="btn secondary muted"
    on:click={() => {
      setStep("primary");
    }}
  >
    Back
  </button>
</div>

<style>
  .password-help ul {
    margin: 0;
    padding: 0;
    font-size: small;
    list-style-position: inside;
  }
</style>
