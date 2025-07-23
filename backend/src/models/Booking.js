import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';
import User from './User.js';

const Booking = sequelize.define('Booking', {
  customerId: { type: DataTypes.INTEGER, allowNull: false },
  providerId: { type: DataTypes.INTEGER, allowNull: false },
  servicemanId: { type: DataTypes.INTEGER },
  serviceType: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.ENUM('pending', 'accepted', 'started', 'completed', 'cancelled'), defaultValue: 'pending' },
  scheduledAt: { type: DataTypes.DATE, allowNull: false },
  amount: { type: DataTypes.DECIMAL(10,2), allowNull: false }
});

Booking.belongsTo(User, { foreignKey: 'customerId', as: 'customer' });
Booking.belongsTo(User, { foreignKey: 'providerId', as: 'provider' });
Booking.belongsTo(User, { foreignKey: 'servicemanId', as: 'serviceman' });

export default Booking;