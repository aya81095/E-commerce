"use client"
import { useState } from "react";

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <section className="mt-10 bg-white p-6 rounded-2xl">
      
      {/* Tabs */}
      <div className="flex gap-6 border-b mb-6">
        <TabBtn
          active={activeTab === "details"}
          onClick={() => setActiveTab("details")}
        >
          Product Details
        </TabBtn>
        <TabBtn
          active={activeTab === "reviews"}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews (5)
        </TabBtn>
        <TabBtn
          active={activeTab === "shipping"}
          onClick={() => setActiveTab("shipping")}
        >
          Shipping & Returns
        </TabBtn>
      </div>

      {/* Content */}
      {activeTab === "details" && (
        <p className="text-gray-600">
          Shell Fabric: Cotton 65% • Polyester 35%
        </p>
      )}

      {activeTab === "reviews" && (
        <p className="text-gray-600">
          ⭐⭐⭐⭐⭐ – Excellent quality and perfect fit.
        </p>
      )}

      {activeTab === "shipping" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 p-5 rounded-xl">
            <h4 className="font-semibold mb-2">Shipping Information</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>✔ Free shipping over 550 EGP</li>
              <li>✔ Delivery: 3–5 days</li>
              <li>✔ Express available</li>
            </ul>
          </div>

          <div className="bg-green-50 p-5 rounded-xl">
            <h4 className="font-semibold mb-2">Returns & Refunds</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>✔ 30-day return</li>
              <li>✔ Full refund</li>
              <li>✔ Easy process</li>
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}

function TabBtn({ active, children, ...props }) {
  return (
    <button
      {...props}
      className={`pb-3 font-medium ${
        active
          ? "text-green-600 border-b-2 border-green-600"
          : "text-gray-500"
      }`}
    >
      {children}
    </button>
  );
}