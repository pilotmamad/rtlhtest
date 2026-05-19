# RTLH Migration Audit

## Current Prototype Weaknesses

- The original `/Users/mamad/Downloads/newrtlh.html` is a 1,214-line single-file prototype.
- Routing is simulated with DOM class toggles, so URLs, deep links, metadata, static generation, and route-level code splitting do not exist.
- Product data, rendering, cart state, checkout state, promo logic, shipping logic, and WhatsApp behavior are coupled inside inline JavaScript.
- Product galleries use icon/emoji placeholders rather than image-backed gallery data.
- Cart and checkout work as a visual demo, but there is no boundary for secure order validation or a future payment provider.
- Components are not reusable enough for long-term ecommerce, event storytelling, or content expansion.

## New Architecture

- `app/` contains real Next.js App Router routes:
  - `/`
  - `/events`
  - `/store`
  - `/collections/[slug]`
  - `/product/[slug]`
  - `/cart`
  - `/checkout`
  - `/about`
  - `/success`
- `components/` contains reusable UI:
  - `Navbar`
  - `Footer`
  - `ProductCard`
  - `ProductGallery`
  - `CustomizationPanel`
  - `EventInquiryForm`
  - `Reveal`
  - `WhatsAppFloat`
- `data/products.ts` is the config-driven product source. Product pages adapt to each product's engraving and stamping rules.
- `hooks/use-cart.tsx` owns localStorage cart persistence, quantities, promo code state, and cart mutation behavior.
- `lib/pricing.ts` owns price calculations, promo discounts, and UAE shipping logic.
- `public/images/` now provides image-backed product and editorial assets. These are stand-ins for final photography and can be replaced without changing product UI.
- `workers/` prepares the Cloudflare Worker direction for secure order validation and future Ziina checkout creation.

## Migration Plan

1. Establish Next.js + Tailwind + App Router foundation. Completed.
2. Extract product, pricing, promo, shipping, and WhatsApp logic into data/lib/hooks. Completed.
3. Replace fake routing with real routes. Completed.
4. Replace emoji galleries with image-backed product gallery architecture. Completed with local stand-in assets.
5. Preserve the premium live engraving narrative on home and events pages. First pass completed.
6. Replace checkout mock with a Cloudflare Worker `create-checkout` endpoint and order validation.
7. Add D1 schema for products, orders, order line items, promo codes, and event inquiries.
8. Integrate Ziina once API credentials, webhook requirements, and production checkout flow are confirmed.
9. Add visual QA and responsive regression checks after dependencies are installed.
