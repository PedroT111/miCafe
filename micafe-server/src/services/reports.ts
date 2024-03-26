import mongoose, { ObjectId } from 'mongoose';
import { RatingDistribution, productTotalQuantitySold } from '../Dto/reportDto';
import { Order } from '../models/orderModel';
import { Product } from '../models/productModel';
import { User } from '../models/userModel';
import { ChangePriceHistory } from '../models/priceChangeHistory';

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

export const getOrderRatingDistribution = async (
  startDate: Date,
  endDate: Date
): Promise<RatingDistribution[]> => {
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
      $facet: {
        ratingDistribution: [
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
        ],
        averageRating: [
          {
            $group: {
              _id: null,
              average: { $avg: '$qualification' }
            }
          }
        ]
      }
    }
  ]);

  const result = {
    ratingDistribution: ratingDistribution[0].ratingDistribution,
    averageRating: ratingDistribution[0].averageRating[0]?.average || null
  };

  return result;
};

export const getTotalAmountByDate = async (
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

export const getTotalSaleByDay = async (
  startDate: Date,
  endDate: Date,
  groupBy: string
): Promise<any> => {
  try {
    const dateFormat = groupBy === 'day' ? '%Y-%m-%d' : '%Y-%m';
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
        $group: {
          _id: {
            $dateToString: { format: dateFormat, date: '$date' }
          },
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
  } catch (err) {
    console.log(err);
  }
};

export const getSaleByWeekDayReport = async (
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
              { case: { $eq: ['$_id', 1] }, then: 'Sunday' },
              { case: { $eq: ['$_id', 2] }, then: 'Monday' },
              { case: { $eq: ['$_id', 3] }, then: 'Tuesday' },
              { case: { $eq: ['$_id', 4] }, then: 'Wednesday' },
              { case: { $eq: ['$_id', 5] }, then: 'Thursday' },
              { case: { $eq: ['$_id', 6] }, then: 'Friday' },
              { case: { $eq: ['$_id', 7] }, then: 'Saturday' }
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

export const getAvgCalificationsEmployeeByYear = async (
  year: string
): Promise<any> => {
  const report = await Order.aggregate([
    {
      $match: {
        date: {
          $gte: new Date(`${year}-01-01T00:00:00.000Z`),
          $lte: new Date(`${year}-12-31T23:59:59.999Z`)
        },
        qualification: { $exists: true, $ne: null }
      }
    },
    {
      $lookup: {
        from: 'users', // Nombre de la colección de empleados
        localField: 'employee',
        foreignField: '_id',
        as: 'employeeDetails'
      }
    },
    {
      $unwind: '$employeeDetails'
    },
    {
      $group: {
        _id: {
          employee: '$employeeDetails',
          month: { $month: '$date' }
        },
        avgRating: { $avg: '$qualification' }
      }
    }
  ]);

  const organizedData: { [key: string]: any } = {};

  report.forEach((rating) => {
    const employee = rating._id.employee;
    const month = rating._id.month;
    const avg = rating.avgRating;

    if (!organizedData[employee._id]) {
      organizedData[employee._id] = {
        employee: employee,
        promediosMensuales: []
      };
    }

    organizedData[employee._id].promediosMensuales.push({ month, avg });
  });

  return Object.values(organizedData);
};

export const totalSelledByCategory = async (
  startDate: Date,
  endDate: Date
): Promise<any> => {
  const report = await Order.aggregate([
    {
      $match: {
        date: { $gte: startDate, $lte: endDate }
      }
    },
    {
      $unwind: '$products'
    },
    {
      $lookup: {
        from: 'products',
        localField: 'products.product',
        foreignField: '_id',
        as: 'productInfo'
      }
    },
    {
      $unwind: '$productInfo'
    },
    {
      $lookup: {
        from: 'categoryproducts',
        localField: 'productInfo.category',
        foreignField: '_id',
        as: 'categoryInfo'
      }
    },
    {
      $unwind: '$categoryInfo'
    },
    {
      $group: {
        _id: '$categoryInfo._id',
        categoryName: { $first: '$categoryInfo.name' },
        totalAmount: { $sum: '$totalAmount' }
      }
    }
  ]);

  return report;
};

export const newCustomersByPeriod = async (
  startDate: Date,
  endDate: Date,
  groupBy: string
): Promise<any> => {
  const dateFormat = groupBy === 'day' ? '%Y-%m-%d' : '%Y-%m';
  const report = await User.aggregate([
    {
      $match: {
        registrationDate: {
          $gte: startDate,
          $lte: endDate
        },
        role: 'user'
      }
    },
    {
      $group: {
        _id: {
          $dateToString: { format: dateFormat, date: '$registrationDate' }
        },
        newUsers: { $sum: 1 }
      }
    },
    {
      $sort: {
        _id: 1
      }
    }
  ]);

  return report;
};

export const getSalesStatistics = async (
  startDate: Date,
  endDate: Date
): Promise<any> => {
  const report = await Order.aggregate([
    {
      $match: {
        date: { $gte: startDate, $lte: endDate }
      }
    },
    {
      $group: {
        _id: null,
        totalSold: { $sum: '$totalAmount' },
        totalOrders: { $sum: 1 },
        itemsSold: {
          $sum: {
            $add: [
              {
                $sum: '$products.quantity'
              },
              {
                $sum: '$combos.quantity'
              }
            ]
          }
        },
        avgTotalAmount: { $avg: '$totalAmount' }
      }
    },
    {
      $project: {
        _id: 0
      }
    }
  ]);

  return report.length > 0 ? report[0] : {};
};

const getTotalCustomers = async (
  startDate: Date,
  endDate: Date
): Promise<any> => {
  const report = await User.aggregate([
    {
      $match: {
        registrationDate: { $lte: endDate },
        role: 'user'
      }
    },
    {
      $group: {
        _id: null,
        totalClients: { $sum: 1 }
      }
    }
  ]);

  return report;
};

const getActiveClients = async (
  startDate: Date,
  endDate: Date
): Promise<any> => {
  const report = await Order.aggregate([
    {
      $match: {
        date: { $gte: startDate, $lte: endDate }
      }
    },
    {
      $match: {
        date: { $gte: startDate, $lte: endDate }
      }
    },
    {
      $group: {
        _id: '$customer',
        totalOrders: { $sum: 1 }
      }
    },
    {
      $group: {
        _id: null,
        activeClients: { $sum: 1 }
      }
    }
  ]);

  return report;
};
const getCustomerInfo = async (
  startDate: Date,
  endDate: Date
): Promise<any> => {
  const report = await User.aggregate([
    {
      $match: {
        $or: [
          { registrationDate: { $gte: startDate, $lte: endDate } },
          { lastOrderDate: { $gte: startDate, $lte: endDate } }
        ],
        role: 'user'
      }
    },
    {
      $group: {
        _id: null,
        totalClients: { $sum: 1 },
        newClients: {
          $sum: {
            $cond: [{ $gte: ['$registrationDate', startDate] }, 1, 0]
          }
        }
      }
    }
  ]);

  return report;
};

const getAvgCustomerSatisfactionasync = async (
  startDate: Date,
  endDate: Date
): Promise<any> => {
  const report = await Order.aggregate([
    {
      $match: {
        date: { $gte: startDate, $lte: endDate }
      }
    },
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$qualification' }
      }
    }
  ]);

  return report.length > 0 ? report[0] : {};
};

export const getCustomerStatistics = async (
  startDate: Date,
  endDate: Date
): Promise<any> => {
  const [clientsInfo, avgRating, totalCustomers, activeClients] =
    await Promise.all([
      getCustomerInfo(startDate, endDate),
      getAvgCustomerSatisfactionasync(startDate, endDate),
      getTotalCustomers(startDate, endDate),
      getActiveClients(startDate, endDate)
    ]);

  const combinedResult = {
    totalClients: totalCustomers[0] ? totalCustomers[0].totalClients : 0,
    newClients: clientsInfo[0] ? clientsInfo[0].newClients : 0,
    activeClients: activeClients[0] ? activeClients[0].activeClients : 0,
    averageOrderRating: avgRating.averageRating ? avgRating.averageRating : 0
  };

  return combinedResult;
};

export const getTopBuyingUsers = async (
  startDate: Date,
  endDate: Date
): Promise<any> => {
  const topBuyingUsers = await Order.aggregate([
    {
      $match: {
        date: { $gte: startDate, $lte: endDate }
      }
    },
    {
      $group: {
        _id: '$customer',
        totalAmount: { $sum: '$totalAmount' }
      }
    },
    {
      $sort: { totalAmount: -1 }
    },
    {
      $limit: 10
    }
  ]);
  const populatedUsers = await User.populate(topBuyingUsers, {
    path: '_id',
    select: 'name lastName email'
  });

  return populatedUsers;
};

export const productPriceVariation = async (
  year: string,
  productId: string
): Promise<any> => {
  const id = new mongoose.Types.ObjectId(productId);
  const yearNumber = parseInt(year);

  const startDate = new Date(yearNumber, 0); // Primer día del año
  const endDate = new Date(yearNumber, 11, 31); // Último día del año
  /*const report = await ChangePriceHistory.aggregate([
    {
      $match: {
        productId: id,
        timestamp: { $gte: startDate, $lte: endDate }
      }
    },
    {
      $group: {
        _id: {
          productId: '$productId',
          month: { $dateToString: { format: '%Y-%m', date: '$timestamp' } },
          year: { $year: '$timestamp' }
        },
        prices: {
          $push: {
            price: '$newPrice',
            timestamp: '$timestamp'
          }
        }
      }
    },
    {
      $project: {
        _id: 0,
        productId: '$_id.productId',
        month: '$_id.month',
        year: '$_id.year',
        lastDayOfMonth: {
          $dateFromParts: {
            year: '$_id.year',
            month: { $toInt: { $substr: ['$_id.month', 5, 2] } },
            day: { $dayOfMonth: { $last: '$prices.timestamp' } }
          }
        },
        prices: '$prices'
      }
    },
    {
      $unwind: '$prices'
    },
    {
      $match: {
        'prices.timestamp': '$lastDayOfMonth'
      }
    },
    {
      $group: {
        _id: {
          productId: '$productId',
          month: '$month',
          year: '$year'
        },
        lastPriceOfMonth: { $last: '$prices.price' },
        prevMonthPrices: { $push: '$prices.price' }
      }
    },
    {
      $project: {
        _id: 0,
        productId: '$_id.productId',
        month: '$_id.month',
        year: '$_id.year',
        lastPriceOfMonth: 1,
        prevMonthPrice: { $arrayElemAt: ['$prevMonthPrices', -2] },
        percentageVariation: {
          $multiply: [
            {
              $divide: [
                { $subtract: ['$lastPriceOfMonth', '$prevMonthPrice'] },
                '$prevMonthPrice'
              ]
            },
            100
          ]
        }
      }
    },
    {
      $lookup: {
        from: 'products',
        localField: 'productId',
        foreignField: '_id',
        as: 'product'
      }
    },
    {
      $unwind: '$product'
    },
    {
      $sort: {
        year: 1,
        month: 1
      }
    }
  ]);*/

  const prices = await ChangePriceHistory.aggregate([
    {
      $match: {
        productId: id
      }
    },
    {
      $sort: {
        timestamp: 1
      }
    },
    {
      $group: {
        _id: {
          year: { $year: '$timestamp' },
          month: { $month: '$timestamp' }
        },
        prices: { $push: '$newPrice' }
      }
    },
    {
      $project: {
        _id: 0,
        year: '$_id.year',
        month: '$_id.month',
        prices: '$prices'
      }
    },
    {
      $sort: {
        year: 1,
        month: 1
      }
    }
  ]);
  console.log(prices);
  /*const variations = prices.map((priceGroup) => {
    const monthlyPrices = priceGroup.prices;
    console.log(monthlyPrices)
    let totalVariation = 0;

    for (let index = 1; index < monthlyPrices.length; index++) {
        let prevPrice = 0;
        prevPrice = monthlyPrices[index - 1][monthlyPrices[index-1].length]
        console.log(prevPrice)
        let newPrice = monthlyPrices[index][monthlyPrices[index].length]
        
        totalVariation = (newPrice - prevPrice) / prevPrice;
        
    }
    

    return {
      month: priceGroup.month,
      year: priceGroup.year,
      totalVariation: totalVariation * 100 // Convert to percentage
    };
  });*/
  try {
    const variations = [];
    for (let i = 1; i < prices.length; i++) {
      const currentMonth = prices[i];
      const previousMonth = prices[i - 1];

      const currentMonthPrices = currentMonth.prices;
      const previousMonthPrices = previousMonth.prices;

      if (previousMonthPrices.length > 0) {
        const previousMonthLastPrice =
          previousMonthPrices[previousMonthPrices.length - 1];
        const currentMonthLastPrice =
          currentMonthPrices[currentMonthPrices.length - 1];

        const percentageVariation =
          ((currentMonthLastPrice - previousMonthLastPrice) /
            previousMonthLastPrice) *
          100;

        variations.push({
          year: currentMonth.year,
          month: currentMonth.month,
          totalVariation: percentageVariation
        });
      }
    }

    return variations;
  } catch (err) {
    console.log(err);
  }
};
