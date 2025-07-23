import Booking from '../models/Booking.js';
import User from '../models/User.js';

export const createBooking = async (req, res) => {
  try {
    const { providerId, servicemanId, serviceType, scheduledAt, amount } = req.body;
    const customerId = req.user.id;
    if (!providerId || !serviceType || !scheduledAt || !amount) return res.status(400).json({ message: 'Missing fields' });
    const booking = await Booking.create({ customerId, providerId, servicemanId, serviceType, scheduledAt, amount });
    res.status(201).json({ booking });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create booking', error: err.message });
  }
};

export const getBookings = async (req, res) => {
  try {
    const { role, id } = req.user;
    let where = {};
    if (role === 'customer') where.customerId = id;
    if (role === 'provider') where.providerId = id;
    if (role === 'serviceman') where.servicemanId = id;
    // admin gets all
    const bookings = await Booking.findAll({ where });
    res.json({ bookings });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bookings', error: err.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const booking = await Booking.findByPk(id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    booking.status = status;
    await booking.save();
    res.json({ booking });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update booking', error: err.message });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByPk(id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    await booking.destroy();
    res.json({ message: 'Booking deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete booking', error: err.message });
  }
};