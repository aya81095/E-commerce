export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}

export interface CategoryResponse {
  results: number;
  metadata: CategoryMetadata;
  data: Category[];
}

export interface SingleCategoryResponse {
  data: Category;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SubcategoryResponse {
  results: number;
  metadata: CategoryMetadata;
  data: Subcategory[];
}

export interface SingleSubcategoryResponse {
  data: Subcategory;
}
