"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CreditCard } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useAppSelector } from "@/lib/hooks";

const convertToSubcurrency = (amount: number): number => {
  return Math.round(amount);
};

export default function Checkout() {
  const searchParams = useSearchParams();
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const { total, itemCount } = useAppSelector((state) => state.cart);

  const amount = Number(searchParams.get("amount")) || total * 1.08;

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        debugger;
        const response = await fetch("/api/create-stripe-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
          cache: "no-store",
        });
        const data = await response.json();
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          setErrorMessage("Failed to initialize payment. Please try again.");
        }
      } catch (error) {
        setErrorMessage(
          `Network error. Please check your connection. ${error}`
        );
      }
    };

    if (amount > 0) {
      fetchClientSecret();
    } else {
      setErrorMessage("Invalid cart total. Please return to cart.");
    }
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret) {
      setErrorMessage("Payment system not initialized. Please try again.");
      return;
    }
    debugger;
    setLoading(true);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success?amount=${amount}`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
      toast.error(error.message || "Payment failed. Please try again.");
    } else {
      toast.success("Payment initiated successfully!");
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/cart">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <PaymentElement />
                {errorMessage && (
                  <div className="text-red-600 text-sm">{errorMessage}</div>
                )}
                <Button
                  type="submit"
                  disabled={!stripe || loading}
                  className="w-full"
                  size="lg"
                >
                  {loading ? "Processing..." : `Pay $${amount}`}
                </Button>
              </form>
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
                <span>Tax (8%)</span>
                <span>${(total * 0.08).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${amount}</span>
              </div>
              <div className="text-xs text-muted-foreground text-center">
                Secure checkout powered by Stripe
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
