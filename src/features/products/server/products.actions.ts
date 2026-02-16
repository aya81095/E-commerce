"use server"

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

export async function getProductDetails({id}: {id: string}): Promise<singleProductResponse> {
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
