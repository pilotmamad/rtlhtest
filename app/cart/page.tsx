"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { formatCustomization } from "@/utils/format";

export default function CartPage() {
  const { items, subtotal, discount, promoCode, updateQuantity, removeItem, applyPromo } = useCart();
  const [code, setCode] = useState(promoCode);
  const [message, setMessage] = useState("");

  if (!items.length) {
    return (
      <section className="grid min-h-[70vh] place-items-center bg-ivory px-5 text-center">
        <div>
          <p className="eyebrow mb-5">Your Selection</p>
          <h1 className="section-title">Your cart is empty.</h1>
          <p className="body-copy mx-auto mt-5 max-w-md">Explore the collection or begin with a live engraving inquiry.</p>
          <Link href="/store" className="btn-primary mt-8">
            Explore Collections
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-ivory py-12 sm:py-16">
      <div className="container-atelier">
        <p className="eyebrow mb-5">Your Selection</p>
        <h1 className="section-title">
          Your <em>cart.</em>
        </h1>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            {items.map((item) => (
              <div key={item.id} className="grid grid-cols-[88px_1fr] gap-5 border-b border-line py-6 sm:grid-cols-[110px_1fr_auto]">
                <div className="relative aspect-square overflow-hidden bg-cream">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div>
                  <Link href={`/product/${item.slug}`} className="font-serif text-2xl">
                    {item.name}
                  </Link>
                  <p className="mt-2 text-sm leading-7 text-warm-gray">{formatCustomization(item.customization)}</p>
                  <div className="mt-4 flex items-center gap-3">
                    <button className="grid h-8 w-8 place-items-center border border-line" onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity">
                      <Minus size={14} />
                    </button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <button className="grid h-8 w-8 place-items-center border border-line" onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity">
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <div className="col-span-2 flex items-center justify-between sm:col-span-1 sm:block sm:text-right">
                  <div className="font-serif text-2xl">{item.unitPrice * item.quantity} AED</div>
                  <button className="mt-2 inline-flex items-center gap-1 text-xs uppercase tracking-[0.12em] text-warm-gray" onClick={() => removeItem(item.id)}>
                    <X size={13} /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <aside className="h-fit bg-cream p-7 lg:sticky lg:top-28">
            <h2 className="font-serif text-3xl">Order Summary</h2>
            <div className="mt-8 space-y-3 text-sm text-warm-gray">
              <div className="flex justify-between"><span>Subtotal</span><span>{subtotal} AED</span></div>
              {discount ? <div className="flex justify-between text-green-700"><span>Promo ({promoCode})</span><span>-{discount} AED</span></div> : null}
            </div>
            <div className="my-6 h-px bg-line" />
            <div className="flex justify-between font-serif text-3xl"><span>Subtotal</span><span>{subtotal - discount} AED</span></div>
            <form
              className="mt-7 flex gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                setMessage(applyPromo(code) ? "Promo applied." : "Invalid promo code.");
              }}
            >
              <input className="input-atelier" value={code} onChange={(event) => setCode(event.target.value)} placeholder="Promo code" />
              <button className="bg-charcoal px-5 text-xs uppercase tracking-[0.14em] text-white">Apply</button>
            </form>
            {message ? <p className="mt-2 text-xs text-warm-gray">{message}</p> : null}
            <Link href="/checkout" className="btn-primary mt-7 w-full">
              Proceed to Checkout
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
