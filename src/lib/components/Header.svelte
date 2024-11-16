<script lang="ts">
  import { bundledLanguagesBase } from "shiki";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  interface Props {
    id: string | null;
    isViewing: boolean;
    note: string;
    language: string;
    isMarkdown: boolean;
  }

  let {
    id,
    isViewing,
    note,
    language = $bindable(),
    isMarkdown = $bindable()
  }: Props = $props();
</script>

<header>
  <div>
    <button
      onclick={async () => {
        if (isViewing) {
          await goto("/");
        } else {
          const req = await fetch("/", {
            method: "POST",
            body: note
          });
          if (req.ok) {
            const id = await req.text();
            const params = new URLSearchParams();
            params.set("lang", language);
            await goto("/" + id + "?" + params.toString());
          }
        }
      }}
    >
      {isViewing ? "new" : "upload"}
    </button>

    {#if !isMarkdown}
      <select bind:value={language}>
        {#each Object.keys(bundledLanguagesBase) as lang}
          <option value={lang}>{lang}</option>
        {/each}
      </select>
    {/if}
  </div>

  <div>
    {#if isViewing}
      {#if language == "markdown"}
        <button
          onclick={async () => {
            isMarkdown = !isMarkdown;
            const url = $page.url;
            if (isMarkdown) {
              url.searchParams.set("md", "");
            } else {
              url.searchParams.delete("md");
            }
            await goto(url);
          }}
        >
          preview
        </button>
      {/if}
      <button
        onclick={async () => {
          await goto("/" + id + "/raw");
        }}>raw</button
      >
    {/if}
  </div>
</header>

<style>
  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    padding-bottom: 1rem;
  }

  header div {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
  }

  button,
  select {
    background-color: var(--catppuccin-base);
    color: var(--catppuccin-text);
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
  }
</style>
