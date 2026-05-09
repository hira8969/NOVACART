import Review from '../models/Review.js';
import Product from '../models/Product.js';
import asyncHandler from '../utils/asyncHandler.js';

export const createReview = asyncHandler(async (req, res) => {
  const review = await Review.create({ ...req.body, user: req.user._id, product: req.params.productId });
  const aggregate = await Review.aggregate([{ $match: { product: review.product } }, { $group: { _id: '$product', rating: { $avg: '$rating' }, count: { $sum: 1 } } }]);
  await Product.findByIdAndUpdate(review.product, { rating: aggregate[0].rating, numReviews: aggregate[0].count });
  res.status(201).json({ success: true, review });
});

export const getProductReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ product: req.params.productId }).populate('user', 'name avatar').sort('-createdAt');
  res.json({ success: true, reviews });
});
