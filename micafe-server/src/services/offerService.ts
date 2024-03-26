import { type IOffer, Offer } from '../models/offerModel';
import { Product } from '../models/productModel';

export const getOne = async (id: any): Promise<IOffer | null> => {
  return await Offer.findById(id).populate('productId');
};

export const getOfferByProduct = async (
  productId: string
): Promise<IOffer | null> => {
  return await Offer.findOne({ productId });
};

export const create = async (offer: IOffer): Promise<IOffer | null> => {
  return await Offer.create(offer);
};

export const createByCategory = async (
  idCategory: string,
  percentage: number,
  startSale: Date,
  endSale: Date
): Promise<IOffer[] | null> => {
  const products = await Product.find({ category: idCategory, isDeleted:false });
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

export const editOffer = async (
  id: any,
  offer: IOffer
): Promise<IOffer | null> => {
  const now = new Date();
  const startSale =
    offer.startSale instanceof Date
      ? offer.startSale
      : new Date(offer.startSale);
  const endSale =
    offer.endSale instanceof Date ? offer.endSale : new Date(offer.endSale);
  if (endSale >= now && now >= startSale) {
    offer.status = 'active';
  } else if (startSale > now) {
    offer.status = 'scheduled';
  } else {
    offer.status = 'expired';
  }
  return await Offer.findByIdAndUpdate(
    id,
    {
      ...offer
    },
    { new: true }
  );
};

export const deleteOffer = async (_id: any): Promise<IOffer | null> => {
  const offer = await Offer.findOne({ _id, isDeleted: false });
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
  }
  return offer;
};
