import React from "react";

export default function BookModal({ book, onClose, toggleFavorite, isFavorite }) {
  const coverId = book.cover_i;
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
    : "https://via.placeholder.com/300x400?text=No+Cover";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl font-bold"
        >
          ✕
        </button>

        {/* Book Details */}
        <img src={coverUrl} alt={book.title} className="w-40 mx-auto mb-4" />
        <h2 className="text-xl font-semibold">{book.title}</h2>
        <p className="text-gray-600">
          Author: {book.author_name ? book.author_name.join(", ") : "Unknown"}
        </p>
        <p>First Published: {book.first_publish_year || "N/A"}</p>
        <p>Publisher: {book.publisher ? book.publisher[0] : "N/A"}</p>

        {/* Favorite Button */}
        <button
          onClick={() => toggleFavorite(book)}
          className={`mt-4 px-4 py-2 rounded ${
            isFavorite ? "bg-yellow-400" : "bg-gray-300"
          }`}
        >
          {isFavorite ? "★ Remove Favorite" : "☆ Add to Favorites"}
        </button>

        {/*  Purchase Button */}
        <a
          href={`https://www.amazon.in/s?k=${encodeURIComponent(book.title)}+${encodeURIComponent(
            book.author_name ? book.author_name[0] : ""
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 ml-3 inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          🛒 Purchase
        </a>
      </div>
    </div>
  );
}
