<script>
  import { Lock16, ArrowRight16 } from "svelte-octicons";
  import Toggle from "$lib/components/Toggle.svelte";
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";
  import Spinner from "$lib/components/Spinner.svelte";
  import Alert from "$lib/components/Alert.svelte";

  let loading = $state();

  let user = $derived($page.form?.user || $page.data.user);
</script>

<form
  method="post"
  class="flex-col gap-150"
  use:enhance={() => {
    loading = true;
    return async ({ update }) => {
      await update({ reset: false });
      loading = false;
    };
  }}
>
  <h1 class="title flex-row items-center gap-75"><Lock16 />Privacy</h1>

  <div class="preference flex-col gap-100">
    <a href="/settings/privacy/blocked/" class="blocked gap-25">
      <strong>Your blocked users</strong>
      <span><ArrowRight16 /></span>
    </a>
    <small>See the list of blocked users and manage them.</small>
  </div>

  <Alert messages={$page.form?.errors?.messages} />

  <div class="preference">
    <Toggle class="space-between" for="is_private">
      <strong>Private account</strong>
      <input
        type="checkbox"
        name="is_private"
        id="is_private"
        aria-describedby="is_private_desc"
        checked={user.is_private}
      />
    </Toggle>
    <small id="is_private_desc">
      When your account is private, only the followers you approve can see what
      you share, such as your posts, your followers and following lists.
    </small>
  </div>

  <div class="preference">
    <Toggle class="space-between" for="allows_all_messages">
      <strong>Allow messages from everyone</strong>
      <input
        type="checkbox"
        name="allows_all_messages"
        id="allows_all_messages"
        aria-describedby="allows_all_messages_desc"
        checked={user.allows_all_messages}
      />
    </Toggle>
    <small id="allows_all_messages_desc">
      Enable this to receive message requests from all users. If disabled, only
      the users you follow will be able to message you.
    </small>
  </div>

  <div class="preference">
    <Toggle class="space-between" for="allows_receipts">
      <strong>Read receipts</strong>
      <input
        type="checkbox"
        name="allows_receipts"
        id="allows_receipts"
        aria-describedby="allows_receipts_desc"
        checked={user.allows_receipts}
      />
    </Toggle>
    <small id="allows_receipts_desc">
      Read receipts indicate when a message has been read by the recipient.
      Enabling this allows other senders to see if and when you have read their
      messages.
    </small>
  </div>

  <button class="btn primary" class:secondary={loading} disabled={loading}>
    {#if loading}<Spinner />{:else}Save{/if}
  </button>
  <a class="btn secondary muted" href="/settings/privacy/deactivate/">
    <small class="text-secondary">Deactivate your account</small>
  </a>
</form>

<style>
  a.blocked {
    display: inline-flex;
  }

  .preference {
    padding: 2rem;
    background: var(--background-accent);
    border: var(--border-accent);
    border-radius: 1rem;
  }
</style>
