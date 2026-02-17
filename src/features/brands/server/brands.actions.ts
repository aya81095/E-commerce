"use server";

import axios, { AxiosRequestConfig } from "axios";
import { BrandResponse, SingleBrandResponse } from "../types/brand.types";

export async function getAllBrands(
  limit?: number,
  keyword?: string,
): Promise<BrandResponse> {
  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/brands",
      method: "GET",
      params: {
        ...(limit && { limit }),
        ...(keyword && { keyword }),
      },
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw error;
  }
}

export async function getBrandById(id: string): Promise<SingleBrandResponse> {
  try {
    console.log("Fetching brand with ID:", id);
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
      method: "GET",
    };
    const { data } = await axios.request(options);
    console.log("Brand fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Error fetching brand:", error);
    throw error;
  }
}
