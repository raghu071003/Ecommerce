import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt"

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
export const User = mongoose.model("User",userSchema)