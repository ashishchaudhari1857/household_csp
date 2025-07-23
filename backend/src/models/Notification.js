import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';

const Notification = sequelize.define('Notification', {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  type: { type: DataTypes.ENUM('sms', 'email', 'push'), allowNull: false },
  message: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.ENUM('sent', 'failed', 'pending'), defaultValue: 'pending' }
});

export default Notification;