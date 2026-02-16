"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faShoppingCart,
  faTrash,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
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
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
            <FontAwesomeIcon icon={faHeart} className="text-red-500 text-2xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
            <p className="text-sm text-gray-500">{count} items saved</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b text-sm font-medium text-gray-700">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Status</div>
            <div className="col-span-2 text-center">Actions</div>
          </div>

          <div className="divide-y">
            {data.map((item) => (
              <div
                key={item.id || item._id}
                className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors"
              >
                <div className="col-span-6 flex items-center space-x-4">
                  <div className="w-18 h-18 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                    <img
                      src={item.imageCover}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {item.category.name}
                    </p>
                  </div>
                </div>

                <div className="col-span-2 text-center">
                  <div className="font-bold text-gray-800">
                    {item.price} EGP
                  </div>
                </div>

                <div className="col-span-2 text-center">
                  <div className="flex items-center space-x-2 text-center justify-center bg-green-50 px-2 py-0.5 rounded-full w-fit mx-auto">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600 font-medium ">
                      In Stock
                    </span>
                  </div>
                </div>

                <div className="col-span-2 flex items-center space-x-3 text-center">
                  <button
                    onClick={() => handleAddToCart(item.id || item._id)}
                    className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
                  >
                    <FontAwesomeIcon icon={faShoppingCart} />
                    <span>Add to Cart</span>
                  </button>
                  <button
                    onClick={() => handleRemove(item.id || item._id)}
                    className="w-10 h-10 flex items-center justify-center text-gray-400 border border-gray-300 hover:text-red-500 hover:border-red-300 hover:bg-red-50 rounded-lg transition-all duration-300"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <a
            href="/"
            className="inline-flex items-center gap-1 hover:gap-2 text-green-600 transition-all duration-300"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Continue Shopping</span>
          </a>
        </div>
      </div>
    </div>
  );
}
