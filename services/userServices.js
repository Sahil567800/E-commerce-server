import userModel from "../models/userModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export const registerUser = async (userData) => {
    const { email, password, username, role } = userData;
    const existingUser = await userModel.findOne({ email })
    if (existingUser) {
        throw ({ message: "User already exists", isService: true })
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = new userModel({
        username, password: hashedPassword, email ,role: role || 'user' 
    })
    return await newUser.save()
}

export const loginUser = async (userData) => {
    const { email, password } = userData
    const user = await userModel.findOne({ email })
    if (!user) {
        throw ({ message: "User does not exist", isService: true })
    }
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
        throw ({ message: "Incorrect password", isService: true })
    }
    const token = jwt.sign({ id: user._id, user: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" })
    return {
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        },
        token
    }
}
export const forgotPassword = async (data) => {
    const { email } = data
    const user = await userModel.findOne({ email })
    if (!user) {
        throw ({ message: "User does not exist", isService: true })
    }
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
    const resetLink = `${process.env.FRONTED_URL}/resetPassword/${resetToken}`
    await sendEmail(user.email, resetLink);
    return { message: "Password reset email sent" }
}