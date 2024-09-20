import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
// import { Product } from "./product.model";
const cartItemSchema = new Schema({
    product: {
        type:[String],
        
    },
    name:{
        type:String
    },
    quantity: Number,
    size: String,
    image:{
        type:String,
        required:true
    },price:{
        type:String,
        required:true
    },
  });


const addressSchema = new Schema({
    House_No :{
        type:String
    },
    City:{
        type:String,
    },
    State:{
        type:String,
    },
    Pincode:{
        type:String
    }
})

const userSchema = new Schema({
    email:{
        type:String,
        requiured:true,
        trim:true,
        lowercase:true,
    },
    fullName:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true,
    },
    plus:{
        type:Boolean,
        default:false
    },
    refreshToken:{
        type:String
    },
    cart:{
        type:[cartItemSchema]
    },
    address:{
        type:[addressSchema],
    },
    history:{
        type:[String],
    }
},{timestamps:true})

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id : this._id
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id : this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User",userSchema)