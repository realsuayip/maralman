<script>
  import { fly } from "svelte/transition";
  import ErrorText from "$lib/components/Registration/User/ErrorText.svelte";

  /**
   * @typedef {Object} Props
   * @property {any} setStep
   * @property {any} fields
   * @property {any} errors
   */

  /** @type {Props} */
  let { setStep, fields, errors } = $props();
</script>

<div class="subject" in:fly={{ x: 300 }}>
  <h3 class="m-0">Personal information</h3>
  <p>
    The following information will not be visible in your profile by default.
  </p>

  <div class="input-group">
    <label for="birth_date">Birth date</label>
    <input
      bind:value={$fields.birth_date}
      type="date"
      id="birth_date"
      required
    />
    <ErrorText of="birth_date" {errors} />
  </div>

  <div class="input-group">
    <label for="gender">Gender</label>
    <select bind:value={$fields.gender} id="gender">
      <option value="unspecified" selected>Unspecified</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="other">Other</option>
    </select>
    <ErrorText of="gender" {errors} />
  </div>

  <div class="input-group">
    <label for="language">Language</label>
    <select bind:value={$fields.language} id="language">
      <option value="en" selected>English</option>
      <option value="tr">Turkish</option>
    </select>
    <ErrorText of="language" {errors} />
  </div>

  <div>
    <input
      bind:checked={$fields.understand}
      type="checkbox"
      id="understand"
      required
    />
    <label for="understand">
      <small>
        I have read and agreed to the
        <a target="_blank" href="/terms">Terms</a> and
        <a target="_blank" href="/terms">Privacy Policy</a> statements.
      </small>
    </label>
  </div>

  <button type="submit" class="btn primary">Register</button>
  <button
    type="button"
    class="btn secondary muted"
    onclick={() => {
      setStep("password");
    }}
  >
    Back
  </button>
</div>
