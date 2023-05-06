import { ADD_TO_CART, REMOVE_ITEM, CLEAR_CART } from "./Types";

const CartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      // quantity cộng từ page add
      // thêm produc: productId, price, size, quantity, coverImage-cái này xem xét
      const newItem = action.payload;

      const existItem = state.cartItems.find(
        (item) =>
          item.productId === newItem.productId && item.size === newItem.size
      );

      const newCartItems = existItem
        ? state.cartItems.map((item) =>
            item.productId === existItem.productId &&
            item.size === existItem.size
              ? newItem
              : item
          )
        : [...state.cartItems, newItem];
      //   thêm vào localStorage (key có thì nó replace all)
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
      return {
        cartItems: newCartItems,
      };
    }
    case REMOVE_ITEM: {
      const removeItemId = action.payload;
      //   xóa bớt localStorage (key có thì nó replace all)
      const newCartItems = state.cartItems.filter(
        (item) => item.productId !== removeItemId
      );
      return {
        // không cần check stock vì chỉ check ở add và check ở cart page, còn trừ s được khi vào cart page mà hết stock nó disable luôn
        cartItems: newCartItems,
      };
    }
    case CLEAR_CART: {
      return {
        cartItems: [],
      };
    }
    default:
      return state;
  }
};

export default CartReducer;
