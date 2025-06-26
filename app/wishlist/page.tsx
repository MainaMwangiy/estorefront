"use client";

import { useAppSelector } from "@/lib/hooks";
import { ProductCard } from "@/components/products/card";
import { Button } from "@/components/ui/button";
import { Heart, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function WishlistPage() {
  const wishlistItems = useAppSelector((state) => state.wishlist.items) || [];

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="text-center">
          <Heart className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-xl sm:text-2xl font-bold mb-2">
            Your wishlist is empty
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mb-4 sm:mb-6">
            Save items you love to your wishlist and shop them later.
          </p>
          <Link href="/">
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white transition-colors duration-200"
            >
              <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
        <Link href="/">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 rounded-full border-2 border-blue-600 dark:border-blue-400 bg-white/50 dark:bg-gray-800/50 px-4 py-2 text-blue-600 dark:text-blue-300 font-semibold shadow-sm hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all duration-300 ease-in-out hover:shadow-md"
          >
            <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
            Continue Shopping
          </Button>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold">My Wishlist</h1>
        <span className="text-muted-foreground text-sm sm:text-base">
          ({wishlistItems.length} items)
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {wishlistItems?.map((product) => (
          <ProductCard key={product.id} index={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
