export type ProductCategory = "leather" | "signature" | "accessories";
export type CustomizationType = "none" | "engraving" | "stamp";
export type StampColor = "natural" | "gold" | "silver";
export type ProductColor = {
  id: string;
  label: string;
  swatch: string;
  images?: string[];
  priceDelta?: number;
};
export type PreviewPosition = {
  x: number;
  y: number;
  scale?: number;
  rotate?: number;
  maxWidth?: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  collection: string;
  basePrice: number;
  description: string;
  images: string[];
  colors: ProductColor[];
  previewPosition: PreviewPosition;
  customization: {
    engraving: boolean;
    stamp: boolean;
    maxEngravingChars?: number;
    maxStampChars?: number;
    stampColors: StampColor[];
    stampPrices: Partial<Record<StampColor, number>>;
  };
};

export const products: Product[] = [
  {
    id: "p1",
    slug: "monogram-cardholder",
    name: "Monogram Cardholder",
    category: "leather",
    collection: "leather-goods",
    basePrice: 185,
    description:
      "Full-grain leather cardholder with space for six cards. Engraved with your initials in a refined serif style.",
    images: [
      "/images/products/cardholder-01.svg",
      "/images/products/cardholder-02.svg",
      "/images/products/cardholder-03.svg"
    ],
    colors: [
      { id: "cognac", label: "Cognac", swatch: "#8B5E3C", images: ["/images/products/cardholder-01.svg"] },
      { id: "black", label: "Black", swatch: "#1C1A18", images: ["/images/products/cardholder-02.svg"] },
      { id: "sand", label: "Sand", swatch: "#D8C7AF", images: ["/images/products/cardholder-03.svg"] }
    ],
    previewPosition: { x: 50, y: 52, scale: 1, maxWidth: 34 },
    customization: {
      engraving: true,
      stamp: true,
      maxEngravingChars: 40,
      maxStampChars: 3,
      stampColors: ["natural", "gold", "silver"],
      stampPrices: { natural: 15, gold: 20, silver: 20 }
    }
  },
  {
    id: "p2",
    slug: "executive-pen-case",
    name: "Executive Pen Case",
    category: "leather",
    collection: "leather-goods",
    basePrice: 245,
    description:
      "Structured leather pen case for two instruments with magnetic closure and microfiber lining.",
    images: [
      "/images/products/pen-case-01.svg",
      "/images/products/pen-case-02.svg",
      "/images/products/pen-case-03.svg"
    ],
    colors: [
      { id: "black", label: "Black", swatch: "#1C1A18", images: ["/images/products/pen-case-01.svg"] },
      { id: "cognac", label: "Cognac", swatch: "#8B5E3C", images: ["/images/products/pen-case-02.svg"] },
      { id: "olive", label: "Olive", swatch: "#5B5A3F", images: ["/images/products/pen-case-03.svg"] }
    ],
    previewPosition: { x: 50, y: 52, scale: 0.82, rotate: -90, maxWidth: 38 },
    customization: {
      engraving: true,
      stamp: false,
      maxEngravingChars: 40,
      stampColors: [],
      stampPrices: {}
    }
  },
  {
    id: "p3",
    slug: "leather-journal-cover",
    name: "Leather Journal Cover",
    category: "signature",
    collection: "signature-collection",
    basePrice: 320,
    description:
      "Handcrafted A5 journal cover in full-grain leather. A daily companion worthy of your thoughts.",
    images: [
      "/images/products/journal-01.svg",
      "/images/products/journal-02.svg",
      "/images/products/journal-03.svg"
    ],
    colors: [
      { id: "cognac", label: "Cognac", swatch: "#8B5E3C", images: ["/images/products/journal-01.svg"] },
      { id: "black", label: "Black", swatch: "#1C1A18", images: ["/images/products/journal-02.svg"] },
      { id: "natural", label: "Natural", swatch: "#B89466", images: ["/images/products/journal-03.svg"] }
    ],
    previewPosition: { x: 50, y: 57, scale: 1.1, maxWidth: 36 },
    customization: {
      engraving: true,
      stamp: true,
      maxEngravingChars: 40,
      maxStampChars: 3,
      stampColors: ["natural", "gold", "silver"],
      stampPrices: { natural: 15, gold: 20, silver: 20 }
    }
  },
  {
    id: "p4",
    slug: "signature-keychain",
    name: "Signature Keychain",
    category: "accessories",
    collection: "accessories",
    basePrice: 95,
    description:
      "Brushed brass keychain with a leather loop and engraved medallion. A refined everyday carry piece.",
    images: [
      "/images/products/keychain-01.svg",
      "/images/products/keychain-02.svg",
      "/images/products/keychain-03.svg"
    ],
    colors: [
      { id: "champagne", label: "Champagne", swatch: "#C9A96E", images: ["/images/products/keychain-01.svg"] },
      { id: "silver", label: "Silver", swatch: "#A7A7A7", images: ["/images/products/keychain-02.svg"] },
      { id: "black", label: "Black", swatch: "#1C1A18", images: ["/images/products/keychain-03.svg"], priceDelta: 10 }
    ],
    previewPosition: { x: 50, y: 58, scale: 0.72, maxWidth: 24 },
    customization: {
      engraving: true,
      stamp: false,
      maxEngravingChars: 24,
      stampColors: [],
      stampPrices: {}
    }
  },
  {
    id: "p5",
    slug: "travel-document-holder",
    name: "Travel Document Holder",
    category: "leather",
    collection: "leather-goods",
    basePrice: 390,
    description:
      "Full-grain leather passport holder with multiple card slots and RFID lining, personalized with a name or monogram.",
    images: [
      "/images/products/travel-holder-01.svg",
      "/images/products/travel-holder-02.svg",
      "/images/products/travel-holder-03.svg"
    ],
    colors: [
      { id: "cognac", label: "Cognac", swatch: "#8B5E3C", images: ["/images/products/travel-holder-01.svg"] },
      { id: "black", label: "Black", swatch: "#1C1A18", images: ["/images/products/travel-holder-02.svg"] },
      { id: "sand", label: "Sand", swatch: "#D8C7AF", images: ["/images/products/travel-holder-03.svg"] }
    ],
    previewPosition: { x: 50, y: 62, scale: 0.95, maxWidth: 34 },
    customization: {
      engraving: true,
      stamp: true,
      maxEngravingChars: 40,
      maxStampChars: 3,
      stampColors: ["natural", "gold", "silver"],
      stampPrices: { natural: 15, gold: 20, silver: 20 }
    }
  },
  {
    id: "p6",
    slug: "desk-nameplate",
    name: "Desk Nameplate",
    category: "signature",
    collection: "signature-collection",
    basePrice: 475,
    description:
      "Brushed metal desk nameplate with hand-finished lettering. A quiet presence on every desk.",
    images: [
      "/images/products/nameplate-01.svg",
      "/images/products/nameplate-02.svg",
      "/images/products/nameplate-03.svg"
    ],
    colors: [
      { id: "brass", label: "Brass", swatch: "#C9A96E", images: ["/images/products/nameplate-01.svg"] },
      { id: "silver", label: "Silver", swatch: "#A7A7A7", images: ["/images/products/nameplate-02.svg"] },
      { id: "matte-black", label: "Matte Black", swatch: "#1C1A18", images: ["/images/products/nameplate-03.svg"], priceDelta: 25 }
    ],
    previewPosition: { x: 50, y: 50, scale: 0.9, maxWidth: 42 },
    customization: {
      engraving: true,
      stamp: false,
      maxEngravingChars: 32,
      stampColors: [],
      stampPrices: {}
    }
  },
  {
    id: "p7",
    slug: "crystal-pen",
    name: "Crystal Pen",
    category: "accessories",
    collection: "accessories",
    basePrice: 195,
    description:
      "Premium weighted pen with a crystal barrel and gold nib, engraved with a name or personal insignia.",
    images: [
      "/images/products/crystal-pen-01.svg",
      "/images/products/crystal-pen-02.svg",
      "/images/products/crystal-pen-03.svg"
    ],
    colors: [
      { id: "gold", label: "Gold", swatch: "#C9A96E", images: ["/images/products/crystal-pen-01.svg"] },
      { id: "silver", label: "Silver", swatch: "#A7A7A7", images: ["/images/products/crystal-pen-02.svg"] },
      { id: "rose", label: "Rose", swatch: "#B98B7D", images: ["/images/products/crystal-pen-03.svg"], priceDelta: 15 }
    ],
    previewPosition: { x: 50, y: 54, scale: 0.7, rotate: -90, maxWidth: 30 },
    customization: {
      engraving: true,
      stamp: false,
      maxEngravingChars: 24,
      stampColors: [],
      stampPrices: {}
    }
  },
  {
    id: "p8",
    slug: "valet-tray",
    name: "Valet Tray",
    category: "signature",
    collection: "signature-collection",
    basePrice: 560,
    description:
      "Handcrafted leather valet tray with a suede interior and engraved exterior panel.",
    images: [
      "/images/products/valet-tray-01.svg",
      "/images/products/valet-tray-02.svg",
      "/images/products/valet-tray-03.svg"
    ],
    colors: [
      { id: "cognac", label: "Cognac", swatch: "#8B5E3C", images: ["/images/products/valet-tray-01.svg"] },
      { id: "black", label: "Black", swatch: "#1C1A18", images: ["/images/products/valet-tray-02.svg"] },
      { id: "taupe", label: "Taupe", swatch: "#9A8571", images: ["/images/products/valet-tray-03.svg"], priceDelta: 20 }
    ],
    previewPosition: { x: 50, y: 52, scale: 1, maxWidth: 32 },
    customization: {
      engraving: true,
      stamp: true,
      maxEngravingChars: 40,
      maxStampChars: 3,
      stampColors: ["natural", "gold", "silver"],
      stampPrices: { natural: 15, gold: 20, silver: 20 }
    }
  }
];

export const collections = [
  {
    slug: "leather-goods",
    name: "Leather Goods",
    description: "Full-grain pieces made for daily rituals, travel, and refined gifting."
  },
  {
    slug: "signature-collection",
    name: "Signature Collection",
    description: "Objects of ceremony, presence, and carefully placed personalization."
  },
  {
    slug: "accessories",
    name: "Accessories",
    description: "Small pieces with lasting emotional weight."
  }
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCollection(slug: string) {
  return products.filter((product) => product.collection === slug);
}
