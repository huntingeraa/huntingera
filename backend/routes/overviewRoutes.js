import express from 'express';
const router = express.Router();
import {
  getOverviews,
  createOverview,
  updateOverview,
} from '../controllers/overviewController.js'
import { aprotect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getOverviews)
router
  .route('/:id')
  .put( updateOverview)
  .post(aprotect, admin, createOverview)

export default router;