import Image from 'next/image';
import shoppingCart from '../../../../assets/images/login.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faShieldAlt, faHeadset } from '@fortawesome/free-solid-svg-icons';

export default function LoginHero() {
  return (
    <div className="flex items-center justify-center lg:justify-end lg:pr-10 p-6 lg:p-8">
      <div className="max-w-xl w-full text-center">
        {/* Shopping Cart Image */}
       <div className='lg:w-xl w-full lg:h-96 h-72 flex items-center justify-center bg-white rounded-2xl shadow-lg overflow-hidden mb-8' >
        <Image
                  src={shoppingCart}
                  alt="Shopping Cart"
                  className='w-full h-full object-cover'
                />
       </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Fresh Groceries Delivered
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-5 ">
          Join thousands of happy customers who trust FreshCart for their daily grocery needs
        </p>

        {/* Features */}
        <div className="flex items-center justify-center gap-8 text-sm">
          <div className="flex items-center gap-2 text-gray-700 flex-col md:flex-row">
            <FontAwesomeIcon icon={faTruck} className="text-green-600" />
            <span>Free Delivery</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700 flex-col md:flex-row">
            <FontAwesomeIcon icon={faShieldAlt} className="text-green-600" />
            <span>Secure Payment</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700 flex-col md:flex-row">
            <FontAwesomeIcon icon={faHeadset} className="text-green-600" />
            <span>24/7 Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};
