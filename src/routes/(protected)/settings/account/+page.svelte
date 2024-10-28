<script>
  import ProfilePicture from "$lib/components/ProfilePicture.svelte";
  import Alert from "$lib/components/Alert.svelte";
  import ErrorText from "$lib/components/ErrorText.svelte";
  import { enhance } from "$app/forms";
  import { Globe16, Lock16 } from "svelte-octicons";
  import { formHandler } from "$lib/forms.svelte.js";
  import Button from "$lib/components/Button.svelte";

  const handler = formHandler(false);

  const { form, data } = $props();
  const user = $derived(form?.user || data.user);
  const errors = $derived(form?.errors?.fieldErrors);
</script>

<!-- TODO: Add relevant HTML input attributes, such as 'required'-->
<!-- TODO: Add success message & prettier loading-->
<form method="post" class="flex-col gap-175" use:enhance={handler.enhance}>
  <Alert messages={form?.errors?.messages} />

  <div class="flex-col gap-75">
    <h1 class="title flex-row items-center gap-75" id="primary-information">
      <Globe16 />Primary
    </h1>
    <small class="banner muted">
      The information on your profile—such as your name, bio and profile
      picture—is visible to all users, helping you connect and share who you
      are.
    </small>
  </div>

  <div class="input-cluster" aria-labelledby="primary-information">
    <div class="flex-row items-center gap-200">
      <ProfilePicture --margin="1rem" --size="150px" {user} />

      <div class="input-cluster self">
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

  <div class="flex-col gap-75">
    <h1 class="title flex-row items-center gap-75" id="personal-information">
      <Lock16 />Personal
    </h1>
    <small class="banner muted">
      The personal information you provide here is private and will not be
      visible to other users. This information helps us verify your account and
      enhance your experience.
    </small>
  </div>

  <div class="input-cluster" aria-labelledby="personal-information">
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
  .self {
    flex-grow: 1;
  }
</style>
