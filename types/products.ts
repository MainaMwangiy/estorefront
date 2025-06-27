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

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: "price-asc" | "price-desc" | "rating" | "title" | "newest";
  inStock?: boolean;
}

export interface ProductSearchParams {
  query?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  sortBy?: string;
  page?: string;
}


export interface ProductDetailClientProps {
  product: Product;
}

export interface ProductPageProps {
  params: Promise<{ id: string }>;
}
export interface ProductFiltersProps {
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  maxPrice: number;
}
export interface ProductCardProps {
  product: Product;
  index: number;
  viewMode?: "grid" | "list";
}

