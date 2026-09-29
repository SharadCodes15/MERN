import { useEffect, useState } from "react";
import { CustomerCartContext } from "./CustomerCartStore";

const CART_STORAGE_KEY = "foodify:customer-cart:v1";

function readStoredItems() {
  try {
    const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!storedCart) return [];

    const parsedCart = JSON.parse(storedCart);
    if (parsedCart.version !== 1 || !Array.isArray(parsedCart.items)) return [];

    return parsedCart.items.filter((item) => (
      item &&
      typeof item._id === "string" &&
      typeof item.name === "string" &&
      Number.isFinite(item.price) &&
      Number.isInteger(item.quantity) &&
      item.quantity > 0
    ));
  } catch {
    return [];
  }
}

export function CustomerCartProvider({ children }) {
  const [items, setItems] = useState(readStoredItems);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({ version: 1, items }));
    } catch (error) {
      console.error("Failed to persist customer cart:", error);
    }
  }, [items]);

  const addItem = (food) => {
    const normalizedPrice = Number(String(food.price ?? 4.92).replace(",", ".").replace(/[^\d.]/g, ""));
    const item = {
      _id: food._id,
      name: food.name,
      price: Number.isFinite(normalizedPrice) ? normalizedPrice : 4.92,
      video: food.video,
      image: food.image ?? food.thumbnail ?? food.coverImage,
    };

    setItems((current) => {
      const existing = current.find((cartItem) => cartItem._id === item._id);
      if (existing) return current.map((cartItem) => cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem);
      return [...current, { ...item, quantity: 1 }];
    });
    setIsExpanded(true);
  };

  const updateQuantity = (itemId, change) => {
    const item = items.find((cartItem) => cartItem._id === itemId);
    if (!item) return;
    if (items.length === 1 && item.quantity + change <= 0) setIsExpanded(false);
    setItems((current) => current
      .map((cartItem) => cartItem._id === itemId ? { ...cartItem, quantity: cartItem.quantity + change } : cartItem)
      .filter((cartItem) => cartItem.quantity > 0));
  };

  const clearCart = () => {
    setItems([]);
    setIsExpanded(false);
  };

  return (
    <CustomerCartContext.Provider value={{ items, isExpanded, setIsExpanded, addItem, updateQuantity, clearCart }}>
      {children}
    </CustomerCartContext.Provider>
  );
}
