import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-charcoal px-5 py-14 text-white sm:px-8 lg:px-10">
      <div className="container-atelier grid gap-12 md:grid-cols-[1fr_2fr]">
        <div>
          <div className="font-serif text-3xl font-light">RTLH</div>
          <p className="mt-4 max-w-64 text-sm font-light leading-7 text-white/45">
            Premium Engraving Atelier
            <br />
            United Arab Emirates
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          <FooterColumn title="Explore" links={[["Home", "/"], ["Live Events", "/events"], ["Collections", "/store"], ["Cart", "/cart"]]} />
          <FooterColumn title="Services" links={[["Weddings", "/events"], ["Corporate", "/events"], ["Private Events", "/events"], ["Bespoke Orders", "/store"]]} />
          <FooterColumn title="Contact" links={[["WhatsApp", "/events"], ["Instagram", "/"], ["Email", "/"], ["Dubai, UAE", "/about"]]} />
        </div>
      </div>
      <div className="container-atelier mt-12 flex flex-col justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/35 sm:flex-row">
        <span>© 2026 RTLH. All rights reserved.</span>
        <span>Live engraving experiences and bespoke objects.</span>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links
}: {
  title: string;
  links: [string, string][];
}) {
  return (
    <div>
      <div className="mb-5 text-[10px] uppercase tracking-[0.25em] text-champagne">{title}</div>
      <div className="space-y-3">
        {links.map(([label, href]) => (
          <Link key={`${title}-${label}`} href={href} className="block text-sm text-white/50 transition hover:text-white">
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
