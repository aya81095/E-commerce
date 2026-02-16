import { getFeaturedProducts } from "../../products/server/products.actions";

import ProductCard from "../../products/components/productcard";
export default async function FeaturedProducts() {
    const response = await getFeaturedProducts();
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
        <span className="w-1 h-8 bg-green-600 rounded-full"></span>
        Featured <span className="text-green-600">Products</span>
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {response?.data.map((product) => (
          <ProductCard productInfo={product} key={product.id} />
        ))}
      </div>
    </section>
  );
}
