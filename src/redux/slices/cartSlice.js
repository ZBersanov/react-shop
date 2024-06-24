import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  itemAmount: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, id } = action.payload;
      const newItem = { ...product, amount: 1 };

      const cartItem = state.cart.find((item) => {
        return item.id === id;
      });

      if (cartItem) {
        return [...state.cart].map((item) => {
          if (item.id === id) {
            return { ...item, amount: cartItem.amount + 1 };
          } else {
            return item;
          }
        });
      } else {
        return [...state.cart, newItem];
      }
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      return { ...state, cart: state.cart.filter((item) => item.id !== id) };
    },
    clearCart: (state) => {
      return { ...state, cart: [] };
    },
    increaseAmount: (state, action) => {
      const { id } = action.payload;
      const cartItem = state.cart.find((item) => {
        return item.id === id;
      });
      addToCart(cartItem, id);
    },
    decreaseAmount: (state, action) => {
      const cartItem = state.cart.find((item) => {
        return item.id === action.id;
      });
      if (cartItem) {
        const newCart = state.cart.map((item) => {
          if (item.id === action.id) {
            return { ...item, amount: cartItem.amount - 1 };
          } else {
            return item;
          }
        });
        return { ...state, cart: newCart };
      }
      if (cartItem.amount < 2) {
        removeFromCart(action.id);
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseAmount,
  decreaseAmount,
} = cartSlice.actions;

export default cartSlice.reducer;
