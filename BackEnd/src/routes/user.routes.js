import { Router } from "express";
import { registerUser, userLogin, userLogout } from "../controllers/user.controller.js";
import verifyJwt from "../middleware/auth.middleware.js";
import { getProducts } from "../controllers/user.controller.js";
import { searchProduct } from "../controllers/user.controller.js";
import { getProduct } from "../controllers/user.controller.js";

const router = Router()

router.route("/register").post(registerUser)
router.route("/products").get(getProducts)
router.route("/search/:query").get(searchProduct)
router.route("/product/:productId").get(getProduct)
//secure Routes
router.route("/login").post(userLogin)
router.route("/logout").post(verifyJwt,userLogout)

export default router