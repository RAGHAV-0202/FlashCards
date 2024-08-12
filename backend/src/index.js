import { app } from "./app.js"
import dotenv from "dotenv"
dotenv.config()
import connectDB from "./db/connectDB.js"
const port = process.env.port || 8080



async function Host(){
    try{
        await connectDB() ;
        app.listen(port , ()=>{
            console.log("Listening on the port " + port)
        })
    }catch(error){
        console.log("error while hosting the server, error : " + error)
    }
}

Host()