"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/use-cart";
import { shippingForEmirate } from "@/lib/pricing";

const emirates = ["Dubai", "Abu Dhabi", "Sharjah", "Ras Al Khaimah", "Fujairah", "Ajman", "Umm Al Quwain"];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, discount, clearCart } = useCart();
  const [emirate, setEmirate] = useState("Dubai");
  const [error, setError] = useState("");
  const shipping = shippingForEmirate(emirate);
  const total = useMemo(() => subtotal - discount + shipping, [discount, shipping, subtotal]);

  if (!items.length) {
    return (
      <section className="grid min-h-[70vh] place-items-center bg-ivory px-5 text-center">
        <div>
          <h1 className="section-title">No order yet.</h1>
          <Link href="/store" className="btn-primary mt-8">Return to Store</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-ivory py-12 sm:py-16">
      <div className="container-atelier">
        <p className="eyebrow mb-5">Secure Checkout</p>
        <h1 className="section-title">
          Almost <em>there.</em>
        </h1>
        <form
          className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]"
          onSubmit={(event) => {
            event.preventDefault();
            const form = new FormData(event.currentTarget);
            if (!form.get("name") || !form.get("phone") || !form.get("address")) {
              setError("Please complete your name, phone, and address.");
              return;
            }
            clearCart();
            router.push("/success");
          }}
        >
          <div className="space-y-10">
            <section>
              <h2 className="border-b border-line pb-4 font-serif text-3xl">Customer Information</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <input name="name" className="input-atelier sm:col-span-2" placeholder="Full name *" />
                <input name="phone" className="input-atelier" placeholder="UAE phone *" />
                <input name="email" className="input-atelier" placeholder="Email (optional)" />
              </div>
            </section>
            <section>
              <h2 className="border-b border-line pb-4 font-serif text-3xl">Delivery Information</h2>
              <div className="mt-6 space-y-4">
                <select name="emirate" className="input-atelier" value={emirate} onChange={(event) => setEmirate(event.target.value)}>
                  {emirates.map((item) => <option key={item}>{item}</option>)}
                </select>
                <textarea name="address" className="input-atelier min-h-24 resize-y" placeholder="Full address *" />
                <input name="notes" className="input-atelier" placeholder="Delivery notes" />
                <div className="flex justify-between bg-cream p-4 text-sm">
                  <span>Delivery to {emirate}</span>
                  <span className="font-serif text-xl text-champagne">{shipping} AED</span>
                </div>
              </div>
            </section>
          </div>
          <aside className="h-fit bg-cream p-7 lg:sticky lg:top-28">
            <h2 className="font-serif text-3xl">Order Summary</h2>
            <div className="mt-8 space-y-3 text-sm text-warm-gray">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between gap-5">
                  <span>{item.name} x{item.quantity}</span>
                  <span>{item.unitPrice * item.quantity} AED</span>
                </div>
              ))}
              <div className="h-px bg-line" />
              <div className="flex justify-between"><span>Subtotal</span><span>{subtotal} AED</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>{shipping} AED</span></div>
              {discount ? <div className="flex justify-between text-green-700"><span>Promo Discount</span><span>-{discount} AED</span></div> : null}
            </div>
            <div className="my-6 h-px bg-line" />
            <div className="flex justify-between font-serif text-3xl"><span>Total</span><span>{total} AED</span></div>
            <button className="btn-primary mt-7 w-full" type="submit">Proceed to Payment</button>
            {error ? <p className="mt-3 text-sm text-glow">{error}</p> : null}
            <p className="mt-4 text-center text-xs text-warm-gray">Ziina endpoint is mocked for now. Worker integration comes next.</p>
          </aside>
        </form>
      </div>
    </section>
  );
}
