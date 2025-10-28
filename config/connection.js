import  mongoose from "mongoose"
export const connectDb = async()=>{
    try{
        await mongoose.connect('mongodb://localhost:27017/ecomDB')
        console.log('database connected')
    }
    catch (error) {
        console.error(" database connection failed:", error.message);
    }
}