import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    name:{
        type:String,
        // required:true
    },
    price:{
        type:String,
        // required:true
    },
    image:{
        type:[String],
        required:true
    },
    category:{
        type : String,
        enum :["T-Shirt","Hoody","Jeans","Shoes"]
        // required : true
    },
    ower:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Seller"
    }
},{timestamps:true})

export const Product = mongoose.model("Product",productSchema)