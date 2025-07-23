import express from 'express';
import auth from '../middlewares/authMiddleware.js';
import role from '../middlewares/roleMiddleware.js';
import { getWallet, creditWallet, debitWallet, getTransactions } from '../controllers/walletController.js';

const router = express.Router();

router.get('/', auth, getWallet);
router.post('/credit', auth, role(['admin']), creditWallet);
router.post('/debit', auth, role(['admin']), debitWallet);
router.get('/transactions', auth, getTransactions);

export default router;