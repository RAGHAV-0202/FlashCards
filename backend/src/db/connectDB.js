import mongoose from "mongoose";

const DB_Name = "FlashCards_striver"

async function connectDB(){
    try{
        const ConnectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_Name}`)
        console.log("Connected to the database")
    }catch(error){
        console.log(`MongoDB connection Failed, Error :  ` + error )
        process.exit(1)
    }
}
export default connectDB