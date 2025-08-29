// src/components/Cart.jsx
import React from "react";

export default function Cart() {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">🛒 Cart</h2>
      <p className="text-gray-600">
        This is your cart section. Right now it’s empty, but later you can add books here for purchase or wishlisting.
      </p>
    </div>
  );
}
