<script>
  import ProfilePicture from "$lib/components/ProfilePicture.svelte";
  import Alert from "$lib/components/Alert.svelte";
  import ErrorText from "$lib/components/Registration/User/ErrorText.svelte";
  import { page } from "$app/stores";
  import { enhance } from "$app/forms";
  import { Globe16, Lock16 } from "svelte-octicons";
  import { formHandler } from "$lib/forms.svelte.js";
  import Button from "$lib/components/Button.svelte";

  const handler = formHandler(false);

  const user = $derived($page.form?.user || $page.data.user);
  const errors = $derived($page.form?.errors?.fieldErrors);
</script>

<!-- TODO: Add relevant HTML input attributes, such as 'required'-->
<!-- TODO: Add success message & prettier loading-->
<form method="post" class="wrapper" use:enhance={handler.enhance}>
  <Alert messages={$page.form?.errors?.messages} />

  <div class="wrapper" aria-labelledby="primary-information">
    <h2 style="margin-top:0;" id="primary-information">
      <Globe16 />Primary information
    </h2>

    <div class="flex-row items-center gap-200">
      <ProfilePicture --margin="1rem" --size="150px" {user} />
      <div class="wrapper">
        <div class="input-group">
          <label for="display_name">Display name</label>
          <input
            name="display_name"
            value={user.display_name}
            id="display_name"
            maxlength="32"
            required
          />
          <ErrorText of="display_name" {errors} />
        </div>

        <div class="input-group">
          <label for="description">Description</label>
          <textarea
            name="description"
            value={user.description}
            id="description"
            rows="5"
          ></textarea>
          <ErrorText of="description" {errors} />
        </div>
      </div>
    </div>

    <div class="input-group">
      <label for="username">Username</label>
      <input
        name="username"
        value={user.username}
        id="username"
        minlength="3"
        required
      />
      <ErrorText of="username" {errors} />
    </div>

    <div class="input-group">
      <label for="website">Website</label>
      <input name="website" value={user.website} id="website" />
      <ErrorText of="website" {errors} />
    </div>
  </div>

  <div class="wrapper" aria-labelledby="personal-information">
    <h2 id="personal-information"><Lock16 />Personal information</h2>

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
      <select name="language" id="language">
        <option value="en" selected={user.language === "en"}>English</option>
        <option value="tr" selected={user.language === "tr"}>Turkish</option>
      </select>
      <ErrorText of="language" {errors} />
    </div>

    <div class="input-group">
      <label for="gender">Gender</label>
      <select name="gender" id="gender">
        <option value="unspecified" selected={user.gender === "unspecified"}>
          Unspecified
        </option>
        <option value="male" selected={user.gender === "male"}>Male</option>
        <option value="female" selected={user.gender === "female"}>
          Female
        </option>
        <option value="other" selected={user.gender === "other"}>Other</option>
      </select>
      <ErrorText of="gender" {errors} />
    </div>
  </div>
  <Button class="btn primary" loading={handler.loading}>Save</Button>
</form>

<style>
  textarea {
    resize: none;
  }

  h2 {
    font-weight: 700;
    font-size: 1.75rem;
    margin: 1rem 0;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .wrapper {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    gap: 1.25rem;
  }

  :global(button) {
    margin-top: 0.5rem;
  }
</style>
