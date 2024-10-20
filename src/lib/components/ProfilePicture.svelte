<script>
  import placeholder from "$lib/assets/placeholder.svg";

  /**
   * @typedef {Object} Props
   * @property {any} user
   */

  /** @type {Props} */
  let { user } = $props();

  let alt = $derived(`Profile picture of ${user.display_name}`);
  let src = $derived(user.profile_picture || placeholder);
</script>

<div><img {src} {alt} /></div>

<style>
  div {
    height: var(--size);
    width: var(--size);
    margin: var(--margin);
  }

  img {
    height: inherit;
    width: inherit;

    border-radius: 50%;
    object-fit: cover;
    aspect-ratio: 1/1;

    pointer-events: none;
    user-select: none;
    -webkit-user-select: none;
  }
</style>
