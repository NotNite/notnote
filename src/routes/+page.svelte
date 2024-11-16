<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import Editor from "$lib/components/Editor.svelte";

  import {
    bundledLanguages,
    createHighlighter,
    type BundledLanguage
  } from "shiki";
  import * as defaults from "$lib/defaults";

  let language = $state<BundledLanguage>(defaults.language);
  let note = $state(defaults.note);
  let isMarkdown = $state(defaults.isMarkdown);
  let theme = $state(defaults.theme);

  const highlighter = $derived.by(() => {
    const lang = language; // capture it sync so the derived understands the dependency
    return createHighlighter({
      themes: [defaults.theme],
      langs: ["markdown"]
    }).then(async (hl) => {
      if (hl.getLoadedLanguages().includes(lang)) {
        return Promise.resolve(hl);
      } else {
        await hl.loadLanguage(bundledLanguages[lang]);
        return hl;
      }
    });
  });
</script>

<Header id={null} isViewing={false} {note} bind:language bind:isMarkdown />

{#await highlighter then highlighter}
  <Editor {highlighter} {theme} {language} isViewing={false} bind:note />
{/await}
