import User from '../models/User.js';

export const getUsers = async (req, res) => {
  try {
    const { role } = req.query;
    let where = {};
    if (role) where.role = role;
    const users = await User.findAll({ where });
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users', error: err.message });
  }
};

export const approveUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.status = 'approved';
    await user.save();
    res.json({ message: 'User approved', user });
  } catch (err) {
    res.status(500).json({ message: 'Failed to approve user', error: err.message });
  }
};

export const rejectUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.status = 'rejected';
    await user.save();
    res.json({ message: 'User rejected', user });
  } catch (err) {
    res.status(500).json({ message: 'Failed to reject user', error: err.message });
  }
};