import {User} from '../models/user.model.js'
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { options } from '../constants.js';
import { Product } from '../models/product.model.js';


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
const generateTokens =async (userId)=>{
    const user = await User.findById(userId);
    if(!user){
        throw new ApiError(500,"Something Went Wrong")
    }
    try {
        const accessToken =  user.generateAccessToken()
        const refreshToken =  user.generateRefreshToken()
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave:true})
        return {accessToken,refreshToken}

    } catch (error) {
        throw new ApiError(400,error?.message || "Invalid Request")
    }
}
const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // console.log(req.body)
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(401, "Invalid credentials");
    }
    // Compare the provided password with the stored hashed password
    const isValid =  await user.isValidPassword(password)
    if (!isValid) {
        throw new ApiError(401, "Invalid credentials");
    }
    //Generate a Token
    const {accessToken,refreshToken} =  await generateTokens(user._id);
    // Send the response
    res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",refreshToken,options).json(
        new ApiResponse(200, "Logged in successfully",)
    );
});

const userLogout = asyncHandler(async(req,res)=>{
    User.findOneAndUpdate(
        req.user._id,
        {
            refreshToken:undefined
        },{
            new:true
        }
    )
    return res.status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(
        new ApiResponse(200,"User logged OUT")
    )
})
const getProducts = asyncHandler(async(req,res)=>{
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        throw new ApiError(500,"Failed to retrive data!")
    }
})

const searchProduct = asyncHandler(async(req,res)=>{
    const {query} = req.params;
    
    try {
        const results =await  Product.find({
            name:RegExp(query,'i')   
        })
        // console.log(results)
        return res.status(201).json({
            data:results
        })
    } catch (error) {
        console.log(error);
        
        throw new Error(500)
    }

})

const getProduct = asyncHandler(async(req,res)=>{
    const {productId} = req.params;
    
    const product = await Product.findById(productId);
    if(!product) {
        throw new ApiError(404,"Requested Product Not Found!!")
    }
    return res.status(200,"Product FOund!").json(product)
})
export {
    registerUser,userLogin,userLogout,getProducts,searchProduct,getProduct
}