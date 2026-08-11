import type { Config } from "@netlify/functions";
import { footer, sendEmail, subscriberStore, type Subscriber } from "./_shared/email";

const DAY = 24 * 60 * 60 * 1000;

async function isStillSubscribed(record: Subscriber) {
  if (record.unsubscribed) return false;
  const audienceId = Netlify.env.get("RESEND_AUDIENCE_ID") || "";
  const apiKey = Netlify.env.get("RESEND_API_KEY") || "";
  if (!audienceId || !record.contactId || !apiKey) return true;
  const response = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts/${record.contactId}`, { headers: { Authorization: `Bearer ${apiKey}` } });
  if (!response.ok) return true;
  const contact = await response.json() as { unsubscribed?: boolean };
  return !contact.unsubscribed;
}

export default async () => {
  const store = subscriberStore();
  const { blobs } = await store.list({ prefix: "lead/" });
  const now = Date.now();
  const due = blobs.slice(0, 100);

  for (const blob of due) {
    const record = await store.get(blob.key, { type: "json" }) as Subscriber | null;
    if (!record || !(await isStillSubscribed(record))) continue;
    const age = now - new Date(record.firstSeen).getTime();

    try {
      if (record.lastSentStep === 1 && age >= 3 * DAY) {
        await sendEmail(record.email, "The question that gets past “I don't remember”", `
          <p>Hi there,</p>
          <p>When somebody says, “I don't remember much,” the question is usually too big.</p>
          <p>Try this instead: <em>Walk me through the house you grew up in, starting at the front door.</em></p>
          <p>Rooms bring back sounds. Sounds bring back people. People bring back stories. You do not have to push. Give the memory somewhere specific to land.</p>
          <p>If you ask one question this week, make it that one.</p>
          <p>— Claire</p>
          ${footer(record.unsubscribeToken)}
        `);
        record.lastSentStep = 2;
        await store.setJSON(blob.key, record);
      } else if (record.lastSentStep === 2 && age >= 10 * DAY) {
        await sendEmail(record.email, "One story is enough to start", `
          <p>Hi there,</p>
          <p>You do not need a full memoir plan. You do not need fifty interviews or a box of perfectly scanned photographs.</p>
          <p>One story can be enough: one question written for your person, one phone call, and one printed keepsake edited by a real writer.</p>
          <p>That is why I made <a href="https://thespacecoaststories.com/one-story/">One Story</a>. It is $149, works anywhere in the country, and does not turn your parent into the project manager.</p>
          <p>If you would rather keep doing it yourself, keep the question list. It is yours.</p>
          <p>— Claire</p>
          ${footer(record.unsubscribeToken)}
        `);
        record.lastSentStep = 3;
        await store.setJSON(blob.key, record);
      }
    } catch (error) {
      console.error("nurture send failed", blob.key, error);
    }
  }

  return new Response(JSON.stringify({ checked: due.length }), { headers: { "Content-Type": "application/json" } });
};

export const config: Config = { schedule: "0 14 * * *" };
