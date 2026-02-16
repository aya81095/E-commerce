import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faShieldAlt, faSyncAlt, faHeadset } from "@fortawesome/free-solid-svg-icons";

export default function TopFeatures() {
  return (
    <div className="bg-gray-50 py-8 lg:px-16">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Free Shipping */}
          <div className="bg-white rounded-xl px-5 py-2.5 shadow-sm hover:shadow-lg transition-shadow flex items-center gap-4">
            <div className="bg-blue-100 rounded-lg p-2">
              <FontAwesomeIcon icon={faTruck} className="text-xl text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg">Free Shipping</h3>
              <p className="text-gray-600 text-sm">On orders over 500 EGP</p>
            </div>
          </div>

          {/* Secure Payment */}
          <div className="bg-white rounded-xl px-5 py-2.5 shadow-sm hover:shadow-lg transition-shadow flex items-center gap-4">
            <div className="bg-green-100 rounded-lg p-2">
              <FontAwesomeIcon icon={faShieldAlt} className="text-xl text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg">Secure Payment</h3>
              <p className="text-gray-600 text-sm">100% secure transactions</p>
            </div>
          </div>

          {/* Easy Returns */}
          <div className="bg-white rounded-xl px-5 py-2.5 shadow-sm hover:shadow-lg transition-shadow flex items-center gap-4">
            <div className="bg-orange-100 rounded-lg p-2">
              <FontAwesomeIcon icon={faSyncAlt} className="text-xl text-orange-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg">Easy Returns</h3>
              <p className="text-gray-600 text-sm">14-day return policy</p>
            </div>
          </div>

          {/* 24/7 Support */}
          <div className="bg-white rounded-xl px-5 py-2.5 shadow-sm hover:shadow-lg transition-shadow flex items-center gap-4">
            <div className="bg-purple-100 rounded-lg p-2">
              <FontAwesomeIcon icon={faHeadset} className="text-xl text-purple-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg">24/7 Support</h3>
              <p className="text-gray-600 text-sm">Dedicated support team</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}