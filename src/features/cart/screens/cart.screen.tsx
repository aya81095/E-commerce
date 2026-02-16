"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash,faShoppingCart, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/src/store/store";
import CartItem from "../components/cartItem";
import CartSummary from "../components/cartSummary";
import { clearCart } from "../store/cart.slice";
import { clearCartAction } from "../server/cart.actions";
import Swal from "sweetalert2";
import { useState } from "react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

export default function CartScreen() {
    const {numOfCartItems,products,totalCartPrice,}=useAppSelector((state)=>state.cart)
    const dispatch = useAppDispatch();
    const [clearing, setClearing] = useState(false);

    const handleClearCart = async () => {
       const result = await Swal.fire({
         html: `
    <div class="text-center">
      <div class="w-14 h-14 mx-auto bg-red-100 text-red-500 rounded-full flex items-center justify-center">
        
        <svg xmlns="http://www.w3.org/2000/svg" 
             class="w-6 h-6" 
             fill="none" 
             viewBox="0 0 24 24" 
             stroke="currentColor" 
             stroke-width="2">
          <path stroke-linecap="round" 
                stroke-linejoin="round" 
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22m-5-3H6a1 1 0 00-1 1v2h14V5a1 1 0 00-1-1z" />
        </svg>

      </div>

      <h2 class="text-xl font-semibold mt-4">
         Clear your cart?
      </h2>

      <p class="text-gray-500 text-sm mt-2">
        All items will be removed from your cart!
      </p>
    </div>
              `,
            showCancelButton: true,
            confirmButtonText: "Clear",
            cancelButtonText: "Cancel",
            buttonsStyling: false,
            customClass: {
              popup: "rounded-2xl shadow-lg p-0 border-0",
              htmlContainer: "p-6 m-0 rounded-2xl",
              actions: "px-6 pb-6 pt-0 gap-3",
              confirmButton: "bg-red-500 text-white px-6 py-2 rounded-lg cursor-pointer",
              cancelButton: "bg-gray-200 text-gray-800 px-6 py-2 rounded-lg cursor-pointer",
            }
});

        if (result.isConfirmed) {
            setClearing(true);
            dispatch(clearCart())
            await clearCartAction()
            setClearing(false)
            toast.success("Cart cleared successfully")
        }
    };

  return (
    <section className="bg-gray-50 p-6">
      <div className="w-full mx-auto">
        
        {/* Title */}
        <div className="text-2xl font-bold mb-1 flex items-center gap-2">
            <FontAwesomeIcon icon={faShoppingCart} className="bg-green-600 p-2.5 text-2xl rounded-lg text-white"/>
            <h1>Shopping Cart</h1>
            </div>
        <p className="text-sm text-gray-500 mb-6">
          You have <span className="text-green-600 font-medium">{numOfCartItems} {numOfCartItems===1?"item":"items"}</span> in your cart
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Side - Cart Items */}
          <div className="lg:col-span-2 space-y-6">

          {/* Cart Items */}
          {products.map((product)=>(
            <CartItem key={product._id} info={product}/>
          ))}

            {/* Continue */}
            <div className="flex justify-between text-sm text-gray-500">
              <Link href="/" className="text-green-600 font-semibold hover:gap-3 transition-all duration-300 flex items-center gap-2">
              <FontAwesomeIcon icon={faArrowLeft}/>
               Continue Shopping
              </Link>

              <button 
                className="text-red-500 font-semibold hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                onClick={handleClearCart}
                disabled={clearing || products.length === 0}
              >
                {clearing ? (
                    <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                ) : (
                    <FontAwesomeIcon icon={faTrash}/>
                )}
                Clear all items
              </button>
            </div>

          </div>

          {/* Right Side - Order Summary */}
         <CartSummary totalCartPrice={totalCartPrice} numOfCartItems={numOfCartItems}/>

        </div>
      </div>
    </section>
  );
}