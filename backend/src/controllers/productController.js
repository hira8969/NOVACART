import { body } from 'express-validator';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import ApiFeatures from '../utils/apiFeatures.js';
import asyncHandler from '../utils/asyncHandler.js';

export const productRules = [
  body('name').trim().notEmpty().withMessage('Product name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be positive')
];

export const getProducts = asyncHandler(async (req, res) => {
  const features = new ApiFeatures(Product.find({ isActive: true }).populate('category'), req.query).search().filter().sort().paginate();
  const products = await features.query;
  res.json({ success: true, count: products.length, products });
});

export const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate('category');
  if (!product) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }
  res.json({ success: true, product });
});

export const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create({ ...req.body, slug: req.body.slug || req.body.name.toLowerCase().replace(/\s+/g, '-') });
  res.status(201).json({ success: true, product });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  res.json({ success: true, product });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, { isActive: false });
  res.json({ success: true, message: 'Product archived' });
});

export const getCategories = asyncHandler(async (_req, res) => {
  const categories = await Category.find().sort('name');
  res.json({ success: true, categories });
});

export const createCategory = asyncHandler(async (req, res) => {
  const category = await Category.create({ ...req.body, slug: req.body.slug || req.body.name.toLowerCase().replace(/\s+/g, '-') });
  res.status(201).json({ success: true, category });
});
