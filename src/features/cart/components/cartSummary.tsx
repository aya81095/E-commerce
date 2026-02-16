"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faLock } from "@fortawesome/free-solid-svg-icons";
import { faTruck } from "@fortawesome/free-regular-svg-icons";
import { useRouter } from "next/navigation";

export default function CartSummary({totalCartPrice,numOfCartItems}: {totalCartPrice: number,numOfCartItems: number}) {
    const subTotal = totalCartPrice
    const Shipping = subTotal >= 500 ? 0 : 100
    const total = Math.round((subTotal + Shipping))
    const router = useRouter()
    return (
        <>
        {/* Right Side - Order Summary */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden h-fit sticky top-32">
            
            <div className="bg-green-600 text-white p-4 font-semibold ">
              <h2 className="text-lg">Order Summary</h2>
              <p className="text-sm text-white mt-1">
          You have {numOfCartItems} {numOfCartItems===1?"item":"items"} in your cart
        </p>
            </div>

            <div className="p-6 space-y-4">

              {/* Add Free Shipping */}
              {
                Shipping > 0 && (
                  <div className="space-y-2 px-2 py-3 bg-orange-50 text-gray-700 rounded-lg">
                <div className="bg-orange-50 text-gray-700 px-2 py-1 rounded-lg flex items-center gap-2">
                    <FontAwesomeIcon icon={faTruck} className="text-orange-400" />
                    Add {500-subTotal} EGP for free shipping
                </div>
                <div className="progress-bar bg-orange-50 rounded-full h-2 mt-2 shadow-inner shadow-gray-200">
                    <div className="progress-bar-fill bg-orange-400 h-2 rounded-full" style={{width: `${subTotal/500*100}%`}}></div>
                </div>
              </div>
                )
              }

              {/* Free Shipping */}
              {
                Shipping === 0 && (
                  <div className="space-y-2 px-2 py-3 bg-green-50 text-gray-700 rounded-lg flex items-center gap-2">
                  <div className="text-gray-700 px-2 py-1 rounded-lg flex items-center gap-2">
                      <FontAwesomeIcon icon={faTruck} className="text-green-600" />
                  </div>
                  <div className="flex flex-col gap-1 ">
                      <p className="font-semibold text-green-700">Free Shipping!</p>
                      <p className="text-sm text-green-600">You Qualify for free shipping</p>
                     
                  </div>
                </div>
                )
              }

              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{totalCartPrice} EGP</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                {
                    Shipping===0 ? (
                        <span className="text-green-600 font-semibold ">FREE</span>
                    ) : (
                        <span className="text-gray-600 font-semibold">{Shipping} EGP</span>
                    )
                }

              </div>

              <hr />

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-green-600">{total} EGP</span>
              </div>

              <button className="w-full  bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition cursor-pointer" onClick={()=>router.push("/checkout")}>
                <FontAwesomeIcon icon={faLock} />{" "}
                Secure Checkout
              </button>

              <div className="text-sm text-gray-500 space-y-1 pt-3 border-t">
                <p>✓ Your cart items will be saved</p>
                <p>✓ Track your orders easily</p>
                <p>✓ Access exclusive member deals</p>
              </div>

            </div>
          </div>
        </>
    )
}