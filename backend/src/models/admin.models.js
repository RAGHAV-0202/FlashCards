import jwt from "jsonwebtoken"
import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    email : {
        type : String ,
        required : [true , "must enter an email"]
    },
    password : {
        type : String ,
        default : "admin",
    },
    name  : {
        type : String , 
        requried : [true , "must enter name"]
    }

} , {timestamps : true})

adminSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        { _id: this._id, email: this.email , name : this.name},
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};


export const Admin = mongoose.model("Admin" , adminSchema)