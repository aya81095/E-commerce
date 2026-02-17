"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faSearch,
  faHeart,
  faShoppingCart,
  faUser,
  faBars,
  faAngleDown,
  faTimes,
  faHeadset,
  faRightToBracket,
  faUserPlus,
  faAddressCard,
} from "@fortawesome/free-solid-svg-icons";
import freshCartLogo from "../../assets/images/freshcart-logo.svg";
import Image from "next/image";
import { useSelector } from "react-redux";
import { AppState, useAppSelector } from "../../store/store";
import useLogout from "../../features/auth/hooks/useLogout";
import { searchProducts } from "../../features/products/server/products.actions";
import { Product } from "../../features/products/types/product.type";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { getAllBrands } from "../../features/brands/server/brands.actions";
import { Brand } from "../../features/brands/types/brand.types";
import { getAllCategories } from "../../features/categories/server/categories.actions";
import { Category } from "../../features/categories/types/category.type";
import { is } from "zod/v4/locales";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Desktop search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Mobile search state
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");
  const [mobileSearchResults, setMobileSearchResults] = useState<Product[]>([]);
  const [isMobileSearching, setIsMobileSearching] = useState(false);
  const [showMobileResults, setShowMobileResults] = useState(false);
  const [mobileSelectedIndex, setMobileSelectedIndex] = useState(-1);

  const searchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const mobileDebounceTimeout = useRef<NodeJS.Timeout | null>(null);

  // Brands state
  const [brands, setBrands] = useState<Brand[]>([]);
  const [showBrandsDropdown, setShowBrandsDropdown] = useState(false);
  const [isLoadingBrands, setIsLoadingBrands] = useState(false);
  const brandsRef = useRef<HTMLDivElement>(null);

  // Categories state
  const [categories, setCategories] = useState<Category[]>([]);
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const categoriesRef = useRef<HTMLDivElement>(null);

  const { isAuthenticated } = useSelector(
    (appState: AppState) => appState.auth,
  );
  const { numOfCartItems } = useAppSelector((state) => state.cart);
  const { count } = useAppSelector((state) => state.wishlist);
  const { Logout } = useLogout();

  // Desktop search function
  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    console.log("[Desktop] Searching for:", query.trim());
    setIsSearching(true);
    try {
      const response = await searchProducts(query.trim());
      console.log("[Desktop] Search response:", response);
      console.log("[Desktop] Number of results:", response.data?.length);
      setSearchResults(response.data || []);
      setShowResults(true);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Mobile search function
  const performMobileSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setMobileSearchResults([]);
      setShowMobileResults(false);
      return;
    }

    console.log("[Mobile] Searching for:", query.trim());
    setIsMobileSearching(true);
    try {
      const response = await searchProducts(query.trim());
      console.log("[Mobile] Search response:", response);
      console.log("[Mobile] Number of results:", response.data?.length);
      setMobileSearchResults(response.data || []);
      setShowMobileResults(true);
    } catch (error) {
      console.error("Search error:", error);
      setMobileSearchResults([]);
    } finally {
      setIsMobileSearching(false);
    }
  }, []);

  // Desktop search input handler
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setSelectedIndex(-1);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      performSearch(value);
    }, 300);
  };

  // Mobile search input handler
  const handleMobileSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMobileSearchQuery(value);
    setMobileSelectedIndex(-1);

    if (mobileDebounceTimeout.current) {
      clearTimeout(mobileDebounceTimeout.current);
    }

    mobileDebounceTimeout.current = setTimeout(() => {
      performMobileSearch(value);
    }, 300);
  };

  // Desktop keyboard navigation
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
        break;
      case "Enter":
        if (selectedIndex >= 0 && searchResults[selectedIndex]) {
          window.location.href = `/products/${searchResults[selectedIndex]._id}`;
        }
        break;
    }
  };

  // Mobile keyboard navigation
  const handleMobileKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showMobileResults || mobileSearchResults.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setMobileSelectedIndex((prev) =>
          prev < mobileSearchResults.length - 1 ? prev + 1 : prev,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setMobileSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Escape":
        setShowMobileResults(false);
        setMobileSelectedIndex(-1);
        break;
      case "Enter":
        if (
          mobileSelectedIndex >= 0 &&
          mobileSearchResults[mobileSelectedIndex]
        ) {
          window.location.href = `/products/${mobileSearchResults[mobileSelectedIndex]._id}`;
        }
        break;
    }
  };

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
        setSelectedIndex(-1);
      }
      if (
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(event.target as Node)
      ) {
        setShowMobileResults(false);
        setMobileSelectedIndex(-1);
      }
      if (
        brandsRef.current &&
        !brandsRef.current.contains(event.target as Node)
      ) {
        setShowBrandsDropdown(false);
      }
      if (
        categoriesRef.current &&
        !categoriesRef.current.contains(event.target as Node)
      ) {
        setShowCategoriesDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch brands function
  const fetchBrands = useCallback(async () => {
    if (brands.length > 0) {
      // Already fetched
      setShowBrandsDropdown(true);
      return;
    }

    setIsLoadingBrands(true);
    try {
      const response = await getAllBrands(20); // Get top 20 brands
      setBrands(response.data || []);
      setShowBrandsDropdown(true);
    } catch (error) {
      console.error("Error fetching brands:", error);
    } finally {
      setIsLoadingBrands(false);
    }
  }, [brands.length]);

  // Handle brands click
  const handleBrandsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (showBrandsDropdown) {
      setShowBrandsDropdown(false);
    } else {
      fetchBrands();
    }
  };

  // Fetch categories function
  const fetchCategories = useCallback(async () => {
    if (categories.length > 0) {
      // Already fetched
      setShowCategoriesDropdown(true);
      return;
    }

    setIsLoadingCategories(true);
    try {
      const response = await getAllCategories();
      setCategories(response.data || []);
      setShowCategoriesDropdown(true);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoadingCategories(false);
    }
  }, [categories.length]);

  // Handle categories click
  const handleCategoriesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (showCategoriesDropdown) {
      setShowCategoriesDropdown(false);
    } else {
      fetchCategories();
    }
  };

  // Handle mobile menu animation
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="w-full font-sans sticky top-0 z-50">
      {/* STICKY SECTION STARTS HERE */}
      <div className="bg-white shadow-sm ">
        {/* Main Header */}
        <div className="py-3 lg:py-2.5 border-b border-gray-200 ">
          <div className="container mx-auto px-4 flex items-center justify-between gap-4">
            {/* Logo */}
            <Link
              href="/"
              className="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center gap-1 shrink-0"
            >
              <Image src={freshCartLogo} alt="FreshCart Logo" />
            </Link>

            {/* Search Bar - Hidden on small mobile, visible on md+ */}
            <div
              className="hidden md:block flex-1 max-w-xl lg:max-w-2xl mx-4 lg:mx-8"
              ref={searchRef}
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                  onFocus={() => searchQuery && setShowResults(true)}
                  className="w-full px-5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:shadow-green-600 focus:ring-1 focus:ring-green-600 text-sm lg:text-base placeholder-gray-400"
                />
                <button
                  onClick={() => searchQuery && performSearch(searchQuery)}
                  className="absolute right-0 top-0 h-full px-4 text-white cursor-pointer bg-green-600 hover:bg-green-700 transition-colors border-l border-gray-300 rounded-r-lg"
                >
                  {isSearching ? (
                    <FontAwesomeIcon
                      icon={faSpinner}
                      className="animate-spin"
                    />
                  ) : (
                    <FontAwesomeIcon icon={faSearch} />
                  )}
                </button>
              </div>

              {/* Desktop Search Results Dropdown */}
              {showResults && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                  {isSearching ? (
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
                      <p className="text-sm">
                        Try searching with different keywords
                      </p>
                    </div>
                  ) : null}
                </div>
              )}
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-4 lg:gap-6 shrink-0">
              {isAuthenticated ? (
                <>
                  <Link
                    href="/wishlist"
                    className="text-center group hidden lg:block"
                  >
                    <div className="relative">
                      <FontAwesomeIcon
                        icon={faHeart}
                        className="text-lg text-gray-600 group-hover:text-[#0aad0a] transition-colors"
                      />
                      {count > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-400 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                          {count}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-600 group-hover:text-[#0aad0a] block mt-1 transition-colors">
                      Wishlist
                    </span>
                  </Link>
                  <Link
                    href="/cart"
                    className="text-center group relative hidden lg:block"
                  >
                    <div className="relative">
                      <FontAwesomeIcon
                        icon={faShoppingCart}
                        className="text-lg text-gray-600 group-hover:text-[#0aad0a] transition-colors"
                      />
                      {numOfCartItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-[#0aad0a] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                          {numOfCartItems}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-600 group-hover:text-[#0aad0a] block mt-1 transition-colors">
                      Cart
                    </span>
                  </Link>
                  <Link
                    href="/profile"
                    className="text-center group hidden lg:block"
                  >
                    <div className="relative">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="text-lg text-gray-600 group-hover:text-[#0aad0a] transition-colors"
                      />
                    </div>
                    <span className="text-xs text-gray-600 group-hover:text-[#0aad0a] block mt-1 transition-colors">
                      Account
                    </span>
                  </Link>
                  <Link
                    href="#"
                    className="text-center group hidden lg:block"
                    onClick={Logout}
                  >
                    <div className="relative">
                      <FontAwesomeIcon
                        icon={faRightToBracket}
                        className="text-lg text-gray-600 group-hover:text-[#0aad0a] transition-colors"
                      />
                    </div>
                    <span className="text-xs text-gray-600 group-hover:text-[#0aad0a] block mt-1 transition-colors">
                      Logout
                    </span>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/signup"
                    className="text-center group hidden lg:block"
                  >
                    <div className="relative">
                      <FontAwesomeIcon
                        icon={faUserPlus}
                        className="text-lg text-gray-600 group-hover:text-[#0aad0a] transition-colors"
                      />
                    </div>
                    <span className="text-xs text-gray-600 group-hover:text-[#0aad0a] block mt-1 transition-colors">
                      Signup
                    </span>
                  </Link>
                  <Link
                    href="/login"
                    className="text-center group hidden lg:block"
                  >
                    <div className="relative">
                      <FontAwesomeIcon
                        icon={faAddressCard}
                        className="text-lg text-gray-600 group-hover:text-[#0aad0a] transition-colors"
                      />
                    </div>
                    <span className="text-xs text-gray-600 group-hover:text-[#0aad0a] block mt-1 transition-colors">
                      Login
                    </span>
                  </Link>
                </>
              )}

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden text-2xl text-white px-2 py-[3px] bg-green-600 hover:bg-green-700 rounded-xl cursor-pointer transition-colors"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Bar - Hidden on Mobile */}
        <div className="hidden lg:block py-2 bg-gray-100">
          <div className="container mx-auto px-4 flex items-center gap-8 justify-between">
            <div className="flex gap-8">
              {/* All Categories Dropdown */}
              <div className="relative" ref={categoriesRef}>
                <button
                  onClick={handleCategoriesClick}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg flex items-center gap-2 font-medium transition-colors text-sm"
                >
                  <FontAwesomeIcon icon={faBars} />
                  All Categories
                  <FontAwesomeIcon
                    icon={faAngleDown}
                    className="ml-2 text-xs"
                  />
                </button>

                {/* Categories Dropdown Menu */}
                {showCategoriesDropdown && (
                  <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-64 max-h-96 overflow-y-auto z-50">
                    {isLoadingCategories ? (
                      <div className="p-6 text-center text-gray-500">
                        <FontAwesomeIcon
                          icon={faSpinner}
                          className="animate-spin text-xl mb-2"
                        />
                        <p className="text-sm">Loading categories...</p>
                      </div>
                    ) : categories.length > 0 ? (
                      <div className="py-2">
                        {categories.map((category) => (
                          <Link
                            key={category._id}
                            href={`/categories/${category._id}`}
                            onClick={() => setShowCategoriesDropdown(false)}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                          >
                            <div className="relative w-12 h-12 shrink-0">
                              <Image
                                src={category.image}
                                alt={category.name}
                                fill
                                className="object-cover rounded"
                                sizes="48px"
                              />
                            </div>
                            <span className="text-sm font-medium text-gray-900">
                              {category.name}
                            </span>
                          </Link>
                        ))}
                        <Link
                          href="/categories"
                          onClick={() => setShowCategoriesDropdown(false)}
                          className="block px-4 py-3 text-center text-sm font-semibold text-green-600 hover:bg-gray-50 border-t border-gray-200"
                        >
                          View All Categories
                        </Link>
                      </div>
                    ) : (
                      <div className="p-6 text-center text-gray-500">
                        <p className="text-sm">No categories available</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <nav className="flex items-center gap-6 xl:gap-8 font-medium text-gray-700 text-sm">
                <Link
                  href="/"
                  className="hover:text-[#0aad0a] transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/products"
                  className="hover:text-[#0aad0a] transition-colors"
                >
                  Shop
                </Link>

                {/* Brands Dropdown */}
                <div className="relative" ref={brandsRef}>
                  <button
                    onClick={handleBrandsClick}
                    className="hover:text-[#0aad0a] transition-colors flex items-center gap-1"
                  >
                    Brands
                    <FontAwesomeIcon icon={faAngleDown} className="text-xs" />
                  </button>

                  {/* Brands Dropdown Menu */}
                  {showBrandsDropdown && (
                    <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-64 max-h-96 overflow-y-auto z-50">
                      {isLoadingBrands ? (
                        <div className="p-6 text-center text-gray-500">
                          <FontAwesomeIcon
                            icon={faSpinner}
                            className="animate-spin text-xl mb-2"
                          />
                          <p className="text-sm">Loading brands...</p>
                        </div>
                      ) : brands.length > 0 ? (
                        <div className="py-2">
                          {brands.map((brand) => (
                            <Link
                              key={brand._id}
                              href={`/brands/${brand._id}`}
                              onClick={() => setShowBrandsDropdown(false)}
                              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                            >
                              <div className="relative w-12 h-12 shrink-0">
                                <Image
                                  src={brand.image}
                                  alt={brand.name}
                                  fill
                                  className="object-contain"
                                  sizes="48px"
                                />
                              </div>
                              <span className="text-sm font-medium text-gray-900">
                                {brand.name}
                              </span>
                            </Link>
                          ))}
                          <Link
                            href="/brands"
                            onClick={() => setShowBrandsDropdown(false)}
                            className="block px-4 py-3 text-center text-sm font-semibold text-green-600 hover:bg-gray-50 border-t border-gray-200"
                          >
                            View All Brands
                          </Link>
                        </div>
                      ) : (
                        <div className="p-6 text-center text-gray-500">
                          <p className="text-sm">No brands available</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </nav>
            </div>
            <div className="flex items-center gap-4 text-gray-700 text-sm">
              {isAuthenticated && (
                <Link
                  href="/orders"
                  className="hover:text-green-600 transition-colors"
                >
                  Track Order
                </Link>
              )}
              <Link
                href="/about"
                className="hover:text-green-600 transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="hover:text-green-600 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* STICKY SECTION ENDS HERE */}

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 lg:hidden font-sans transition-all duration-500 ${isMobileMenuOpen ? "visible" : "invisible pointer-events-none"}`}
      >
        <div
          className={`fixed inset-0 bg-black/50 transition-opacity duration-500 ease-out ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <nav
          className={`fixed top-0 right-0 bottom-0 w-[75%] bg-white z-50 overflow-y-auto shadow-xl transition-transform duration-500 ease-out ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="p-4">
            <div className="flex justify-between items-center mb-6">
              <Image src={freshCartLogo} alt="FreshCart Logo" />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-gray-100 w-8 h-8 rounded-full text-gray-500 hover:bg-gray-200 flex items-center justify-center transition-colors cursor-pointer"
              >
                <FontAwesomeIcon icon={faTimes} className="text-sm" />
              </button>
            </div>

            <div className="relative mb-6 md:hidden" ref={mobileSearchRef}>
              <input
                type="text"
                placeholder="Search products..."
                value={mobileSearchQuery}
                onChange={handleMobileSearchChange}
                onKeyDown={handleMobileKeyDown}
                onFocus={() => mobileSearchQuery && setShowMobileResults(true)}
                className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0aad0a] text-sm"
              />
              <button
                onClick={() =>
                  mobileSearchQuery && performMobileSearch(mobileSearchQuery)
                }
                className="absolute right-0 top-0 h-full w-10 text-white bg-[#0aad0a] rounded-r-lg flex items-center justify-center"
              >
                {isMobileSearching ? (
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                ) : (
                  <FontAwesomeIcon icon={faSearch} />
                )}
              </button>

              {/* Mobile Search Results Dropdown */}
              {showMobileResults && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-80 overflow-y-auto z-50">
                  {isMobileSearching ? (
                    <div className="p-6 text-center text-gray-500">
                      <FontAwesomeIcon
                        icon={faSpinner}
                        className="animate-spin text-xl mb-2"
                      />
                      <p className="text-sm">Searching...</p>
                    </div>
                  ) : mobileSearchResults.length > 0 ? (
                    <div className="py-2">
                      {mobileSearchResults.map((product, index) => (
                        <Link
                          key={product._id}
                          href={`/products/${product._id}`}
                          onClick={() => {
                            setShowMobileResults(false);
                            setMobileSearchQuery("");
                            setIsMobileMenuOpen(false);
                          }}
                          className={`flex items-center gap-3 px-3 py-2 hover:bg-gray-50 transition-colors ${
                            index === mobileSelectedIndex ? "bg-gray-100" : ""
                          }`}
                        >
                          <div className="relative w-10 h-10 shrink-0">
                            <Image
                              src={product.imageCover}
                              alt={product.title}
                              fill
                              className="object-cover rounded"
                              sizes="40px"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-medium text-gray-900 truncate">
                              {product.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-xs font-bold text-green-600">
                                ${product.priceAfterDiscount || product.price}
                              </span>
                              {product.priceAfterDiscount && (
                                <span className="text-[10px] text-gray-400 line-through">
                                  ${product.price}
                                </span>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : mobileSearchQuery ? (
                    <div className="p-6 text-center text-gray-500">
                      <p className="text-sm mb-1">No products found</p>
                      <p className="text-xs">Try different keywords</p>
                    </div>
                  ) : null}
                </div>
              )}
            </div>

            <div className="space-y-6 mb-8 md:border-t md:border-gray-100 md:py-4">
              <Link
                href="/wishlist"
                className="flex items-center gap-3 text-gray-600 hover:text-[#0aad0a] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="relative w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                  <FontAwesomeIcon icon={faHeart} className="text-md" />
                  {count > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-400 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {count}
                    </span>
                  )}
                </div>
                Wishlist
              </Link>
              <Link
                href="/cart"
                className="flex items-center gap-3 text-gray-600 hover:text-[#0aad0a] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className=" relative w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-[#0aad0a]">
                  <FontAwesomeIcon icon={faShoppingCart} className="text-md" />
                  {numOfCartItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#0aad0a] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {numOfCartItems}
                    </span>
                  )}
                </div>
                Cart
              </Link>
              <Link
                href="/profile"
                className="flex items-center gap-3 text-gray-600 hover:text-[#0aad0a] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-[#0aad0a]">
                  <FontAwesomeIcon icon={faUser} className="text-md" />
                </div>
                Account
              </Link>
            </div>

            <div className="border-t border-gray-100 py-4 space-y-4 ">
              <Link
                href="/"
                className="block text-gray-800 hover:text-[#0aad0a] font-medium transition-colors text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/products"
                className="block text-gray-800 hover:text-[#0aad0a] font-medium transition-colors text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="/categories"
                className="block text-gray-800 hover:text-[#0aad0a] font-medium transition-colors text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                href="/brands"
                className="block text-gray-800 hover:text-[#0aad0a] font-medium transition-colors text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Brands
              </Link>
              <Link
                href="/orders"
                className="block text-gray-800 hover:text-[#0aad0a] font-medium transition-colors text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Track Order
              </Link>
              <Link
                href="/about"
                className="block text-gray-800 hover:text-[#0aad0a] font-medium transition-colors text-base border-t border-gray-100 pt-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block text-gray-800 hover:text-[#0aad0a] font-medium transition-colors text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/privacy-policy"
                className="block text-gray-800 hover:text-[#0aad0a] font-medium transition-colors text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="block text-gray-800 hover:text-[#0aad0a] font-medium transition-colors text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Terms of Service
              </Link>
            </div>

            {isAuthenticated ? (
              <div className="mt-4 w-full mx-auto">
                <button
                  className="flex-1 bg-red-700 text-white py-2 w-full rounded-lg font-medium hover:bg-red-800 transition-colors"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    Logout();
                  }}
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="mt-4 flex gap-3 flex-col md:flex-row">
                <Link
                  href="/login"
                  className="text-center w-full md:w-auto flex-1 bg-[#0aad0a] text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="text-center w-full md:w-auto flex-1 border border-[#0aad0a] text-[#0aad0a] py-2 rounded-lg font-medium hover:bg-green-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}

            <div className="mt-8 bg-gray-50 p-4 rounded-lg flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#0aad0a] shadow-sm shrink-0">
                <FontAwesomeIcon icon={faHeadset} />
              </div>
              <Link
                href="/contact"
                className="flex-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="text-sm font-semibold text-gray-900">
                  Need Help?
                </div>
                <div className="text-sm text-[#0aad0a] cursor-pointer hover:underline font-medium">
                  Contact Support
                </div>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
