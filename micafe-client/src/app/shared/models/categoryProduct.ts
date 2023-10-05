export interface CategoryProduct{
    _id: string;
    name: string;
}

export interface ListCategoryResponse{
    ok: boolean;
    categories: CategoryProduct[];
}

export interface CategoryApiResponse{
    ok: boolean;
    category: CategoryProduct;
}