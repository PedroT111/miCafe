export interface Discount {
    _id?: string;
    code: string;
    description: string;
    discountType: 'fixedAmount' | 'percentage';
    value: number;
    expirationDate: Date;
    user?: string;
    status?: 'active' | 'expired';
    used?: boolean;
    isDeleted?: boolean;
}

export interface DiscountSummary{
    code: string;
    description: string;
    discountType: 'fixedAmount' | 'percentage';
    value: string;
    expirationDate: string;
    status: 'active' | 'expired';
    count: number;
    usedDiscounts: number;
}

export interface DiscountList{
    ok: boolean;
    discounts: DiscountSummary[];
}

export interface DiscountForm {
    code: string;
    description: string;
    discountType: 'fixedAmount' | 'percentage';
    value: number;
    expirationDate: Date;
    filters: {
      numberDaysLastOrder: number | null;
      periodTime: number | null;
      limit: number | null;
    };
  }