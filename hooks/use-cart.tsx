"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { products } from "@/data/products";
import type { Customization } from "@/lib/pricing";
import { linePrice, promoDiscount } from "@/lib/pricing";

export type CartItem = {
  id: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  unitPrice: number;
  quantity: number;
  customization: Customization;
};

type CartContextValue = {
  items: CartItem[];
  promoCode: string;
  subtotal: number;
  discount: number;
  count: number;
  addItem: (slug: string, customization: Customization) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  applyPromo: (code: string) => boolean;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "rtlh_cart_v1";
const promoKey = "rtlh_promo_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState("");

  useEffect(() => {
    const savedItems = window.localStorage.getItem(storageKey);
    const savedPromo = window.localStorage.getItem(promoKey);
    if (savedItems) setItems(JSON.parse(savedItems));
    if (savedPromo) setPromoCode(savedPromo);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    window.localStorage.setItem(promoKey, promoCode);
  }, [promoCode]);

  const addItem = useCallback((slug: string, customization: Customization) => {
    const product = products.find((item) => item.slug === slug);
    if (!product) return;

    setItems((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        productId: product.id,
        slug: product.slug,
        name: product.name,
        image: product.images[0],
        unitPrice: linePrice(product, customization),
        quantity: 1,
        customization
      }
    ]);
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const applyPromo = useCallback((code: string) => {
    const normalized = code.trim().toUpperCase();
    if (!normalized || promoDiscount(100, normalized) === 0) return false;
    setPromoCode(normalized);
    return true;
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setPromoCode("");
  }, []);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    [items]
  );
  const discount = useMemo(() => promoDiscount(subtotal, promoCode), [promoCode, subtotal]);
  const count = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      promoCode,
      subtotal,
      discount,
      count,
      addItem,
      updateQuantity,
      removeItem,
      applyPromo,
      clearCart
    }),
    [addItem, applyPromo, clearCart, count, discount, items, promoCode, removeItem, subtotal, updateQuantity]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return value;
}
