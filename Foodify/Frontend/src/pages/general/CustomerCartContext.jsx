import { useState } from "react";
import { CustomerCartContext } from "./CustomerCartStore";

export function CustomerCartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

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
