"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { clearCart } from "@/lib/reducers/cart/cart";
import { toast } from "sonner";

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
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
        <h2 className="text-2xl">You successfully sent</h2>

        <div className="bg-white p-2 rounded-md text-purple-500 mt-5 text-4xl font-bold">
          ${parseFloat(amount).toFixed(2)}
        </div>
      </div>
    </main>
  );
}
