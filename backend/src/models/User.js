// Example Sequelize model
import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';
import Wallet from './Wallet.js';
import Booking from './Booking.js';
import Notification from './Notification.js';

const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('admin', 'provider', 'serviceman', 'customer'), allowNull: false },
  status: { type: DataTypes.ENUM('pending', 'approved', 'rejected'), defaultValue: 'pending' },
});

User.hasOne(Wallet, { foreignKey: 'userId' });
User.hasMany(Booking, { foreignKey: 'customerId', as: 'customerBookings' });
User.hasMany(Booking, { foreignKey: 'providerId', as: 'providerBookings' });
User.hasMany(Booking, { foreignKey: 'servicemanId', as: 'servicemanBookings' });
User.hasMany(Notification, { foreignKey: 'userId' });

export default User;