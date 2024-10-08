import { Router } from "express";
import { getCategory, registerUser, updateCart, userLogin, userLogout } from "../controllers/user.controller.js";
import {verifyJwt,verifyJwt2} from "../middleware/auth.middleware.js";
import { getProducts } from "../controllers/user.controller.js";
import { searchProduct } from "../controllers/user.controller.js";
import { getProduct } from "../controllers/user.controller.js";
import { userProfile,updateProfile,getOrders } from "../controllers/user.controller.js";
import { rateProduct,sendStatus,processOrder } from "../controllers/user.controller.js";
const router = Router()

router.route("/register").post(registerUser)
router.route("/products").get(getProducts)
router.route("/search/:query").get(searchProduct)
router.route("/product/:productId").get(verifyJwt2,getProduct)
router.route("/product/:productId/rate").post(verifyJwt,rateProduct)
router.route("/updateCart").post(verifyJwt,updateCart)
router.route("/status").post(verifyJwt,sendStatus)
router.route("/category/:category").get(getCategory)
//secure Routes
router.route("/login").post(userLogin)
router.route("/logout").post(verifyJwt,userLogout)
router.route("/profile").post(verifyJwt,userProfile)
router.route("/update-profile").put(verifyJwt,updateProfile)
router.route("/orders").post(verifyJwt,processOrder);
router.route("/getOrders").post(verifyJwt,getOrders);

export default router