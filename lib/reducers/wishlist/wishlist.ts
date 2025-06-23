import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Product, WishlistState } from "@/types"

const initialState: WishlistState = {
  items: [],
  isLoading: false,
}

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const exists = state.items.find((item) => item.id === action.payload.id)
      if (!exists) {
        state.items.push(action.payload)
      }
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    clearWishlist: (state) => {
      state.items = []
    },
    loadWishlistFromStorage: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload
      state.isLoading = false
    },
  },
})

export const { setLoading, addToWishlist, removeFromWishlist, clearWishlist, loadWishlistFromStorage } = wishlistSlice.actions;
export default wishlistSlice.reducer;
