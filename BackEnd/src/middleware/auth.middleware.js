import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"


const verifyJwt = asyncHandler(async(req,res,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")    
        
        if(!token){
            throw new ApiError(401,"Unauthorized Request")
        }
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        console.log(decodedToken);
        
    
        const user  =await User.findById(decodedToken._id)
        
    
        if(!user){
            throw new ApiError(401,"Invalid Access Token");
        }
    
        req.user = user
        // console.log(user);
        
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Something Went Wrong")
    }

})
const verifyJwt2 = asyncHandler(async(req,res,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")    
        
        if(!token){
            next()
            return;
        }
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    
        const user  = User.findById(decodedToken._id).select("-password -refreshToken");
    
        if(!user){
            throw new ApiError(401,"Invalid Access Token");
        }
    
        req.user = user
        // console.log(user);
        
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Something Went Wrong")
    }

})

export {verifyJwt,verifyJwt2};