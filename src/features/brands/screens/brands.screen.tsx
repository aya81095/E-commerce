"use client";

import { useEffect, useState } from "react";
import { getAllBrands } from "../server/brands.actions";
import { Brand } from "../types/brand.types";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function BrandsScreen() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setIsLoading(true);
        const response = await getAllBrands(50); // Get 50 brands
        setBrands(response.data || []);
      } catch (err) {
        console.error("Error fetching brands:", err);
        setError("Failed to load brands");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBrands();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FontAwesomeIcon
            icon={faSpinner}
            className="animate-spin text-4xl text-green-600 mb-4"
          />
          <p className="text-gray-600">Loading brands...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Shop by Brand
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            Discover products from your favorite brands
          </p>
        </div>

        {/* Brands Grid */}
        {brands.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
            {brands.map((brand) => (
              <Link
                key={brand._id}
                href={`/brands/${brand._id}`}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col items-center justify-center group"
              >
                <div className="relative w-24 h-24 mb-3">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    className="object-contain group-hover:scale-110 transition-transform"
                    sizes="96px"
                  />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 text-center group-hover:text-green-600 transition-colors">
                  {brand.name}
                </h3>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No brands available</p>
          </div>
        )}
      </div>
    </div>
  );
}
