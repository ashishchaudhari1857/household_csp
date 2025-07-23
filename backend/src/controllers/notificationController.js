import Notification from '../models/Notification.js';
import { sendSMS, sendEmail, sendPush } from '../services/notificationService.js';

export const sendNotification = async (req, res) => {
  try {
    const { userId, type, message, subject, payload } = req.body;
    let result;
    if (type === 'sms') result = await sendSMS(userId, message);
    if (type === 'email') result = await sendEmail(userId, subject, message);
    if (type === 'push') result = await sendPush(userId, payload);
    await Notification.create({ userId, type, message, status: result.status });
    res.json({ message: 'Notification sent', result });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send notification', error: err.message });
  }
};

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const notifications = await Notification.findAll({ where: { userId } });
    res.json({ notifications });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch notifications', error: err.message });
  }
};