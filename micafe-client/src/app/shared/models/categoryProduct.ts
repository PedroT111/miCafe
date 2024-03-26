import { Product } from "./product";

export interface CategoryProduct{
    _id: string;
    name: string;
}

export interface CategoryWithProducts{
    _id: string;
    name: string;
    products: Product[];
}

export interface ListCategorySummary{
    ok: boolean;
    categories: CategoryWithProducts[];
}

export interface ListCategoryResponse{
    ok: boolean;
    categories: CategoryProduct[];
}

export interface CategoryApiResponse{
    ok: boolean;
    category: CategoryProduct;
}