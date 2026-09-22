# IBM Plex Sans JP

The site self-hosts the official regular (400) and bold (700) fonts, distributed under the [SIL Open Font License 1.1](ibmplexsansjp/OFL.txt).

- Source: [Google Fonts repository](https://github.com/google/fonts/tree/e44c4b011a820c2cbe2fd2cfa8052037d7edb571/ofl/ibmplexsansjp), commit `e44c4b011a820c2cbe2fd2cfa8052037d7edb571`, retrieved 2026-09-22.
- Original family metadata: [METADATA.pb](ibmplexsansjp/METADATA.pb).
- Packaging: official TTF files converted to WOFF2 using FontTools 4.60.2 and Brotli 1.2.0. No subsetting or outline modifications. Font names and copyright information are retained.
- Verification: glyph order, Unicode mapping, outlines and horizontal metrics match the original TTFs. Source URLs, SHA-256 hashes and byte sizes are recorded in [MANIFEST.json](MANIFEST.json).
- Total WOFF2 size: 2,225,592 bytes. The full original character coverage is retained so future text edits do not require regenerating a content-specific subset.

`fonts.css` uses relative URLs and `font-display: swap`. No external font service or preinstalled copy is required. Keep `OFL.txt` with the font files when redistributing them.
