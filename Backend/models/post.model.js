import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    text:{
        type:String,
    },
    img:{
        type:String
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ],
    comment:[
        {
            text:{
                type:String,
                required:true,
            },
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
                required:true
            },
        }
    ]





},{timestamps:true})


export const Post = mongoose.model("Post",postSchema);