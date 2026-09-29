import { createContext, useContext } from "react";

export const CustomerCartContext = createContext(null);

export function useCustomerCart() {
  const cart = useContext(CustomerCartContext);
  if (!cart) throw new Error("useCustomerCart must be used inside CustomerCartProvider");
  return cart;
}