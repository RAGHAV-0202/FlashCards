import mongoose, { Schema } from "mongoose";

const flashCardSchema = new mongoose.Schema({
    question : {
        type : String ,
        required : [true , "must pass an question to the card"]
    },
    answer : {
        type : String ,
        required : [true , "must pass a password to the card"]
    },
    creator : {
        type : Schema.Types.ObjectId ,
        ref : "Admin",
        required : true
    }

} , {timestamps : true})


export const flashcards = mongoose.model("flashcards" , flashCardSchema)