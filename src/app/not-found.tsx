import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearch, faLemon, faEgg, faBreadSlice, faDrumstickBite, faPhone, faEnvelope, faComments } from "@fortawesome/free-solid-svg-icons";

export default function notFoundPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Breadcrumb - Optional based on image */}
         <div className="bg-gray-100 py-4">
             <div className="container mx-auto px-4 text-sm text-gray-500">
                 <Link href="/" className="text-green-600">Home</Link> <span className="mx-1">{">"}</span> 404 Error
             </div>
         </div>

        {/* 404 Hero Section */}
        <section className="py-12 md:py-20 flex flex-col items-center justify-center text-center px-4">
          <div className="relative mb-6 md:mb-8">
              {/* Using text representation for the 404 image */}
              <div className="text-8xl md:text-[150px] font-bold text-green-100 leading-none select-none">
                  4<span className="text-[#0aad0a]">0</span>4
              </div>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#0aad0a] text-4xl md:text-6xl">
                 <FontAwesomeIcon icon={faSearch} className="opacity-0" />
               </div>
          </div>
          
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-gray-500 mb-6 md:mb-8 max-w-md text-sm md:text-base">
            The page you&apos;re looking for seems to have gone shopping! Don&apos;t worry, our fresh products are still available for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <Link
              href="/"
              className="bg-[#0aad0a] hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors text-sm md:text-base"
            >
                <FontAwesomeIcon icon={faHome} />
              Back to Home
            </Link>
             <Link
              href="#"
              className="border border-[#0aad0a] text-[#0aad0a] hover:bg-green-50 px-6 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors text-sm md:text-base"
            >
                <FontAwesomeIcon icon={faSearch} />
              Search Products
            </Link>
          </div>
        </section>

        {/* Popular Categories */}
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4 text-center">
                 <h2 className="text-xl font-bold text-gray-900 mb-8">
                    Or explore our popular categories
                 </h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                     {[
                         { icon: faLemon, name: "Fruits & Vegetables", color: "text-green-600", bg: "bg-green-100" },
                         { icon: faEgg, name: "Dairy & Eggs", color: "text-green-600", bg: "bg-green-100"  },
                         { icon: faBreadSlice, name: "Bakery & Snacks", color: "text-green-600", bg: "bg-green-100"  },
                         { icon: faDrumstickBite, name: "Meat & Seafood", color: "text-green-600", bg: "bg-green-100"  },
                     ].map((cat, idx) => (
                         <Link key={idx} href="#" className="bg-white border border-gray-100 hover:border-green-200 hover:shadow-lg rounded-xl p-6 transition-all group">
                             <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4 ${cat.bg} ${cat.color}`}>
                                 <FontAwesomeIcon icon={cat.icon} />
                             </div>
                             <h3 className="text-sm font-semibold text-gray-900 group-hover:text-green-600">{cat.name}</h3>
                         </Link>
                     ))}
                 </div>
            </div>
        </section>

        {/* Need Help Section */}
         <section className="py-16 bg-green-50">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Need Help?</h2>
                 <p className="text-gray-500 mb-6">Our customer support team is here to assist you 24/7</p>
                 <div className="flex flex-col md:flex-row justify-center gap-8 text-sm font-medium text-gray-700">
                     <span className="flex items-center gap-2">
                         <FontAwesomeIcon icon={faPhone} className="text-green-600" />
                         +1 (800) 123-4567
                     </span>
                      <span className="flex items-center gap-2">
                         <FontAwesomeIcon icon={faEnvelope} className="text-green-600" />
                         support@freshcart.com
                     </span>
                      <span className="flex items-center gap-2">
                         <FontAwesomeIcon icon={faComments} className="text-green-600" />
                         Live Chat
                     </span>
                 </div>
            </div>
         </section>

         {/* Newsletter Section */}
         <section className="py-16 bg-green-50/50">
              <div className="container mx-auto px-4">
                  <div className="max-w-3xl mx-auto text-center">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Subscribe to our Newsletter</h2>
                      <p className="text-gray-500 mb-8">Stay updated with our latest offers, recipes, and health tips.</p>
                      
                      <div className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
                          <input type="email" placeholder="Your email address" className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500" />
                          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                              Subscribe
                          </button>
                      </div>
                  </div>
              </div>
         </section>
      </main>
    </div>
  );
}
