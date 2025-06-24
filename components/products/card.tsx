import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addToCart } from "@/lib/reducers/cart/cart";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/lib/reducers/wishlist/wishlist";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "../ui/card";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { CartAnimation } from "../animations/cart-animation";
import { ProductCardProps } from "@/types";

export const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items || []);
  const isInWishlist = Array.isArray(wishlistItems)
    ? wishlistItems.some((item) => item.id === product.id)
    : false;
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showCartAnimation, setShowCartAnimation] = useState(false);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    dispatch(addToCart(product));
    setShowCartAnimation(true);
    toast.success("Added to cart!", {
      description: product.title,
      duration: 2000,
    });
    setTimeout(() => setIsAddingToCart(false), 500);
  };

  const handleWishlistToggle = () => {
    debugger;
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
      toast.success("Removed from wishlist");
    } else {
      dispatch(addToWishlist(product));
      toast.success("Added to wishlist!");
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -5 }}
        className="h-full"
      >
        <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl border-0 shadow-md h-full flex flex-col">
          <div className="relative aspect-square overflow-hidden">
            <Link href={`/products/${product.id}`}>
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </Link>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
                isInWishlist
                  ? "bg-red-500/90 text-white"
                  : "bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:bg-red-500/90 hover:text-white"
              }`}
              onClick={handleWishlistToggle}
            >
              <Heart
                className={`h-4 w-4 ${isInWishlist ? "fill-current" : ""}`}
              />
            </motion.button>

            <Badge className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm">
              {product.category}
            </Badge>

            {product.rating.rate >= 4.5 && (
              <Badge className="absolute bottom-3 left-3 bg-yellow-500/90 text-yellow-900 backdrop-blur-sm">
                <Star className="h-3 w-3 mr-1 fill-current" />
                Bestseller
              </Badge>
            )}
          </div>

          <CardContent className="p-4 flex-1 flex flex-col">
            <Link href={`/products/${product.id}`}>
              <h3 className="font-semibold text-sm line-clamp-2 mb-2 hover:text-primary transition-colors min-h-[2.5rem]">
                {product.title}
              </h3>
            </Link>

            <div className="flex items-center gap-1 mb-3">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(product.rating.rate)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.rating.count})
              </span>
            </div>

            <div className="mt-auto">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0">
            <motion.div className="w-full" whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="w-full transition-all duration-200 hover:shadow-lg"
                size="sm"
              >
                <motion.div
                  animate={isAddingToCart ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                </motion.div>
                {isAddingToCart ? "Adding..." : "Add to Cart"}
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>

      <CartAnimation
        trigger={showCartAnimation}
        onComplete={() => setShowCartAnimation(false)}
      />
    </>
  );
};
