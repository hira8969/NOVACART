import express from 'express';
import { getUsers, updateProfile, updateUserRole } from '../controllers/userController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.patch('/profile', updateProfile);
router.get('/', authorize('admin'), getUsers);
router.patch('/:id/role', authorize('admin'), updateUserRole);

export default router;
