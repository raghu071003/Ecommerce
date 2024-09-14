import { Router } from "express";
import { registerUser, updateCart, userLogin, userLogout } from "../controllers/user.controller.js";
import {verifyJwt} from "../middleware/auth.middleware.js";
import { getProducts } from "../controllers/user.controller.js";
import { searchProduct } from "../controllers/user.controller.js";
import { getProduct } from "../controllers/user.controller.js";
import { userProfile } from "../controllers/user.controller.js";
import { rateProduct } from "../controllers/user.controller.js";
const router = Router()

router.route("/register").post(registerUser)
router.route("/products").get(verifyJwt,getProducts)
router.route("/search/:query").get(searchProduct)
router.route("/product/:productId").get(getProduct)
router.route("/product/:productId/rate").post(verifyJwt,rateProduct)
router.route("/updateCart").post(verifyJwt,updateCart)
//secure Routes
router.route("/login").post(userLogin)
router.route("/logout").post(verifyJwt,userLogout)
router.route("/profile").post(verifyJwt,userProfile)

export default router