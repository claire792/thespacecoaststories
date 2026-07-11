# SEO fixes applied — July 11, 2026

This package addresses the source-level issues most likely to trigger Ubersuggest's high-priority warnings.

## Fixed

- Added unique meta descriptions to the homepage, core pages, blog index, events index, thank-you page, and every event page.
- Added `noindex,follow` to the thank-you confirmation page.
- Made repeated West Melbourne event titles unique by date.
- Linked event listings to their individual pages, removing orphan-page risk.
- Added an individual event-page layout with date, location, context, and internal links.
- Added Event, FAQ, Breadcrumb, BlogPosting, and expanded local ProfessionalService structured data.
- Added complete Open Graph and X/Twitter tags with a default share image.
- Added a useful Brevard County service-area page rather than creating thin duplicate city pages.
- Added internal links to the Brevard County page from Services and the footer.
- Added local service areas for Melbourne, West Melbourne, Palm Bay, Viera, Rockledge, Cocoa, Merritt Island, and Titusville.
- Prevented the placeholder Square checkout URL from becoming a broken public link.
- Hid the generic Facebook homepage placeholder until a real business-page URL is supplied.
- Added explicit image dimensions to key templates to reduce layout shift.
- Added SEO-description fields to Decap CMS so future pages and events can keep unique metadata.

## Still needs Claire's real information

- Replace `square_checkout_url: https://square.link/REPLACE-ME` in `data/site.yaml` with the real checkout URL. The site now safely shows a contact button until then.
- Add the exact business Facebook/Instagram URLs in `data/site.yaml` when ready.
- Google Search Console and Ubersuggest may retain old crawl warnings until they recrawl the deployed site.
