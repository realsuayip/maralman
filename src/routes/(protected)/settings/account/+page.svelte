<script>
  import ProfilePicture from "$lib/components/ProfilePicture.svelte";
  import Alert from "$lib/components/Alert.svelte";
  import ErrorText from "$lib/components/Registration/User/ErrorText.svelte";
  import { page } from "$app/stores";
  import { derived } from "svelte/store";
  import { enhance } from "$app/forms";

  let loading = false;

  $: user = $page.form?.user || $page.data.user;
  const errors = derived(page, ($page) => $page.form?.errors?.fieldErrors);
</script>

<!-- TODO: Add relevant HTML input attributes, such as 'required'-->
<!-- TODO: Add success message & prettier loading-->
<form
  method="post"
  class="wrapper"
  use:enhance={() => {
    loading = true;
    return async ({ update }) => {
      await update({ reset: false });
      loading = false;
    };
  }}
>
  <Alert messages={$page.form?.errors?.messages} />

  <div class="wrapper" aria-labelledby="primary-information">
    <h2 style="margin-top:0;" id="primary-information">Primary information</h2>

    <div class="user-header">
      <ProfilePicture --size="150px" {user} />
      <div class="wrapper">
        <div class="input-group">
          <label for="display_name">Display name</label>
          <input
            name="display_name"
            value={user.display_name}
            id="display_name"
          />
          <ErrorText of="display_name" {errors} />
        </div>

        <div class="input-group">
          <label for="description">Description</label>
          <textarea
            name="description"
            value={user.description}
            id="description"
            rows="4"
          />
          <ErrorText of="description" {errors} />
        </div>
      </div>
    </div>

    <div class="input-group">
      <label for="username">Username</label>
      <input name="username" value={user.username} id="username" />
      <ErrorText of="username" {errors} />
    </div>

    <div class="input-group">
      <label for="website">Website</label>
      <input name="website" value={user.website} id="website" />
      <ErrorText of="website" {errors} />
    </div>
  </div>

  <div class="wrapper" aria-labelledby="personal-information">
    <h2 id="personal-information">Personal information</h2>

    <div class="input-group">
      <label for="birth_date">Birth date</label>
      <input
        name="birth_date"
        value={user.birth_date}
        type="date"
        id="birth_date"
        required
      />
      <ErrorText of="birth_date" {errors} />
    </div>

    <div class="input-group">
      <label for="language">Language</label>
      <select name="language" value={user.language} id="language">
        <option value="en">English</option>
        <option value="tr">Turkish</option>
      </select>
      <ErrorText of="language" {errors} />
    </div>

    <div class="input-group">
      <label for="gender">Gender</label>
      <select name="gender" value={user.gender} id="gender">
        <option value="unspecified">Unspecified</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <ErrorText of="gender" {errors} />
    </div>
  </div>

  <button class="btn primary" class:secondary={loading}>
    {#if loading}Just a minute...{:else}Save{/if}
  </button>
</form>

<style>
  textarea {
    resize: none;
  }

  h2 {
    font-weight: 700;
    font-size: 1.75rem;
    margin: 1rem 0;
  }

  .wrapper {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    gap: 1.25rem;
  }

  .user-header {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
</style>
