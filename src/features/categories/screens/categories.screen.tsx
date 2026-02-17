import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAllCategories } from "../../categories/server/categories.actions";
import Link from "next/link";
import Image from "next/image";
import {
  faArrowRightLong,
  faLayerGroup,
  faLeftLong,
} from "@fortawesome/free-solid-svg-icons";

export default async function CategoriesScreen() {
  const response = await getAllCategories();
  return (
    <section className="">
      {/* Header */}
      <div className="flex items-center gap-2 md:gap-3 bg-green-600 w-full p-4 md:p-6">
        <div className="text-white size-12 md:size-14 lg:size-16 rounded-xl md:rounded-2xl bg-gray-50/20 border backdrop-blur-sm border-gray-50/20 shadow-md text-xl md:text-2xl lg:text-3xl flex items-center justify-center">
          <FontAwesomeIcon icon={faLayerGroup} />
        </div>

        <div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
            All Categories
          </h1>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 py-12 px-4 sm:px-6 lg:px-8">
        {response?.data.map((category) => (
          <Link
            href={`/categories/${category._id}`}
            key={category._id}
            className="group bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 shadow-sm hover:shadow-md transition cursor-pointer"
          >
            <div className="w-56 h-56 rounded-2xl bg-white overflow-hidden flex items-center justify-center mx-auto ">
              <Image
                src={category.image}
                alt={category.name}
                width={300}
                height={300}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <p className="text-sm font-bold text-gray-700 text-center">
              {category.name}
            </p>
            <div className="flex items-center gap-1 text-green-600 opacity-0 transition-all duration-500 group-hover:opacity-100 ">
              <span className="text-sm text-green-600">View Subcategories</span>
              <FontAwesomeIcon
                icon={faArrowRightLong}
                className=" text-green-600"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
