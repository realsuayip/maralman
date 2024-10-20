<script>
  import { page } from "$app/stores";
  import { Calendar16, Link16, Lock16 } from "svelte-octicons";
  import ProfilePicture from "$lib/components/ProfilePicture.svelte";

  let { profile } = $derived($page.data);
  let joined = $derived(
    new Date(profile.date_joined).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    }),
  );
</script>

<section class="flex-row items-center gap-400">
  <ProfilePicture --size="150px" user={profile} />

  <div class="wrapper flex-col space-between">
    <div class="flex-col gap-125">
      <header class="flex-col gap-25">
        <h1 class="flex-row gap-50">
          {profile.display_name}
          {#if profile.is_private}<span class="icon"><Lock16 /></span>{/if}
          {#if profile.website}
            <a class="icon" href={profile.website} target="_blank">
              <Link16 />
            </a>
          {/if}
        </h1>
        <small class="text-secondary">@{profile.username}</small>
      </header>

      <article class="flex-col gap-225">
        <div class="flex-row gap-200">
          <a href="/@{profile.username}/followers">
            {profile.follower_count} Followers
          </a>
          <a href="/@{profile.username}/following">
            {profile.following_count} Following
          </a>
        </div>
        <p>{profile.description}</p>
      </article>
    </div>

    <aside class="text-secondary joined flex-row items-center gap-50">
      <Calendar16 />
      <span>Joined {joined}</span>
    </aside>
  </div>
</section>

<style>
  section {
    height: 150px;
    padding: 0 3.5rem;
  }

  section a {
    color: inherit;
    font-weight: 600;
  }

  .wrapper {
    height: 100%;
    flex-grow: 1;
    overflow: scroll;
  }

  .joined span {
    font-size: 1.25rem;
    padding-top: 0.4rem;
  }

  h1 {
    white-space: nowrap;
    font-size: 2rem;
    align-items: initial;
  }

  h1 .icon {
    height: 16px;
  }
</style>
