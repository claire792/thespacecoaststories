# What changed and what you still have to do

## Changed in this update

**Navigation** — `Pricing` is now a top-level nav item pointing at `/services/`. Workshops and Events moved under the About dropdown, since classes are no longer the thing the homepage is selling.

**Homepage** — the middle door is now the $399 Story Session instead of Workshops. All three doors show a price. The first hero button now says "See what it costs" and goes to `/services/`. Both hero button labels *and* URLs are editable in the CMS.

**Pricing page** — rebuilt into three bands: Start here, Full legacy projects, For communities & organizations. Added FAQs with FAQ schema for Google. Added the session-credit note.

**Two new pages** — `/story-sessions/` and `/audio-letters/` with full copy, FAQs, and schema. Both are editable in the CMS under "Service, Portfolio & Location Pages."

**Email capture** — a signup box now appears on the homepage, the pricing page, and all 51 blog posts. It posts to a Netlify function that adds the person to Resend and emails them the download.

**Blog CTAs** — the end-of-post note now points at the $399 Story Session instead of the $3,000 book. You can override it per post with a `post_cta` field in the front matter, so comparison posts can point at the session and grief posts can point somewhere gentler.

## Before this works: 3 things

### 1. Resend environment variables
Netlify → Site settings → Environment variables:

- `RESEND_API_KEY` — your Resend key (starts with `re_`)
- `RESEND_AUDIENCE_ID` — create an audience in Resend, copy the ID
- `RESEND_FROM` — `Claire <claire@thespacecoaststories.com>` (the domain has to be verified in Resend)

The form fails gracefully without these — it just tells people to email you.

### 2. Square payment links
`data/site.yaml` has `story_session_checkout_url` and `audio_letters_checkout_url` set to `REPLACE-ME`. Make a Square payment link for each and paste them in via the CMS under Site Settings. Until then the buttons route to the contact form.

### 3. The story line phone number
`story_line_phone` in Site Settings is blank. Once the Twilio number exists, paste it there.

## Twilio setup for Audio Letters

1. Buy a number in Twilio, about $1.15/month.
2. Point its voice webhook at a TwiML Bin containing:

```xml
<Response>
  <Play>https://thespacecoaststories.com/audio/prompt-current.mp3</Play>
  <Record maxLength="1800" transcribe="true"
          recordingStatusCallback="https://thespacecoaststories.com/.netlify/functions/story-line" />
</Response>
```

3. Each week, record the new prompt and overwrite `prompt-current.mp3`. One file swap, every client hears the new question.
4. When you have more than two or three clients, switch to routing by caller ID so each person hears their own prompt.

## Pricing I set (change any of it in the CMS)

- Story Session — $399 for one, $749 for two, $75 credit toward the next
- First session credits in full toward a Mini or Full book within 12 months
- Audio Letters — $349 / 4 weeks, $799 / 12 weeks, $1,399 / 24 weeks
- Everything else unchanged

## One thing I left alone

Legacy Letter stayed at $499 as its own product rather than being folded into the Story Session. Deleting `/legacy-letters/` would have killed a page that has SEO history and inbound links. Instead the copy now distinguishes them: a Legacy Letter is a message written *forward* from them to the family, a Story Session preserves a story *about* their life. If you'd still rather collapse them, say so and I'll do it with a 301 redirect.
