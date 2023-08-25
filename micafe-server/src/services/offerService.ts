import { type IOffer, Offer } from '../models/offerModel';
import { Product } from '../models/productModel';

export const getOfferByProduct = async (
  productId: string
): Promise<IOffer | null> => {
  return await Offer.findOne({ productId });
};

export const create = async (o: IOffer): Promise<IOffer | null> => {
  return await Offer.create(o);
};

export const createByCategory = async (
  idCategory: string,
  percentage: number,
  startSale: Date,
  endSale: Date
): Promise<IOffer[] | null> => {
  const products = await Product.find({ category: idCategory });
  const createdOffers: IOffer[] = [];
  for (const p of products) {
    const newOffer = await Offer.create({
      productId: p._id,
      isPercentage: true,
      value: percentage,
      startSale,
      endSale
    });
    createdOffers.push(newOffer);
  }
  return createdOffers;
};

export const getOffersWithProducts = async (): Promise<IOffer[]> => {
  return await Offer.find({ isDeleted: false }).populate('productId').sort({
    status: 1
  });
};

export const deleteOffer = async (id: any): Promise<IOffer | null> => {
  const offer = await Offer.findOne({ id, isDeleted: false });
  if (offer != null) {
    const product = await Product.findById(offer.productId);

    if (product != null) {
      product.isOnSale = false;
      product.salePrice = null;

      await product.save();
    }

    offer.isDeleted = true;
    offer.status = 'expired';

    await offer.save();
    return offer;
  }
  return null;
};
