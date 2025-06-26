export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: number;
  email: string;
  name: string;
  avatar?: string;
  password?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  isLoading: boolean;
}

export interface WishlistState {
  items: Product[];
  isLoading: boolean;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: "price-asc" | "price-desc" | "rating" | "title" | "newest";
  inStock?: boolean;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  total: number;
}

export interface ProductSearchParams {
  query?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  sortBy?: string;
  page?: string;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: "price-asc" | "price-desc" | "rating" | "title" | "newest";
}

export interface ProductDetailClientProps {
  product: Product;
}

export interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export interface CartAnimationProps {
  trigger: boolean;
  onComplete?: () => void;
}

export interface CartItemProps {
  item: CartItem;
}

export interface ProductFiltersProps {
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  maxPrice: number;
}
export interface ProductCardProps {
  product: Product;
  index: number;
}
