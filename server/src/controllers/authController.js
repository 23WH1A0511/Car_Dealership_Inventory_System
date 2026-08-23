import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
const payload = (user) => ({ token: signToken(user._id), user: { id: user._id, name: user.name, email: user.email, role: user.role } });
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Name, email, and password are required.' });
    if (await User.exists({ email: email.toLowerCase() })) return res.status(409).json({ message: 'An account with this email already exists.' });
    const user = await User.create({ name, email, password });
    res.status(201).json(payload(user));
  } catch (error) { next(error); }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email?.toLowerCase() }).select('+password');
    if (!user || !(await user.matchesPassword(req.body.password || ''))) return res.status(401).json({ message: 'Incorrect email or password.' });
    res.json(payload(user));
  } catch (error) { next(error); }
};
