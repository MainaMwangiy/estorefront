import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User, AuthState } from "@/types";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
      // Persist to localStorage
      localStorage.setItem(
        "auth",
        JSON.stringify({
          user: action.payload,
          isAuthenticated: true,
        })
      );
    },
    registerSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
      // Persist to localStorage
      localStorage.setItem(
        "auth",
        JSON.stringify({
          user: action.payload,
          isAuthenticated: true,
        })
      );
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
      localStorage.removeItem("auth");
    },
    loadAuthFromStorage: (state, action: PayloadAction<AuthState>) => {
      return {
        ...action.payload,
        isLoading: false,
        error: null,
      };
    },
  },
});

export const {
  setLoading,
  loginStart,
  loginSuccess,
  registerSuccess,
  loginFailure,
  logout,
  loadAuthFromStorage,
} = authSlice.actions;
export default authSlice.reducer;
