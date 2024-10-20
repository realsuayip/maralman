<script>
  import { Person24, Key24, Mail24, Lock24 } from "svelte-octicons";
  import { page } from "$app/stores";
  /**
   * @typedef {Object} Props
   * @property {import('svelte').Snippet} [children]
   */

  /** @type {Props} */
  let { children } = $props();
</script>

<div class="flex-row gap-200">
  <nav>
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

  nav > ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  nav > ul > li {
    transition: 0.3s;
    padding: 0;
    border-right: 2px solid transparent;
  }

  nav > ul > li.active {
    border-right: 2px solid #0466ff;
    background-color: var(--background-accent);
  }

  nav > ul > li > a {
    padding: 1rem 3rem;
    display: flex;
    align-items: center;
    gap: 1.6rem;
    color: var(--foreground);
    transition: background-color 0.3s ease;
  }

  nav > ul > li > a:hover {
    background: var(--background-accent);
  }
</style>
