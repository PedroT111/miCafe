import { CategoryProduct } from "./categoryProduct";

export interface Product{
    _id: string;
    name: string;
    price: number;
    description: string;
    urlImage: string;
    category: CategoryProduct;
    hasMilk: boolean;
    isOnSale: boolean;
    salePrice: number;
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
    price: number;
    description: string;
    category: string;
}
