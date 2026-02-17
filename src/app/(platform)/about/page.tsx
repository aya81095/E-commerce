import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruck,
  faShieldAlt,
  faHeadset,
  faLeaf,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function aboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About FreshCart
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Your trusted partner for fresh groceries and organic produce
              delivered right to your doorstep with care and quality.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Mission
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                At FreshCart, we believe everyone deserves access to fresh,
                high-quality groceries without the hassle. Our mission is to
                revolutionize the way you shop for groceries by bringing the
                freshest products directly to your door, saving you time while
                ensuring the highest quality standards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-green-50 p-8 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Our Vision
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  To be the leading online grocery platform that connects
                  communities with fresh, sustainable, and affordable food
                  options while supporting local farmers and producers.
                </p>
              </div>
              <div className="bg-green-50 p-8 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Our Values
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Quality, sustainability, and customer satisfaction are at the
                  heart of everything we do. We are committed to transparency,
                  ethical sourcing, and building lasting relationships.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Why Choose FreshCart?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FontAwesomeIcon
                    icon={faTruck}
                    className="text-white text-2xl"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Fast Delivery
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Same-day delivery available on all orders. Get your groceries
                  when you need them.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FontAwesomeIcon
                    icon={faLeaf}
                    className="text-white text-2xl"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Fresh & Organic
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Handpicked fresh produce and organic products sourced from
                  trusted suppliers.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FontAwesomeIcon
                    icon={faShieldAlt}
                    className="text-white text-2xl"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Quality Guaranteed
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  100% satisfaction guarantee on all products with easy returns
                  and refunds.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FontAwesomeIcon
                    icon={faHeadset}
                    className="text-white text-2xl"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  24/7 Support
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Dedicated customer support team ready to help you anytime,
                  anywhere.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  10K+
                </div>
                <div className="text-gray-600 font-medium">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  5K+
                </div>
                <div className="text-gray-600 font-medium">Products</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  500+
                </div>
                <div className="text-gray-600 font-medium">
                  Trusted Suppliers
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  50+
                </div>
                <div className="text-gray-600 font-medium">Cities Covered</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-green-600">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Experience Fresh Shopping?
            </h2>
            <p className="text-green-100 text-lg mb-8">
              Join thousands of satisfied customers who trust FreshCart for
              their daily grocery needs.
            </p>
            <Link
              href="/products"
              className="inline-block bg-white text-green-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Start Shopping Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
