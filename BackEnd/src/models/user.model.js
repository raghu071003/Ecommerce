import mongoose,{Schema} from "mongoose";

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
    }
},{timestamps:true})

export const User = mongoose.model("User",userSchema)