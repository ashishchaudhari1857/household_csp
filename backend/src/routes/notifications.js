import express from 'express';
import auth from '../middlewares/authMiddleware.js';
import { sendNotification, getNotifications } from '../controllers/notificationController.js';

const router = express.Router();

router.post('/send', auth, sendNotification);
router.get('/', auth, getNotifications);

export default router;