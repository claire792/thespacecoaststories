# Space Coast Stories — website

Hugo static site with Decap CMS, built to deploy on Netlify at
**thespacecoaststories.com**.

- **Hugo** (extended) builds the site.
- **Decap CMS** (at `/admin/`) lets you edit the blog and page copy in a browser, no code needed.
- **Netlify** hosts it and runs the build on every push.

---

## Before you launch — quick fill-in checklist

All of these are editable in the CMS once it's live, or directly in the files listed.

- [ ] **Contact email & phone** — `data/site.yaml` (CMS → Site Settings). Placeholders are in now.
- [ ] **Square checkout link** for the card kits — `data/site.yaml` → `square_checkout_url`.
- [ ] **Your real origin story** on the About page — `content/about.md`. A heartfelt draft is in place; swap in the true version.
- [ ] **Social links** (Facebook/Instagram) — `data/site.yaml`.
- [ ] **Photos** (optional) — headshot for About, card-kit shot, a workshop photo. Add via the CMS or in `static/images/`.
- [ ] **Fact-check the local-history blog post** before publishing — drafted from general knowledge.

---

## Deploying to Netlify (one-time, Thomas can help)

1. **Push this folder to a GitHub repo** (e.g. `space-coast-stories`).
2. In Netlify, connect that repo to the existing site (ID `87872895-3e73-4a24-ab52-a872282a92bc`), or create a new site from it. Build settings are already in `netlify.toml`:
   - Build command: `hugo --gc --minify`
   - Publish directory: `public`
   - `HUGO_VERSION = 0.164.0`
3. Deploy. The site builds automatically.

### Turn on the CMS (Decap + DecapBridge)

Netlify Identity/Git Gateway are deprecated, so the CMS login runs on **DecapBridge** (free, purpose-built for Decap).

1. Go to **decapbridge.com** and create an account (you're the site owner).
2. In the dashboard, click **Add site / Create site** and link the GitHub repo `claire792/thespacecoaststories` (it'll ask for a GitHub access token — a fine-grained token scoped to just this repo).
3. For the admin URL, enter `https://thespacecoaststories.com/admin/`.
4. DecapBridge shows you a **site ID**. Open `static/admin/config.yml`, find `PASTE-YOUR-SITE-ID-BELOW`, and replace it with that ID.
5. Re-upload / push, let Netlify rebuild, then visit `https://thespacecoaststories.com/admin/` and log in with your DecapBridge account.
6. To let someone else edit, use **Manage collaborators** in the DecapBridge dashboard to invite them by email.

---

## Editing content

**In the browser:** `/admin/` ->
- **Journal Posts** — write and publish blog articles.
- **Events & Classes** — add fairs, classes, workshops. Use the *Event date* field for when it happens (future dates fine).
- **Pages** — Home, About, Services, Card Kits, Contact copy.
- **Site Settings** — contact info, Square link, socials.

**In the files:** page copy in `content/`, global info in `data/site.yaml`, design in `static/css/main.css`.

---

## Running it locally

Requires Hugo extended.

```bash
hugo server -D          # live preview at http://localhost:1313
```

To test the CMS locally, in a second terminal:

```bash
npx decap-server        # local CMS backend; then open /admin/
```

---

## Design notes

- **Type:** Newsreader (display/serif) + Public Sans (UI/body), Google Fonts.
- **Palette:** dusk navy `#1B2A38`, warm ivory `#FBF7EF`, muted brass `#AF8A46`.
- The rotating hero question card pulls from `hero_prompts` in `content/_index.md`.

## Contact form

Uses **Netlify Forms** (no setup once deployed). Submissions appear in Netlify -> **Forms**. Add a notification email there to get pinged on new inquiries.
