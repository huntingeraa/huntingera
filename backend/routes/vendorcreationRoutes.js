import express from 'express';
const router = express.Router();
import {
  getVendorcreations,
  getVendorcreationById,
  deleteVendorcreation,
  createVendorcreation,
  updateVendorcreation,
  createVendorcreationReview,
  getTopVendorcreations,
  getMyVendorcreations
} from '../controllers/vendorcreationController.js'
import { vprotect, vendor, protect, aprotect, admin } from '../middleware/authMiddleware.js'


router.route('/').get(getVendorcreations)
router.route('/add').put(vprotect, vendor, createVendorcreation)
router.route('/admin/add').put(aprotect, admin, createVendorcreation)
router.route('/myvendorcreations').get(vprotect, getMyVendorcreations)
router.route('/:id/reviews').post(protect, createVendorcreationReview)
router.get('/top', getTopVendorcreations)
router
  .route('/admin/:id')
  .get(getVendorcreationById)
  .delete(deleteVendorcreation)
  .put(updateVendorcreation)
router
  .route('/:id')
  .get(getVendorcreationById)
  .delete(vprotect, deleteVendorcreation)
  .put(vprotect, vendor, updateVendorcreation)

export default router;