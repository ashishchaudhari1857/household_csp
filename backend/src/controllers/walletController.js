import Wallet from '../models/Wallet.js';
import Transaction from '../models/Transaction.js';
import User from '../models/User.js';

export const getWallet = async (req, res) => {
  try {
    const userId = req.user.id;
    const wallet = await Wallet.findOne({ where: { userId } });
    if (!wallet) return res.status(404).json({ message: 'Wallet not found' });
    const transactions = await Transaction.findAll({ where: { walletId: wallet.id } });
    res.json({ balance: wallet.balance, transactions });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch wallet', error: err.message });
  }
};

export const creditWallet = async (req, res) => {
  try {
    const { userId, amount, description } = req.body;
    if (!userId || !amount) return res.status(400).json({ message: 'userId and amount required' });
    const wallet = await Wallet.findOne({ where: { userId } });
    if (!wallet) return res.status(404).json({ message: 'Wallet not found' });
    wallet.balance = parseFloat(wallet.balance) + parseFloat(amount);
    await wallet.save();
    await Transaction.create({ walletId: wallet.id, type: 'credit', amount, description, status: 'success' });
    res.json({ message: 'Wallet credited', balance: wallet.balance });
  } catch (err) {
    res.status(500).json({ message: 'Failed to credit wallet', error: err.message });
  }
};

export const debitWallet = async (req, res) => {
  try {
    const { userId, amount, description } = req.body;
    if (!userId || !amount) return res.status(400).json({ message: 'userId and amount required' });
    const wallet = await Wallet.findOne({ where: { userId } });
    if (!wallet) return res.status(404).json({ message: 'Wallet not found' });
    if (parseFloat(wallet.balance) < parseFloat(amount)) return res.status(400).json({ message: 'Insufficient balance' });
    wallet.balance = parseFloat(wallet.balance) - parseFloat(amount);
    await wallet.save();
    await Transaction.create({ walletId: wallet.id, type: 'debit', amount, description, status: 'success' });
    res.json({ message: 'Wallet debited', balance: wallet.balance });
  } catch (err) {
    res.status(500).json({ message: 'Failed to debit wallet', error: err.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const userId = req.user.id;
    const wallet = await Wallet.findOne({ where: { userId } });
    if (!wallet) return res.status(404).json({ message: 'Wallet not found' });
    const transactions = await Transaction.findAll({ where: { walletId: wallet.id } });
    res.json({ transactions });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch transactions', error: err.message });
  }
};