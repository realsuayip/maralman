<script>
  import { fly } from "svelte/transition";
  import ErrorText from "$lib/components/ErrorText.svelte";

  let confirmation = $state();
  let { previousStep, setStep, fields, errors } = $props();

  function checkPasswordMatch() {
    if (fields.password !== fields.password1) {
      confirmation.setCustomValidity("Passwords did not match.");
    } else {
      confirmation.setCustomValidity("");
    }
    return true;
  }
</script>

<div class="subject" in:fly={{ x: previousStep === "primary" ? 300 : -300 }}>
  <h3 class="m-0">Password</h3>
  <p>
    Please enter a strong password for your account. To ensure your safety,
    follow the guidelines.
  </p>

  <div class="input-group">
    <label for="password">Password</label>
    <input
      bind:value={fields.password}
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
      bind:value={fields.password1}
      bind:this={confirmation}
      type="password"
      id="password1"
      minlength="8"
      required
    />
    <ErrorText of="password1" {errors} />
  </div>

  <button
    type="button"
    class="btn"
    onclick={() => {
      checkPasswordMatch() && setStep("personal", true);
    }}
  >
    Next
  </button>
  <button
    type="button"
    class="btn secondary muted"
    onclick={() => {
      setStep("primary");
    }}
  >
    Back
  </button>
</div>
