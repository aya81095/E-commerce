"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPlus,
  faSpinner,
  faStar,
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";
import { Product } from "../types/product.type";
import Link from "next/link";
import { toast } from "react-toastify";
import {
  addProductToCart,
  getLoggedUserCart,
} from "../../cart/server/cart.actions";
import { setCartInfo } from "../../cart/store/cart.slice";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { useState } from "react";
import {
  addProductToWishlist,
  getLoggedUserWishlist,
  removeProductFromWishlist,
} from "../../wishlist/server/wishlist.actions";
import { setWishlistInfo } from "../../wishlist/store/wishlist.slice";
export default function ProductCard({ productInfo }: { productInfo: Product }) {
  const isSale = productInfo.priceAfterDiscount
    ? productInfo.priceAfterDiscount < productInfo.price
    : false;
  const discountPercentage = productInfo.priceAfterDiscount
    ? Math.round(
        ((productInfo.price - productInfo.priceAfterDiscount) /
          productInfo.price) *
          100,
      )
    : 0;
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [wishLoading, setWishLoading] = useState(false);
  const wishlistData = useAppSelector((s) => s.wishlist.data || []);
  const isInWishlist = wishlistData.some(
    (it) => (it.id || it._id) === productInfo.id || it._id === productInfo.id,
  );

  const toggleWishlist = async () => {
    if (wishLoading) return;
    setWishLoading(true);
    try {
      if (isInWishlist) {
        await removeProductFromWishlist({ productId: productInfo.id });
        toast.success("Removed from wishlist");
      } else {
        await addProductToWishlist({ productId: productInfo.id });
        toast.success("Added to wishlist");
      }
      try {
        const wl = await getLoggedUserWishlist();
        dispatch(setWishlistInfo(wl));
      } catch (err) {
        // ignore refresh error
      }
    } catch (err) {
      console.error(err);
      toast.error("Please login to manage wishlist");
    } finally {
      setWishLoading(false);
    }
  };
  const handleAddToCart = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await addProductToCart({ productId: productInfo.id });
      console.log(response);
      if (response.status === "success") {
        toast.success(response.message);
        const cartInfo = await getLoggedUserCart();
        dispatch(setCartInfo(cartInfo));
      }
    } catch (error) {
      console.log(error);
      toast.error("Login first to add products to your cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-white border border-gray-200 rounded-2xl px-3 pb-4 relative group hover:shadow-lg transition">
        {/* Hover Icons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 transition z-10">
          <button
            disabled={wishLoading}
            onClick={toggleWishlist}
            className="w-8 h-8 rounded-full bg-white text-gray-500 hover:text-red-500 shadow-sm hover:shadow-md flex items-center justify-center transition"
          >
            {wishLoading ? (
              <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
            ) : (
              <FontAwesomeIcon
                icon={isInWishlist ? faHeartSolid : faHeart}
                className={`transition-colors ${isInWishlist ? "text-red-500" : "text-gray-500 "} hover:text-red-500`}
              />
            )}
          </button>
          <Link
            className="w-8 h-8 rounded-full bg-white text-gray-500 hover:text-green-700 shadow-sm hover:shadow-md flex items-center justify-center transition"
            href={`/products/${productInfo.id}`}
          >
            <FontAwesomeIcon icon={faEye} />
          </Link>
        </div>

        {/* Image */}
        <div className="h-64 flex items-center justify-center px-8 py-0 mb-4 relative">
          <Image
            src={productInfo.imageCover}
            alt={productInfo.title}
            width={300}
            height={300}
            className="max-h-full object-cover"
          />
          <div className="absolute top-3 left-3">
            {isSale && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                -{discountPercentage}%
              </span>
            )}
          </div>
        </div>

        {/* Info */}
        <p className="text-sm text-gray-500 mb-1">
          {productInfo.category.name}
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 min-h-12 leading-snug">
          {productInfo.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <FontAwesomeIcon
              key={i}
              icon={faStar}
              className={`text-sm ${
                i < Math.round(productInfo.ratingsAverage || 0)
                  ? "text-yellow-400"
                  : "text-gray-200"
              }`}
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">
            {productInfo.ratingsAverage?.toFixed(1) || 0} (
            {productInfo.ratingsQuantity})
          </span>
        </div>

        {/* Price + Add */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-green-600">
              {productInfo.priceAfterDiscount || productInfo.price} EGP
            </span>
            {isSale && (
              <span className="text-sm text-gray-500 line-through ml-2">
                {productInfo.price} EGP
              </span>
            )}
          </div>

          <button
            disabled={loading}
            className={`w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center hover:bg-green-700 transition  ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            onClick={handleAddToCart}
          >
            {loading ? (
              <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
            ) : (
              <FontAwesomeIcon icon={faPlus} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
