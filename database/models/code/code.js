import mongoose from "mongoose";

const code=new mongoose.Schema({
    code:String,
   
},{timestamps:true})

export const Code=mongoose.model("Code",code)