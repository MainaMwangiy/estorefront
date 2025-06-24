"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductDetailClientProps } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Heart,
  ShoppingCart,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Plus,
  Minus,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { toast } from "sonner";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/lib/reducers/wishlist/wishlist";
import { FadeIn } from "@/components/animations/fade-in";
import { motion } from "framer-motion";
import { addToCart } from "@/lib/reducers/cart/cart";
import { SlideIn } from "@/components/animations/slide-in";
import { CartAnimation } from "@/components/animations/cart-animation";

export function ProductDetails({ product }: ProductDetailClientProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const dispatch = useAppDispatch();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showCartAnimation, setShowCartAnimation] = useState(false);
  const wishlistItems = useAppSelector((state) => state.wishlist.items || []);
  const isInWishlist = Array.isArray(wishlistItems)
    ? wishlistItems.some((item) => item.id === product.id)
    : false;

  // Mock multiple images for demo
  const images = [product.image, product.image, product.image];
  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
    setShowCartAnimation(true);
    toast.success(`Added ${quantity} item(s) to cart!`, {
      description: product.title,
    });
    setTimeout(() => setIsAddingToCart(false), 500);
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
      toast.success("Removed from wishlist");
    } else {
      dispatch(addToWishlist(product));
      toast.success("Added to wishlist!");
    }
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <FadeIn>
            <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
              <Image
                src={images[selectedImage] || "/placeholder.svg"}
                alt={product.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {product.rating.rate >= 4.5 && (
                <Badge className="absolute top-4 left-4 bg-yellow-500/90 text-yellow-900 backdrop-blur-sm">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  Bestseller
                </Badge>
              )}
            </div>
          </FadeIn>

          {/* Thumbnail Images */}
          <div className="flex gap-2 overflow-x-auto">
            {images.map((image, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedImage(index)}
                className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                  selectedImage === index
                    ? "border-primary"
                    : "border-transparent"
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.title} ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <Badge variant="secondary" className="mb-3 capitalize">
              {product.category}
            </Badge>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
              {product.title}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating.rate)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div>

            <div className="text-4xl font-bold text-primary mb-6">
              ${product.price.toFixed(2)}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-3 text-lg">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          <Separator />

          <div className="space-y-6">
            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <label className="font-medium text-lg">Quantity:</label>
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="h-12 w-12 rounded-r-none"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="px-4 py-3 min-w-[3rem] text-center font-medium text-lg">
                  {quantity}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-12 w-12 rounded-l-none"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <motion.div className="flex-1" whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className="w-full h-14 text-lg font-semibold"
                  size="lg"
                >
                  <motion.div
                    animate={isAddingToCart ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                  </motion.div>
                  {isAddingToCart ? "Adding..." : "Add to Cart"}
                </Button>
              </motion.div>

              <motion.div whileTap={{ scale: 0.9 }}>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleWishlistToggle}
                  className={`h-14 px-6 ${
                    isInWishlist
                      ? "text-red-500 border-red-500 bg-red-50 dark:bg-red-950/20"
                      : ""
                  }`}
                >
                  <Heart
                    className={`h-5 w-5 ${isInWishlist ? "fill-current" : ""}`}
                  />
                </Button>
              </motion.div>
            </div>
          </div>

          <Separator />

          {/* Features */}
          <SlideIn direction="right" delay={0.3}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <motion.div whileHover={{ scale: 1.02 }}>
                <Card className="border-0 shadow-sm">
                  <CardContent className="flex items-center gap-3 p-4">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Truck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Free Shipping</p>
                      <p className="text-xs text-muted-foreground">
                        On orders over $50
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }}>
                <Card className="border-0 shadow-sm">
                  <CardContent className="flex items-center gap-3 p-4">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Secure Payment</p>
                      <p className="text-xs text-muted-foreground">
                        100% protected
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }}>
                <Card className="border-0 shadow-sm">
                  <CardContent className="flex items-center gap-3 p-4">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <RotateCcw className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Easy Returns</p>
                      <p className="text-xs text-muted-foreground">
                        30-day policy
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </SlideIn>
        </div>
      </div>
      <CartAnimation
        trigger={showCartAnimation}
        onComplete={() => setShowCartAnimation(false)}
      />
    </div>
  );
}
