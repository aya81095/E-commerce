import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { getAllCategories } from "../../categories/server/categories.actions";
import Link from "next/link";
import Image from "next/image";

export default async function OurCategories() {
  const response = await getAllCategories();
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 flex items-center gap-2">
          <span className="w-1 h-6 md:h-8 bg-green-600 rounded-full"></span>
          Shop By <span className="text-green-600">Category</span>
        </h2>

        <Link
          href="/categories"
          className="text-green-600 font-medium flex items-center gap-1 hover:gap-2 transition-all text-sm md:text-base"
        >
          View All Categories
          <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {response?.data.map((category) => (
          <Link
            href={`/categories/${category._id}`}
            key={category._id}
            className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 shadow-sm hover:shadow-md transition cursor-pointer"
          >
            <div className="w-20 h-20 rounded-full bg-white overflow-hidden flex items-center justify-center mx-auto ">
              <Image
                src={category.image}
                alt={category.name}
                width={300}
                height={300}
                className="w-full h-full object-cover "
              />
            </div>
            <p className="text-sm font-medium text-gray-700 text-center">
              {category.name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
