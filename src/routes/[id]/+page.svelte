<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import Editor from "$lib/components/Editor.svelte";
  import Viewer from "$lib/components/Viewer.svelte";

  import {
    bundledLanguages,
    createHighlighter,
    type BundledLanguage
  } from "shiki";
  import * as defaults from "$lib/defaults";
  import type { PageData } from "./$types";
  import { page } from "$app/stores";

  const { data }: { data: PageData } = $props();

  let language = $state(
    ($page.url.searchParams.get("lang") as BundledLanguage) ?? defaults.language
  );
  let note = $state(data.note);
  let isMarkdown = $state($page.url.searchParams.has("md"));
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

<Header id={data.id} isViewing={true} {note} bind:language bind:isMarkdown />

{#if isMarkdown}
  <Viewer {note} />
{:else}
  {#await highlighter then highlighter}
    <Editor {highlighter} {theme} {language} isViewing={true} bind:note />
  {/await}
{/if}
