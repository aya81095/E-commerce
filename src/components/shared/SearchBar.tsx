"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faSpinner,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { searchProducts } from "../../features/products/server/products.actions";
import { Product } from "../../features/products/types/product.type";
import Link from "next/link";
import Image from "next/image";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  // Debounced search function
  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await searchProducts(query.trim());
      setSearchResults(response.data || []);
      setShowResults(true);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Handle input change with debounce
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setSelectedIndex(-1);

    // Clear previous timeout
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Set new timeout for debounced search
    debounceTimeout.current = setTimeout(() => {
      performSearch(value);
    }, 300);
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showResults || searchResults.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < searchResults.length - 1 ? prev + 1 : prev,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Escape":
        setShowResults(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
      case "Enter":
        if (selectedIndex >= 0 && searchResults[selectedIndex]) {
          window.location.href = `/products/${searchResults[selectedIndex]._id}`;
        }
        break;
    }
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  return (
    <div
      className="relative flex-1 max-w-xl lg:max-w-2xl mx-4 lg:mx-8"
      ref={searchRef}
    >
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => searchQuery && setShowResults(true)}
          className="w-full px-5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:shadow-green-600 focus:ring-1 focus:ring-green-600 text-sm lg:text-base placeholder-gray-400"
        />

        {/* Clear Button */}
        {searchQuery && (
          <button
            onClick={handleClearSearch}
            className="absolute right-14 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}

        {/* Search Button */}
        <button
          onClick={() => searchQuery && performSearch(searchQuery)}
          className="absolute right-0 top-0 h-full px-4 text-white cursor-pointer bg-green-600 hover:bg-green-700 transition-colors border-l border-gray-300 rounded-r-lg"
          aria-label="Search"
        >
          {isLoading ? (
            <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
          ) : (
            <FontAwesomeIcon icon={faSearch} />
          )}
        </button>
      </div>

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
          {isLoading ? (
            <div className="p-8 text-center text-gray-500">
              <FontAwesomeIcon
                icon={faSpinner}
                className="animate-spin text-2xl mb-2"
              />
              <p>Searching...</p>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="py-2">
              {searchResults.map((product, index) => (
                <Link
                  key={product._id}
                  href={`/products/${product._id}`}
                  onClick={() => {
                    setShowResults(false);
                    setSearchQuery("");
                  }}
                  className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${
                    index === selectedIndex ? "bg-gray-100" : ""
                  }`}
                >
                  <div className="relative w-12 h-12 shrink-0">
                    <Image
                      src={product.imageCover}
                      alt={product.title}
                      fill
                      className="object-cover rounded"
                      sizes="48px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {product.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-bold text-green-600">
                        ${product.priceAfterDiscount || product.price}
                      </span>
                      {product.priceAfterDiscount && (
                        <span className="text-xs text-gray-400 line-through">
                          ${product.price}
                        </span>
                      )}
                    </div>
                  </div>
                  {product.ratingsAverage && (
                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-yellow-500">★</span>
                      <span className="text-gray-600">
                        {product.ratingsAverage.toFixed(1)}
                      </span>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          ) : searchQuery ? (
            <div className="p-8 text-center text-gray-500">
              <p className="text-lg mb-1">No products found</p>
              <p className="text-sm">Try searching with different keywords</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
