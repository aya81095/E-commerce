// Subcategory type
export interface CartSubcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

// Category type
export interface CartCategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// Brand type
export interface CartBrand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// Product in cart
export interface CartProduct {
  subcategory: CartSubcategory[];
  _id: string;
  title: string;
  slug: string;
  quantity: number;
  imageCover: string;
  category: CartCategory;
  brand: CartBrand;
  ratingsAverage: number;
  id: string;
}

// Cart item (product with count and price)
export interface CartItem {
  count: number;
  _id: string;
  product: CartProduct;
  price: number;
}

// Cart data
export interface CartData {
  _id: string;
  cartOwner: string;
  products: CartItem[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

// Full cart response
export interface CartResponse {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: CartData;
}