import { Admin } from "../models/admin.models.js";
import { apiError } from "../utils/apiErrors.js";
import asyncHandler from "../utils/asynchandles.js";
import dotenv from "dotenv"
dotenv.config()
import jwt from "jsonwebtoken"

export const verifyJWT = asyncHandler(async(req,res,next)=>{
    // try {
        const {tokenFromCookies} = req.cookies?.accessToken;
        const {tokenFromHeader} = req.header("Authorization")?.replace("Bearer ", "");
        const {tokenFromVercelJwt} = req._vercel_jwt?.accessToken;

        const {accessToken} = tokenFromCookies || tokenFromHeader || tokenFromVercelJwt;
        console.log(accessToken)

        // if(!accessToken){
        //     throw new apiError(401 , "Unauthorized access")
        // }
        if (!accessToken) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        const decodedToken = jwt.verify(accessToken , process.env.ACCESS_TOKEN_SECRET)
        
        const user = await Admin.findById(decodedToken?._id).select("-password")
    
        if(!user){
            throw new apiError(401 , "Invalid Access Token")
        }
    
    
        req.user = user ;
        next()
    // } catch (error) {
    //     throw new apiError(401 , "invaid access token")
    // }

})