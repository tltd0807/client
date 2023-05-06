import React, { useReducer } from "react";
import CartCtx from "./CartCtx";
import CartReducer from "./CartReducer";
import { ADD_TO_CART, REMOVE_ITEM, CLEAR_CART } from "./Types";

const CartState = ({ children }) => {
  const initalState = {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  };

  const [state, dispatch] = useReducer(CartReducer, initalState);

  const addToCart = (item) => {
    dispatch({ type: ADD_TO_CART, payload: item });
  };
  const removeItem = (id) => {
    dispatch({ type: REMOVE_ITEM, payload: id });
  };
  const clearCart = (id) => {
    dispatch({ type: CLEAR_CART });
  };
  return (
    <CartCtx.Provider
      value={{
        cartItems: initalState.cartItems,
        addToCart,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartCtx.Provider>
  );
};

export default CartState;