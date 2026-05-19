import Image from "next/image";
import { EventInquiryForm } from "@/components/event-inquiry-form";
import { Reveal } from "@/components/reveal";
import { whatsappUrl } from "@/lib/whatsapp";

const types = [
  ["Weddings & Engagements", "Guest keepsakes engraved live on the day, with names, dates, and love languages handled in Arabic and English."],
  ["Corporate Activations", "Product launches, VIP gifting, executive retreats, and branded stations with an atelier-level presence."],
  ["Luxury & Private Gatherings", "Private dinners, seasonal celebrations, and exclusive gatherings shaped around intimate personalization."]
];

const process = [
  ["I", "Inquiry", "Share your date, location, guest count, and vision."],
  ["II", "Curation", "We select suitable engravable pieces and flow for your audience."],
  ["III", "Setup", "Our artisans install a refined station within your venue."],
  ["IV", "Experience", "Guests receive pieces engraved live before them."]
];

export default function EventsPage() {
  return (
    <>
      <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-charcoal px-5 py-16 text-white sm:px-10">
        <Image src="/images/editorial/events-hero.svg" alt="Live engraving event setup" fill priority className="object-cover opacity-45" />
        <div className="relative z-10 max-w-3xl">
          <p className="eyebrow mb-5">Live Engraving Experiences</p>
          <h1 className="font-serif text-5xl font-light leading-none sm:text-7xl">
            An art performed
            <br />
            for your
            <br />
            <em className="text-champagne">guests.</em>
          </h1>
          <p className="mt-7 max-w-xl text-sm font-light leading-8 text-white/60">
            We bring a live engraving atelier to your event, creating personalized pieces in real time with the pace and presence of a luxury service.
          </p>
        </div>
      </section>

      <section className="grid gap-px bg-line md:grid-cols-3">
        {types.map(([title, body]) => (
          <div key={title} className="bg-cream p-8 sm:p-12">
            <h2 className="font-serif text-3xl">{title}</h2>
            <p className="mt-5 text-sm font-light leading-8 text-warm-gray">{body}</p>
          </div>
        ))}
      </section>

      <section className="bg-sand py-20 sm:py-28">
        <div className="container-atelier">
          <div className="mx-auto max-w-xl text-center">
            <p className="eyebrow mb-5">How It Works</p>
            <h2 className="section-title">
              Simple to book.
              <br />
              <em>Extraordinary to experience.</em>
            </h2>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {process.map(([num, title, body], index) => (
              <Reveal key={title} delay={index * 0.08} className="text-center">
                <div className="font-serif text-6xl font-light text-champagne">{num}</div>
                <h3 className="mt-4 font-serif text-2xl">{title}</h3>
                <p className="mt-3 text-sm font-light leading-7 text-warm-gray">{body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory py-20 sm:py-28">
        <div className="container-atelier grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow mb-5">Make an Inquiry</p>
            <h2 className="section-title">
              Let&apos;s craft something
              <br />
              <em>extraordinary.</em>
            </h2>
            <p className="body-copy mt-7">
              Whether you are planning an intimate gathering or a large-scale corporate activation, we design a live engraving experience that feels native to the occasion.
            </p>
            <div className="my-9 border-l-2 border-champagne py-2 pl-6">
              <h3 className="font-serif text-xl">Prefer WhatsApp?</h3>
              <p className="mt-2 text-sm leading-7 text-warm-gray">Message the atelier team directly for a faster conversation about your event.</p>
            </div>
            <a className="btn-primary" href={whatsappUrl("Hello RTLH, I would like to inquire about a live engraving experience.")} target="_blank" rel="noreferrer">
              Chat on WhatsApp
            </a>
          </div>
          <EventInquiryForm />
        </div>
      </section>
    </>
  );
}
