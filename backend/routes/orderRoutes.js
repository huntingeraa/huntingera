import express from 'express'
const router = express.Router()
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  getMOrders,
  deleteOrder
} from '../controllers/orderController.js'
import { protect, vprotect, vendor } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems).get(getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/morders').get(vprotect, getMOrders)
router.route('/:id').get(vprotect, getOrderById).delete(deleteOrder)
router.route('/:id/pay').put(updateOrderToPaid)
router.route('/:id/deliver').put(vprotect, vendor, updateOrderToDelivered)

export default router