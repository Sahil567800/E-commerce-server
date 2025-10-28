import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: { type: Array, required: true },
    quantity: { type: Number, required: true, min: 1 },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ["pending", "shipped", "delivered", "cancelled"], default: "shipped" },
    shippingAddress: { type: Object, required: true },
    paymentMethod: { type: String, enum: ["Razorpay", "Stripe", "COD"], required: true },
    date: { type: Date, default: Date.now },
}, { timestamps: true });

const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;