<script>
  import ProfilePicture from "$lib/components/ProfilePicture.svelte";

  export let user;
</script>

<div class="pill">
  <a href="/@{user.username}"><ProfilePicture --size="48px" {user} /></a>
  <div>
    <strong>
      <a href="/@{user.username}">{user.display_name}</a>
    </strong>
    <small class="text-secondary">@{user.username}</small>
  </div>
</div>

<style>
  .pill {
    display: flex;
    gap: 1.25rem;
    align-items: center;
    padding: 1rem 0;
  }

  .pill > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.35rem;
  }

  .pill a {
    color: inherit;
  }
</style>
