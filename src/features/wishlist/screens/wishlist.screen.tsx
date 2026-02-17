"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faShoppingCart,
  faTrash,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  addProductToCart,
  getLoggedUserCart,
} from "../../cart/server/cart.actions";
import { setCartInfo } from "../../cart/store/cart.slice";
import { toast } from "react-toastify";
import { removeItem, setWishlistInfo } from "../store/wishlist.slice";
import {
  removeProductFromWishlist,
  getLoggedUserWishlist,
} from "../server/wishlist.actions";
import { useEffect } from "react";

export default function Wishlist() {
  const dispatch = useAppDispatch();
  const { wishlistId, count, data } = useAppSelector((state) => state.wishlist);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const wl = await getLoggedUserWishlist();
        if (!mounted) return;
        dispatch(setWishlistInfo(wl));
      } catch (err) {
        // ignore; user may be unauthenticated
      }
    })();
    return () => {
      mounted = false;
    };
  }, [dispatch]);

  const handleRemove = async (productId: string) => {
    try {
      // optimistic local update
      dispatch(removeItem({ id: productId }));
      await removeProductFromWishlist({ productId });
      // refresh server state
      try {
        const wl = await getLoggedUserWishlist();
        dispatch(setWishlistInfo(wl));
      } catch (_) {}
      toast.success("Removed successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove from wishlist");
    }
  };
  const handleAddToCart = async (productId: string) => {
    try {
      const response = await addProductToCart({ productId });
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

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex items-center space-x-3 mb-6 sm:mb-8">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-lg flex items-center justify-center shrink-0">
            <FontAwesomeIcon
              icon={faHeart}
              className="text-red-500 text-xl sm:text-2xl"
            />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              My Wishlist
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              {count} items saved
            </p>
          </div>
        </div>

        {/* Empty State */}
        {data.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12 lg:p-16 text-center max-w-2xl mx-auto">
            <div className="w-20 h-20 md:w-24 md:h-24 mx-auto bg-red-50 rounded-full flex items-center justify-center mb-6">
              <FontAwesomeIcon
                icon={faHeart}
                className="text-4xl md:text-5xl text-red-400"
              />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
              Your Wishlist is Empty
            </h2>
            <p className="text-sm md:text-base text-gray-500 mb-8 max-w-md mx-auto">
              Save your favorite items here so you can easily find them later.
              Start adding products you love!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <FontAwesomeIcon icon={faShoppingCart} />
                Discover Products
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Browse All Products
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Desktop Table Header - Hidden on mobile */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b text-sm font-medium text-gray-700">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Status</div>
              <div className="col-span-2 text-center">Actions</div>
            </div>

            <div className="divide-y">
              {data.map((item) => (
                <div
                  key={item.id || item._id}
                  className="md:grid md:grid-cols-12 gap-4 px-4 sm:px-6 py-4 md:items-center hover:bg-gray-50 transition-colors"
                >
                  {/* Mobile/Tablet Card Layout */}
                  <div className="md:col-span-6 flex items-start md:items-center space-x-3 sm:space-x-4 mb-3 md:mb-0">
                    <div className="w-16 h-16 sm:w-18 sm:h-18 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                      <img
                        src={item.imageCover}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm sm:text-base text-gray-900 mb-1 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {item.category.name}
                      </p>
                      {/* Mobile price - shown only on small screens */}
                      <div className="md:hidden mt-2">
                        <span className="font-bold text-green-600 text-base">
                          {item.price} EGP
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Price */}
                  <div className="hidden md:block md:col-span-2 text-center">
                    <div className="font-bold text-gray-800">
                      {item.price} EGP
                    </div>
                  </div>

                  {/* Desktop Status */}
                  <div className="hidden md:flex md:col-span-2 text-center justify-center">
                    <div className="flex items-center space-x-2 bg-green-50 px-2 py-0.5 rounded-full w-fit">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-600 font-medium">
                        In Stock
                      </span>
                    </div>
                  </div>

                  {/* Actions - Responsive */}
                  <div className="md:col-span-2 flex items-center gap-2 sm:gap-3">
                    <button
                      onClick={() => handleAddToCart(item.id || item._id)}
                      className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 rounded-lg font-medium text-xs sm:text-sm transition-colors"
                    >
                      <FontAwesomeIcon icon={faShoppingCart} />
                      <span className="hidden sm:inline">Add to Cart</span>
                      <span className="sm:hidden">Add</span>
                    </button>
                    <button
                      onClick={() => handleRemove(item.id || item._id)}
                      className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-gray-400 border border-gray-300 hover:text-red-500 hover:border-red-300 hover:bg-red-50 rounded-lg transition-all duration-300 shrink-0"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.length > 0 && (
          <div className="mt-6 sm:mt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1 hover:gap-2 text-green-600 transition-all duration-300 text-sm sm:text-base"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              <span>Continue Shopping</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
