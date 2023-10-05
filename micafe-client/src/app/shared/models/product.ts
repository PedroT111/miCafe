import { CategoryProduct } from "./categoryProduct";

export interface Product{
    _id: string;
    name: string;
    price: number;
    description: string;
    urlImage: string;
    category: CategoryProduct;
    hasMilk: boolean;
    points: number;
    isOnSale: boolean;
    salePrice: number;
    isActive: boolean;
    isDeleted: boolean;
}

export interface ListProductApiResponse{
    ok: boolean;
    products: Product[];
}

export interface ProductApiResponse{
    ok:boolean,
    product: Product
}

export interface ProductSummary{
    _id: string
    name: string;
    category: CategoryProduct;
    price: number;
    description: string;
    urlImage: string;
    points: number;
    isActive: string;
}
