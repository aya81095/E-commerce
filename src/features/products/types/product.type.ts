export interface ProductSubcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface ProductCategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface ProductBrand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  priceAfterDiscount?: number;
  sold: number | null;
  images: string[];
  imageCover: string;
  category: ProductCategory;
  subcategory: ProductSubcategory[];
  brand: ProductBrand;
  ratingsAverage?: number;
  ratingsQuantity: number;
  availableColors?: string[];
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface ProductMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number;
}

export interface ProductResponse {
  results: number;
  metadata: ProductMetadata;
  data: Product[];
}

export interface singleProductResponse {
    data: Product;
}