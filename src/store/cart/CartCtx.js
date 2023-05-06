import { createContext } from "react";

const CartCtx = createContext({
  cartItems: [],
  addToCart: () => {},
  removeItem: () => {},
  clearCart: () => {},
});

export default CartCtx;
