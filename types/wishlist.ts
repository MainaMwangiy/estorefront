import { Product } from "./products";

export interface WishlistState {
  items: Product[];
  isLoading: boolean;
}