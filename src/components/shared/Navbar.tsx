"use client";

import { useState } from "react";
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

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { isAuthenticated } = useSelector(
    (appState: AppState) => appState.auth,
  );
  const { numOfCartItems } = useAppSelector((state) => state.cart);
  const { count } = useAppSelector((state) => state.wishlist);
  const { Logout } = useLogout();
  return (
    <header className="w-full font-sans sticky top-0 z-50">
      {/* Top Bar - Hidden on mobile - NOT STICKY */}
      <div className="hidden lg:block bg-white py-1 text-xs text-gray-600 border-b border-gray-200 ">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <FontAwesomeIcon icon={faPhone} />
              <a href="tel:+1 (800) 123-4567"> +1 (800) 123-4567</a>
            </span>
            <span className="flex items-center gap-1">
              <FontAwesomeIcon icon={faEnvelope} />
              <a href="mailto:support@freshcart.com">support@freshcart.com</a>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/allorders"
              className="hover:text-green-600 transition-colors"
            >
              Track Order
            </Link>
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
            <div className="hidden md:block flex-1 max-w-xl lg:max-w-2xl mx-4 lg:mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full px-5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:shadow-green-600 focus:ring-1 focus:ring-green-600 text-sm lg:text-base placeholder-gray-400"
                />
                <button className="absolute right-0 top-0 h-full px-4 text-white cursor-pointer bg-green-600 hover:bg-green-700 transition-colors border-l border-gray-300 rounded-r-lg">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-4 lg:gap-6 shrink-0">
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
              {isAuthenticated ? (
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
                className="lg:hidden text-2xl text-white px-2 py-[3px] bg-green-600 hover:bg-green-700 rounded-xl"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Bar - Hidden on Mobile */}
        <div className="hidden lg:block py-2 bg-gray-100 ">
          <div className="container mx-auto px-4 flex items-center gap-8">
            <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg flex items-center gap-2 font-medium transition-colors text-sm">
              <FontAwesomeIcon icon={faBars} />
              All Categories
              <FontAwesomeIcon icon={faAngleDown} className="ml-2 text-xs" />
            </button>

            <nav className="flex items-center gap-6 xl:gap-8 font-medium text-gray-700 text-sm">
              <Link href="/" className="hover:text-[#0aad0a] transition-colors">
                Home
              </Link>
              <Link href="#" className="hover:text-[#0aad0a] transition-colors">
                Shop
              </Link>
              <Link href="#" className="hover:text-[#0aad0a] transition-colors">
                Deals
              </Link>
              <Link href="#" className="hover:text-[#0aad0a] transition-colors">
                New Arrivals
              </Link>
              <Link href="#" className="hover:text-[#0aad0a] transition-colors">
                Brands
              </Link>
              <Link href="#" className="hover:text-[#0aad0a] transition-colors">
                Recipes
              </Link>
            </nav>
          </div>
        </div>
      </div>
      {/* STICKY SECTION ENDS HERE */}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden font-sans">
          <div
            className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`}
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <nav
            className={`fixed top-0 right-0 bottom-0 w-[75%] bg-white z-50 overflow-y-auto shadow-xl transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-6">
                <Image src={freshCartLogo} alt="FreshCart Logo" />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-gray-100 w-8 h-8 rounded-full text-gray-500 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <FontAwesomeIcon icon={faTimes} className="text-sm" />
                </button>
              </div>

              <div className="relative mb-6 md:hidden">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0aad0a] text-sm"
                />
                <button className="absolute right-0 top-0 h-full w-10 text-white bg-[#0aad0a] rounded-r-lg flex items-center justify-center">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>

              <div className="space-y-6 mb-8 md:border-t md:border-gray-100 md:py-4">
                <Link
                  href="#"
                  className="flex items-center gap-3 text-gray-600 hover:text-[#0aad0a] transition-colors"
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
                  href="#"
                  className="flex items-center gap-3 text-gray-600 hover:text-[#0aad0a] transition-colors"
                >
                  <div className=" relative w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-[#0aad0a]">
                    <FontAwesomeIcon
                      icon={faShoppingCart}
                      className="text-md"
                    />
                    {numOfCartItems > 0 && (
                      <span className="absolute -top-2 -right-2 bg-[#0aad0a] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        {numOfCartItems}
                      </span>
                    )}
                  </div>
                  Cart
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 text-gray-600 hover:text-[#0aad0a] transition-colors"
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
                >
                  Home
                </Link>
                <Link
                  href="#"
                  className="block text-gray-800 hover:text-[#0aad0a] font-medium transition-colors text-base"
                >
                  Shop
                </Link>
                <Link
                  href="#"
                  className="block text-gray-800 hover:text-[#0aad0a] font-medium transition-colors text-base"
                >
                  Categories
                </Link>
                <Link
                  href="#"
                  className="block text-gray-800 hover:text-[#0aad0a] font-medium transition-colors text-base"
                >
                  Brands
                </Link>
              </div>

              {isAuthenticated ? (
                <div className="mt-4 w-full mx-auto">
                  <button
                    className="flex-1 bg-red-700 text-white py-2 w-full rounded-lg font-medium hover:bg-red-800 transition-colors"
                    onClick={Logout}
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <div className="mt-4 flex gap-3 flex-col md:flex-row">
                  <button className="w-full md:w-auto flex-1 bg-[#0aad0a] text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                    Sign In
                  </button>
                  <button className="w-full md:w-auto flex-1 border border-[#0aad0a] text-[#0aad0a] py-2 rounded-lg font-medium hover:bg-green-50 transition-colors">
                    Sign Up
                  </button>
                </div>
              )}

              <div className="mt-8 bg-gray-50 p-4 rounded-lg flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#0aad0a] shadow-sm shrink-0">
                  <FontAwesomeIcon icon={faHeadset} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    Need Help?
                  </div>
                  <div className="text-sm text-[#0aad0a] cursor-pointer hover:underline font-medium">
                    Contact Support
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
