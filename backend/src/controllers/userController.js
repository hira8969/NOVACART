import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getUsers = asyncHandler(async (_req, res) => {
  const users = await User.find().sort('-createdAt');
  res.json({ success: true, users });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true }).select('-password');
  res.json({ success: true, user });
});

export const updateUserRole = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { role: req.body.role }, { new: true }).select('-password');
  res.json({ success: true, user });
});
