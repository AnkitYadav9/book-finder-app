
import React from "react";

export default function About() {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">About This Website</h2>
      <p className="text-gray-600 leading-relaxed">
        This Book Finder app helps users discover books instantly using the{" "}
        <a
          href="https://openlibrary.org/developers/api"
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 underline"
        >
          Open Library API
        </a>.  
        <br />
        You can search for books by title, view details, and save your favorites.  
        Additional features include a favorites section, a cart for future ideas,
        and a clean user-friendly design.
      </p>
    </div>
  );
}
