import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartResponse } from "../types/cart.types";
import { clear } from "console";

export interface CartState {
  numOfCartItems: number;
  cartId: string | null;
  products: CartItem[];
  totalCartPrice: number;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  numOfCartItems: 0,
  cartId: null,
  products: [],
  totalCartPrice: 0,
  loading: false,
  error: null,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartInfo: (state, action: PayloadAction<CartResponse>) => {
      state.numOfCartItems = action.payload.numOfCartItems;
      state.cartId = action.payload.cartId;
      state.products = action.payload.data.products;
      state.totalCartPrice = action.payload.data.totalCartPrice;
    },
    removeProduct: (state, action: PayloadAction<{ id: string }>) => {
      const productId = action.payload.id;
      const removedProduct = state.products.find(
        (item) => item.product.id === productId,
      );

      if (removedProduct) {
        state.products = state.products.filter(
          (product) => product.product.id !== productId,
        );
        state.numOfCartItems = state.products.length;
        state.totalCartPrice -= removedProduct.price * removedProduct.count;
      }
    },
    clearCart: (state) => {
      state.numOfCartItems = 0;
      state.cartId = null;
      state.products = [];
      state.totalCartPrice = 0;
    },
    clearCartAfterPayment: (state) => {
      state.numOfCartItems = 0;
      state.cartId = null;
      state.products = [];
      state.totalCartPrice = 0;
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const { setCartInfo, removeProduct, clearCart, clearCartAfterPayment } =
  cartSlice.actions;
