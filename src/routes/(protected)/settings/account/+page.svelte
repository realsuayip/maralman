<script>
  import ProfilePicture from "$lib/components/ProfilePicture.svelte";
  import { page } from "$app/stores";

  let user = $page.data.user;
</script>

<form class="wrapper">
  <div class="wrapper" aria-labelledby="primary-information">
    <h2 style="margin-top:0;" id="primary-information">Primary information</h2>
    <div class="user-header">
      <ProfilePicture --size="150px" {user} />
      <div class="wrapper">
        <div class="input-group">
          <label for="display_name">Display name</label>
          <input value={user.display_name} id="display_name" />
        </div>

        <div class="input-group">
          <label for="description">Description</label>
          <textarea value={user.description} id="description" rows="4" />
        </div>
      </div>
    </div>

    <div class="input-group">
      <label for="username">Username</label>
      <input value={user.username} id="username" />
    </div>

    <div class="input-group">
      <label for="website">Website</label>
      <input value={user.website} id="website" />
    </div>
  </div>

  <div class="wrapper" aria-labelledby="personal-information">
    <h2 id="personal-information">Personal information</h2>

    <div class="input-group">
      <label for="birth_date">Birth date</label>
      <input value={user.birth_date} type="date" id="birth_date" required />
    </div>

    <div class="input-group">
      <label for="language">Language</label>
      <select value={user.language} id="language">
        <option value="en">English</option>
        <option value="tr">Turkish</option>
      </select>
    </div>

    <div class="input-group">
      <label for="gender">Gender</label>
      <select value={user.gender} id="gender">
        <option value="unspecified">Unspecified</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
    </div>
  </div>
  <button class="btn primary">Save</button>
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
