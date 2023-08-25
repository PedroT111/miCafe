import { Product } from "./product";

export interface Offer{
    _id: string;
    productId: Product;
    isPercentage: boolean;
    value: number
    startSale: Date;
    endSale: Date;
    status: string;
}

export interface OfferProduct{
    _id: string;
    productName: string;
    price: number;
    salePrice: number;
    startSale: string;
    endSale: string;
    status: string;
}

export interface OfferApiResponse{
    ok: boolean;
    offer: Offer
}

export interface OffersList{
    ok: boolean;
    offers: Offer[];
}