"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Heart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppSelector } from "@/lib/hooks";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItemCount = useAppSelector((state) => state.cart.itemCount);
  const wishlistCount = useAppSelector((state) => state.wishlist.items.length);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 shadow-sm">
      <div className="relative w-full h-16 px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-green-600 to-blue-700 bg-clip-text text-transparent">
              EStoreFront
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-4 sm:space-x-6 text-sm font-medium">
            <Link href="/" className="transition-colors hover:text-primary">
              Products
            </Link>
          </nav>
        </div>

        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 sm:gap-3">
          <Link href="/wishlist">
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-accent/50 transition-colors"
            >
              <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
              {wishlistCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs font-semibold bg-primary text-primary-foreground rounded-full shadow-md transform transition-transform hover:scale-110">
                  {wishlistCount}
                </Badge>
              )}
            </Button>
          </Link>

          <Link href="/cart">
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-accent/50 transition-colors"
            >
              <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs font-semibold bg-primary text-primary-foreground rounded-full shadow-md transform transition-transform hover:scale-110">
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </Link>

          <Link href="/auth/login">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-accent/50 transition-colors"
            >
              <User className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:bg-accent/50 transition-colors"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      <div
        className={`md:hidden bg-background border-b transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <nav className="w-full px-4 sm:px-6 py-4 flex flex-col space-y-4">
          <Link
            href="/"
            className="text-base sm:text-lg font-medium hover:text-primary transition-colors"
            onClick={toggleMobileMenu}
          >
            Products
          </Link>
          <Link
            href="/wishlist"
            className="text-base sm:text-lg font-medium hover:text-primary transition-colors"
            onClick={toggleMobileMenu}
          >
            Wishlist
          </Link>
          <Link
            href="/cart"
            className="text-base sm:text-lg font-medium hover:text-primary transition-colors"
            onClick={toggleMobileMenu}
          >
            Cart
          </Link>
          <Link
            href="/auth/login"
            className="text-base sm:text-lg font-medium hover:text-primary transition-colors"
            onClick={toggleMobileMenu}
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
