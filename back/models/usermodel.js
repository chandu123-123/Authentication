const mongoose=require("mongoose")
const userschema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
      
    }
},{timestamps:true})
const user= new mongoose.model("User",userschema)
export default user;