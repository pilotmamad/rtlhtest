import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { collections, getProductsByCollection } from "@/data/products";

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

export default function CollectionPage({ params }: { params: { slug: string } }) {
  const collection = collections.find((item) => item.slug === params.slug);
  if (!collection) notFound();
  const collectionProducts = getProductsByCollection(params.slug);

  return (
    <section className="bg-ivory">
      <div className="bg-sand px-5 py-16 text-center sm:px-10 sm:py-20">
        <p className="eyebrow mb-5">Collection</p>
        <h1 className="section-title">{collection.name}</h1>
        <p className="body-copy mx-auto mt-6 max-w-xl">{collection.description}</p>
      </div>
      <div className="container-atelier grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-3">
        {collectionProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
