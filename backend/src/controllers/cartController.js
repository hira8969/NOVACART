import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
  res.json({ success: true, cart: cart || { items: [] } });
});

export const addCartItem = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.body.productId);
  if (!product) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }
  const cart = await Cart.findOneAndUpdate(
    { user: req.user._id },
    { $setOnInsert: { user: req.user._id } },
    { upsert: true, new: true }
  );
  const item = cart.items.find((entry) => entry.product.toString() === product.id);
  if (item) item.quantity += Number(req.body.quantity || 1);
  else cart.items.push({ product: product._id, quantity: req.body.quantity || 1, priceSnapshot: product.price });
  await cart.save();
  res.status(201).json({ success: true, cart });
});

export const updateCartItem = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  const item = cart?.items.find((entry) => entry.product.toString() === req.params.productId);
  if (item) item.quantity = Math.max(1, Number(req.body.quantity));
  await cart?.save();
  res.json({ success: true, cart });
});

export const removeCartItem = asyncHandler(async (req, res) => {
  const cart = await Cart.findOneAndUpdate({ user: req.user._id }, { $pull: { items: { product: req.params.productId } } }, { new: true });
  res.json({ success: true, cart });
});
