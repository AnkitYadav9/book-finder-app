// src/components/Navbar.jsx
import React from "react";

export default function Navbar({ setPage }) {
  return (
    <nav className="bg-white shadow-md rounded-2xl p-4 flex justify-between items-center mb-8">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-gray-800">📚 Book Finder</h1>

      {/* Links */}
      <div className="flex gap-6 text-gray-700 font-medium">
        <button onClick={() => setPage("home")} className="hover:text-blue-600">
          Home
        </button>
        <button
          onClick={() => setPage("favorites")}
          className="hover:text-blue-600"
        >
          Favorites
        </button>
        <button onClick={() => setPage("cart")} className="hover:text-blue-600">
          Cart
        </button>
        <button
          onClick={() => setPage("about")}
          className="hover:text-blue-600"
        >
          About
        </button>
      </div>
    </nav>
  );
}
