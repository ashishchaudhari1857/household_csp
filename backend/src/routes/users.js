import express from 'express';
import auth from '../middlewares/authMiddleware.js';
import role from '../middlewares/roleMiddleware.js';
import { getUsers, approveUser, rejectUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/', auth, getUsers);
router.patch('/:id/approve', auth, role(['admin']), approveUser);
router.patch('/:id/reject', auth, role(['admin']), rejectUser);

export default router;