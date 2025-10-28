import orderModel from "../models/orderModel.js";

export const CODOrderService = async ({ order, user }) => {
    if (!user) {
        throw { message: "User not found", isService: true };
    }

    // Attach user to order
    order.user = user.id || user.email;

    const newOrder = new orderModel({
        ...order       
    });
    const savedOrder = await newOrder.save();

    return { order: savedOrder };
};

export const myOrdersServices = async (user) => {
    if (!user) {
        return sendError(res, 401, "User not authenticated");
    }
    const orders = await orderModel.find({ user: user.id || user.email }).sort({ createdAt: -1 });
    return orders
}