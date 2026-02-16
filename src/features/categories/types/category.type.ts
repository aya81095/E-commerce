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