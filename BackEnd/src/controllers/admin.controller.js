import { upload } from "../middleware/multer.middleware.js";
import { Product } from "../models/product.model.js";
import { Seller } from "../models/seller.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { options } from "../constants.js";



const addProduct = asyncHandler(async(req,res)=>{
    const owner = await Seller.findOne(req.user._id).select("-password -refreshToken")
    const {name,price,category,desc,sellPrice,size,stock} = req.body
    // console.log(req.files)
    const frontLocalPath = req.files?.front[0].path
    const backLocalPath = req.files?.back[0].path
    if(!frontLocalPath && backLocalPath){
        throw new ApiError(400,"Both Images are required")
    }
    const front = await uploadOnCloudinary(frontLocalPath)
    const back = await uploadOnCloudinary(backLocalPath)
    const product = await Product.create({
        name,
        price,
        category,
        seller:owner._id,
        sellPrice,
        image:[front.url,back.url],
        description:desc,
        owner,
        size,
        stock
    })

    const prodctCreated = await Product.findById(product._id)

    if(!prodctCreated){
        throw new ApiError(500,"Something Went Wrong")
    }
    return res.status(201).json(
        new ApiResponse(200,"Product added Successfully")
    )
})

const adminLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // console.log(req.body)
    // Find the user by email
    // console.log(password);
    
    const seller = await Seller.findOne({ email });
    if (!seller) {
        throw new ApiError(401, "Invalid credentials");
    }
    // Compare the provided password with the stored hashed password
    const isValid =  await seller.isValidPassword(password)
    if (!isValid) {
        throw new ApiError(401, "Invalid credentials");
    }
    //Generate a Token
    const {accessToken,refreshToken} =  await generateTokens(seller._id);
    // Send the response
    res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",refreshToken,options).json(
        new ApiResponse(200, "Logged in successfully",)
    );
});
const registeradmin = asyncHandler(async(req,res)=>{
    const {email,address,password,number} = req.body
    // console.log(req.body);
    
    //validation
    if ([email, address, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
      }
    // Check for duplication
    const existedSeller = await Seller.findOne({
        $or:[{email}]
    })
    if(existedSeller){
        throw new ApiError(409,"User aldready exists!")
    }
    const user =await Seller.create({
        email:email,
        Address:address,
        password:password,
        Number:number
        
    })
    //removing password and refreshToken from the user object
    const createdUser = await Seller.findById(user._id).select(
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
    const seller = await Seller.findById(userId);
    if(!seller){
        throw new ApiError(500,"Something Went Wrong")
    }
    try {
        const accessToken =  seller.generateAccessToken()
        const refreshToken =  seller.generateRefreshToken()
        seller.refreshToken = refreshToken
        await seller.save({validateBeforeSave:true})
        return {accessToken,refreshToken}

    } catch (error) {
        throw new ApiError(400,error?.message || "Invalid Request")
    }
}
export{
    addProduct,adminLogin,registeradmin
}