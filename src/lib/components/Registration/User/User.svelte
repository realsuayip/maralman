<script>
  import Primary from "$lib/components/Registration/User/Primary.svelte";
  import Password from "$lib/components/Registration/User/Password.svelte";
  import Personal from "$lib/components/Registration/User/Personal.svelte";
  import { writable } from "svelte/store";

  export let consent, email, form;

  let previousStep;
  let step = "primary";

  const fields = writable({ email: email, consent: consent, ...form?.data });
  const errors = writable(form?.errors || {});
  const names = [
    "email",
    "consent",
    "username",
    "display_name",
    "password",
    "birth_date",
    "gender",
    "language",
  ];

  function setStep(value) {
    previousStep = step;
    step = value;
  }

  // If the field with the error gets changed,
  // remove the errors.
  let keys = Object.keys($errors);
  if (keys) {
    const initials = {};
    fields.subscribe(() => {
      for (const key of keys) {
        if (initials[key]) {
          $errors[key] = [];
        } else {
          initials[key] = true;
        }
      }
    });
  }
</script>

<header>
  <h1>Complete your registration</h1>
</header>

<form method="post" action="?/user">
  {#if step === "primary"}
    <Primary {setStep} {fields} {errors} />
  {:else if step === "password"}
    <Password {setStep} {previousStep} {fields} {errors} />
  {:else if step === "personal"}
    <Personal {setStep} {fields} {errors} />
  {/if}

  {#each names as name}
    <input type="hidden" {name} value={$fields[name] || ""} />
  {/each}
</form>
