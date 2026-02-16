import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faPinterestP,
} from "@fortawesome/free-brands-svg-icons";
import freshCartLogo from "../../assets/images/freshcart-logo.svg";
import minilogo from "../../assets/images/mini-logo.png";
import Image from "next/image";

export default function Footer() {
  return (
   <footer className="w-full mx-auto bg-white border-t border-gray-200 font-sans ">
       {/* Main Footer Content */}
       <div className="py-5 lg:py-9 border-b border-gray-200">
         <div className="container mx-auto px-4">
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 w-fit mx-auto">
            {/* Company Info */}
            <div>
              {/* Logo */}
              <Link href="/" className="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center gap-1 shrink-0">
              <Image src={freshCartLogo} alt="FreshCart Logo" />
              </Link>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                FreshCart is your one-stop destination for fresh groceries,
                organic produce, and household essentials delivered right to
                your doorstep.
              </p>
              <div className="flex items-center gap-3">
                <Link
                  href="#"
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#0aad0a] text-gray-600 hover:text-white flex items-center justify-center transition-colors"
                >
                  <FontAwesomeIcon icon={faFacebookF} className="text-sm w-4 h-4" />
                </Link>
                <Link
                  href="#"
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#0aad0a] text-gray-600 hover:text-white flex items-center justify-center transition-colors"
                >
                  <FontAwesomeIcon icon={faTwitter} className="text-sm" />
                </Link>
                <Link
                  href="#"
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#0aad0a] text-gray-600 hover:text-white flex items-center justify-center transition-colors"
                >
                  <FontAwesomeIcon icon={faInstagram} className="text-sm" />
                </Link>
                <Link
                  href="#"
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#0aad0a] text-gray-600 hover:text-white flex items-center justify-center transition-colors"
                >
                  <FontAwesomeIcon icon={faPinterestP} className="text-sm" />
                </Link>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-gray-900 font-bold text-base mb-4">
                Categories
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-[#0aad0a] transition-colors text-sm"
                  >
                    Fruits & Vegetables
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-[#0aad0a] transition-colors text-sm"
                  >
                    Dairy & Eggs
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-[#0aad0a] transition-colors text-sm"
                  >
                    Bakery & Snacks
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-[#0aad0a] transition-colors text-sm"
                  >
                    Meat & Seafood
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-[#0aad0a] transition-colors text-sm"
                  >
                    Beverages
                  </Link>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-gray-900 font-bold text-base mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-[#0aad0a] transition-colors text-sm"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-[#0aad0a] transition-colors text-sm"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-[#0aad0a] transition-colors text-sm"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-[#0aad0a] transition-colors text-sm"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-[#0aad0a] transition-colors text-sm"
                  >
                    Shipping Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="text-gray-900 font-bold text-base mb-4">
                Customer Service
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-[#0aad0a] transition-colors text-sm"
                  >
                    My Account
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-[#0aad0a] transition-colors text-sm"
                  >
                    Order History
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-[#0aad0a] transition-colors text-sm"
                  >
                    Wishlist
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-[#0aad0a] transition-colors text-sm"
                  >
                    Returns & Refunds
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-[#0aad0a] transition-colors text-sm"
                  >
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="py-3">
        <div className="container mx-auto px-4">
          <div className="flex flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © 2023 FreshCart. All rights reserved.
            </p>
           <Image src={minilogo} alt="FreshCart Logo" width={25} height={25} />
          </div>
        </div>
      </div>
    </footer> 
  );
}