import { CartItem } from "./products";

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  isLoading: boolean;
}
export interface CartAnimationProps {
  trigger: boolean;
  onComplete?: () => void;
}
