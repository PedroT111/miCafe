import mongoose, { ObjectId } from 'mongoose';
import { RatingDistribution, productTotalQuantitySold } from '../Dto/reportDto';
import { Order } from '../models/orderModel';
import { Product } from '../models/productModel';

export const getMostSelledProducts = async (
  startDate: Date,
  endDate: Date
): Promise<productTotalQuantitySold[]> => {
  const orders = await Order.aggregate([
    {
      $match: {
        date: { $gte: startDate, $lte: endDate }
      }
    },
    {
      $unwind: '$products'
    },
    {
      $group: {
        _id: '$products.product',
        totalQuantity: { $sum: '$products.quantity' }
      }
    },
    {
      $sort: { totalQuantity: -1 }
    },
    {
      $project: {
        _id: 0,
        productId: '$_id',
        totalQuantity: 1
      }
    },
    {
      $limit: 20
    }
  ]);
  const productIds = orders.map((order) => order.productId);
  const productNames = await Product.find({
    _id: { $in: productIds }
  });
  const result = orders.map((order) => {
    const product = productNames.find(
      (product) => product._id.toString() === order.productId.toString()
    );
    return {
      name: product ? product.name : 'Desconocido',
      totalQuantity: order.totalQuantity,
      productId: order.productId
    };
  });
  return result;
};

export const getOrderRatingDistribution = async (startDate: Date, endDate: Date): Promise<
  RatingDistribution[]
> => {
  const ratingDistribution = await Order.aggregate([
    {
      $match: {
        status: 'pickedUp',
        qualification: { $exists: true, $ne: null },
        date: { $gte: startDate, $lte: endDate }
      }
    },
    {
      $group: {
        _id: '$qualification',
        count: { $sum: 1 }
      }
    },
    {
      $sort: {
        _id: -1
      }
    }
  ]);

  return ratingDistribution;
};

export const getOrderRatingDistributionByEmployee = async (
  employee: string
): Promise<any> => {
  const id = new mongoose.Types.ObjectId(employee);
  const ratingDistribution = await Order.aggregate([
    {
      $match: {
        employee: id,
        status: 'pickedUp',
        qualification: { $exists: true, $ne: null }
      }
    },
    {
      $group: {
        _id: '$qualification',
        count: { $sum: 1 }
      }
    },
    {
      $sort: {
        _id: 1
      }
    }
  ]);

  return ratingDistribution;
};

export const getMonthlySales = async (year: string): Promise<any> => {
  const salesReport = await Order.aggregate([
    {
      $match: {
        status: 'pickedUp',
        date: {
          $gte: new Date(`${year}-01-01T00:00:00.000Z`),
          $lte: new Date(`${year}-12-31T23:59:59.999Z`)
        }
      }
    },
    {
      $group: {
        _id: { $month: '$date' },
        totalAmount: { $sum: '$totalAmount' }
      }
    },
    {
      $sort: {
        _id: 1
      }
    },
    {
      $project: {
        _id: {
          $switch: {
            branches: [
              { case: { $eq: ['$_id', 1] }, then: 'Enero' },
              { case: { $eq: ['$_id', 2] }, then: 'Febrero' },
              { case: { $eq: ['$_id', 3] }, then: 'Marzo' },
              { case: { $eq: ['$_id', 4] }, then: 'Abril' },
              { case: { $eq: ['$_id', 5] }, then: 'Mayo' },
              { case: { $eq: ['$_id', 6] }, then: 'Junio' },
              { case: { $eq: ['$_id', 7] }, then: 'Julio' },
              { case: { $eq: ['$_id', 8] }, then: 'Agosto' },
              { case: { $eq: ['$_id', 9] }, then: 'Septiembre' },
              { case: { $eq: ['$_id', 10] }, then: 'Octubre' },
              { case: { $eq: ['$_id', 11] }, then: 'Noviembre' },
              { case: { $eq: ['$_id', 12] }, then: 'Diciembre' }
            ],
            default: 'Unknown'
          }
        },
        totalAmount: 1
      }
    }
  ]);

  return salesReport;
};

export const getDailySalesByMonthReport = async (
  year: string,
  month: string
): Promise<any> => {
  const salesReport = await Order.aggregate([
    {
      $match: {
        date: {
          $gte: new Date(`${year}-${month}-01T00:00:00.000Z`),
          $lte: new Date(`${year}-${month}-31T23:59:59.999Z`)
        }
      }
    },
    {
      $group: {
        _id: { $dayOfMonth: '$date' },
        totalAmount: { $sum: '$totalAmount' }
      }
    },
    {
      $sort: {
        _id: 1
      }
    }
  ]);

  return salesReport;
};

export const getSaleByWeekDayReport = async (
  year: string,
  month: string
): Promise<any> => {
  const salesReport = await Order.aggregate([
    {
      $match: {
        status: 'pickedUp',
        date: {
          $gte: new Date(`${year}-${month}-01T00:00:00.000Z`),
          $lte: new Date(`${year}-${month}-31T23:59:59.999Z`)
        }
      }
    },
    {
      $group: {
        _id: { $dayOfWeek: '$date' },
        totalAmount: { $sum: '$totalAmount' }
      }
    },
    {
      $sort: {
        _id: 1
      }
    },
    {
      $project: {
        _id: {
          $switch: {
            branches: [
              { case: { $eq: ['$_id', 1] }, then: 'Domingo' },
              { case: { $eq: ['$_id', 2] }, then: 'Lunes' },
              { case: { $eq: ['$_id', 3] }, then: 'Martes' },
              { case: { $eq: ['$_id', 4] }, then: 'Miércoles' },
              { case: { $eq: ['$_id', 5] }, then: 'Jueves' },
              { case: { $eq: ['$_id', 6] }, then: 'Viernes' },
              { case: { $eq: ['$_id', 7] }, then: 'Sábado' }
            ],
            default: 'Unknown'
          }
        },
        totalAmount: 1
      }
    }
  ]);

  return salesReport;
};


export const getSalesByHourOfDay = async (
   startDate: Date,
   endDate: Date
  ): Promise<any> => {
    const salesReport = await Order.aggregate([
      {
        $match: {
          date: {
            $gte: startDate,
            $lte: endDate
          }
        }
      },
      {
        $addFields: {
          adjustedDate: {
            $subtract: ['$date', 3 * 60 * 60 * 1000]
          }
        }
      },
      {
        $group: {
          _id: { $hour: '$adjustedDate' },
          totalAmount: { $sum: '$totalAmount' },
        }
      },
      {
        $sort: {
          _id: 1
        }
      },
      
    ]);
  
    return salesReport;
  };