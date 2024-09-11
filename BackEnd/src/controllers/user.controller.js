import mongoose from "mongoose";
import {User} from '../models/user.model.js'
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcrypt"


const registerUser = asyncHandler(async(req,res)=>{
    const {email,fullName,password,mobile} = req.body
    //validation
    if ([email, fullName, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
      }
    // Check for duplication
    const existedUser = await User.findOne({
        $or:[{email}]
    })
    if(existedUser){
        throw new ApiError(409,"User aldready exists!")
    }
    const user =await User.create({
        email:email,
        fullName:fullName,
        password:password,
        mobile:mobile
    })
    //removing password and refreshToken from the user object
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(500,"Error while creating User")
    }
    return res.status(200).json(
        new ApiResponse(201,createdUser,"user created!")
    )
})

const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(401, "Invalid credentials");
    }

    // Compare the provided password with the stored hashed password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        throw new ApiError(401, "Invalid credentials");
    }

    // Send the response
    res.status(200).json(
        new ApiResponse(200, "Logged in successfully",)
    );
});

export {
    registerUser,userLogin
}