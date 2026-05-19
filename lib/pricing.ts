import type { CustomizationType, Product, StampColor } from "@/data/products";

export type Customization = {
  type: CustomizationType;
  productColor?: {
    id: string;
    label: string;
    priceDelta?: number;
  };
  engravingText?: string;
  stampText?: string;
  stampColor?: StampColor;
};

export function colorExtra(customization: Customization) {
  return customization.productColor?.priceDelta || 0;
}

export const promos = {
  SAVE10: { type: "percent", value: 10 },
  VIP20: { type: "percent", value: 20 }
} as const;

export function customizationExtra(product: Product, customization: Customization) {
  if (customization.type !== "stamp" || !product.customization.stamp) {
    return 0;
  }

  return product.customization.stampPrices[customization.stampColor || "gold"] || 0;
}

export function linePrice(product: Product, customization: Customization) {
  return product.basePrice + colorExtra(customization) + customizationExtra(product, customization);
}

export function shippingForEmirate(emirate: string) {
  return emirate.toLowerCase() === "dubai" ? 25 : 60;
}

export function promoDiscount(subtotal: number, code?: string) {
  if (!code) return 0;
  const promo = promos[code.toUpperCase() as keyof typeof promos];
  if (!promo) return 0;
  return Math.round((subtotal * promo.value) / 100);
}
