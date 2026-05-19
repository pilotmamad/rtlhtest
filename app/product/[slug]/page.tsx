import { notFound } from "next/navigation";
import { ProductExperience } from "@/components/product-experience";
import { getProduct, products } from "@/data/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  return <ProductExperience product={product} />;
}
