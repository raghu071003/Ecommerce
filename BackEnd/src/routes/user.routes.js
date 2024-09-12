import { Router } from "express";
import { registerUser, userLogin, userLogout } from "../controllers/user.controller.js";
import verifyJwt from "../middleware/auth.middleware.js";



const router = Router()

router.route("/register").post(registerUser)


//secure Routes
router.route("/login").post(userLogin)
router.route("/logout").post(verifyJwt,userLogout)

export default router