import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
    user: {
      type: String,
      required: true
    },
    comment: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    }
  }, { timestamps: true });

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        // required:true
    },
    price:{
        type:String,
        // required:true
    },
    sellPrice:{
        type:String,
        required:true
    },
    description: {
        type: String,
        required: true
      },
    image:{
        type:[String],
        required:true
    },
    category:{
        type : String,
        enum :["T-Shirt","Hoodies","Jeans","Shoes"]
        // required : true
    },
    stock: {
        type: Number,
        default: 0
      },
    owner:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Seller"
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
      },
      reviews:[reviewSchema]
},{timestamps:true})



export  {productSchema}
export const Product = mongoose.model("Product",productSchema)