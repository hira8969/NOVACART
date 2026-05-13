import Category from '../models/Category.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';

const monthName = new Intl.DateTimeFormat('en', { month: 'short' });

function emptyMonths() {
  const now = new Date();
  return Array.from({ length: 6 }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);
    return { month: monthName.format(date), value: 0, orders: 0 };
  });
}

export const getDashboardOverview = asyncHandler(async (_req, res) => {
  const [revenueStats, orderCount, userCount, productCount, categoryCount, revenueByMonth, categorySplit, inventory] = await Promise.all([
    Order.aggregate([{ $group: { _id: null, total: { $sum: '$pricing.total' } } }]),
    Order.countDocuments(),
    User.countDocuments(),
    Product.countDocuments({ isActive: true }),
    Category.countDocuments(),
    Order.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth() - 5, 1) }
        }
      },
      {
        $group: {
          _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
          value: { $sum: '$pricing.total' },
          orders: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]),
    Product.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$category', value: { $sum: 1 } } },
      {
        $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: '_id',
          as: 'category'
        }
      },
      { $unwind: { path: '$category', preserveNullAndEmptyArrays: true } },
      { $project: { _id: 0, name: { $ifNull: ['$category.name', 'Uncategorized'] }, value: 1 } }
    ]),
    Product.find({ isActive: true }).populate('category', 'name').sort('stock').limit(8)
  ]);

  const revenue = emptyMonths().map((item) => {
    const date = new Date(`${item.month} 1, ${new Date().getFullYear()}`);
    const match = revenueByMonth.find((entry) => entry._id.month === date.getMonth() + 1);
    return match ? { ...item, value: match.value || 0, orders: match.orders || 0 } : item;
  });

  const stockHealth = productCount
    ? Math.round((inventory.filter((product) => product.stock > 0).length / Math.min(productCount, inventory.length || productCount)) * 100)
    : 100;

  res.json({
    success: true,
    overview: {
      cards: {
        revenue: revenueStats[0]?.total || 0,
        orders: orderCount,
        users: userCount,
        products: productCount,
        categories: categoryCount,
        stockHealth
      },
      revenue,
      segments: categorySplit,
      inventory
    }
  });
});
