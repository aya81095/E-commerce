import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import {
  getAllCategories,
  getSubcategoriesByCategoryId,
} from "../server/categories.actions";
export default async function SubcategoriesScreen({
  categoryId,
}: {
  categoryId: string;
}) {
  const response = await getSubcategoriesByCategoryId(categoryId);
  const data = await getAllCategories();
  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center gap-3 bg-green-600 w-full p-6">
        <div className="text-white size-16 rounded-2xl bg-gray-50/20 border backdrop-blur-sm border-gray-50/20 shadow-md flex items-center justify-center overflow-hidden ">
          <Image
            src={
              data.data.find((cat) => cat._id === categoryId)?.image ||
              "/placeholder.png"
            }
            alt="Subcategories Icon"
            width={96}
            height={96}
            className="w-full h-full rounded-2xl object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-white">
            {data.data.find((cat) => cat._id === categoryId)?.name ||
              "Category"}{" "}
            Subcategories
          </h1>
        </div>
      </div>

      {/* card body */}
      <div
        className="
      grid 
      grid-cols-1 
      sm:grid-cols-2 
      md:grid-cols-3 
      lg:grid-cols-4 
      gap-6 px-8 py-12
    "
      >
        {response?.data.map((category) => (
          <Link
            href={`/categories/${category._id}`}
            key={category._id}
            className="
          group bg-white border border-gray-200 rounded-2xl p-6 
          flex flex-col items-center justify-center 
          h-64
          transition-all duration-300 
          hover:shadow-lg hover:-translate-y-1
        "
          >
            {/* Icon */}
            <div
              className="
            w-16 h-16 rounded-2xl 
            flex items-center justify-center 
            bg-gray-100 text-green-600 text-2xl 
            transition-all duration-300
            group-hover:bg-green-100
          "
            >
              <FontAwesomeIcon icon={faLayerGroup} />
            </div>

            {/* Title */}
            <h3
              className="
            mt-6 text-lg font-semibold text-gray-800 text-center 
            transition-colors duration-300 
            group-hover:text-green-600
          "
            >
              {category.name}
            </h3>
            <div className="h-6 mt-2 flex items-center justify-center">
              <span
                className="
              text-sm text-green-600 opacity-0 
              transition-opacity duration-300 
              group-hover:opacity-100
            "
              >
                Browse Products →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
