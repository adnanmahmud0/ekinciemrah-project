export interface CategoryPrice {
  categoryName: string;
  price: string;
}

export interface Product {
  _id: string;
  productName: string;
  description: string;
  category: string;
  unit: string;
  basePrice: number;
  customerTypePrice: CategoryPrice[];
  image: string;
  stock: number;
  status?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ProductResponse {
  success: boolean;
  message: string;
  data: {
    meta?: {
      page: number;
      limit: number;
      total: number;
    };
    data: Product[];
  };
}

export interface SingleProductResponse {
  success: boolean;
  message: string;
  data: Product;
}
