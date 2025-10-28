import joi from "joi"

export const registerValidator = (data) => {
    const schema = joi.object({
        username: joi.string().max(20).required(),
        email: joi.string().email().required(),
        password: joi.string().min(8).required(),
    })
    return schema.validate(data)
}

export const loginValidator = (data) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(8).required(),
    })
    return schema.validate(data)
}
export const emailValidator = (data) => {
    const schema = joi.object({
        email: joi.string().email().required()
    })
    return schema.validate(data)
}

export const CODValidator = (data) => {
    const schema = joi.object({
        user: joi.object().required(),
        items: joi.array().required(),
        quantity: joi.number().required(),
        totalPrice: joi.number().required(),
        status: joi.string().valid('pending', "shipped", "delivered", "cancelled").default('pending'),
        shippingAddress: joi.object().required(),
        paymentMethod: joi.string().valid('COD', 'Razorpay', 'Stripe').required(),
        date:joi.number()
    })
    return schema.validate(data)
}