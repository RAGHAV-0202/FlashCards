import mongoose from "mongoose";
import { flashcards } from "../models/flashcard.models.js";
import { ApiResponse } from "../utils/apiResponse.js";
import asyncHandler from "../utils/asynchandles.js";

const getCards = asyncHandler(async(req,res)=>{
    const data = await flashcards.find()

    res.status(200).json(
        new ApiResponse(200 , data , "Data Fetched Successfully")
    )
})

export {getCards}