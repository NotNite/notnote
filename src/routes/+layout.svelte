<script lang="ts">
  import "@fontsource/inconsolata";
  import "@fontsource/atkinson-hyperlegible";
</script>

<svelte:head>
  <title>notnote</title>
</svelte:head>

<main>
  <slot />
</main>

<style>
  :global(:root) {
    --catppuccin-base: #1e1e2e;
    --catppuccin-mantle: #181825;
    --catppuccin-text: #cdd6f4;
    --catppuccin-red: #f38ba8;
  }

  :global(body) {
    min-width: 100vw;
    min-height: 100vh;
    padding: 0;
    margin: 0;
  }

  main {
    --padding: 1rem;
    padding: var(--padding);
    display: flex;
    flex-direction: column;
    height: calc(100vh - var(--padding) * 2);
  }

  :global(:root) {
    font-family: "Atkinson Hyperlegible", sans-serif;
    background-color: var(--catppuccin-mantle);
    color: #cdd6f4;
  }

  :global(pre, code, textarea) {
    font-family: "Inconsolata", monospace;
  }

  :global(#editor) {
    background-color: #1e1e2e;
    border-radius: 0.5rem;

    --padding: 1rem;
    width: calc(100% - var(--padding) * 2);
    padding: var(--padding);

    position: relative;
  }

  :global(a) {
    color: var(--catppuccin-red);
  }
</style>
