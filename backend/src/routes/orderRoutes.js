import express from 'express';
import { createOrder, getAllOrders, getOrder, myOrders, updateOrderStatus } from '../controllers/orderController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.post('/', createOrder);
router.get('/mine', myOrders);
router.get('/', authorize('admin'), getAllOrders);
router.get('/:id', getOrder);
router.patch('/:id/status', authorize('admin'), updateOrderStatus);

export default router;
