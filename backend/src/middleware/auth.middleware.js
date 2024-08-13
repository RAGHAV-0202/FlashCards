import { Admin } from "../models/admin.models.js";
import asyncHandler from "../utils/asynchandles.js";
import dotenv from "dotenv"
dotenv.config()
import jwt from "jsonwebtoken"

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {


        const tokenFromCookies = req.cookies?.accessToken;
        const tokenFromHeader = req.header("Authorization")?.replace("Bearer ", "");
        const tokenFromVercelJwt = req._vercel_jwt?.accessToken;
        let {accessToken} = req.cookies  ;


        console.log(req.headers.cookie);



        let AT = tokenFromCookies || tokenFromHeader || tokenFromVercelJwt;

        console.log("Extracted Token:", AT);
        console.log("Type of Token:", typeof AT);

        if(typeof AT === "object"){
           AT = AT.accessToken
           console.log(AT)
        }

        if (!AT || typeof AT !== 'string') {
            return res.status(401).json({ message: "Unauthorized access" });
        }


        const decodedToken = jwt.verify(AT, process.env.ACCESS_TOKEN_SECRET);

        const user = await Admin.findById(decodedToken?._id).select("-password");

        if (!user) {
            return res.status(401).json({ message: "Invalid Access Token" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Error verifying JWT:", error);
        return res.status(401).json({ message: "Invalid access token" });
    }
});