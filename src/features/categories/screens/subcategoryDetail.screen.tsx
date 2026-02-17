"use client";

import { useEffect, useState } from "react";
import { getSubcategoryById } from "../server/categories.actions";
import { Subcategory } from "../types/category.type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faArrowLeft,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface SubcategoryDetailScreenProps {
  subcategoryId: string;
}

export default function SubcategoryDetailScreen({
  subcategoryId,
}: SubcategoryDetailScreenProps) {
  const [subcategory, setSubcategory] = useState<Subcategory | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubcategory = async () => {
      try {
        console.log("Starting to fetch subcategory, ID:", subcategoryId);
        setIsLoading(true);
        const response = await getSubcategoryById(subcategoryId);
        console.log("Subcategory response:", response);
        setSubcategory(response.data);
      } catch (err) {
        console.error("Error fetching subcategory:", err);
        setError("Failed to load subcategory details");
      } finally {
        console.log("Finished loading");
        setIsLoading(false);
      }
    };

    if (subcategoryId) {
      console.log("Subcategory ID received:", subcategoryId);
      fetchSubcategory();
    } else {
      console.log("No subcategory ID provided");
      setIsLoading(false);
    }
  }, [subcategoryId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FontAwesomeIcon
            icon={faSpinner}
            className="animate-spin text-4xl text-green-600 mb-4"
          />
          <p className="text-gray-600">Loading subcategory...</p>
        </div>
      </div>
    );
  }

  if (error || !subcategory) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">
            {error || "Subcategory not found"}
          </p>
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Back to Categories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link
          href={`/categories/${subcategory.category}`}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 mb-6 font-medium transition-colors"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to Subcategories
        </Link>

        {/* Subcategory Details */}
        <div className="bg-white rounded-lg shadow-md p-8 lg:p-12 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Subcategory Icon */}
            <div className="relative w-48 h-48 shrink-0 bg-green-50 rounded-full flex items-center justify-center">
              <FontAwesomeIcon
                icon={faLayerGroup}
                className="text-6xl text-green-600"
              />
            </div>

            {/* Subcategory Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {subcategory.name}
              </h1>
              <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                Explore all products in {subcategory.name}
              </p>

              {/* Additional Info */}
              <div className="space-y-2 text-sm text-gray-500">
                {subcategory.slug && (
                  <p>
                    <span className="font-semibold">Slug:</span>{" "}
                    {subcategory.slug}
                  </p>
                )}
                {subcategory.createdAt && (
                  <p>
                    <span className="font-semibold">Added:</span>{" "}
                    {new Date(subcategory.createdAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Products Section Placeholder */}
          <div className="mt-8 md:mt-12 border-t pt-6 md:pt-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              Products in {subcategory.name}
            </h2>
            <p className="text-gray-600">
              Product listing will be available soon...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
