export interface CategoryProduct{
    _id: string;
    name: string;
}

export interface ListCategoryResponse{
    ok: boolean;
    categories: CategoryProduct[];
}