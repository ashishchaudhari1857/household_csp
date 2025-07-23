import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';

const Transaction = sequelize.define('Transaction', {
  walletId: { type: DataTypes.INTEGER, allowNull: false },
  type: { type: DataTypes.ENUM('credit', 'debit'), allowNull: false },
  amount: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  description: { type: DataTypes.STRING },
  status: { type: DataTypes.ENUM('success', 'failed', 'pending'), defaultValue: 'success' }
});

export default Transaction;