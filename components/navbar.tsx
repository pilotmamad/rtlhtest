"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useCart } from "@/hooks/use-cart";

const links = [
  { href: "/events", label: "Live Events" },
  { href: "/store", label: "Collections" },
  { href: "/about", label: "Atelier" }
];

export function Navbar() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const mobileLinks = [{ href: "/", label: "Home" }, ...links, { href: "/cart", label: "Cart" }];

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-champagne/15 bg-ivory/90 backdrop-blur-xl">
      <nav className="flex h-[72px] items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="font-serif text-[22px] font-medium tracking-[0.16em] text-charcoal"
          onClick={() => setOpen(false)}
        >
          RTLH
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[11px] uppercase tracking-[0.16em] text-warm-gray transition hover:text-champagne"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative p-2" aria-label="Cart">
            <ShoppingBag size={21} strokeWidth={1.5} />
            <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-glow px-1 text-[10px] text-white">
              {count}
            </span>
          </Link>
          <Link href="/events" className="btn-ghost hidden px-5 py-3 md:inline-flex">
            Book Experience
          </Link>
          <button
            className="relative grid h-11 w-11 place-items-center md:hidden"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="relative block h-4 w-6">
              <motion.span
                className="absolute left-0 top-0 h-px w-6 bg-charcoal"
                animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.span
                className="absolute left-0 top-[7px] h-px w-6 bg-charcoal"
                animate={open ? { opacity: 0, x: 8 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.span
                className="absolute left-0 top-[14px] h-px w-6 bg-charcoal"
                animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              />
            </span>
          </button>
        </div>
      </nav>
      {mounted ? createPortal(
        <MobileMenu open={open} links={mobileLinks} onClose={() => setOpen(false)} />,
        document.body
      ) : null}
    </header>
  );
}

function MobileMenu({
  open,
  links,
  onClose
}: {
  open: boolean;
  links: { href: string; label: string }[];
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="overflow-y-auto md:hidden"
          style={{
            position: "fixed",
            inset: "72px 0 0 0",
            zIndex: 9999,
            backgroundColor: "#FAF7F2"
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <motion.div
            className="flex min-h-[calc(100dvh-72px)] flex-col justify-between px-6 py-10"
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              open: { transition: { staggerChildren: 0.055, delayChildren: 0.06 } },
              closed: { transition: { staggerChildren: 0.035, staggerDirection: -1 } }
            }}
          >
            <div className="space-y-2">
              <motion.p
                className="mb-8 text-[10px] uppercase tracking-[0.3em] text-champagne"
                variants={mobileItem}
              >
                Premium Engraving Atelier
              </motion.p>
              {links.map((link) => (
                <motion.div key={link.href} variants={mobileItem}>
                  <Link
                    href={link.href}
                    className="block border-b border-line py-5 font-serif text-[38px] font-light leading-none text-charcoal transition hover:text-champagne"
                    onClick={onClose}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
            <motion.div variants={mobileItem} className="pt-10">
              <Link href="/events" className="btn-primary w-full" onClick={onClose}>
                Book Live Engraving
              </Link>
              <p className="mt-5 text-center text-xs leading-6 text-warm-gray">
                Weddings, private gatherings, and corporate activations across the UAE.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

const mobileItem = {
  open: { opacity: 1, y: 0, filter: "blur(0px)" },
  closed: { opacity: 0, y: 12, filter: "blur(4px)" }
};
