<script lang="ts">
  import { parse } from "marked";
  import DOMPurify from "dompurify";

  interface Props {
    note: string;
  }

  const { note }: Props = $props();
  const html = $derived(DOMPurify.sanitize(parse(note) as string));
</script>

<div id="editor">
  {@html html}
</div>
