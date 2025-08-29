import React from "react";

export default function BookCard({ book, onClick, toggleFavorite, isFavorite }) {
  const coverId = book.cover_i;
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : "https://via.placeholder.com/150x200?text=No+Cover";

  return (
    <div className="border rounded-lg p-3 shadow hover:shadow-lg transition relative">
      {/* Book Cover */}
      <img
        src={coverUrl}
        alt={book.title}
        className="w-full h-48 object-cover rounded mb-3 cursor-pointer"
        onClick={onClick}
      />

      {/* Book Title */}
      <h3 className="font-semibold line-clamp-1">{book.title}</h3>
      <p className="text-sm text-gray-600">
        {book.author_name ? book.author_name.join(", ") : "Unknown Author"}
      </p>
      <p className="text-xs text-gray-500">
        {book.first_publish_year || "N/A"}
      </p>

      {/* Favorite Button */}
      <button
        onClick={() => toggleFavorite(book)}
        className={`absolute top-2 right-2 px-2 py-1 text-xs rounded ${
          isFavorite ? "bg-yellow-400" : "bg-gray-200"
        }`}
      >
        {isFavorite ? "★" : "☆"}
      </button>

      {/* Purchase Button */}
      <a
        href={`https://www.amazon.in/s?k=${encodeURIComponent(book.title)}+${encodeURIComponent(
          book.author_name ? book.author_name[0] : ""
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-block px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
      >
        Buy
      </a>
    </div>
  );
}

