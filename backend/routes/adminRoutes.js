import express from 'express';
const router = express.Router();
import {
  authAdmin,
  emailSend,
  emailSucc
} from '../controllers/adminController.js'

router
  .post('/login', emailSend)

router.post('/log', emailSucc)


export default router;