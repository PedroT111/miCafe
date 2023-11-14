export interface ListMostSoldProducts{
    ok: boolean;
    products: ProductSold[];
}

export interface ProductSold{
    name: string;
    totalQuantity: number;
    productId: string;
}

export interface ListSales{
    ok:boolean;
    sales: Sales[];
}

export interface Sales{
    _id: number;
    totalAmount: number;
}

export interface ListCalifications{
    ok: boolean;
    distribution: Distribution[];
}

export interface Distribution{
    _id: number;
    count: number;
}

export interface ListDistributionAvgCalifications{
    ok:boolean;
    distribution: DistributionAndAvg;
}

export interface DistributionAndAvg{
    ratingDistribution: Distribution[];
    averageRating: number;
}

export interface CategorySale{
    _id: string;
    categoryName: string;
    totalAmount: number;
}

export interface ListCategorySales{
    ok: boolean;
    categories: CategorySale[];
}

export interface ListNewCustomersByMonth{
    ok: boolean;
    newCustomers: UsersByMonth[]
}

export interface UsersByMonth{
    _id: number;
    newUsers: number;
}