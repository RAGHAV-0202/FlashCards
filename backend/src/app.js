import cookieParser from "cookie-parser"
import express from "express"
import { AdminRouter } from "./routes/admin.routes.js"
import { userRoutes } from "./routes/user.routes.js"
import cors from "cors"


const app = express()


app.use(express.json())
app.use(cookieParser())
const corsOptions = {
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization' , 'Cookie'] 
};
app.use(cors(corsOptions));
app.get("/" , (req,res)=>{
    res.status(200).json("Helloooo")
})

app.use("/api/" , userRoutes)
app.use("/api/admin" , AdminRouter)

export {app}