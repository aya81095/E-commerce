import Image from "next/image";
import freshCartLogo from "../../assets/images/freshcart-logo.svg";

export default function PlatformLoading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center px-4">
        {/* Logo */}
        <div className="mb-8">
          <Image
            src={freshCartLogo}
            alt="FreshCart"
            width={180}
            height={54}
            className="mx-auto opacity-90"
          />
        </div>

        {/* Spinner */}
        <div className="relative w-16 h-16 mx-auto mb-6">
          {/* Outer ring */}
          <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
          {/* Spinning ring */}
          <div className="absolute inset-0 border-4 border-green-600 rounded-full border-t-transparent border-r-transparent animate-spin"></div>
        </div>

        {/* Loading text */}
        <div className="space-y-2">
          <p className="text-gray-700 font-semibold">Loading...</p>
          <p className="text-gray-400 text-sm">Please wait</p>
        </div>

        {/* Progress bar */}
        <div className="mt-8 w-48 mx-auto">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-600 rounded-full animate-pulse"
              style={{ width: "60%" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
