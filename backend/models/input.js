import mongoose from "mongoose";

const input=mongoose.Schema({
    input:{
        type:String,
        required:true,
        maxlength:250
    }
})

const inputText = mongoose.model("input", input);

export default inputText;