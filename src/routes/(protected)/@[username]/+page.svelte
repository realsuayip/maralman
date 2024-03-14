<script>
  import { page } from "$app/stores";
  import { Calendar16, Link16, Lock16 } from "svelte-octicons";
  import ProfilePicture from "$lib/components/ProfilePicture.svelte";

  let profile = $page.data.content;
  let joined = new Date(profile.date_joined).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
</script>

<section>
  <ProfilePicture --size="150px" user={profile} />
  <div class="wrapper">
    <div class="stats">
      <header class="title">
        <h1>
          {profile.display_name}
          {#if profile.is_private}<Lock16 />{/if}
          {#if profile.website}
            <a href={profile.website} target="_blank"><Link16 /></a>
          {/if}
        </h1>
        <small class="text-secondary">@{profile.username}</small>
      </header>
      <article class="bottom">
        <div class="follows">
          <a href="/@{profile.username}/followers">
            {profile.follower_count} Followers
          </a>
          <a href="/@{profile.username}/following">
            {profile.following_count} Following
          </a>
        </div>
        <p class="description">{profile.description}</p>
      </article>
    </div>
    <aside class="text-secondary joined">
      <Calendar16 />
      <span>Joined {joined}</span>
    </aside>
  </div>
</section>

<style>
  section {
    display: flex;
    align-items: center;
    gap: 4rem;
    height: 150px;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    flex-grow: 1;
    overflow: scroll;
  }

  .stats {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .bottom {
    display: flex;
    flex-direction: column;
    gap: 2.25rem;
  }

  .description {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .title {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
  }

  .title small {
    font-size: 1.4rem;
  }

  .follows {
    display: flex;
    gap: 2rem;
  }

  .follows a,
  .title a {
    color: inherit;
    font-weight: 600;
  }

  .joined {
    display: flex;
    gap: 0.5rem;
  }

  .joined span {
    font-size: 1.25rem;
    padding-top: 0.4rem;
  }

  h1 {
    font-size: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  header {
    display: flex;
    flex-direction: row;
  }
</style>
