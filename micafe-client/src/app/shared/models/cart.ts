/* eslint-disable @typescript-eslint/no-explicit-any */

import { Combo } from "./combo";
import { Product } from "./product";

export interface CartProductItem{
    product: Product,
    quantity: number;
}

export interface CartComboItem{
    combo: Combo;
    quantity: number;
}