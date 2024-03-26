/* eslint-disable @typescript-eslint/no-misused-promises */
import cron from 'node-cron';
import { Offer } from '../models/offerModel';
import { Product } from '../models/productModel';

const offerScheduler = (): void => {
  cron.schedule(
    '*/1 * * * *',
    async () => {
      try {
        const now = new Date().toLocaleString();
        const activeOffers = await Offer.find({
          startSale: { $lte: now },
          endSale: { $gte: now },
          isDeleted: false
        });

        for (const offer of activeOffers) {
          const product = await Product.findById(offer.productId);

          if (product != null) {
            if (offer.isPercentage) {
              const discountAmount = (product.price * offer.value) / 100;
              product.salePrice = product.price - discountAmount;
            } else {
              product.salePrice = offer.value;
            }

            product.isOnSale = true;
            offer.status = 'active';
            await offer.save();
            await product.save();
          }
        }

        // Restablecer productos cuando las ofertas han expirado
        const expiredOffers = await Offer.find({
          endSale: { $lt: now },
          isDeleted: false
        });

        for (const offer of expiredOffers) {
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
      } catch (error) {
        console.error('Error in offerScheduler:', error);
      }
    },
    {
      scheduled: true
    }
  );
};

export default offerScheduler;
