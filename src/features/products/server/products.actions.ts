"use server";

import axios, { AxiosRequestConfig } from "axios";
import { ProductResponse, singleProductResponse } from "../types/product.type";

export async function getFeaturedProducts(): Promise<ProductResponse> {
  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllProducts(limit?: number): Promise<ProductResponse> {
  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
      params: limit ? { limit } : undefined,
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function getProductDetails({
  id,
}: {
  id: string;
}): Promise<singleProductResponse> {
  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
      method: "GET",
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function searchProducts(query: string): Promise<ProductResponse> {
  try {
    // Return empty results if query is too short
    if (!query || query.trim().length === 0) {
      return {
        results: 0,
        metadata: { currentPage: 1, numberOfPages: 0, limit: 10 },
        data: [],
      };
    }

    // Fetch all products first (with a high limit to get all products)
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
      params: {
        limit: 100, // Get more products to search through
      },
    };
    const { data } = await axios.request(options);

    console.log("Search query:", query);
    console.log("Total products fetched:", data.data?.length);
    console.log("First product title:", data.data?.[0]?.title);

    // Filter products based on query (case-insensitive search - matching start of words)
    const searchLower = query.toLowerCase().trim();

    // Helper function to check if any word starts with the search query
    const startsWithQuery = (text: string) => {
      if (!text) return false;
      const words = text.toLowerCase().split(/\s+/); // Split by whitespace
      return words.some((word) => word.startsWith(searchLower));
    };

    const filteredProducts = (data.data || []).filter((product: any) => {
      const titleMatch = startsWithQuery(product.title);
      const descriptionMatch = startsWithQuery(product.description);
      const categoryMatch = startsWithQuery(product.category?.name);
      const brandMatch = startsWithQuery(product.brand?.name);

      const matches =
        titleMatch || descriptionMatch || categoryMatch || brandMatch;

      if (matches) {
        console.log("Match found:", product.title);
      }

      return matches;
    });

    console.log("Filtered products count:", filteredProducts.length);
    console.log(
      "First 3 filtered product titles:",
      filteredProducts.slice(0, 3).map((p: any) => p.title),
    );

    const result = {
      results: filteredProducts.length,
      metadata: data.metadata || {
        currentPage: 1,
        numberOfPages: 1,
        limit: 10,
      },
      data: filteredProducts.slice(0, 10),
    };

    console.log("Returning result with data count:", result.data.length);

    // Return filtered results with limit of 10 for dropdown
    return result;
  } catch (error) {
    console.error("Search error:", error);
    throw error;
  }
}
