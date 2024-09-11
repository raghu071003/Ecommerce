import express from "express"

const app = express();
app.use(cors({
    origin: process.env.ORIGIN,
    credentials:true
}))

app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))

app.get('/',(req,res)=>{
    res.send("Hello")
})

app.post('/register',(req,res)=>{
    console.log(req.body);
})
export {app}
