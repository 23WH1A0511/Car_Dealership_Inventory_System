import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.startsWith('Bearer ') && req.headers.authorization.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Authentication required.' });
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(id);
    if (!req.user) return res.status(401).json({ message: 'Account no longer exists.' });
    next();
  } catch { res.status(401).json({ message: 'Invalid or expired token.' }); }
};
export const adminOnly = (req, res, next) => req.user?.role === 'admin' ? next() : res.status(403).json({ message: 'Admin access required.' });
