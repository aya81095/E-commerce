import Image from "next/image";
import freshCartLogo from "../assets/images/freshcart-logo.svg";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Logo with pulse animation */}
        <div className="mb-8 animate-pulse">
          <Image
            src={freshCartLogo}
            alt="FreshCart"
            width={200}
            height={60}
            className="mx-auto"
          />
        </div>

        {/* Loading spinner */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-green-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-green-600 rounded-full border-t-transparent animate-spin"></div>
        </div>

        {/* Loading text */}
        <p className="text-gray-600 font-medium text-lg mb-2">
          Loading FreshCart
        </p>
        <p className="text-gray-400 text-sm">
          Preparing your fresh shopping experience...
        </p>

        {/* Animated dots */}
        <div className="flex justify-center gap-2 mt-6">
          <div
            className="w-3 h-3 bg-green-600 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-3 h-3 bg-green-600 rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="w-3 h-3 bg-green-600 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
