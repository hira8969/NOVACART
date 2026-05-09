import Wishlist from '../models/Wishlist.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getWishlist = asyncHandler(async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.user._id }).populate('products');
  res.json({ success: true, wishlist: wishlist || { products: [] } });
});

export const toggleWishlist = asyncHandler(async (req, res) => {
  const wishlist = await Wishlist.findOneAndUpdate({ user: req.user._id }, { $setOnInsert: { user: req.user._id } }, { upsert: true, new: true });
  const exists = wishlist.products.some((product) => product.toString() === req.params.productId);
  wishlist.products = exists ? wishlist.products.filter((product) => product.toString() !== req.params.productId) : [...wishlist.products, req.params.productId];
  await wishlist.save();
  res.json({ success: true, wishlist });
});
