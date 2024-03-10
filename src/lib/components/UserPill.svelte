<script>
  export let user;
</script>

<div class="pill">
  <a href="/@{user.username}">
    <img src={user.profile_picture} alt={user.display_name} />
  </a>
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

  .pill img {
    height: 48px;
    width: 48px;
    border-radius: 50%;
    pointer-events: none;
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
