// Types generated from sample wishlist response (provided by user)

export interface WishlistSubcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface WishlistCategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface WishlistBrand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface WishlistProduct {
  sold: number;
  images: string[];
  subcategory: WishlistSubcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  priceAfterDiscount?: number;
  imageCover: string;
  category: WishlistCategory;
  brand: WishlistBrand;
  ratingsAverage?: number;
  createdAt: string;
  updatedAt: string;
  __v?: number;
  id: string;
}

export interface WishlistResponse {
  status: string;
  count: number;
  data: WishlistProduct[];
}

export type { WishlistProduct as WishlistItem };
