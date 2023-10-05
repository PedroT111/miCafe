
export interface Combo{
    _id: string;
    name: string;
    price: number;
    points?: number;
    description: string;
    urlImage: string;
    products: IProductQuantity[];
    isActive: boolean;
    isDeleted: boolean;
}
interface IProductQuantity {
    product: string;
    quantity: number;
}

export interface ComboApiResponse{
    ok: boolean;
    combo: Combo;
}


export interface ListCombosApiResponse{
    ok: boolean;
    combos: ComboSummary[]
}

export interface ComboSummary{
    _id: string;
    name: string;
    price: number;
    points: number;
    description: string;
    urlImage: string;
    isActive: string;
}