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
    // console.log(req.session.userId);
    
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        throw new ApiError(500,"Failed to retrive data!")
    }
})

const searchProduct = asyncHandler(async (req, res) => {
    const { query } = req.params;
    
    try {
        // Split the query into keywords
        const keywords = query.split(/\s+/).filter(keyword => keyword.length > 0);
        
        // Create a regex pattern for each keyword
        const regexPatterns = keywords.map(keyword => new RegExp(keyword, 'i'));
        
        // Create the search query
        const searchQuery = {
            $and: regexPatterns.map(pattern => ({
                $or: [
                    { name: pattern },
                    { description: pattern },
                    { category: pattern }
                    
                ]
            }))
        };

        const results = await Product.find(searchQuery);

        return res.status(200).json({
            success: true,
            count: results.length,
            data: results
        });
    } catch (error) {
        console.error('Search error:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while searching for products'
        });
    }
});

const getProduct = asyncHandler(async(req,res)=>{           
    // const user = await User.findOne(req.user._id);
    const {productId} = req.params;

    const prod = await Product.findById(productId)
    if(req.user){
        const user = await User.findOne(req.user._id);
        if(user){
            if (!Array.isArray(user.history)) {
                user.history = [];
              }
              const obj = productId+" "+prod.image[0];
              // Add productId to user history if it doesn't already exist
              if (!user.history.includes(obj)) {
                user.history.push(obj)
    
              }
              await user.save();
        }
    }
      
    const product = await Product.findById(productId);
    if(!product) {
        throw new ApiError(404,"Requested Product Not Found!!")
    }
    return res.status(200,"Product FOund!").json(product)
})

const userProfile = asyncHandler(async (req, res) => {
    
    // const userId = req.user._id;
    // if (!userId) {
    //     return res.status(400).json(new ApiResponse(400, null, "User ID is missing"));
    // }

    // Fetch user profile from the database
    const user = await User.findOne(req.user._id);

    // Check if the user exists
    if (!user) {
        return res.status(404).json(new ApiResponse(404, null, "User not found"));
    }

    // Exclude sensitive information from the response
    const userProfile = {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        mobile: user.mobile,
        cart:user.cart,
        history:user.history
        // Add any other fields you need
    };

    // Send response
    return res.status(200).json(new ApiResponse(200, userProfile, "User profile fetched successfully"));
});


const updateCart = asyncHandler(async (req, res) => {

    const cart = req.body;
    
    try {
      
      // Ensure the item is valid
      if (!cart) {
        return res.status(400).json({ message: 'Invalid item data' });
      }
  
      const user = await User.findOneAndUpdate(
        req.user._id,
        {
            cart:cart
        },{
            new:true
        }
    )
  
      // Respond with the updated cart
      res.status(200).json(user);
  
    } catch (error) {
      console.error('Error updating cart:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

const rateProduct= asyncHandler(async(req,res)=>{
    const { productId } = req.params;
    const user = await User.findOne(req.user._id).select("-password -refreshToken")
    const { comment, rating } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  product.reviews.push({ user:user.fullName, comment, rating });
  
  // Calculate the average rating
  const totalRating = product.reviews.reduce((acc, review) => acc + review.rating, 0);
  product.rating = totalRating / product.reviews.length;

  await product.save();
  res.status(201).json(product);


})

const getCategory = asyncHandler(async(req,res)=>{
    const { category } = req.params;
    const { sort } = req.query; // Sorting parameter from the query string
  
    // Define sorting criteria based on the 'sort' query parameter
    let sortCriteria = {};
    if (sort === 'price-asc') {
      sortCriteria = { price: 1 }; // Ascending order
    } else if (sort === 'price-desc') {
      sortCriteria = { price: -1 }; // Descending order
    } else if (sort === 'name-asc') {
      sortCriteria = { name: 1 }; // Ascending order
    } else if (sort === 'name-desc') {
      sortCriteria = { name: -1 }; // Descending order
    }
  
    try {
      // Fetch products from the database based on category and sort criteria
      const products = await Product.find({ category }).sort(sortCriteria);
      res.json(products);
    } catch (err) {
      console.error('Error fetching products:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
})

const sendStatus = asyncHandler(async(req,res)=>{
    const user = await User.findOne(req.user._id).select("-password -refreshToken")
    if(!user){
        throw new ApiError(402,"Please Login")
    }
    return res.status(200).json({
        isLoggedIn:true,
        user:user
    })
})
export {
    registerUser,userLogin,userLogout,getProducts,searchProduct,getProduct,userProfile,rateProduct,updateCart,sendStatus,getCategory
}