"use client";

import { useState } from "react";
import { whatsappUrl } from "@/lib/whatsapp";

export function EventInquiryForm() {
  const [sent, setSent] = useState(false);

  return (
    <div className="panel p-6 sm:p-10">
      <div className="mb-8 font-serif text-3xl">Event Inquiry</div>
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          setSent(true);
        }}
      >
        <input className="input-atelier" required placeholder="Your name" />
        <input className="input-atelier" required placeholder="Company / event name" />
        <div className="grid gap-4 sm:grid-cols-2">
          <input className="input-atelier" required type="date" />
          <input className="input-atelier" required type="number" min="1" placeholder="Guest count" />
        </div>
        <select className="input-atelier" required defaultValue="Dubai">
          {["Dubai", "Abu Dhabi", "Sharjah", "Ras Al Khaimah", "Fujairah", "Ajman", "Umm Al Quwain"].map((emirate) => (
            <option key={emirate}>{emirate}</option>
          ))}
        </select>
        <textarea
          className="input-atelier min-h-28 resize-y"
          placeholder="Tell us about the occasion, venue, guest profile, and gifting vision..."
        />
        <button className="btn-primary w-full" type="submit">
          Submit Inquiry
        </button>
        {sent ? (
          <p className="text-sm text-warm-gray">
            Thank you. This frontend now captures the flow; the Cloudflare Worker endpoint will handle submission next.
          </p>
        ) : null}
      </form>
      <a
        className="btn-ghost mt-5 w-full"
        href={whatsappUrl("I am interested in booking a live engraving experience for my event.")}
        target="_blank"
        rel="noreferrer"
      >
        Prefer WhatsApp
      </a>
    </div>
  );
}
