import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faStar,
  faGift,
  faHeart,
  faMobileAlt,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { faApple, faGooglePlay } from "@fortawesome/free-brands-svg-icons";

export default function NewsletterSection() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 bg-gradient-to-br from-green-50 to-blue-50 py-10 lg:py-16 px-4 sm:px-6 lg:px-8">
      {/* Newsletter Section */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-12 w-full lg:w-2/3">
        {/* Icon and Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-green-600 rounded-2xl p-3 hover:shadow-lg hover:shadow-green-600/30 transition-all duration-300 ">
            <FontAwesomeIcon icon={faEnvelope} className="text-xl text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-green-600 uppercase tracking-wide">
              NEWSLETTER
            </h3>
            <p className="text-gray-600 text-sm">50,000+ subscribers</p>
          </div>
        </div>

        {/* Main Heading */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Get the Freshest Updates{" "}
          <span className="text-green-600">Delivered Free</span>
        </h2>

        {/* Description */}
        <p className="text-sm md:text-base lg:text-lg text-gray-600 mb-6 md:mb-8">
          Weekly recipes, seasonal offers & exclusive member perks.
        </p>

        {/* Benefits Tags */}
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
            <FontAwesomeIcon icon={faStar} className="text-green-600" />
            <span className="text-gray-700 font-medium text-sm">
              Fresh Picks Weekly
            </span>
          </div>

          <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
            <FontAwesomeIcon icon={faGift} className="text-green-600" />
            <span className="text-gray-700 font-medium text-sm">
              Free Delivery Codes
            </span>
          </div>

          <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
            <FontAwesomeIcon icon={faHeart} className="text-green-600" />
            <span className="text-gray-700 font-medium text-sm">
              Members-Only Deals
            </span>
          </div>
        </div>

        {/* Email Form */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="you@example.com"
            className="flex-1 px-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 text-gray-700"
          />
          <button className="bg-green-600 text-white px-5 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-green-600/30 transition-all duration-300 transition flex items-center justify-center gap-2">
            Subscribe
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>

        {/* Privacy Note */}
        <p className="text-sm text-gray-500 mt-4 flex items-center gap-1">
          <FontAwesomeIcon icon={faStar} className="text-yellow-400 text-xs" />
          Unsubscribe anytime. No spam, ever.
        </p>
      </div>

      {/* Mobile App Section */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 sm:p-8 lg:p-12 w-full lg:w-1/3">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-green-600/20 border border-green-600 px-4 py-2 rounded-full mb-6">
          <FontAwesomeIcon icon={faMobileAlt} className="text-green-400" />
          <span className="text-green-400 font-semibold text-sm uppercase tracking-wide">
            MOBILE APP
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-4">
          Shop Faster on Our App
        </h2>

        {/* Description */}
        <p className="text-gray-400 text-xs md:text-sm lg:text-base mb-6 md:mb-8">
          Get app-exclusive deals & 15% off your first order.
        </p>

        {/* Store Buttons */}
        <div className="space-y-4 mb-8">
          {/* App Store */}
          <button className="w-full bg-gray-700/50 border border-gray-600 hover:bg-gray-600 transition rounded-xl px-4 py-2 flex items-center gap-4">
            <div>
              <FontAwesomeIcon icon={faApple} className="text-xl text-white" />
            </div>
            <div className="text-left">
              <div className="text-gray-400 text-xs">DOWNLOAD ON</div>
              <div className="text-white font-bold text-lg">App Store</div>
            </div>
          </button>

          {/* Google Play */}
          <button className="w-full bg-gray-700/50 border border-gray-600 hover:bg-gray-600 transition rounded-xl px-4 py-2 flex items-center gap-4">
            <div>
              <FontAwesomeIcon
                icon={faGooglePlay}
                className="text-xl text-white"
              />
            </div>
            <div className="text-left">
              <div className="text-gray-400 text-xs">GET IT ON</div>
              <div className="text-white font-bold text-lg">Google Play</div>
            </div>
          </button>
        </div>

        {/* Rating */}
        <div className="flex flex-wrap items-center gap-1 text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <FontAwesomeIcon key={i} icon={faStar} className="text-sm" />
          ))}
          <span className="text-white font-bold ml-2">4.9</span>
          <span className="text-gray-400">• 100K+ downloads</span>
        </div>
      </div>
    </div>
  );
}
