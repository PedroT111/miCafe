import { Discount, IDiscount } from '../models/discountModel';
import { IOrder } from '../models/orderModel';

export const applyDiscount = async (
  order: IOrder,
  discountCode: string,
  customerId: string
) => {
    try{
        const discount = await Discount.findOne({
            code: discountCode,
            user: customerId,
            status: 'active',
            used: false
        });
        if(discount === null){
            return null;
        } 
        if(discount.discountType === 'fixedAmount'){
            order.discountedAmount = order.totalAmount - discount.value;
        } else if( discount.discountType === 'percentage'){
            order.discountedAmount = (1- discount.value / 100) * order.totalAmount;
        }
        discount.used = true;
        await discount.save();
        order.discountCode = discount.code;
        return order; 
    }
    catch(err){
        console.log(err);
        throw(err);
    }
};
