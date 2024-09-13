import express from "express"
import cors from "cors"
import cookieparser from "cookie-parser"

const app = express();

app.use(cors({
    origin: process.env.ORIGIN,
    credentials:true
}))

app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieparser())


import userRouter from "./routes/user.routes.js"
import adminRouter from './routes/admin.routes.js'
app.use("/api/v1/user",userRouter)
app.use("/api/v1/admin",adminRouter)
export {app}
