import cookieParser from "cookie-parser"
import express from "express"
import { AdminRouter } from "./routes/admin.routes.js"
import { userRoutes } from "./routes/user.routes.js"
import cors from "cors"


const app = express()


app.use(express.json())
app.use(cookieParser())
// const corsOptions = {
//     origin: '*', 
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
//     allowedHeaders: ['Content-Type', 'Authorization' , 'Cookie'] 
// };

const corsOptions = {
    origin: ['https://flash-cards-mbum.vercel.app', 'http://localhost:3000' , "http://172.20.10.2:3000" , "http://192.168.29.76:3000"],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    credentials: true ,
    sameSite: 'None'
};

app.use(cors(corsOptions));

app.get("/" , (req,res)=>{
    res.status(200).json("Server is Live")
})

app.use("/api/" , userRoutes)
app.use("/api/admin" , AdminRouter)

export {app}