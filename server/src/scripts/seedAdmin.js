import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import User from '../models/User.js';

const email = process.env.ADMIN_EMAIL || 'admin@incubyte.com';
const password = process.env.ADMIN_PASSWORD || 'Admin@123';
await connectDatabase();
let admin = await User.findOne({ email });
if (!admin) admin = await User.create({ name: 'Inventory Admin', email, password, role: 'admin' });
else if (admin.role !== 'admin') { admin.role = 'admin'; await admin.save(); }
console.log(`Admin ready: ${email}`);
await mongoose.disconnect();
