import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async ()=>{
    try{
        const mongoInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`Database Connected, Host : ${mongoInstance.connection.host}`);
    }catch(err){
        console.log("DB connection error:",err)
        process.exit(1)
    }
}
export default connectDB