import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';
import User from './User.js';

const Notification = sequelize.define('Notification', {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  type: { type: DataTypes.ENUM('sms', 'email', 'push'), allowNull: false },
  message: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.ENUM('sent', 'failed', 'pending'), defaultValue: 'pending' }
});

Notification.belongsTo(User, { foreignKey: 'userId' });

export default Notification;