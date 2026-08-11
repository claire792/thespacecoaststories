import type { Config } from "@netlify/functions";
import { footer, hashEmail, MAGNET_PATH, resend, sendEmail, SITE, subscriberStore, type Subscriber } from "./_shared/email";

const json = (body: object, status = 200) => new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

export default async (req: Request) => {
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  let email = "", source = "", company = "";
  try {
    const body = await req.json();
    email = String(body.email || "").trim().toLowerCase();
    source = String(body.source || "").slice(0, 250);
    company = String(body.company || "");
  } catch {
    return json({ error: "Bad request" }, 400);
  }
  if (company) return json({ ok: true });
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json({ error: "That doesn't look like an email address." }, 400);

  try {
    const store = subscriberStore();
    const key = `lead/${await hashEmail(email)}`;
    const existing = await store.get(key, { type: "json" }) as Subscriber | null;
    const token = existing?.unsubscribeToken || crypto.randomUUID();
    const record: Subscriber = {
      email,
      source,
      firstSeen: existing?.firstSeen || new Date().toISOString(),
      lastSentStep: existing?.lastSentStep || 0,
      contactId: existing?.contactId,
      unsubscribeToken: token,
      unsubscribed: false,
    };

    const audienceId = Netlify.env.get("RESEND_AUDIENCE_ID") || "";
    if (audienceId) {
      const contactResponse = await resend(`/audiences/${audienceId}/contacts`, {
        method: "POST",
        body: JSON.stringify({ email, unsubscribed: false }),
      });
      if (contactResponse.ok) {
        const contact = await contactResponse.json() as { id?: string };
        record.contactId = contact.id || record.contactId;
      }
    }

    await store.setJSON(key, record);
    await store.set(`unsubscribe/${token}`, key);

    await sendEmail(email, "Your 100 life-story questions", `
      <p>Hi there,</p>
      <p>Here is the full list we use in real interviews. Do not begin at number one and march through it like paperwork. Pick the question that makes you curious.</p>
      <p><a href="${SITE}${MAGNET_PATH}">Download the 100-question list</a></p>
      <p>One small piece of advice: do not ask someone to summarize a decade. Ask about one room, one job, or one afternoon. The big stories usually come out sideways.</p>
      <p>— Claire<br>Space Coast Stories</p>
      ${footer(token)}
    `);

    record.lastSentStep = Math.max(1, record.lastSentStep);
    await store.setJSON(key, record);
    return json({ ok: true });
  } catch (error) {
    console.error("subscribe function error", error);
    return json({ error: "We couldn't send the email just now." }, 500);
  }
};

export const config: Config = { path: "/.netlify/functions/subscribe", method: "POST" };
