# SEO audit and repairs — July 12, 2026

This package merges the full v3 source with the later homepage/journal-series update, confirms the supplied portfolio template is already present, and adds the two supplied articles.

## Repairs made

- Removed generated tag archives. The site had more than 100 one-post tag pages, which were the main source of duplicate descriptions and low-word-count warnings. Article tags remain visible as metadata/chips.
- Added useful, unique category and series landing-page copy and metadata.
- Improved title and description fallbacks for taxonomy, term, section, and other list pages.
- Added descriptive SEO titles to short-title content pages.
- Normalized internal links to trailing-slash URLs to avoid unnecessary redirect hops.
- Added permanent redirects for old `/journal/` URLs, removed `/tags/` archives, the old Jim Morrison slug, and the previously broken `/remembering` path.
- Expanded the four event pages with unique attendee information so they are useful standalone pages rather than thin listings.
- Kept the thank-you page `noindex` and removed it from the sitemap.
- Added two July 12, 2026 articles with unique titles, descriptions, images, image credits, FAQ schema, categories, series, and corrected internal links.
- Rechecked internal Markdown links, template routes, duplicate metadata, image references, and front matter.

## After deployment

Run a new Ubersuggest crawl. Existing warnings will not disappear until the crawler sees the new deploy. Netlify should build with Hugo 0.164.0 using the included `netlify.toml`.
