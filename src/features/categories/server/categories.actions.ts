"use server";
import axios from "axios";
import {
  CategoryResponse,
  SingleSubcategoryResponse,
} from "../types/category.type";

export async function getAllCategories(): Promise<CategoryResponse> {
  try {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/categories",
      method: "GET",
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getSubcategoriesByCategoryId(
  categoryId: string,
): Promise<CategoryResponse> {
  try {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`,
      method: "GET",
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getSubcategoryById(
  subcategoryId: string,
): Promise<SingleSubcategoryResponse> {
  try {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/subcategories/${subcategoryId}`,
      method: "GET",
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    console.error("Error fetching subcategory:", error);
    throw error;
  }
}
