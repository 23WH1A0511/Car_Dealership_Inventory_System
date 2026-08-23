import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  make: { type: String, required: true, trim: true },
  model: { type: String, required: true, trim: true },
  category: { type: String, required: true, enum: ['SUV', 'Sedan', 'Truck', 'Coupe', 'Hatchback', 'Electric', 'Luxury'] },
  price: { type: Number, required: true, min: 0 },
  quantity: { type: Number, required: true, min: 0, default: 0 },
  year: { type: Number, min: 1900, max: 2100 },
  color: { type: String, trim: true },
  image: { type: String, trim: true },
  featured: { type: Boolean, default: false }
}, { timestamps: true });

vehicleSchema.index({ make: 'text', model: 'text', category: 'text' });
export default mongoose.model('Vehicle', vehicleSchema);
