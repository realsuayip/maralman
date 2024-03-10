<script>
  import { navigating } from "$app/stores";
  import "./styles.css";
  import Footer from "$lib/components/Footer.svelte";
  import { page } from "$app/stores";
  import { matchRoute } from "$lib/routes.js";
  import { Home24, Inbox24 } from "svelte-octicons";
  import UserPill from "$lib/components/UserPill.svelte";
</script>

{#if matchRoute($page.route, "auth") || !$page.data.user.is_authenticated}
  <div class="app focus">
    <div>
      <main class="center">
        {#if $navigating}
          <div class="subject">
            <strong>Just a minute...</strong>
          </div>
        {:else}
          <slot />
        {/if}
      </main>
      <Footer />
    </div>
  </div>
{:else if $page.data.user.is_authenticated}
  <div class="app auth">
    <nav>
      <ul>
        <li><a href="/"><Home24 />Home</a></li>
        <li><a href="/messages"><Inbox24 />Messages</a></li>
        <li><a href="/profile">Profile</a></li>
      </ul>
      <form action="/logout" method="POST">
        <button class="btn secondary">Log out</button>
      </form>
    </nav>
    <div class="content">
      <main>
        <slot />
      </main>
      <aside>
        <UserPill user={$page.data.user} />
        <Footer />
      </aside>
    </div>
  </div>
{/if}

<style>
  .auth {
    display: flex;
  }

  .auth > nav {
    padding: 1rem;
    position: sticky;
    top: 0;
    left: 0;
    flex-basis: 360px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-right: 1px solid var(--border-accent);
    background-color: var(--background);
  }

  .auth > nav > ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .auth > nav > ul > li > a {
    padding: 1rem;
    display: flex;
    align-items: flex-end;
    gap: 1.6rem;
    border-radius: 0.4rem;
    font-size: 1.75rem;
    color: var(--foreground);
    transition: background-color 0.3s ease;
  }

  .auth > nav > ul > li > a:hover {
    background: var(--background-accent);
  }

  .auth > .content {
    display: flex;
    width: min(1120px, 100vw);
  }

  .auth > .content > main {
    flex-basis: 760px;
    max-width: 760px;
    overflow: scroll;
    padding: 1rem 3.5rem;
  }

  .auth > .content > aside {
    padding: 2rem;
    position: sticky;
    height: 100vh;
    top: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
