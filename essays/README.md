Put real essay .txt files in this folder when you want them to ship with the public site.

Suggested format:

```text
Essay Title

First paragraph.

Second paragraph.
```

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
