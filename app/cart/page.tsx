"use client";

import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { CartItem } from "@/components/cart/cart-item";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { clearCart } from "@/lib/reducers/cart/cart";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function Cart() {
  const { items, total, itemCount } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success("Cart cleared");
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      toast.success("Order placed successfully!");
      dispatch(clearCart());
      setIsCheckingOut(false);
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link href="/">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <span className="text-muted-foreground">({itemCount} items)</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Cart Items</CardTitle>
              <Button variant="outline" size="sm" onClick={handleClearCart}>
                Clear Cart
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              {items.map((item) => (
                <div key={item.id} className="px-6">
                  <CartItem item={item} />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal ({itemCount} items)</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>

              <div className="flex justify-between">
                <span>Tax</span>
                <span>${(total * 0.08).toFixed(2)}</span>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${(total * 1.08).toFixed(2)}</span>
              </div>

              <Button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full"
                size="lg"
              >
                {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
              </Button>

              <div className="text-xs text-muted-foreground text-center">
                Secure checkout powered by industry-leading encryption
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
