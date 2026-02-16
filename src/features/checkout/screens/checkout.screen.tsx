"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
  faBagShopping,
  faCreditCard,
  faHome,
  faInfoCircle,
  faLocationArrow,
  faLock,
  faMoneyBillWave,
  faRefresh,
  faShield,
  faTruck,
  faArrowLeft,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  checkoutSchema,
  CheckoutSchemaValues,
} from "../schemas/checkout.schema";
import { useAppDispatch, useAppSelector } from "@/src/store/store";
import { createCashOrder, createOnlineOrder } from "../server/checkout.actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { clearCart, clearCartAfterPayment } from "../../cart/store/cart.slice";
import { clearCartAction } from "../../cart/server/cart.actions";
import Image from "next/image";
import Link from "next/link";
export default function CheckoutScreen() {
  const [payment, setPayment] = useState("cash");
  const { cartId } = useAppSelector((state) => state.cart);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { numOfCartItems, products, totalCartPrice } = useAppSelector(
    (state) => state.cart,
  );
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit: SubmitHandler<CheckoutSchemaValues> = async (values) => {
    setLoading(true);
    try {
      if (!cartId) {
        return;
      }
      if (payment === "cash") {
        const response = await createCashOrder({
          cartId,
          shippingAddress: values,
        });
        if (response.status === "success") {
          toast.success("Order created successfully");
          dispatch(clearCartAfterPayment());
          reset();
          setTimeout(() => {
            router.push("/orders");
          }, 3000);
        }
        console.log(response);
      } else {
        const response = await createOnlineOrder({
          cartId,
          shippingAddress: values,
          url: location.origin,
        });
        if (response.status === "success") {
          dispatch(clearCartAfterPayment());
          toast.loading("Redirecting you to payment gateway...");
          reset();
          setTimeout(() => {
            location.href = response.session.url;
          }, 3000);
        }
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto px-8 py-10">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <div className="text-2xl font-bold mb-1 flex items-center gap-2">
            <FontAwesomeIcon
              icon={faCreditCard}
              className="bg-green-600 p-2.5 text-2xl rounded-lg text-white"
            />
            <h1>Complete Your Order</h1>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            Review your items and complete your purchase.
          </p>
        </div>
        <Link
          href="/cart"
          className="text-green-600 font-semibold hover:gap-3 transition-all duration-300 flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to Cart
        </Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-8">
            {/* ================= Shipping Address ================= */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-green-600 text-white px-6 py-4 font-semibold text-lg flex items-center gap-2">
                <FontAwesomeIcon icon={faHome} />
                Shipping Address
              </div>

              <div className="p-6 space-y-5">
                {/* Info Alert */}
                <div className="bg-blue-50 border border-blue-200 text-blue-700 p-4 rounded-xl text-sm flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    className="py-2 px-1.5 bg-blue-100 rounded-full"
                  />
                  <div className="flex flex-col">
                    <span className="text-blue-800 font-semibold text-md">
                      Delivery Information
                    </span>
                    <span className="text-blue-700 text-sm">
                      Please ensure your address is accurate for smooth
                      delivery.
                    </span>
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    id="city"
                    placeholder="City (e.g. Cairo, Giza)"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                    {...register("city")}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm ml-1">
                      *{errors.city.message}
                    </p>
                  )}
                </div>

                <div>
                  <textarea
                    rows={3}
                    id="details"
                    placeholder="Detailed Address"
                    className="w-full resize-none border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                    {...register("details")}
                  />
                  {errors.details && (
                    <p className="text-red-500 text-sm ml-1">
                      *{errors.details.message}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="Phone Number (Egyption numbers only)"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm ml-1">
                      *{errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* ================= Payment Method ================= */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-green-600 text-white px-6 py-4 font-semibold text-lg">
                <FontAwesomeIcon
                  icon={faCreditCard}
                  className="text-white mr-2"
                />
                Payment Method
              </div>

              <div className="p-6 space-y-4">
                {/* Cash */}
                <label
                  className={`flex items-center justify-between border rounded-xl p-4 cursor-pointer transition
                ${
                  payment === "cash"
                    ? "border-green-600 bg-green-50"
                    : "hover:border-green-500"
                }`}
                >
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faMoneyBillWave}
                      className={`text-gray-600 mr-2 p-4 rounded-2xl bg-gray-100 ${payment === "cash" ? "text-white bg-green-600" : ""}`}
                    />
                    <div className="flex flex-col">
                      <p
                        className={`font-medium ${payment === "cash" ? "text-green-700" : ""}`}
                      >
                        Cash on Delivery
                      </p>
                      <p className="text-sm text-gray-500">
                        Pay when your order arrives
                      </p>
                    </div>
                  </div>

                  <input
                    type="radio"
                    name="payment"
                    checked={payment === "cash"}
                    onChange={() => setPayment("cash")}
                    className="accent-green-600 w-4 h-4"
                    onClick={() => setPayment("cash")}
                  />
                </label>

                {/* Online */}
                <label
                  className={`flex items-center justify-between border rounded-xl p-4 cursor-pointer transition
                ${
                  payment === "online"
                    ? "border-green-600 bg-green-50"
                    : "hover:border-green-500"
                }`}
                >
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faCreditCard}
                      className={`text-gray-600 mr-2 p-4 rounded-2xl bg-gray-100 ${payment === "online" ? "text-white bg-green-600" : ""}`}
                    />
                    <div className="flex flex-col">
                      <p
                        className={`font-medium ${payment === "online" ? "text-green-700" : ""}`}
                      >
                        Pay Online
                      </p>
                      <p className="text-sm text-gray-500">
                        Secure payment with card
                      </p>
                    </div>
                  </div>

                  <input
                    type="radio"
                    name="payment"
                    checked={payment === "online"}
                    onChange={() => setPayment("online")}
                    className="accent-green-600 w-4 h-4"
                    onClick={() => setPayment("online")}
                  />
                </label>

                {/* Secure Box */}
                <div className="bg-green-50 text-green-700 border border-green-200 p-4 rounded-xl text-sm flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faShield}
                    className="text-green-600 mr-2 p-3 rounded-full bg-green-100"
                  />
                  <span className="text-green-600 font-semibold">
                    Your payment info is protected with 256-bit SSL encryption.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 h-fit lg:sticky lg:top-24 overflow-hidden">
            <div className="bg-green-600 text-white px-6 py-4 font-semibold text-lg flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faBagShopping} className="text-white" />
                <span>Order Summary</span>
              </div>
              <span className="text-white text-sm">
                {numOfCartItems} {numOfCartItems === 1 ? "item" : "items"}
              </span>
            </div>

            <div className="p-6 space-y-4">
              {/* Scrollable Items */}
              <div className="max-h-56 overflow-y-auto space-y-3 pr-2">
                {products.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex justify-between items-center text-sm bg-gray-50 border border-gray-200 rounded-xl px-4 py-2"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-white w-16 h-16 rounded-xl overflow-hidden">
                        <Image
                          src={item.product.imageCover}
                          alt={item.product.title}
                          width={50}
                          height={50}
                          className="w-full h-full object-contain rounded-xl"
                        />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span>{item.product.title.slice(0, 20)}</span>
                        <span className="text-gray-700 text-xs">
                          {item.count} x {item.price} EGP
                        </span>
                      </div>
                    </div>

                    <div className="text-gray-700">
                      {item.count * item.price} EGP
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2 text-md text-gray-700 font-semibold">
                <div className="flex justify-between">
                  <span>
                    <FontAwesomeIcon
                      icon={faMoneyBillWave}
                      className="mr-2 text-gray-500"
                    />
                    Subtotal
                  </span>
                  <span>{totalCartPrice} EGP</span>
                </div>

                <div className="flex justify-between">
                  <span>
                    <FontAwesomeIcon
                      icon={faTruck}
                      className="mr-2 text-gray-500"
                    />
                    Shipping
                  </span>
                  <span>100 EGP</span>
                </div>
              </div>

              <div className="border-t pt-4 flex justify-between font-bold text-lg">
                <span className="text-gray-700">Total</span>
                <span className="text-green-600 ">
                  {totalCartPrice + 100} EGP
                </span>
              </div>

              <button
                type="submit"
                className="cursor-pointer w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium transition"
              >
                {loading ? (
                  <>
                    <FontAwesomeIcon
                      icon={faSpinner}
                      className="animate-spin mr-2"
                    />
                    Processing...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faLocationArrow} className="mr-2" />
                    Place Order
                  </>
                )}
              </button>

              {/* Features */}
              <div className="flex justify-between text-xs text-gray-500 pt-3 px-6 border-t">
                <span>
                  <FontAwesomeIcon icon={faTruck} className="text-green-600" />{" "}
                  Fast Delivery
                </span>
                <span>
                  <FontAwesomeIcon
                    icon={faRefresh}
                    className="text-green-600"
                  />{" "}
                  Easy Returns
                </span>
                <span>
                  <FontAwesomeIcon icon={faLock} className="text-green-600" />{" "}
                  Secure
                </span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
