"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, Minus } from "lucide-react";
import type { CartItem as CartItemType } from "@/types";
import { useAppDispatch } from "@/lib/hooks";
import { updateQuantity, removeFromCart } from "@/lib/reducers/cart/cart";
import { useState } from "react";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (newQuantity: number) => {
    console.log("Updating quantity for item:", item.id, "to", newQuantity);
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
    dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  return (
    <div className="flex items-center space-x-4 py-4 border-b">
      <div className="relative h-16 w-16 flex-shrink-0">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.title}
          fill
          className="object-cover rounded-md"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium line-clamp-2">{item.title}</h3>
        <p className="text-sm text-muted-foreground capitalize">
          {item.category}
        </p>
        <p className="text-sm font-semibold">${item.price.toFixed(2)}</p>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleQuantityChange(quantity - 1)}
          disabled={quantity <= 1}
        >
          <Minus className="h-3 w-3" />
        </Button>

        <Input
          type="number"
          value={quantity}
          onChange={(e) =>
            handleQuantityChange(Number.parseInt(e.target.value) || 1)
          }
          className="w-16 h-8 text-center"
          min="1"
        />

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleQuantityChange(quantity + 1)}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>

      <div className="text-right">
        <p className="text-sm font-semibold">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRemove}
          className="text-red-500 hover:text-red-700 p-1"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
