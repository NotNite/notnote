import { type BundledLanguage, type BundledTheme } from "shiki";

export const language: BundledLanguage = "markdown";
export const theme: BundledTheme = "catppuccin-mocha";

export const note = `
# notnote

notnote is a simple pastebin by [notnite](https://notnite.com/) (contact available on website).

- upload notes with \`POST /\`
- fetch a raw note with \`/:id/raw\`
- change language at the top, or with \`?lang=\`
- render markdown with \`?md\`

`.trim();
export const isViewing = false;
export const isMarkdown = false;
