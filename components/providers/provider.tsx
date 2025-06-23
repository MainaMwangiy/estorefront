"use client";

import type React from "react";
import { Provider } from "react-redux";
import { store } from "@/lib/redux/store";
import { useEffect } from "react";
import { loadCartFromStorage } from "@/lib/reducers/cart/cart";
import { loadWishlistFromStorage } from "@/lib/reducers/wishlist/wishlist";

const InitializeStore = () => {
  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        store.dispatch(loadCartFromStorage(cartData));
      } catch (error) {
        console.error("Failed to load cart from storage:", error);
      }
    }

    // Load wishlist from localStorage
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      try {
        const wishlistData = JSON.parse(savedWishlist);
        store.dispatch(loadWishlistFromStorage(wishlistData));
      } catch (error) {
        console.error("Failed to load wishlist from storage:", error);
      }
    }

    // Subscribe to store changes to save to localStorage
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("wishlist", JSON.stringify(state?.wishlist || []));
    });

    return unsubscribe;
  }, []);

  return null;
};

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <InitializeStore />
      {children}
    </Provider>
  );
}
