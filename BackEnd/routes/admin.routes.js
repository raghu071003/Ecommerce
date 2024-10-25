import {Router} from "express"
import { upload } from "../middleware/multer.middleware.js";
import { addProduct, adminLogin } from "../controllers/admin.controller.js";
import { registeradmin } from "../controllers/admin.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
const router = Router();


router.route("/register").post(registeradmin)
router.route("/login").post(adminLogin)
router.route("/dashboard").post()
router.route("/addProduct").post(verifyJwt,
    upload.fields([
        {
            name:"front",
            maxCount:1
        },
        {
            name:"back",
            maxCount:1
        }
    ]),
    addProduct
)


export default router