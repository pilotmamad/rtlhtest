"use client";

import Link from "next/link";
import { useState } from "react";
import { CustomizationPanel } from "@/components/customization-panel";
import { ProductGallery } from "@/components/product-gallery";
import type { Product, ProductColor } from "@/data/products";
import type { Customization } from "@/lib/pricing";

export function ProductExperience({ product }: { product: Product }) {
  const [productColor, setProductColor] = useState<ProductColor | undefined>(product.colors[0]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [preview, setPreview] = useState<Customization>({
    type: "none",
    productColor: product.colors[0]
      ? {
          id: product.colors[0].id,
          label: product.colors[0].label,
          priceDelta: product.colors[0].priceDelta
        }
      : undefined
  });

  const galleryImages = productColor?.images?.length ? productColor.images : product.images;

  function handleColorChange(color: ProductColor, imageIndex: number) {
    setProductColor(color);
    setSelectedImageIndex(0);
  }

  return (
    <section className="grid min-w-0 overflow-hidden bg-ivory md:grid-cols-2">
      <ProductGallery
        images={galleryImages}
        name={product.name}
        selectedImageIndex={selectedImageIndex}
        preview={preview}
        previewPosition={product.previewPosition}
      />
      <div className="min-w-0 px-5 py-9 sm:px-10 md:px-14 md:py-16">
        <div className="mb-7 break-words text-[10px] uppercase tracking-[0.14em] text-warm-gray sm:text-[11px] sm:tracking-[0.16em]">
          <Link href="/store" className="transition hover:text-champagne">
            Collections
          </Link>
          <span> / {product.name}</span>
        </div>
        <h1 className="max-w-full text-balance font-serif text-[42px] font-light leading-[1.05] sm:text-5xl">
          {product.name}
        </h1>
        <div className="mt-3 font-serif text-3xl text-champagne">{product.basePrice} AED</div>
        <p className="body-copy mt-7">{product.description}</p>
        <div className="my-10 h-px bg-line" />
        <CustomizationPanel
          product={product}
          productColor={productColor}
          onProductColorChange={handleColorChange}
          onPreviewChange={setPreview}
        />
      </div>
    </section>
  );
}
