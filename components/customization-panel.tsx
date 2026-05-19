"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { CustomizationType, Product, ProductColor, StampColor } from "@/data/products";
import { useCart } from "@/hooks/use-cart";
import { customizationExtra, linePrice } from "@/lib/pricing";
import { whatsappUrl } from "@/lib/whatsapp";
import type { Customization } from "@/lib/pricing";

const stampLabels: Record<StampColor, string> = {
  gold: "Gold",
  silver: "Silver",
  natural: "Natural"
};

const stampDots: Record<StampColor, string> = {
  gold: "#C9A96E",
  silver: "#A0A0A0",
  natural: "#8B7355"
};

export function CustomizationPanel({
  product,
  productColor,
  onProductColorChange,
  onPreviewChange
}: {
  product: Product;
  productColor?: ProductColor;
  onProductColorChange: (color: ProductColor, imageIndex: number) => void;
  onPreviewChange: (customization: Customization) => void;
}) {
  const router = useRouter();
  const { addItem } = useCart();
  const [type, setType] = useState<CustomizationType>("none");
  const [engravingText, setEngravingText] = useState("");
  const [stampText, setStampText] = useState("");
  const [stampColor, setStampColor] = useState<StampColor>(
    product.customization.stampColors[0] || "gold"
  );

  const customization = useMemo<Customization>(
    () => ({
      type,
      productColor: productColor
        ? {
            id: productColor.id,
            label: productColor.label,
            priceDelta: productColor.priceDelta
          }
        : undefined,
      engravingText: type === "engraving" ? engravingText : "",
      stampText: type === "stamp" ? stampText.toUpperCase() : "",
      stampColor: type === "stamp" ? stampColor : undefined
    }),
    [engravingText, productColor, stampColor, stampText, type]
  );

  const colorExtra = productColor?.priceDelta || 0;
  const extra = customizationExtra(product, customization);
  const total = linePrice(product, customization);

  useEffect(() => {
    onPreviewChange(customization);
  }, [customization, onPreviewChange]);

  function handleAdd() {
    addItem(product.slug, customization);
    router.push("/cart");
  }

  return (
    <div className="min-w-0 space-y-8">
      {product.colors.length ? (
        <div>
          <span className="mb-3 block text-[11px] uppercase tracking-[0.2em] text-warm-gray">
            Color
          </span>
          <div className="grid grid-cols-1 gap-2 min-[390px]:grid-cols-3">
            {product.colors.map((color) => (
              <Segment
                key={color.id}
                active={productColor?.id === color.id}
                onClick={() => onProductColorChange(color, product.colors.indexOf(color))}
              >
                <span
                  className="h-3 w-3 rounded-full border border-black/10"
                  style={{ background: color.swatch }}
                />
                {color.label}
                {color.priceDelta ? ` +${color.priceDelta} AED` : ""}
              </Segment>
            ))}
          </div>
        </div>
      ) : null}

      <div>
        <span className="mb-3 block text-[11px] uppercase tracking-[0.2em] text-warm-gray">
          Customization
        </span>
        <div className="grid grid-cols-1 gap-2 min-[390px]:grid-cols-3">
          <Segment active={type === "none"} onClick={() => setType("none")}>
            No Customization
          </Segment>
          {product.customization.engraving ? (
            <Segment active={type === "engraving"} onClick={() => setType("engraving")}>
              Engraving
            </Segment>
          ) : null}
          {product.customization.stamp ? (
            <Segment active={type === "stamp"} onClick={() => setType("stamp")}>
              Stamp
            </Segment>
          ) : null}
        </div>
      </div>

      {type === "engraving" ? (
        <div>
          <label className="mb-3 block text-[11px] uppercase tracking-[0.2em] text-warm-gray">
            Engraving Text
          </label>
          <input
            className="input-atelier"
            maxLength={product.customization.maxEngravingChars || 40}
            value={engravingText}
            onChange={(event) => setEngravingText(event.target.value)}
            placeholder="Your name or message..."
          />
          <p className="mt-2 text-xs text-warm-gray">Arabic and English supported.</p>
        </div>
      ) : null}

      {type === "stamp" ? (
        <div className="space-y-6">
          <div>
            <label className="mb-3 block text-[11px] uppercase tracking-[0.2em] text-warm-gray">
              Stamp Initials
            </label>
            <input
              className="input-atelier w-28 text-center font-serif text-xl uppercase tracking-[0.2em]"
              maxLength={product.customization.maxStampChars || 3}
              value={stampText}
              onChange={(event) => setStampText(event.target.value.toUpperCase())}
              placeholder="KAM"
            />
          </div>
          <div>
            <span className="mb-3 block text-[11px] uppercase tracking-[0.2em] text-warm-gray">
              Stamp Color
            </span>
            <div className="grid grid-cols-1 gap-2 min-[390px]:grid-cols-3">
              {product.customization.stampColors.map((color) => (
                <Segment
                  key={color}
                  active={stampColor === color}
                  onClick={() => setStampColor(color)}
                >
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: stampDots[color] }} />
                  {stampLabels[color]} +{product.customization.stampPrices[color]} AED
                </Segment>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <div className="bg-cream p-5 sm:p-6">
        <div className="flex justify-between gap-4 text-sm text-warm-gray">
          <span>Base Price</span>
          <span>{product.basePrice} AED</span>
        </div>
        {colorExtra ? (
          <div className="mt-3 flex justify-between gap-4 text-sm text-warm-gray">
            <span>Color</span>
            <span>+{colorExtra} AED</span>
          </div>
        ) : null}
        {extra ? (
          <div className="mt-3 flex justify-between gap-4 text-sm text-warm-gray">
            <span>Customization</span>
            <span>+{extra} AED</span>
          </div>
        ) : null}
        <div className="mt-4 flex justify-between gap-4 border-t border-line pt-4 font-serif text-2xl">
          <span>Total</span>
          <span>{total} AED</span>
        </div>
      </div>

      <div className="space-y-3">
        <button className="btn-primary w-full" onClick={handleAdd}>
          Add to Cart
        </button>
        <a
          className="btn-ghost w-full"
          href={whatsappUrl(`I want a custom order for ${product.name}.`)}
          target="_blank"
          rel="noreferrer"
        >
          Special Order via WhatsApp
        </a>
      </div>
    </div>
  );
}

function Segment({
  active,
  onClick,
  children
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-12 w-full min-w-0 items-center justify-center gap-2 border px-3 py-3 text-center text-sm leading-snug transition sm:px-4 ${
        active ? "border-charcoal bg-charcoal text-white" : "border-line bg-transparent text-charcoal hover:border-champagne"
      }`}
    >
      {children}
    </button>
  );
}
