<script>
  import Alert from "$lib/components/Alert.svelte";
  import Primary from "$lib/components/Registration/User/Primary.svelte";
  import Password from "$lib/components/Registration/User/Password.svelte";
  import Personal from "$lib/components/Registration/User/Personal.svelte";
  import { writable } from "svelte/store";
  import { propagateFieldErrors } from "$lib/forms.js";

  /**
   * @typedef {Object} Props
   * @property {any} form
   */

  /** @type {Props} */
  let { form } = $props();

  let previousStep = $state(),
    formElement = $state();
  let step = $state("primary");

  const fields = writable({ ...form?.data });
  const errors = writable(form?.errors?.fieldErrors);
  propagateFieldErrors(errors, fields);

  // List of field names, assigned to relevant steps. Used
  // to render relevant step when errors appear in one of them.
  const steps = {
    primary: ["email", "consent", "username", "display_name"],
    password: ["password", "password1"],
    personal: ["birth_date", "gender", "language", "understand"],
  };
  if ($errors) {
    const keys = Object.keys($errors);
    for (const [stepName, fieldNames] of Object.entries(steps)) {
      if (fieldNames.some((n) => keys.includes(n))) {
        step = stepName;
        break;
      }
    }
  }

  function setStep(value, checkValidity = false) {
    if (checkValidity && !formElement.reportValidity()) {
      return;
    }
    previousStep = step;
    step = value;
  }
</script>

<header>
  <h1>Complete your registration</h1>
</header>

<Alert messages={form?.errors?.messages} />
<form method="post" action="?/user" bind:this={formElement}>
  {#if step === "primary"}
    <Primary {setStep} {fields} {errors} />
  {:else if step === "password"}
    <Password {setStep} {previousStep} {fields} {errors} />
  {:else if step === "personal"}
    <Personal {setStep} {fields} {errors} />
  {/if}

  {#each Object.values(steps).flat(1) as name}
    <input type="hidden" {name} value={$fields[name] || ""} />
  {/each}
</form>
