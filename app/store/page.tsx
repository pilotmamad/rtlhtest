import { ProductCard } from "@/components/product-card";
import { products } from "@/data/products";

export default function StorePage() {
  return (
    <section className="bg-ivory">
      <div className="bg-sand px-5 py-16 text-center sm:px-10 sm:py-20">
        <p className="eyebrow mb-5">Collections</p>
        <h1 className="section-title">
          Bespoke objects of
          <br />
          <em>distinction.</em>
        </h1>
        <p className="body-copy mx-auto mt-6 max-w-xl">
          Each piece is designed to carry a personal mark while supporting the larger RTLH world of live engraving experiences.
        </p>
      </div>
      <div className="container-atelier grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
