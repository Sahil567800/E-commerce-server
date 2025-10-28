import  mongoose from "mongoose"
export const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.Mongo_URI)
        console.log('database connected')
    }
    catch (error) {
        console.error(" database connection failed:", error.message);
    }
}