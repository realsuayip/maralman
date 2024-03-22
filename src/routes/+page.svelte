<script>
  import { page } from "$app/stores";
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

{#if $page.data.user.is_authenticated}
  <pre>{JSON.stringify($page.data.user, undefined, 4)}</pre>
  <pre>{JSON.stringify($page.data.session.ident, undefined, 4)}</pre>
{:else}
  <header>
    <h1>Sign in</h1>
    <small>
      Welcome to asu! To continue, please sign in or create a new account.
    </small>
  </header>
  <div class="subject">
    <form action="/login">
      <button class="btn primary">Sign in</button>
    </form>
    <a href="/register" class="btn secondary muted">Create a new account</a>
  </div>
{/if}
