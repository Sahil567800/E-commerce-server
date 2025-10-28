import express, { json } from "express"
import cors from "cors"
import { connectDb } from "./config/connection.js"
import userRouter from "./routes/userRoute.js"
import dotenv from 'dotenv'
import productRouter from "./routes/productRoute.js";
import orderRouter from './routes/orderRoute.js'

//App config
const app = express()
const port = process.env.PORT || 3000
dotenv.config()
connectDb()

//middleware
app.use(express.json())
app.use(cors())
//api endpoints
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/order', orderRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
