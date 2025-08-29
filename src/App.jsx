import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import BookCard from "./components/BookCard";
import BookModal from "./components/BookModal";

// Newly added components
import Navbar from "./components/Navbar";
import About from "./components/About";
import Cart from "./components/Cart";

export default function App() {
  // State management
  const [query, setQuery] = useState(""); // search text
  const [books, setBooks] = useState([]); // book list
  const [loading, setLoading] = useState(false); // loading spinner
  const [error, setError] = useState(""); // error message
  const [selectedBook, setSelectedBook] = useState(null); // for modal
  const [page, setPage] = useState("home"); // navigation state
  const [favorites, setFavorites] = useState(() => {
    // Load favorites from localStorage (if any)
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // Function to fetch books from OpenLibrary
  const searchBooks = async () => {
    if (!query.trim()) {
      setError("Please type a book title to search.");
      setBooks([]);
      return;
    }

    setLoading(true);
    setError("");
    setBooks([]);

    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?title=${query}&limit=20`
      );
      if (!res.ok) throw new Error("Network response was not ok");

      const data = await res.json();
      if (data.docs.length === 0) {
        setError("No books found. Try a different title.");
      } else {
        setBooks(data.docs);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Add/Remove favorites
  const toggleFavorite = (book) => {
    let updatedFavorites;
    if (favorites.find((fav) => fav.key === book.key)) {
      updatedFavorites = favorites.filter((fav) => fav.key !== book.key);
    } else {
      updatedFavorites = [...favorites, book];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6">
      {/* Navigation bar */}
      <Navbar setPage={setPage} />

      {/* Show page based on state */}
      {page === "home" && (
        <>
          {/* Hero Section */}
          <div className="text-center mt-8 mb-10">
            <h1 className="text-5xl font-extrabold text-gray-800 flex items-center justify-center gap-2">
              📚 Book Finder
            </h1>
            <p className="text-lg text-gray-600 mt-3">
              Discover your next favorite book instantly
            </p>

            {/* Search Input */}
            <div className="mt-6 max-w-2xl mx-auto">
              <SearchBar query={query} setQuery={setQuery} onSearch={searchBooks} />
            </div>
          </div>

          {/* Loading & Error */}
          {loading && <p className="mt-4 text-center">Loading...</p>}
          {error && <p className="mt-4 text-center text-red-600">{error}</p>}

          {/* Book List */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {books.map((b) => (
              <BookCard
                key={b.key}
                book={b}
                onClick={() => setSelectedBook(b)}
                toggleFavorite={toggleFavorite}
                isFavorite={favorites.some((fav) => fav.key === b.key)}
              />
            ))}
          </div>

          {/* No results */}
          {!loading && !error && books.length === 0 && query && (
            <p className="mt-4 text-center text-gray-600">No results to show.</p>
          )}
        </>
      )}

      {/* Favorites Page */}
      {page === "favorites" && (
        <div className="mt-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">⭐ Favorite Books</h2>
          {favorites.length === 0 ? (
            <p className="text-gray-600">No favorites yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {favorites.map((b) => (
                <BookCard
                  key={b.key}
                  book={b}
                  onClick={() => setSelectedBook(b)}
                  toggleFavorite={toggleFavorite}
                  isFavorite={true}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Cart Page */}
      {page === "cart" && <Cart />}

      {/* About Page */}
      {page === "about" && <About />}

      {/* Modal */}
      {selectedBook && (
        <BookModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          toggleFavorite={toggleFavorite}
          isFavorite={favorites.some((fav) => fav.key === selectedBook.key)}
        />
      )}
    </div>
  );
}
