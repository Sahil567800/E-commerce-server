import validator from "validator"
import bcrypt from "bcrypt"
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { loginValidator, registerValidator, emailValidator } from "../helpers/validators.js"
import { sendError, sendSuccess } from "../helpers/response.js"
import { registerUser, loginUser, forgotPassword } from "../services/userServices.js"


const loginUserController = async (req, res) => {
    try {
        const { error } = loginValidator(req.body)
        if (error) {
            return sendError(res, 400, error.details[0].message)
        }
        const { user, token } = await loginUser(req.body)
        return sendSuccess(res, 200, "User logged In successfully", { token, user })
    }
    catch (error) {
        console.log(error)
        if (error.isService) {
            return sendError(res, 400, error.message)
        }
        sendError(res, 500, "Internal Server Error")
    }
}

const registerUserController = async (req, res) => {
    try {
        const { error } = registerValidator(req.body)
        if (error) {
            return sendError(res, 400, error.details[0].message)
        }
        const user = await registerUser(req.body)
        if (!user) {
            return sendError(res, 400, user.error.message)
        }
        sendSuccess(res, 201, 'User registered successfully')
    }
    catch (error) {
        console.log(error)
        if (error.isService) {
            return sendError(res, 400, error.message)
        }
        sendError(res, 500, "Internal Server Error")
    }
}

const forgotPasswordController = async (req, res) => {
    try {
        const { error } = emailValidator(req.body)
        if (error) {
            sendError(res, 400, error.details[0].message)
        }
        const result = forgotPassword(req.body)
    }
    catch (error) {
        console.error(error)
        sendError(res, 500, "Internal Server Error")
    }
}

export { loginUserController, registerUserController, forgotPasswordController }