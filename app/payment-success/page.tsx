"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { clearCart } from "@/lib/reducers/cart/cart";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle, ShoppingBag } from "lucide-react";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const amount = searchParams.get("amount");

  useEffect(() => {
    if (amount && !isNaN(parseFloat(amount))) {
      dispatch(clearCart());
      toast.success("Cart cleared after successful payment");
    } else {
      router.push("/cart");
    }
  }, [amount, dispatch, router]);

  if (!amount || isNaN(parseFloat(amount))) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
      <main className="w-full max-w-md mx-auto">
        <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-3xl shadow-2xl shadow-black/5 p-8 sm:p-10 text-center space-y-8">
          <div className="relative mx-auto w-20 h-20 sm:w-24 sm:h-24">
            <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-75"></div>
            <div className="relative bg-gradient-to-br from-green-400 to-emerald-500 rounded-full w-full h-full flex items-center justify-center shadow-lg">
              <CheckCircle
                className="w-10 h-10 sm:w-12 sm:h-12 text-white"
                strokeWidth={2.5}
              />
            </div>
          </div>
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent leading-tight">
              Payment Successful!
            </h1>
            <p className="text-gray-600 text-base sm:text-lg font-medium">
              Thank you for your purchase
            </p>
          </div>
          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-200">
            <div className="text-white/80 text-sm font-medium mb-1">
              Amount Paid
            </div>
            <div className="text-white text-3xl sm:text-4xl font-bold tracking-tight">
              ${parseFloat(amount).toFixed(2)}
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="text-green-800 text-sm font-medium">
              Your order has been confirmed and will be processed shortly.
            </p>
          </div>
          <div className="space-y-3 pt-4">
            <Link href="/" className="block">
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95"
                size="lg"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
