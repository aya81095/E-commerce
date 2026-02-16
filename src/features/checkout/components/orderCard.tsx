"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faMoneyBillWave,
  faMapMarkerAlt,
  faClock,
  faChevronDown,
  faChevronUp,
  faLocationDot,
  faCircleCheck,
  faTruck,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { Order } from "../types/orders.types";
import { useState } from "react";
export default function OrderCard({ orderInfo }: { orderInfo: Order }) {
  function getStatus() {
    if (orderInfo.isDelivered) {
      return {
        label: "Delivered",
        icon: faCircleCheck,
        colors: {
          background: "bg-green-100",
          text: "text-green-600",
          border: "border-green-200",
        },
      };
    }

    if (orderInfo.isPaid) {
      return {
        label: "On the way",
        icon: faTruck,
        colors: {
          background: "bg-blue-100",
          text: "text-blue-600",
          border: "border-blue-200",
        },
      };
    }

    return {
      label: "Processing",
      icon: faClock,
      colors: {
        background: "bg-orange-100",
        text: "text-orange-600",
        border: "border-orange-200",
      },
    };
  }
  const status = getStatus();
  const [isExpanded, setIsExpanded] = useState(false);
  function handleToggleOrderDetails() {
    setIsExpanded(!isExpanded);
  }

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden transition-all duration-500">
      {/* Order Header */}
      <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-row gap-4">
          <div className="relative w-20 h-20 bg-gray-200 rounded-lg mb-2 shadow-sm">
            <Image
              src={orderInfo.cartItems[0].product.imageCover}
              alt={orderInfo.cartItems[0].product.title}
              className="w-full h-full object-cover rounded-lg mb-2"
              width={50}
              height={50}
            />
            {orderInfo.cartItems.length > 1 && (
              <div className="absolute -top-2.5 -right-2.5 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                +{orderInfo.cartItems.length - 1}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3 mb-2">
              <span
                className={`px-3 py-1 ${status.colors.background} ${status.colors.text} text-xs rounded-full font-medium`}
              >
                <FontAwesomeIcon
                  icon={status.icon}
                  className={`${status.colors.text} mr-1`}
                />
                {status.label}
              </span>
              <span className="text-gray-600 text-sm">#{orderInfo.id}</span>
            </div>

            <div className="flex items-center gap-4 text-gray-500 text-sm mb-2">
              <span className="flex items-center gap-1">
                <FontAwesomeIcon icon={faCalendar} />
                {new Date(orderInfo.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span>
                {orderInfo.cartItems.length}{" "}
                {orderInfo.cartItems.length === 1 ? "item" : "items"}
              </span>
              <span className="flex items-center gap-1">
                <FontAwesomeIcon
                  icon={
                    orderInfo.paymentMethodType === "cash"
                      ? faMoneyBillWave
                      : faCreditCard
                  }
                  className={`${orderInfo.paymentMethodType === "cash" ? "text-green-600" : "text-blue-600"}`}
                />
                {orderInfo.paymentMethodType}
              </span>
            </div>
            <div className="flex items-center gap-1 text-gray-500 text-sm">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              {orderInfo.shippingAddress.city}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-gray-400 text-sm">Total</p>
            <h2 className="text-xl font-bold text-green-600">
              {orderInfo.totalOrderPrice >= 500
                ? `${orderInfo.totalOrderPrice} EGP`
                : `${orderInfo.totalOrderPrice + 100} EGP`}
            </h2>
          </div>

          {/* Toggle Button */}
          <button
            onClick={() => handleToggleOrderDetails()}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all duration-300"
          >
            {isExpanded ? "Hide" : "Details"}
            <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} />
          </button>
        </div>
      </div>

      {/* Animated Details */}
      <div
        className={` grid transition-all duration-500 ease-in-out overflow-hidden ${
          isExpanded
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div
          className={`border-t px-6 bg-gray-50 space-y-6 overflow-hidden ${isExpanded ? "py-6" : "py-0"} translate-all duration-500`}
        >
          {/* Order Items */}
          <div>
            <h3 className="font-semibold mb-4">Order Items</h3>

            {orderInfo.cartItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center bg-white p-4 rounded-xl mb-3 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={item.product.imageCover}
                      alt={item.product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{item.product.title}</p>
                    <p className="text-sm text-gray-500">
                      {item.count} × {item.price} EGP
                    </p>
                    <p className="text-xs text-gray-400">
                      {item.product.brand.name}
                    </p>
                  </div>
                </div>

                <p className="font-semibold text-gray-700">
                  {item.count * item.price} EGP
                </p>
              </div>
            ))}
          </div>

          {/* Address + Summary */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Address */}
            <div className="bg-white p-5 rounded-xl shadow-sm">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="text-blue-500 p-1.5 bg-blue-100 rounded-lg"
                />
                Delivery Address
              </h3>
              <div className="text-gray-600 text-sm flex flex-col gap-1">
                <span className="font-medium">
                  {orderInfo.shippingAddress.city}
                </span>
                <span className="font-medium">
                  {orderInfo.shippingAddress.details}
                </span>
                <span className="font-medium">
                  {orderInfo.shippingAddress.phone}
                </span>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-yellow-100 p-5 rounded-xl shadow-sm">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faClock}
                  className="text-white p-1.5 bg-orange-400 rounded-lg"
                />
                Order Summary
              </h3>

              <div className="flex justify-between text-sm mb-2">
                <span>Subtotal</span>
                <span>
                  {orderInfo.totalOrderPrice -
                    orderInfo.shippingPrice -
                    orderInfo.taxPrice}{" "}
                  EGP
                </span>
              </div>

              <div className="flex justify-between text-sm mb-2">
                <span>Shipping</span>
                <span>
                  {orderInfo.totalOrderPrice >= 500 ? "Free" : `100 EGP`}
                </span>
              </div>

              {orderInfo.taxPrice > 0 && (
                <div className="flex justify-between text-sm mb-2">
                  <span>Tax</span>
                  <span>{orderInfo.taxPrice} EGP</span>
                </div>
              )}

              <div className="flex justify-between font-bold text-lg mt-3 pt-3 border-t border-orange-100">
                <span>Total</span>
                <span>
                  {orderInfo.totalOrderPrice >= 500
                    ? orderInfo.totalOrderPrice
                    : orderInfo.totalOrderPrice + 100}{" "}
                  EGP
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
