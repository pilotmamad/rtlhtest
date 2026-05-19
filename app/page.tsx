import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { collections, products } from "@/data/products";

const eventCards = [
  {
    number: "01",
    title: "Wedding Personalization",
    body: "Live engraving stations for wedding guests, with names, dates, and messages crafted in Arabic or English."
  },
  {
    number: "02",
    title: "Corporate Activations",
    body: "Premium branded gifting experiences for product launches, conferences, executive gatherings, and VIP moments."
  },
  {
    number: "03",
    title: "Luxury Gatherings",
    body: "Private dinners, National Day celebrations, and curated gatherings where craft becomes the centerpiece."
  }
];

export default function HomePage() {
  return (
    <>
      <section className="relative -mt-[72px] grid min-h-screen place-items-center overflow-hidden bg-sand pt-[72px]">
        <Image
          src="/images/editorial/live-engraving-hero.svg"
          alt="RTLH live engraving atelier scene"
          fill
          priority
          className="object-cover opacity-75"
        />
        <div className="relative z-10 mx-auto max-w-3xl px-5 text-center">
          <p className="eyebrow mb-8">Premium Engraving Atelier · UAE</p>
          <h1 className="font-serif text-[56px] font-light leading-[0.95] text-charcoal sm:text-8xl">
            Crafted
            <br />
            in the
            <br />
            <em className="text-champagne">Moment.</em>
          </h1>
          <p className="mx-auto mt-7 max-w-md text-base font-light leading-8 text-warm-gray">
            Live engraving experiences that transform events into lasting memories. Bespoke, precise, and quietly unforgettable.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/events" className="btn-primary">
              Experience Live Engraving
            </Link>
            <Link href="/store" className="btn-ghost">
              Explore Collections
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-20 sm:py-28">
        <div className="container-atelier grid gap-12 md:grid-cols-2 md:items-center lg:gap-20">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden bg-cream">
              <Image src="/images/editorial/atelier-story.svg" alt="RTLH atelier material study" fill className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow mb-5">Our Story</p>
            <h2 className="section-title">
              Where craft meets
              <br />
              <em>presence.</em>
            </h2>
            <div className="my-8 h-px w-12 bg-champagne" />
            <p className="body-copy">
              RTLH is not simply a store. It is an atelier, a living practice of precision and personalization, born in the UAE for occasions where a gift must carry emotion.
            </p>
            <p className="my-8 font-serif text-3xl font-light italic leading-relaxed text-charcoal">
              Every mark tells a story.
              <br />
              Every piece holds a moment.
            </p>
            <p className="body-copy">
              We bring engraving to life in real time at weddings, corporate gatherings, and luxury events so every guest leaves with a memory made permanent.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-charcoal py-20 text-white sm:py-28">
        <div className="container-atelier">
          <Reveal>
            <p className="eyebrow mb-5">Live Experiences</p>
            <h2 className="font-serif text-4xl font-light leading-tight sm:text-6xl">
              The art of engraving,
              <br />
              <em className="text-champagne">live before your guests.</em>
            </h2>
            <p className="mt-6 max-w-xl text-sm font-light leading-8 text-white/55">
              A performance of precision that becomes a personal treasure, designed around your occasion and guest flow.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-px md:grid-cols-3">
            {eventCards.map((card, index) => (
              <Reveal key={card.title} delay={index * 0.08}>
                <Link href="/events" className="group block h-full bg-cream p-8 text-charcoal transition hover:bg-champagne-light sm:p-10">
                  <div className="font-serif text-6xl font-light text-champagne/45">{card.number}</div>
                  <h3 className="mt-6 font-serif text-3xl">{card.title}</h3>
                  <p className="mt-4 text-sm font-light leading-7 text-warm-gray">{card.body}</p>
                  <ArrowRight className="mt-8 opacity-0 transition group-hover:opacity-100" size={20} strokeWidth={1.4} />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory py-20 sm:py-28">
        <div className="container-atelier">
          <p className="eyebrow mb-5">Signature Pieces</p>
          <h2 className="section-title">
            Bespoke objects,
            <br />
            <em>crafted to last.</em>
          </h2>
          <div className="mt-12 flex gap-6 overflow-x-auto pb-6">
            {products.slice(0, 5).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand py-16 sm:py-24">
        <div className="container-atelier">
          <p className="eyebrow mb-5">Collections</p>
          <h2 className="section-title">
            Curated worlds
            <br />
            of <em>refinement.</em>
          </h2>
          <div className="mt-10 grid gap-px sm:grid-cols-3">
            {collections.map((collection, index) => (
              <Link key={collection.slug} href={`/collections/${collection.slug}`} className="group bg-cream p-8 transition hover:bg-ivory">
                <div className="font-serif text-6xl text-champagne/25">0{index + 1}</div>
                <h3 className="mt-12 font-serif text-2xl">{collection.name}</h3>
                <p className="mt-3 text-sm leading-7 text-warm-gray">{collection.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
