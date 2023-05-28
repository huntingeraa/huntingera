import express from 'express';
const router = express.Router();
import {
  authVendor,
  registerVendor,
  getVendorProfile,
  updateVendorProfile,
  updateVendorProfileP,
  getVendors,
  deleteVendor,
  getVendorById,
  updateVendor,
} from '../controllers/vendorController.js'
import { vprotect, aprotect } from '../middleware/authMiddleware.js'

router.route('/')
  .post(registerVendor)
  .get(aprotect, getVendors)

router
  .post('/login', authVendor)

router
  .post('/profilep', updateVendorProfileP)

router.route('/profile')
  .get(vprotect, getVendorProfile)
  .put(vprotect, updateVendorProfile)

router.route('/:id')
  .delete(deleteVendor)
  .get(getVendorById)
  .put(updateVendor)

export default router;