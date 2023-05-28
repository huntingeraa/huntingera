import express from 'express';
const router = express.Router();
import {
  addEmail,
  getEmails,
  deleteEmail
} from '../controllers/emailController.js'

router.route('/')
  .post(addEmail)

router.route('/:id')
  .delete(deleteEmail)

router.route('/gete')
.get(  getEmails)

export default router;