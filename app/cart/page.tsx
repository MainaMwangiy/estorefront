"use client";

import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { CartItem } from "@/components/cart/cart-item";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { clearCart } from "@/lib/reducers/cart/cart";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Cart() {
  const { items, total, itemCount } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success("Cart cleared");
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    router.push(`/checkout?amount=${(total * 1.08).toFixed(2)}`);
    setIsCheckingOut(false);
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="text-center">
          <ShoppingBag className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-xl sm:text-2xl font-bold mb-2">
            Your cart is empty
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mb-4 sm:mb-6">
            Looks like you havent added any items to your cart yet.
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <Link href="/">
          <Button variant="ghost" size="sm" className="text-sm sm:text-base">
            <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
            Continue Shopping
          </Button>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold">Shopping Cart</h1>
        <span className="text-muted-foreground text-sm sm:text-base">
          ({itemCount} items)
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg sm:text-xl">Cart Items</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearCart}
                className="text-sm sm:text-base"
              >
                Clear Cart
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              {items.map((item) => (
                <div key={item.id} className="px-4 sm:px-6">
                  <CartItem item={item} />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-20 sm:top-24">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm sm:text-base">
                <span>Subtotal ({itemCount} items)</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base">
                <span>Tax</span>
                <span>${(total * 0.08).toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-base sm:text-lg font-bold">
                <span>Total</span>
                <span>${(total * 1.08).toFixed(2)}</span>
              </div>
              <Button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full text-sm sm:text-base bg-gradient-to-r from-blue-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 text-white transition-colors duration-200"
                size="lg"
              >
                {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
              </Button>
              <div className="text-xs sm:text-sm text-muted-foreground text-center">
                Secure checkout powered by industry-leading encryption
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
