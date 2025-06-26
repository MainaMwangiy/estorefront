import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./../reducers/cart/cart";
import wishlistReducer from "./../reducers/wishlist/wishlist"; 
import authReducer from "./../reducers/auth/auth";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        wishlist: wishlistReducer,
        auth: authReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;