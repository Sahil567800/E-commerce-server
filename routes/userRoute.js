import express from 'express'
import { loginUserController, registerUserController ,forgotPasswordController} from '../controllers/userController.js'
const userRouter = express.Router();

userRouter.post('/register',registerUserController)
userRouter.post('/login',loginUserController)
userRouter.post('/forgotPassword',forgotPasswordController)

export default userRouter;