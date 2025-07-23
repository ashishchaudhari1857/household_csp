import express from 'express';
import auth from '../middlewares/authMiddleware.js';
import role from '../middlewares/roleMiddleware.js';
import { createBooking, getBookings, updateBookingStatus, deleteBooking } from '../controllers/bookingController.js';

const router = express.Router();

router.post('/', auth, role(['customer']), createBooking);
router.get('/', auth, getBookings);
router.patch('/:id/status', auth, role(['serviceman', 'provider', 'admin']), updateBookingStatus);
router.delete('/:id', auth, role(['admin']), deleteBooking);

export default router;