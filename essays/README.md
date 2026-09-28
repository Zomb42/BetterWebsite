Put real essay .txt files in this folder when you want them to ship with the public site.

Suggested format:

```text
Essay Title

First paragraph.

Second paragraph.
```

The first nonempty line is the title (an optional `#` prefix is supported).
Articles use prose formatting by default: a single Enter acts like a space,
and a blank line (Enter twice) starts a new paragraph. You can break long
source lines wherever convenient without forcing those breaks on the website.
Long lines
automatically wrap at the reader's edge, with a maximum reading width of 65ch
(roughly 65 characters) that shrinks on smaller screens.

For poems, add `Format: poetry` directly below the title, put each verse on
its own line, and leave a blank line between stanzas:

```text
Poem Title
Format: poetry

The first line of a stanza
The second line of a stanza
The third line of a stanza

The next stanza begins here
```

One or more blank lines create a single gap between paragraphs or stanzas.
The format line is hidden on the website. It must be the first nonempty line
after the title; it applies to the whole file. `Format: prose` is also supported,
but optional because prose is the default. These settings work the same way
for published articles and imported previews, without changes to `manifest.json`.
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
