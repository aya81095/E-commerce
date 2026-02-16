import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WishlistItem, WishlistResponse } from "../types/wishlist.types";

export interface WishlistState {
  count: number;
  wishlistId: string | null;
  data: WishlistItem[];
  loading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  count: 0,
  wishlistId: null,
  data: [],
  loading: false,
  error: null,
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlistInfo: (state, action: PayloadAction<WishlistResponse>) => {
      state.count = action.payload.count;
      state.wishlistId =
        action.payload.data.length > 0 ? action.payload.data[0].id : null;
      state.data = action.payload.data;
    },
    removeItem: (state, action: PayloadAction<{ id: string }>) => {
      const itemId = action.payload.id;
      const removedItem = state.data.find((item) => item.id === itemId);

      if (removedItem) {
        state.data = state.data.filter((item) => item.id !== itemId);
        state.count = state.data.length;
      }
    },
  },
});

export const wishlistReducer = wishlistSlice.reducer;
export const { setWishlistInfo, removeItem } = wishlistSlice.actions;
