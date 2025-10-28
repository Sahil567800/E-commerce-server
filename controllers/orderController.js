import { sendSuccess, sendError } from '../helpers/response.js'
import { CODValidator } from '../helpers/validators.js'
import { CODOrderService, myOrdersServices } from '../services/orderServices.js'
export const CODController = async (req, res) => {
    try {
        const { errors } = CODValidator(req.body)
        if (errors) {
            return sendError(res, 400, errors.details[0].message)
        }
        const user = req.user;


        const { order } = await CODOrderService({
            order: req.body,
            user
        })

        return sendSuccess(res, 201, "order placed successfully", order)
    }
    catch (error) {
        console.log(error)
        if (error.isService) {
            return sendError(res, 400, error.message)
        }
        return sendError(res, 500, "Internal server error")
    }
}

export const myOrdersController = async (req, res) => {
    try {
        console.log(req.user)
        const myOrders = await myOrdersServices(req.user)
        sendSuccess(res, 200, "Orders fetched successfully", myOrders)
    }
    catch (error) {
        console.error(error)
        sendError(res, 500, 'Internal server error')
    }
}