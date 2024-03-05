<script>
  import { navigating } from "$app/stores";
  import "./styles.css";
  import Footer from "$lib/components/Footer.svelte";
  import { page } from "$app/stores";
  import { matchRoute } from "$lib/routes.js";
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
  <div class="app">
    <main>
      <slot />
    </main>
    <Footer />
  </div>
{/if}
