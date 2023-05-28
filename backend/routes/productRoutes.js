import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  getMyProducts,
  getSProducts
} from '../controllers/productController.js'
import { protect, vprotect, vendor } from '../middleware/authMiddleware.js'

router.route('/').get(getProducts)
router.route('/add').put(vprotect, vendor, createProduct)
router.route('/myproducts').get(vprotect, getMyProducts)
router.route('/sproducts/:id').get( getSProducts)
router.route('/:id/reviews').post(protect, createProductReview)
router.get('/top', getTopProducts)
router
  .route('/:id')
  .get(getProductById)
  .delete( deleteProduct)
  .put( updateProduct)

export default router;