Put real essay .txt files in this folder when you want them to ship with the public site.

Suggested format:

```text
Essay Title

First paragraph.

Second paragraph.
```

The first nonempty line is the title (an optional `#` prefix is supported).
Each line after the title keeps its line break on the website. Long lines
automatically wrap at the reader's edge, with a maximum reading width of 65ch
(roughly 65 characters) that shrinks on smaller screens.

For poems, put each verse on its own line and leave a blank line between stanzas:

```text
Poem Title

The first line of a stanza
The second line of a stanza
The third line of a stanza

The next stanza begins here
```

One or more blank lines create a single gap between paragraphs or stanzas.
For flowing prose, keep each paragraph on one source line and let the website
wrap it automatically; use your editor's word wrap for easier editing.
Extra spaces and tabs collapse to a single space. Standalone `##` and `###`
headings and `**bold text**` are also supported; separate headings with blank lines.

The blog page already supports importing a .txt file locally in the browser for previewing drafts.

To publish an essay, add its text file here and update `manifest.json`:

```json
[
  {
    "title": "Essay Title",
    "date": "Spring 2026",
    "file": "essay-title.txt"
  }
]
```
