import Image from "next/image";

export default function AboutPage() {
  return (
    <section className="bg-ivory py-16 sm:py-24">
      <div className="container-atelier grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <p className="eyebrow mb-5">Atelier</p>
          <h1 className="section-title">
            RTLH is built around
            <br />
            <em>presence.</em>
          </h1>
          <p className="body-copy mt-7">
            The brand experience begins at the event table: guests gather, a piece is selected, names are checked, and the engraving happens in front of them. The store extends that feeling into personal orders, but the live atelier remains the heart of RTLH.
          </p>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden bg-cream">
          <Image src="/images/editorial/atelier-story.svg" alt="RTLH material and engraving study" fill className="object-cover" />
        </div>
      </div>
    </section>
  );
}
