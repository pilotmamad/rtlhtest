import type { Customization } from "@/lib/pricing";

export function formatCustomization(customization: Customization) {
  const color = customization.productColor?.label
    ? `Color: ${customization.productColor.label}`
    : "";

  if (customization.type === "engraving") {
    return [color, `Engraving: "${customization.engravingText || "Pending"}"`]
      .filter(Boolean)
      .join(" · ");
  }

  if (customization.type === "stamp") {
    return [
      color,
      `Stamp: "${customization.stampText || "Pending"}"`,
      `${customization.stampColor || "gold"} finish`
    ]
      .filter(Boolean)
      .join(" · ");
  }

  return color || "No customization";
}
