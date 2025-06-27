"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const convertToSubcurrency = (amount: number): number => {
  return Math.round(amount * 100);
};

function CheckoutLayoutContent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const searchParams = useSearchParams();
  const amountStr = searchParams.get("amount");
  const amount = amountStr ? parseFloat(amountStr) : null;

  if (!amount || isNaN(amount) || amount <= 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid Checkout Amount</h1>
          <p className="text-muted-foreground mb-6">
            The checkout amount is missing or invalid. Please return to your
            cart and try again.
          </p>
          <Link href="/cart">
            <Button className="flex items-center gap-2 rounded-full border-2 border-blue-600 dark:border-blue-400 bg-white/50 dark:bg-gray-800/50 px-4 py-2 text-blue-600 dark:text-blue-300 font-semibold shadow-sm hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all duration-300 ease-in-out hover:shadow-md">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Cart
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        mode: "payment",
        currency: "usd",
        amount: convertToSubcurrency(amount),
      }}
    >
      {children}
    </Elements>
  );
}

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutLayoutContent>{children}</CheckoutLayoutContent>
    </Suspense>
  );
}
