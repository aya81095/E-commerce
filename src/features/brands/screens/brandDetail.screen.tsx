"use client";

import { useEffect, useState } from "react";
import { getBrandById } from "../server/brands.actions";
import { Brand } from "../types/brand.types";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface BrandDetailScreenProps {
  brandId: string;
}

export default function BrandDetailScreen({ brandId }: BrandDetailScreenProps) {
  const [brand, setBrand] = useState<Brand | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        console.log("Starting to fetch brand, ID:", brandId);
        setIsLoading(true);
        const response = await getBrandById(brandId);
        console.log("Brand response:", response);
        console.log("Brand data:", response.data);
        setBrand(response.data);
      } catch (err) {
        console.error("Error fetching brand:", err);
        setError("Failed to load brand details");
      } finally {
        console.log("Finished loading");
        setIsLoading(false);
      }
    };

    if (brandId) {
      console.log("Brand ID received:", brandId);
      fetchBrand();
    } else {
      console.log("No brand ID provided");
      setIsLoading(false);
    }
  }, [brandId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FontAwesomeIcon
            icon={faSpinner}
            className="animate-spin text-4xl text-green-600 mb-4"
          />
          <p className="text-gray-600">Loading brand...</p>
        </div>
      </div>
    );
  }

  if (error || !brand) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">
            {error || "Brand not found"}
          </p>
          <Link
            href="/brands"
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Back to Brands
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
          href="/brands"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 mb-6 font-medium transition-colors"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to Brands
        </Link>

        {/* Brand Details */}
        <div className="bg-white rounded-lg shadow-md p-8 lg:p-12 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Brand Logo */}
            <div className="relative w-48 h-48 shrink-0">
              <Image
                src={brand.image}
                alt={brand.name}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Brand Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {brand.name}
              </h1>
              <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                Explore all products from {brand.name}
              </p>

              {/* Additional Info */}
              <div className="space-y-2 text-sm text-gray-500">
                {brand.slug && (
                  <p>
                    <span className="font-semibold">Slug:</span> {brand.slug}
                  </p>
                )}
                {brand.createdAt && (
                  <p>
                    <span className="font-semibold">Added:</span>{" "}
                    {new Date(brand.createdAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Products Section Placeholder */}
          <div className="mt-12 border-t pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Products from {brand.name}
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
