"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faPlus,
  faMinus,
  faCartShopping,
  faBolt,
  faShieldAlt,
  faUndo,
  faTruck,
  faHeart as faHeartSolid,
  faTrashCan,
  faSpinner,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { Product } from "../../types/product.type";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/image-gallery.css";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import {
  addProductToWishlist,
  getLoggedUserWishlist,
  removeProductFromWishlist,
} from "../../../wishlist/server/wishlist.actions";
import { setWishlistInfo } from "../../../wishlist/store/wishlist.slice";
import {
  addProductToCart,
  getLoggedUserCart,
} from "../../../cart/server/cart.actions";
import { removeProductFromCart } from "../../../cart/server/cart.actions";
import { setCartInfo } from "../../../cart/store/cart.slice";
import { toast } from "react-toastify";

export default function ProductInfo({ product }: { product: Product }) {
  const {
    title,
    description,
    price,
    images,
    category,
    ratingsAverage,
    ratingsQuantity,
    quantity,
    priceAfterDiscount,
    brand,
  } = product;
  const isSale = priceAfterDiscount ? priceAfterDiscount < price : false;
  const discountPercentage = priceAfterDiscount
    ? Math.round(((price - priceAfterDiscount) / price) * 100)
    : 0;
  const isLowStock = quantity > 0 && quantity < 10;
  const [count, setCount] = useState(1);
  const dispatch = useAppDispatch();
  const [wishLoading, setWishLoading] = useState(false);
  const wishlistData = useAppSelector((s) => s.wishlist.data || []);
  const isInWishlist = wishlistData.some(
    (it) => (it.id || it._id) === product.id || it._id === product.id,
  );

  const toggleWishlist = async () => {
    if (wishLoading) return;
    setWishLoading(true);
    try {
      if (isInWishlist) {
        await removeProductFromWishlist({ productId: product.id });
        toast.success("Removed from wishlist");
      } else {
        await addProductToWishlist({ productId: product.id });
        toast.success("Added to wishlist");
      }
      try {
        const wl = await getLoggedUserWishlist();
        dispatch(setWishlistInfo(wl));
      } catch (err) {
        // ignore
      }
    } catch (err) {
      console.error(err);
      toast.error("Please login to manage wishlist");
    } finally {
      setWishLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      const response = await addProductToCart({ productId: product.id });
      if (response.status === "success") {
        const cartInfo = await getLoggedUserCart();
        dispatch(setCartInfo(cartInfo));
        toast.success("Added to cart");
      }
    } catch (err) {
      console.error(err);
      toast.error("Login first to add products to your cart");
    }
  };

  const [cartLoading, setCartLoading] = useState(false);
  const cartProducts = useAppSelector((s) => s.cart.products || []);
  const isInCart = cartProducts.some(
    (it) =>
      (it.product.id || it.product._id) === product.id ||
      it.product._id === product.id,
  );

  const toggleCart = async () => {
    if (cartLoading) return;
    setCartLoading(true);
    try {
      if (isInCart) {
        const cartItem = cartProducts.find(
          (it) => it.product.id === product.id || it.product._id === product.id,
        );
        if (cartItem) {
          await removeProductFromCart({
            productId: cartItem.product.id || cartItem.product._id,
          });
        }
        toast.success("Removed from cart");
      } else {
        await addProductToCart({ productId: product.id });
        toast.success("Added to cart");
      }
      try {
        const cartInfo = await getLoggedUserCart();
        dispatch(setCartInfo(cartInfo));
      } catch (_) {}
    } catch (err) {
      console.error(err);
      toast.error("Cart action failed");
    } finally {
      setCartLoading(false);
    }
  };

  return (
    <section className="w-full grid grid-cols-1 md:flex gap-6 p-8 bg-white rounded-2xl">
      {/* Image Slider */}
      <div className="py-5 max-w-1/4 w-full ">
        <div className="bg-white border border-gray-200 rounded-2xl p-4 sticky top-0">
          <ImageGallery
            items={images.map((image) => {
              return {
                original: image,
                thumbnail: image,
              };
            })}
            showPlayButton={false}
            showFullscreenButton={false}
            showNav={false}
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="max-w-3/4 py-5 w-full ">
        <div className="bg-white border border-gray-200 rounded-2xl p-4">
          <span className="text-lg text-green-600 font-medium">
            {category.name} • {brand.name}
          </span>

          <h1 className="text-2xl font-bold text-gray-900 mt-2">{title}</h1>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <FontAwesomeIcon
                key={i}
                icon={faStar}
                className={`text-sm ${
                  i < Math.round(ratingsAverage || 0)
                    ? "text-yellow-400"
                    : "text-gray-200"
                }`}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">
              {ratingsAverage?.toFixed(1) || 0} • ({ratingsQuantity} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mt-4">
            <span className="text-2xl font-bold text-gray-900">
              {priceAfterDiscount || price} EGP
            </span>
            {isSale && (
              <>
                <span className="line-through text-gray-400">{price} EGP</span>
                <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full">
                  Save {discountPercentage}%
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 my-5">
            {quantity > 0 ? (
              <span
                className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-green-50 text-green-700`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${isLowStock ? "bg-yellow-600" : "bg-green-500"}`}
                ></span>
                {isLowStock ? `Only ${quantity} left Order soon!` : `In Stock`}
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-sm px-3 py-1.5 roundrd-full bg-red-50 text-red-700">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                Out Of Stock
              </span>
            )}
          </div>

          {/* description */}
          <div>
            <p className="text-gray-700">{description}</p>
          </div>

          {/* Quantity */}
          <div className="mt-6">
            <p className="mb-2 text-lg font-medium">Quantity</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-400 rounded-lg">
                <button
                  className="px-3 py-2  cursor-pointer hover:text-red-500"
                  onClick={() => setCount(count - 1)}
                  disabled={count === 1}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <input
                  type="number"
                  min={1}
                  max={quantity}
                  onChange={(e) => setCount(Number(e.target.value))}
                  value={count}
                  className=" w-16 text-center"
                />
                <button
                  className="px-3 py-2 cursor-pointer hover:text-green-600"
                  onClick={() => setCount(count + 1)}
                  disabled={count === quantity}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              <span className="text-sm text-gray-500">
                {quantity} available
              </span>
            </div>
          </div>

          <div className="totalPrice mt-6 flex items-center justify-between bg-gray-50 p-4 rounded-lg">
            <p className="text-lg font-medium text-gray-600">Total Price : </p>
            <p className="text-2xl font-bold text-green-600">
              {count * (priceAfterDiscount || price)} EGP
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6 flex-col sm:flex-row">
            <button
              onClick={toggleCart}
              disabled={cartLoading}
              className={`flex-1 text-white py-3 rounded-xl flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed transition ${isInCart ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
            >
              {cartLoading ? (
                <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
              ) : isInCart ? (
                <FontAwesomeIcon icon={faTrashCan} />
              ) : (
                <FontAwesomeIcon icon={faShoppingCart} />
              )}
              {isInCart ? "Remove from Cart" : "Add to Cart"}
            </button>
            <button className="flex-1 bg-gray-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-700">
              <FontAwesomeIcon icon={faBolt} />
              Buy Now
            </button>
          </div>

          <button
            disabled={wishLoading}
            onClick={toggleWishlist}
            className="mt-4 flex items-center gap-2 text-gray-500 w-full border border-gray-200 rounded-lg py-3 hover:bg-gray-100 transition justify-center"
          >
            {wishLoading ? (
              <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
            ) : (
              <FontAwesomeIcon
                icon={isInWishlist ? faHeartSolid : faHeart}
                className={`transition-colors ${isInWishlist ? "text-red-500" : "text-gray-500 "} hover:text-red-500`}
              />
            )}
            {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
          </button>

          {/* delivery features */}
          <div className="w-full bg-white mt-6 border-t border-gray-200 ">
            <div className="flex flex-col md:flex-row items-center justify-between p-4 gap-6">
              {/* Free Delivery */}
              <div className="flex items-center gap-4">
                <div className="bg-green-100 text-green-600 w-12 h-12 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faTruck} className="text-lg" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-gray-800 font-semibold text-lg">
                    Free Delivery
                  </h3>
                  <p className="text-gray-500 text-sm">Orders over $50</p>
                </div>
              </div>

              {/* 30 Days Return */}
              <div className="flex items-center gap-4">
                <div className="bg-green-100 text-green-600 w-12 h-12 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faUndo} className="text-lg" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-gray-800 font-semibold text-lg">
                    30 Days Return
                  </h3>
                  <p className="text-gray-500 text-sm">Money back</p>
                </div>
              </div>

              {/* Secure Payment */}
              <div className="flex items-center gap-4">
                <div className="bg-green-100 text-green-600 w-12 h-12 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faShieldAlt} className="text-lg" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-gray-800 font-semibold text-lg">
                    Secure Payment
                  </h3>
                  <p className="text-gray-500 text-sm">100% Protected</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
