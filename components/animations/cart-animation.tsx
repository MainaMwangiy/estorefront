"use client";

import { CartAnimationProps } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";

export function CartAnimation({ trigger, onComplete }: CartAnimationProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (trigger) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        onComplete?.();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [trigger, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="fixed top-4 right-4 z-50 bg-green-500 text-white p-3 rounded-full shadow-lg"
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: 1 }}
          >
            <ShoppingCart className="h-6 w-6" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
