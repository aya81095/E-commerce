import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFireFlameCurved,
  faStar,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

export default function DealsCards() {
  return (
    <div className="bg-white py-5">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Deal of the Day - Green Card */}
          <div className="relative bg-gradient-to-br from-green-700/90 to-green-800/90 rounded-3xl lg:px-10 lg:py-5 p-5 overflow-hidden">
            {/* Decorative Circle */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-green-400 opacity-20 rounded-full -translate-y-1/2 translate-x-1/2"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full mb-6">
                <FontAwesomeIcon
                  icon={faFireFlameCurved}
                  className="text-orange-500"
                />
                <span className="text-white text-sm">Deal of the Day</span>
              </div>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">
                Fresh Organic Fruits
              </h2>

              <p className="text-white text-base md:text-lg mb-4 md:mb-5 opacity-90">
                Get up to 40% off on selected organic fruits
              </p>

              <div className="flex flex-wrap items-baseline gap-2 md:gap-3 mb-4 md:mb-5">
                <span className="text-2xl md:text-3xl font-bold text-white">
                  40% OFF
                </span>
                <div className="text-white">
                  <span className="text-sm opacity-90">Use code: </span>
                  <span className="font-bold">ORGANIC40</span>
                </div>
              </div>

              <button className="bg-white text-green-600 px-5 py-2 rounded-full font-bold text-md transition flex items-center gap-2 cursor-pointer hover:shadow-lg transition-all duration-300">
                Shop Now
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-green-600"
                />
              </button>
            </div>
          </div>

          {/* New Arrivals - Orange/Red Card */}
          <div className="relative bg-gradient-to-br from-orange-500/90 to-red-500/90 rounded-3xl lg:px-10 lg:py-5 p-5 overflow-hidden">
            {/* Decorative Circle */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-400 opacity-20 rounded-full -translate-y-1/2 translate-x-1/2"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
                <FontAwesomeIcon icon={faStar} className="text-yellow-300" />
                <span className="text-white text-sm">New Arrivals</span>
              </div>

              <h2 className="text-3xl font-bold text-white mb-4">
                Exotic Vegetables
              </h2>

              <p className="text-white text-lg mb-5 opacity-90">
                Discover our latest collection of premium vegetables
              </p>

              <div className="flex items-baseline gap-3 mb-5">
                <span className="text-3xl font-bold text-white">25% OFF</span>
                <div className="text-white">
                  <span className="text-sm opacity-90">Use code: </span>
                  <span className="font-bold">FRESH25</span>
                </div>
              </div>

              <button className="bg-white text-orange-600 px-5 py-2 rounded-full font-bold text-md transition flex items-center gap-2 cursor-pointer hover:shadow-lg transition-all duration-300">
                Explore Now
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-orange-600"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
