import express from 'express';
import { createCategory, createProduct, deleteProduct, getCategories, getProduct, getProducts, productRules, updateProduct } from '../controllers/productController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';
import validate from '../middleware/validate.js';

const router = express.Router();

router.get('/', getProducts);
router.post('/', protect, authorize('admin'), productRules, validate, createProduct);
router.get('/categories', getCategories);
router.post('/categories', protect, authorize('admin'), createCategory);
router.get('/:id', getProduct);
router.patch('/:id', protect, authorize('admin'), updateProduct);
router.delete('/:id', protect, authorize('admin'), deleteProduct);

export default router;
