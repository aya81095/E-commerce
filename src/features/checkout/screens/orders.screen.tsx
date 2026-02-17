"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faSpinner,
  faArrowLeftLong,
} from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../../../store/store";
import Link from "next/link";
import { getUserOrders } from "../server/checkout.actions";
import OrderCard from "../components/orderCard";
import { useEffect, useState } from "react";
import { OrdersResponse } from "../types/orders.types";

export default function OrdersScreen() {
  const [orders, setOrders] = useState<null | OrdersResponse>(null);
  const { userInfo } = useAppSelector((state) => state.auth);
  if (!userInfo || !userInfo.id) {
    return;
  }

  useEffect(() => {
    const fetchOrders = async () => {
      if (userInfo?.id) {
        const response = await getUserOrders({ UserId: userInfo.id });
        setOrders(response);
      }
    };
    fetchOrders();
  }, [userInfo?.id]);

  return (
    <div className="w-full min-h-screen bg-gray-50 p-8 flex justify-center">
      <div className="w-full">
        {/* Page Title */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6 justify-between">
          <div className="flex flex-row gap-3 md:gap-4">
            <div className="bg-green-600 p-2 md:p-3 rounded-lg md:rounded-xl shrink-0">
              <FontAwesomeIcon
                icon={faBox}
                className="text-white text-lg md:text-xl"
              />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
                My Orders
              </h1>
              <p className="text-gray-500 text-xs md:text-sm">
                Track and manage your orders
              </p>
            </div>
          </div>
          <Link
            href="/"
            className="text-green-600 flex justify-center items-center gap-1 hover:gap-2 transition-all text-sm md:text-base whitespace-nowrap"
          >
            <FontAwesomeIcon icon={faArrowLeftLong} />
            <span className="hidden sm:inline">Continue Shopping</span>
            <span className="sm:hidden">Shop</span>
          </Link>
        </div>

        {/* No Orders State */}
        {!orders || orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-12 text-center">
            <FontAwesomeIcon
              icon={faBox}
              className="text-gray-300 text-6xl mb-4"
            />
            <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-2">
              No Orders Yet
            </h2>
            <p className="text-gray-500">
              You haven't placed any orders yet. Start shopping now!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              return <OrderCard key={order._id} orderInfo={order} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
