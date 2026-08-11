# National growth implementation

Completed from `SCS-National-Growth-Plan.md` on August 11, 2026.

## Live site work included

- National-first homepage language and four service entry points
- New `/shop/` catalog ordered from $9 DIY products through custom books
- New sales pages for One Story, Rapid Fire, Story Postcards, gift certificates, Memorial Express, the Family Reunion Book, and the Interview Day
- New `/nationwide/` page explaining the phone/video workflow for all 50 states
- New `/diy/` lane separating self-guided products from human-done-for-you services
- Updated services/pricing page with the complete price ladder and an honest competitor comparison
- Four-week Audio Letters entry offer changed from $349 to $249
- Card deck price updated to the planned $24
- New `/tools/` hub with a question generator, cost calculator, eulogy outline builder, product-fit quiz, Interview Day checklist, and old-photo prompt sheet
- Homepage, header, footer, contact form, navigation, CMS settings, metadata, and structured service coverage updated for nationwide positioning
- Existing blog articles left unchanged for the next round, as requested. The shared general article CTA now points to One Story at $149.

## Square placeholders to replace

Paste links into `data/site.yaml` and switch the related page/button from its placeholder state when each listing is ready:

- `one_story_checkout_url`
- `rapid_fire_checkout_url`
- `gift_checkout_url`
- `postcards_checkout_url`
- `memorial_express_checkout_url`
- `family_reunion_checkout_url`
- `interview_day_checkout_url`
- `eulogy_kit_checkout_url`
- `prompt_vault_checkout_url`
- Existing `square_checkout_url`, `story_session_checkout_url`, and `audio_letters_checkout_url`

The offer pages intentionally show disabled Square placeholders rather than sending visitors to broken links. After links are available, the templates can be wired to these fields in one pass.

## Email sequence

The existing Resend signup now stores consented subscribers and sends:

1. The 100-question download immediately
2. A practical interview tip after three days
3. A gentle One Story introduction after ten days

It also includes a working unsubscribe route and checks Resend contact status before follow-ups.

Required Netlify variables:

- `RESEND_API_KEY`
- `RESEND_AUDIENCE_ID`
- `RESEND_FROM` (example: `Claire <claire@thespacecoaststories.com>`)

The daily follow-up function runs only on a published Netlify deploy. Subscriber timing/state is stored with Netlify Blobs.

## Still needs Claire or vendor setup

- Square listings and checkout URLs
- Twilio/private story line configuration for One Story and Audio Letters
- Print samples and final fulfillment settings for Gelato, Lulu, MPC/QPMN, Etsy, or the vendors Claire chooses
- Actual product files for paid downloads and POD items
- Five additional real testimonials with permission; none were invented
- Blog articles, post-specific offer blocks, and new post printables (held for the next round)

## Suggested launch order

1. Create the One Story and gift-certificate Square listings.
2. Add the private story line.
3. Publish the site and test the three-email sequence with a fresh address.
4. Add the remaining Square links as products are ready.
5. Start the blog/content round.
