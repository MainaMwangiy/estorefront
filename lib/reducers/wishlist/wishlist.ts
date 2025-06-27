import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product, WishlistState } from "@/types";

const initialState: WishlistState = {
  items: [],
  isLoading: false,
};
interface WishlistStoragePayload {
  items: Product[];
  isLoading: boolean;
}

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addToWishlist: (state, action: PayloadAction<Product>) => {
      if (!Array.isArray(state.items)) {
        state.items = [];
      }
      const exists = state.items.find((item) => item?.id === action.payload.id);
      if (!exists) {
        state.items.push({ ...action.payload });
      }
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      if (!Array.isArray(state.items)) {
        state.items = [];
      }
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearWishlist: (state) => {
      state.items = [];
    },
    loadWishlistFromStorage: (state, action: PayloadAction<WishlistStoragePayload>) => {
      const { items = [], isLoading = false } = action.payload || {};
      state.items = [...items]; 
      state.isLoading = isLoading;
    },
  },
});

export const { setLoading, addToWishlist, removeFromWishlist, clearWishlist, loadWishlistFromStorage } = wishlistSlice.actions;
export default wishlistSlice.reducer;
