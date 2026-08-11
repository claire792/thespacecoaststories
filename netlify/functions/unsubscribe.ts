import type { Config } from "@netlify/functions";
import { resend, subscriberStore, type Subscriber } from "./_shared/email";

const page = (message: string, status = 200) => new Response(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Email preferences · Space Coast Stories</title><style>body{font:18px/1.6 system-ui,sans-serif;background:#fdfaf4;color:#16324f;margin:0;padding:8vw}main{max-width:650px;margin:auto;background:#fff;border:1px solid rgba(22,50,79,.16);padding:40px}a{color:#2b6e7b}</style></head><body><main><h1>Email preferences</h1><p>${message}</p><p><a href="/">Return to Space Coast Stories</a></p></main></body></html>`, { status, headers: { "Content-Type": "text/html; charset=utf-8" } });

export default async (req: Request) => {
  const token = new URL(req.url).searchParams.get("token") || "";
  if (!/^[0-9a-f-]{36}$/i.test(token)) return page("That unsubscribe link is not valid.", 400);

  const store = subscriberStore();
  const key = await store.get(`unsubscribe/${token}`);
  if (!key) return page("You are already unsubscribed, or this link has expired.");
  const record = await store.get(key, { type: "json" }) as Subscriber | null;
  if (!record) return page("You are already unsubscribed.");

  record.unsubscribed = true;
  await store.setJSON(key, record);

  const audienceId = Netlify.env.get("RESEND_AUDIENCE_ID") || "";
  if (audienceId && record.contactId) {
    try {
      await resend(`/audiences/${audienceId}/contacts/${record.contactId}`, { method: "PATCH", body: JSON.stringify({ unsubscribed: true }) });
    } catch (error) {
      console.error("Resend unsubscribe sync failed", error);
    }
  }

  return page("You're unsubscribed. No hard feelings, and no more story emails.");
};

export const config: Config = { path: "/unsubscribe", method: "GET" };
