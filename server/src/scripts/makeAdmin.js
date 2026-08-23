import 'dotenv/config';
import { connectDatabase } from '../config/database.js';
import User from '../models/User.js';
import mongoose from 'mongoose';

const email = process.argv[2]?.toLowerCase();
if (!email) { console.error('Usage: npm run make-admin -- email@example.com'); process.exit(1); }
await connectDatabase();
const user = await User.findOneAndUpdate({ email }, { role: 'admin' }, { new: true });
console.log(user ? `${user.email} is now an admin.` : 'No user found with that email.');
await mongoose.disconnect();
