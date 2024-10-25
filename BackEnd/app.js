import express from "express"
import cors from "cors"
import cookieparser from "cookie-parser"
// import session from "express-session"
const app = express();

app.use(cors({
    origin: process.env.ORIGIN,
    credentials:true
}))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// app.use(session({
//     secret:process.env.SESSION_SECRET,
//     resave:false,
//     saveUninitialized:false,
//     cookie:{
//         secure:false,
//         httpOnly:true,
//         maxAge:1000*60*60*24
//     }
// }))

app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieparser())


import userRouter from "./routes/user.routes.js"
import adminRouter from './routes/admin.routes.js'
app.use("/api/v1/user",userRouter)
app.use("/api/v1/admin",adminRouter)
export {app}
