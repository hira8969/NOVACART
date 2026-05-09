import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import User from '../models/User.js';

export const protect = asyncHandler(async (req, _res, next) => {
  const token = req.cookies.token || req.headers.authorization?.startsWith('Bearer ') && req.headers.authorization.split(' ')[1];
  if (!token) {
    const error = new Error('Authentication required');
    error.statusCode = 401;
    throw error;
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret-change-me');
  req.user = await User.findById(decoded.userId).select('-password');
  if (!req.user) {
    const error = new Error('User no longer exists');
    error.statusCode = 401;
    throw error;
  }
  next();
});

export const authorize = (...roles) => (req, _res, next) => {
  if (!roles.includes(req.user.role)) {
    const error = new Error('You do not have permission to access this resource');
    error.statusCode = 403;
    return next(error);
  }
  next();
};
