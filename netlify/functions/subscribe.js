// Adds a subscriber to a Resend audience and emails them the free download.
//
// Set these in Netlify → Site settings → Environment variables:
//   RESEND_API_KEY      your Resend API key (starts with re_)
//   RESEND_AUDIENCE_ID  the audience/contact list ID from the Resend dashboard
//   RESEND_FROM         e.g. Claire <claire@thespacecoaststories.com>  (domain must be verified in Resend)

const SITE = "https://thespacecoaststories.com";
const MAGNET_PATH = "/downloads/100-life-story-interview-questions.pdf";

const json = (statusCode, body) => ({
  statusCode,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  const from = process.env.RESEND_FROM || "Claire <claire@thespacecoaststories.com>";

  if (!apiKey) {
    return json(500, { error: "Email is not configured yet." });
  }

  let email = "";
  let source = "";
  try {
    const parsed = JSON.parse(event.body || "{}");
    email = String(parsed.email || "").trim().toLowerCase();
    source = String(parsed.source || "");
  } catch (err) {
    return json(400, { error: "Bad request" });
  }

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return json(400, { error: "That doesn't look like an email address." });
  }

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };

  try {
    // 1. Add to the audience. Duplicates are fine; Resend upserts by email.
    if (audienceId) {
      await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
        method: "POST",
        headers,
        body: JSON.stringify({ email, unsubscribed: false }),
      });
    }

    // 2. Send the download.
    const sent = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers,
      body: JSON.stringify({
        from,
        to: [email],
        subject: "Your 10 questions (and the 100-question version)",
        html: `
          <p>Hi there,</p>
          <p>Here's the download you asked for. It's the full list we actually use in interviews, so there are far more than ten in here. Start anywhere.</p>
          <p><a href="${SITE}${MAGNET_PATH}">Download the question list (PDF)</a></p>
          <p>One piece of advice before you start: don't ask them to summarize a decade. Ask about one room, one job, one afternoon. The big stuff comes out sideways once they're talking.</p>
          <p>If you get partway in and realize you'd rather have someone else do the asking, a <a href="${SITE}/story-sessions/">Story Session</a> is one recorded hour that becomes a real booklet. That's the smallest way to work with me.</p>
          <p>— Claire<br>Space Coast Stories</p>
          <p style="font-size:12px;color:#777;">You're getting this because you asked for the download at thespacecoaststories.com${source ? ` (${source})` : ""}.</p>
        `,
      }),
    });

    if (!sent.ok) {
      const detail = await sent.text();
      console.error("Resend send failed:", detail);
      return json(502, { error: "We couldn't send the email just now." });
    }

    return json(200, { ok: true });
  } catch (err) {
    console.error("subscribe function error:", err);
    return json(500, { error: "Something went wrong." });
  }
};
