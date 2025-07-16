import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        item => item.product.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          product: action.payload,
          quantity: 1
        });
      }
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        item => item.product.id !== action.payload
      );
    },

    incrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.product.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },

    decrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.product.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter(
            item => item.product.id !== action.payload
          );
        }
      }
    },

    clearCart: () => {
      return initialState;
    }
  },
  extraReducers: builder => {
    builder.addMatcher(
      action =>
        action.type.startsWith("cart/") && action.type !== "cart/clearCart",
      state => {
        state.itemCount = state.items.reduce(
          (total, item) => total + item.quantity,
          0
        );

        state.total = state.items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      }
    );
  }
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;

export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotal = (state: { cart: CartState }) => state.cart.total;
export const selectCartItemCount = (state: { cart: CartState }) =>
  state.cart.itemCount;
export const selectCartItemById = (state: { cart: CartState }, id: number) =>
  state.cart.items.find(item => item.product.id === id);
export const selectIsInCart = (state: { cart: CartState }, id: number) =>
  state.cart.items.some(item => item.product.id === id);
