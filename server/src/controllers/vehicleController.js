import Vehicle from '../models/Vehicle.js';
import Order from '../models/Order.js';

export const listVehicles = async (req, res, next) => { try { res.json(await Vehicle.find().sort({ featured: -1, createdAt: -1 })); } catch (e) { next(e); } };
export const searchVehicles = async (req, res, next) => {
  try {
    const { q, make, model, category, minPrice, maxPrice } = req.query;
    const filter = {};
    if (q) filter.$or = ['make', 'model', 'category'].map((field) => ({ [field]: { $regex: q, $options: 'i' } }));
    for (const [field, value] of Object.entries({ make, model, category })) if (value) filter[field] = { $regex: value, $options: 'i' };
    if (minPrice || maxPrice) filter.price = { ...(minPrice && { $gte: Number(minPrice) }), ...(maxPrice && { $lte: Number(maxPrice) }) };
    res.json(await Vehicle.find(filter).sort({ featured: -1, createdAt: -1 }));
  } catch (e) { next(e); }
};
export const createVehicle = async (req, res, next) => { try { res.status(201).json(await Vehicle.create(req.body)); } catch (e) { next(e); } };
export const updateVehicle = async (req, res, next) => { try { const v = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); if (!v) return res.status(404).json({ message: 'Vehicle not found.' }); res.json(v); } catch (e) { next(e); } };
export const deleteVehicle = async (req, res, next) => { try { const v = await Vehicle.findByIdAndDelete(req.params.id); if (!v) return res.status(404).json({ message: 'Vehicle not found.' }); res.status(204).end(); } catch (e) { next(e); } };
export const purchaseVehicle = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findOneAndUpdate({ _id: req.params.id, quantity: { $gt: 0 } }, { $inc: { quantity: -1 } }, { new: true });
    if (!vehicle) return res.status(409).json({ message: 'Vehicle is unavailable or does not exist.' });
    const order = await Order.create({ customer: req.user._id, vehicle: vehicle._id, vehicleSnapshot: { make: vehicle.make, model: vehicle.model, price: vehicle.price, image: vehicle.image } });
    res.status(201).json({ vehicle, order });
  } catch (e) { next(e); }
};
export const restockVehicle = async (req, res, next) => { try { const quantity = Number(req.body.quantity); if (!Number.isInteger(quantity) || quantity < 1) return res.status(400).json({ message: 'Restock quantity must be a positive integer.' }); const v = await Vehicle.findByIdAndUpdate(req.params.id, { $inc: { quantity } }, { new: true }); if (!v) return res.status(404).json({ message: 'Vehicle not found.' }); res.json(v); } catch (e) { next(e); } };
