import crypto from 'crypto';
import { body } from 'express-validator';
import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendToken } from '../utils/token.js';

export const registerRules = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
];

export const loginRules = [
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required')
];

export const register = asyncHandler(async (req, res) => {
  const exists = await User.findOne({ email: req.body.email });
  if (exists) {
    const error = new Error('Email already registered');
    error.statusCode = 409;
    throw error;
  }
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    emailVerificationToken: crypto.randomBytes(24).toString('hex')
  });
  sendToken(res, user, 201);
});

export const login = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).select('+password');
  if (!user || !(await user.comparePassword(req.body.password))) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }
  sendToken(res, user);
});

export const logout = (_req, res) => {
  res.clearCookie('token').json({ success: true, message: 'Logged out' });
};

export const me = asyncHandler(async (req, res) => {
  res.json({ success: true, user: req.user });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    user.passwordResetToken = crypto.randomBytes(24).toString('hex');
    user.passwordResetExpires = Date.now() + 15 * 60 * 1000;
    await user.save({ validateBeforeSave: false });
  }
  res.json({ success: true, message: 'If that email exists, a reset link has been generated.' });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ passwordResetToken: req.params.token, passwordResetExpires: { $gt: Date.now() } });
  if (!user) {
    const error = new Error('Invalid or expired reset token');
    error.statusCode = 400;
    throw error;
  }
  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  sendToken(res, user);
});

export const verifyEmail = asyncHandler(async (req, res) => {
  const user = await User.findOne({ emailVerificationToken: req.params.token });
  if (!user) {
    const error = new Error('Invalid verification token');
    error.statusCode = 400;
    throw error;
  }
  user.isVerified = true;
  user.emailVerificationToken = undefined;
  await user.save({ validateBeforeSave: false });
  res.json({ success: true, message: 'Email verified' });
});
