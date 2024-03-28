<script>
  let classes;
  let labelFor;
  export { classes as class };
  export { labelFor as for };
</script>

<label class="toggle {classes}" for={labelFor}>
  <slot />
  <span class="toggle-display" hidden></span>
</label>

<style>
  .toggle {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    position: relative;
    margin-bottom: 1.5rem;
    cursor: pointer;
    gap: 1ch;
  }

  :global(input[type="checkbox"]) {
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
  }

  .toggle-display {
    --offset: 0rem;
    --diameter: 2rem;

    display: inline-flex;
    align-items: center;
    justify-content: space-around;
    box-sizing: content-box;
    width: calc(var(--diameter) * 2 + var(--offset) * 2);
    height: calc(var(--diameter) + var(--offset) * 2);
    border: 0.1em solid rgb(0 0 0 / 0.2);
    position: relative;
    border-radius: 100vw;
    background-color: var(--foreground-secondary);
    transition: transform 250ms;
  }

  .toggle-display::before {
    content: "";
    z-index: 2;
    position: absolute;
    top: 50%;
    left: var(--offset);
    box-sizing: border-box;
    width: var(--diameter);
    height: var(--diameter);
    border: 0.1em solid rgb(0 0 0 / 0.2);
    border-radius: 50%;
    background-color: white;
    transform: translate(0, -50%);
    will-change: transform;
    transition: inherit;
  }

  .toggle:focus .toggle-display,
  :global(input[type="checkbox"]:focus + .toggle-display) {
    outline: 1px dotted #212121;
    outline: 1px auto -webkit-focus-ring-color;
    outline-offset: 2px;
  }

  .toggle:focus,
  .toggle:focus:not(:focus-visible) .toggle-display,
  :global(input[type="checkbox"]:focus:not(:focus-visible) + .toggle-display) {
    outline: 0;
  }

  :global(input[type="checkbox"]:checked + .toggle-display) {
    background-color: #0466ff;
  }

  :global(input[type="checkbox"]:checked + .toggle-display::before) {
    transform: translate(100%, -50%);
  }

  :global(input[type="checkbox"]:disabled + .toggle-display) {
    opacity: 0.6;
    filter: grayscale(40%);
    cursor: not-allowed;
  }
</style>
