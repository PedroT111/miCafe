export interface Supplier{
    _id: string;
    name: string;
    celphone: string;
    address: string;
    email: string;
    isDeleted: boolean;
}

export interface SupplierList{
    ok: boolean;
    supplier: Supplier[];
}

export interface SupplierResponse{
    ok: boolean;
    supplier: Supplier;
}