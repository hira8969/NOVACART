import jwt from 'jsonwebtoken';

export function signToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'dev-secret-change-me', {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
}

export function sendToken(res, user, statusCode = 200) {
  const token = signToken(user._id);
  const isProduction = process.env.NODE_ENV === 'production';
  res.cookie('token', token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
  res.status(statusCode).json({
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified
    }
  });
}
