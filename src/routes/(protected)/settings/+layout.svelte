<script>
  import { Person24, Key24, Mail24, Lock24 } from "svelte-octicons";
  import { page } from "$app/stores";

  let { children } = $props();
</script>

<div class="flex-row gap-100">
  <nav class="flex-col gap-175">
    <h1>Settings</h1>
    <ul>
      <li class:active={$page.url.pathname.includes("/settings/account/")}>
        <a href="/settings/account"><Person24 />Account</a>
      </li>
      <li class:active={$page.url.pathname.includes("/settings/password/")}>
        <a href="/settings/password"><Key24 />Password</a>
      </li>
      <li class:active={$page.url.pathname.includes("/settings/email/")}>
        <a href="/settings/email"><Mail24 />Email</a>
      </li>
      <li class:active={$page.url.pathname.includes("/settings/privacy/")}>
        <a href="/settings/privacy"><Lock24 />Privacy</a>
      </li>
    </ul>
  </nav>

  <div class="content">{@render children?.()}</div>
</div>

<style>
  .content {
    padding: 1rem;
    flex-grow: 1;
  }

  nav {
    padding-left: 2rem;
  }

  nav > ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  nav > ul > li {
    transition: 0.3s;
    padding: 0;
  }

  nav > ul > li.active a,
  nav > ul > li:hover a {
    background-color: var(--background-accent);
  }

  nav > ul > li > a {
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    gap: 1.6rem;
    color: var(--foreground);
    transition: background-color 0.3s ease;
    border-radius: 1rem;
  }
</style>
