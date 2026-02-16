import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../features/auth/store/auth.slice";
import { authState } from "../features/auth/store/auth.slice";
import { cartReducer } from "../features/cart/store/cart.slice";
import { CartState } from "../features/cart/store/cart.slice";
import {
  wishlistReducer,
  WishlistState,
} from "../features/wishlist/store/wishlist.slice";
import { useDispatch, useSelector } from "react-redux";

export type preloadedState = {
  auth: authState;
  cart: CartState;
  wishlist: WishlistState;
};

export function createStore(preloadedState: preloadedState) {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      cart: cartReducer,
      wishlist: wishlistReducer,
    },
    preloadedState,
  });
  return store;
}

export type AppStore = ReturnType<typeof createStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
