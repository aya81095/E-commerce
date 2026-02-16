
import Image from 'next/image';
import authImage from '../../../../assets/images/review-author.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf, faTruck, faShieldAlt, faStar } from '@fortawesome/free-solid-svg-icons';

export default function SignupHero() {
  return (
    <div className="flex items-center justify-center lg:justify-end lg:pr-10 p-6  ">
      <div className="max-w-xl w-full">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Welcome to <span className="text-green-600">FreshCart</span>
        </h1>
        
        <p className="text-gray-600 mb-8">
          Join thousands of happy customers who enjoy fresh groceries delivered right to their doorstep.
        </p>

        {/* Features */}
        <div className="space-y-5 mb-8">
          <div className="flex items-start gap-3">
            <div className="bg-green-100 p-2.5 rounded-lg flex-shrink-0">
              <FontAwesomeIcon icon={faLeaf} className="text-green-600 text-lg" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Premium Quality</h3>
              <p className="text-gray-600">Premium quality products sourced directly from farms</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-green-100 p-2.5 rounded-lg flex-shrink-0">
              <FontAwesomeIcon icon={faTruck} className="text-green-600 text-lg" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Fast Delivery</h3>
              <p className="text-gray-600">Same-day delivery available in most areas</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-green-100 p-2.5 rounded-lg flex-shrink-0">
              <FontAwesomeIcon icon={faShieldAlt} className="text-green-600 text-lg" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Secure Shopping</h3>
              <p className="text-gray-600">Your data and payments are completely secure</p>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 w-full ">
          <div className="flex items-center gap-3 mb-3">
            <Image   
              src={authImage}
              alt="Sarah Johnson" 
              width={50}
              height={50}
              className="rounded-full"
            />
            <div>
              <h4 className="font-semibold text-gray-900">Sarah Johnson</h4>
              <div className="flex gap-1 mt-1">
                <FontAwesomeIcon icon={faStar} className="text-yellow-400 text-sm" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-400 text-sm" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-400 text-sm" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-400 text-sm" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-400 text-sm" />
              </div>
            </div>
          </div>
          <p className="text-gray-600 italic">
            FreshCart has transformed my shopping experience. The quality of the products is outstanding, and the delivery is always on time. Highly recommend!
          </p>
        </div>
      </div>
    </div>
  );
};
