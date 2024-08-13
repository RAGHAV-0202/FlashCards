import asyncHandler from "../utils/asynchandles.js"
import mongoose from "mongoose"
import { Admin } from "../models/admin.models.js";
import { apiError } from "../utils/apiErrors.js"
import { sendResponse } from "../utils/sendResponse.js";
import jwt from "jsonwebtoken"
import { flashcards } from "../models/flashcard.models.js";
import { ApiResponse } from "../utils/apiResponse.js";

const generateAccessToken = async(userId)=>{
    try{
        const user = await Admin.findById(userId)
        const accessToken = user.generateAccessToken() ;
        return {accessToken}
        
    }catch(Error){
        console.log(Error)
        throw new apiError(500 , "Something went wrong while generating token")
    }
}

const registerUser = asyncHandler(async(req,res)=>{
    const {name , email , password} = req.body ;

    if (!name?.trim() || !email?.trim() || !password?.trim()) {
        throw new apiError(400, "All three fields are required");
    }

    const existingAdmin = await Admin.findOne({email})

    if(existingAdmin){
        res.status(400).json( {StatusCode : 400 , Error : "user already exists"})
        throw new apiError(400 , "user already exists")
    }

    const admin  = await Admin.create({
        name , email , password
    })

    const Data_WO_pass = await Admin.findById(admin._id , {password : 0});

    const accessToken = await generateAccessToken(Data_WO_pass._id)

    const options = {
        httpOnly : true ,
        secure : true
    }

    return res.status(200)
    .cookie("accessToken" , accessToken , options)
    .json(
         new ApiResponse(200 , {Data_WO_pass} , "Admin created and Logged in Succesfully" )
    )

})

const login = asyncHandler(async(req,res)=>{
    const {email , password} = req.body ;
    if(!email.trim() || !password.trim()){
        throw new apiError(400 , "must enter email and passwowrd")
    }

    const admin = await Admin.findOne({email})

    if(!admin){
        throw new apiError(400 , "Invalid Email or password")
    }

    if(admin.password !== password ){
        throw new apiError(400 , "Invalid Email or password , wrong")
    }
    const options = {
        httpOnly : true ,
        secure : true,
        sameSite: 'None'
    }
    let accessToken = await generateAccessToken(admin._id)

    return res.status(200)
    .cookie("accessToken" , accessToken , options)
    .json(
        sendResponse(200 , "Logged in Successfully")
    )


})

const logout = asyncHandler(async(req,res)=>{
    const options = {
        httpOnly : true ,
        secure : true
    }
    return res.status(200).clearCookie("accessToken" , options).json("User logged out")
})

const addCard = asyncHandler(async(req,res)=>{
    try {
        const {question , answer} = req.body ;
        if(!question.trim() || !answer.trim()){
            throw new apiError(400 , "Enter both question and answer.")
        }
    
        const exists = await flashcards.findOne({question});
    
        if(exists){
            throw new apiError(400 , "question already exists")
        }
    
        const card_object = await flashcards.create({
            question : question ,
            answer : answer,
            creator : req.user._id
        })
    
        const double_check_if_card_is_created = await flashcards.findById(card_object._id);
        
        if(!double_check_if_card_is_created){
            throw new apiError(500 , "error while adding a new card")
        }
        res.status(200).json(
            new ApiResponse(200 , double_check_if_card_is_created , "Successfully added a card")
            // card_object
        )
    } catch (error) {
        console.log(`card creation error :  ${error}`)
    }
})

const editCard = asyncHandler(async(req,res)=>{
    const { findMethod, newQue, newAns } = req.body;

    const card = await flashcards.findOne({ $or: [{ question: findMethod }, { _id: findMethod }] });

    if(!card){
        throw new apiError(400  , "couldnt find the question you were looking for !")
    }

    let edited = false ;

    if(newQue){
        card.question = newQue ;
        edited = true; 
    }
    if(newAns){
        card.answer = newAns ;
        edited = true ;
    }


    if (edited) {
        card.creator = req.user._id; 
        await card.save();
        res.status(200).json(new ApiResponse(200 , {"edited" : edited} , "Edited Successfully"));
    } else {
        throw new apiError(400, "No changes were made");
    }  

})

const deleteCard = asyncHandler(async(req,res)=>{
    const { id } = req.body;
    console.log(id)

    const card = await flashcards.findByIdAndDelete(id);
    if(!card){
        throw new apiError(400  , "couldnt find the question you were looking for !")
    }

    console.log(card)

    res.status(200).json(
        new ApiResponse(200 , card , "deleted sucessfully")
    )

})


export {login , registerUser , logout, addCard , editCard , deleteCard}