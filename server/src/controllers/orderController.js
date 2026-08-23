import Order from '../models/Order.js';

export const listOrders = async (req, res, next) => {
  try {
    const filter = req.user.role === 'admin' ? {} : { customer: req.user._id };
    res.json(await Order.find(filter).populate('customer', 'name email').populate('vehicle', 'make model').sort({ createdAt: -1 }));
  } catch (error) { next(error); }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const statuses = ['Pending', 'Confirmed', 'Preparing', 'Completed', 'Cancelled'];
    if (!statuses.includes(req.body.status)) return res.status(400).json({ message: 'Invalid order status.' });
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true }).populate('customer', 'name email');
    if (!order) return res.status(404).json({ message: 'Order not found.' });
    res.json(order);
  } catch (error) { next(error); }
};
