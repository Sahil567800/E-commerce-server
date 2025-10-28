import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    cartData: { type: Object, default: {} }
}, { minimize: false })

const userModel = mongoose.model.user || mongoose.model('user', userSchema);

export default userModel;