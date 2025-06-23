"use client";

import type React from "react";
import { useState, useEffect } from "react";
import type { Product } from "@/types";
import { getProducts } from "@/lib/api";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { addToCart } from "@/lib/reducers/cart/cart";
import { useAppDispatch } from "@/lib/hooks";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const handleAddToCart = () => {
    console.log("Adding product to cart:", product);
    dispatch(addToCart(product));
  };
  return (
    <Card className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/products/${product.id}`}>
        <div className="cursor-pointer">
          <Image
            alt={product.title}
            src={product.image}
            width={450}
            height={450}
            className="w-full h-48 object-contain mb-4"
          />
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">
            {product.title}
          </h3>
          <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
        </div>
      </Link>
      <button
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </Card>
  );
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
              <div className="bg-gray-200 h-4 rounded mb-2"></div>
              <div className="bg-gray-200 h-4 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Our Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
