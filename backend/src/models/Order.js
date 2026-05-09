import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    image: String,
    price: Number,
    quantity: Number
  }],
  shippingAddress: { name: String, phone: String, line1: String, city: String, state: String, postalCode: String, country: String },
  payment: { method: String, status: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' }, transactionId: String },
  pricing: { subtotal: Number, discount: Number, tax: Number, shipping: Number, total: Number },
  status: { type: String, enum: ['processing', 'packed', 'shipped', 'delivered', 'cancelled'], default: 'processing' },
  trackingNumber: String,
  deliveredAt: Date
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
