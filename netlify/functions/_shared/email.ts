import { getStore } from "@netlify/blobs";

export const SITE = "https://thespacecoaststories.com";
export const MAGNET_PATH = "/downloads/100-life-story-interview-questions.pdf";
export const subscriberStore = () => getStore({ name: "story-letter-subscribers", consistency: "strong" });

export type Subscriber = {
  email: string;
  source: string;
  firstSeen: string;
  lastSentStep: number;
  contactId?: string;
  unsubscribeToken: string;
  unsubscribed?: boolean;
};

export const env = (name: string) => Netlify.env.get(name) || "";

export async function hashEmail(email: string) {
  const bytes = new TextEncoder().encode(email.trim().toLowerCase());
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function resend(path: string, init: RequestInit = {}) {
  const apiKey = env("RESEND_API_KEY");
  if (!apiKey) throw new Error("RESEND_API_KEY is missing");
  return fetch(`https://api.resend.com${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", ...(init.headers || {}) },
  });
}

export async function sendEmail(to: string, subject: string, html: string) {
  const from = env("RESEND_FROM") || "Claire <claire@thespacecoaststories.com>";
  const response = await resend("/emails", {
    method: "POST",
    body: JSON.stringify({ from, to: [to], subject, html }),
  });
  if (!response.ok) throw new Error(`Resend email failed: ${await response.text()}`);
}

export function unsubscribeUrl(token: string) {
  return `${SITE}/unsubscribe?token=${encodeURIComponent(token)}`;
}

export function footer(token: string) {
  return `<p style="font-size:12px;color:#777;margin-top:28px">Space Coast Stories · Florida's Space Coast · Serving families nationwide<br><a href="${unsubscribeUrl(token)}">Unsubscribe</a></p>`;
}
