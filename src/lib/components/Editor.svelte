<script lang="ts">
  import { type Highlighter } from "shiki";

  interface Props {
    highlighter: Highlighter;
    theme: string;
    language: string;
    isViewing: boolean;
    note: string;
  }

  let {
    highlighter,
    theme,
    language,
    isViewing,
    note = $bindable()
  }: Props = $props();

  const html = $derived.by(() => {
    try {
      return highlighter.codeToHtml(note + "\n", {
        lang: language,
        theme
      });
    } catch {
      // hasn't loaded yet, wait for the derived to catch up
      return "";
    }
  });
</script>

<div id="editor">
  <textarea
    id="input"
    bind:value={note}
    spellcheck="false"
    readonly={isViewing}
  >
  </textarea>
  {@html html}
</div>

<style>
  #input {
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    background: none;
    z-index: 1;

    color: transparent;
    caret-color: #f5e0dc;

    resize: none;

    width: 100%;
    height: 100%;
  }

  :global(.shiki) {
    cursor: default;
  }

  #input {
    position: absolute;
    top: 0;
    left: 0;

    width: calc(100% - var(--padding) * 2);
    height: 100%;
    padding: var(--padding);
  }

  :global(.shiki) {
    pointer-events: none;
    background-color: transparent !important;
  }

  :global(pre) {
    margin: 0;
  }

  :global(pre, code, span, textarea) {
    text-wrap: auto;
    word-wrap: break-word;
  }
</style>
