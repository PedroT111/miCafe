/* eslint-disable @typescript-eslint/no-misused-promises */
import cron from 'node-cron';
import { Discount } from '../models/discountModel';

const discountScheduler = (): void => {
  cron.schedule(
    '0 0 * * *',
    async () => {
      try {
        const now = new Date();
        const expiredDiscounts = await Discount.find({
          isDeleted: false,
          status: 'active',
          expirationDate: { $lt: now }
        });

        for (const discount of expiredDiscounts) {
          discount.status = 'expired';
          await discount.save();
        }
      } catch (error) {
        console.error('Error in discountScheduler:', error);
      }
    },
    {
      scheduled: true
    }
  );
};

export default discountScheduler;
