import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  vehicleSnapshot: { make: String, model: String, price: Number, image: String },
  status: { type: String, enum: ['Pending', 'Confirmed', 'Preparing', 'Completed', 'Cancelled'], default: 'Pending' }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
