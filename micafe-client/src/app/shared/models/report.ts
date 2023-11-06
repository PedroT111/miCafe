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