import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShippingFast, faTags, faHistory } from '@fortawesome/free-solid-svg-icons';

export default function AccountBenefits() {
  return (
    <div className="bg-white py-10 px-8 border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl lg:text-2xl  font-bold text-gray-900 text-center mb-12">
          Why Create an Account with FreshCart?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Faster Checkout */}
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon icon={faShippingFast} className="text-green-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Faster Checkout
            </h3>
            <p className="text-gray-600">
              Save your delivery information for a quicker shopping experience.
            </p>
          </div>

          {/* Exclusive Deals */}
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon icon={faTags} className="text-green-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Exclusive Deals
            </h3>
            <p className="text-gray-600">
              Get access to member-only discounts and early sale notifications.
            </p>
          </div>

          {/* Order History */}
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon icon={faHistory} className="text-green-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Order History
            </h3>
            <p className="text-gray-600">
              Easily track and reorder your favorite products from past purchases.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
