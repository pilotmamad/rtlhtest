import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`} className="group block min-w-[280px]">
      <div className="relative mb-5 aspect-[3/4] overflow-hidden bg-cream">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition duration-700 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 80vw, 320px"
        />
        <span className="absolute left-4 top-4 bg-charcoal px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-white">
          {product.category}
        </span>
      </div>
      <div className="font-serif text-2xl font-normal text-charcoal">{product.name}</div>
      <div className="mt-1 text-sm tracking-[0.04em] text-champagne">From {product.basePrice} AED</div>
      <p className="mt-3 line-clamp-2 text-xs leading-6 text-warm-gray">{product.description}</p>
    </Link>
  );
}
