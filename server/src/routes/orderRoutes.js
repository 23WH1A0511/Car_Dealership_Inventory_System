import { Router } from 'express';
import { protect, adminOnly } from '../middleware/auth.js';
import { listOrders, updateOrderStatus } from '../controllers/orderController.js';

const router = Router();
router.use(protect);
router.get('/', listOrders);
router.patch('/:id/status', adminOnly, updateOrderStatus);
export default router;
