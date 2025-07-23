import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';
import User from './User.js';
import Transaction from './Transaction.js';

const Wallet = sequelize.define('Wallet', {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  balance: { type: DataTypes.DECIMAL(10,2), defaultValue: 0 },
  type: { type: DataTypes.ENUM('customer', 'serviceman'), allowNull: false }
});

Wallet.belongsTo(User, { foreignKey: 'userId' });
Wallet.hasMany(Transaction, { foreignKey: 'walletId' });

export default Wallet;