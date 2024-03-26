/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product } from "./product";

export interface Offer{
    _id: string;
    productId: Product;
    isPercentage: boolean;
    value: any;
    startSale: Date;
    endSale: Date;
    status: string;
}

export interface OfferProduct{
    _id: string;
    productName: string;
    price: number;
    salePrice: number;
    percentage: string;
    startSale: string;
    endSale: string;
    status: string;
}

export interface OfferCategory{
    categoryId: string;
    value: number;
    startSale: Date;
    endSale: Date;
}

export interface OfferApiResponse{
    ok: boolean;
    offer: Offer
}

export interface OffersList{
    ok: boolean;
    offers: Offer[];
}