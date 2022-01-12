import * as actionTypes from "../constant/CartConstant";

const CART_INITIAL_STATE = {
  cartItems: [],
};

export const cartReducer = (state = CART_INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      const item = action.payload;
      
      const existItem = state.cartItems.find((x) => x.product === item.product);
      
      if (existItem) {
        if (item.cong_don) {
          item.count += existItem.count
          if (item.count >= item.so_luong) {
            item.count = item.so_luong
          }
        }
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case actionTypes.CART_RESET:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};